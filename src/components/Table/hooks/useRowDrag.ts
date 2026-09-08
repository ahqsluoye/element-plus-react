import { namespace } from '@qsxy/element-plus-react/hooks/prefix';
import React, { use, useCallback, useEffect, useRef, useState } from 'react';
import { TableBodyContext, TableContext } from '../TableContext';
import { getRowIdentity } from '../util';

/** 1x1 透明图片，配合 setDragImage 隐藏浏览器原生拖拽快照，改用自定义行拖拽图像 */
const TRANSPARENT_DRAG_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

/** 指针距滚动容器上下边缘该距离内时触发自动滚动（px） */
const AUTO_SCROLL_EDGE = 40;
/** 自动滚动每帧步进距离（px） */
const AUTO_SCROLL_STEP = 10;
/** FLIP 行位移动画时长（ms） */
const FLIP_DURATION = 260;
/** 落点确认高亮动画时长（ms） */
const DROP_FLASH_DURATION = 600;

/** 行在表格坐标系中的缓存几何信息（dragstart 时一次性测量，拖拽期间行不发生布局变化） */
interface CachedRowRect {
    top: number;
    height: number;
}

/** document 级拖拽事件监听器集合 */
interface RowDragGlobalListeners {
    dragover: (e: Event) => void;
    drop: (e: Event) => void;
    dragend: (e: Event) => void;
}

/**
 * 根据指针 y 坐标（表格坐标系）计算插入缝隙下标。
 * 返回 0..rows.length：0 表示插入到首行之前，rows.length 表示追加到末尾。
 * 纯函数，便于单元测试。
 */
export const computeInsertionIndex = (yInTable: number, rows: CachedRowRect[]): number => {
    for (let i = 0; i < rows.length; i++) {
        if (yInTable < rows[i].top + rows[i].height / 2) {
            return i;
        }
    }
    return rows.length;
};

/** 将插入缝隙下标换算为 arrayMove 语义的最终目标下标（无效移动返回 null） */
export const insertionToTargetIndex = (insertionIndex: number, fromIndex: number, total: number): number | null => {
    if (insertionIndex < 0 || insertionIndex > total) {
        return null;
    }
    const toIndex = insertionIndex > fromIndex ? insertionIndex - 1 : insertionIndex;
    return toIndex === fromIndex || toIndex < 0 || toIndex >= total ? null : toIndex;
};

interface UseRowDragOptions {
    tbodyRef: React.RefObject<HTMLTableSectionElement | null>;
    /** 行 DOM 缓存（下标 → tr），由 TableBody 维护，用于几何测量与 FLIP 动画 */
    rowRef: React.RefObject<Record<number, HTMLTableRowElement>>;
}

/**
 * 行拖拽排序控制器。
 *
 * 设计要点（面向 100+ 行的流畅体验）：
 * 1. 事件委托：所有拖拽事件只绑定在 tbody / document 上，行数增加不增加监听器；
 * 2. 零重渲染拖拽：拖拽过程中的 ghost 移动、指示线、自动滚动全部通过直接 DOM 操作 +
 *    requestAnimationFrame 节流完成，React 状态仅在 dragstart/dragend 各更新一次（源行高亮）；
 * 3. 几何缓存：dragstart 时一次性测量所有行的表格坐标系位置，dragover 期间仅做数值比较，
 *    避免 getBoundingClientRect 布局抖动；
 * 4. FLIP 动画：drop 后基于 rowKey 稳定 key 让 React 移动 DOM 节点，再以 transform
 *    反演 + 过渡实现平滑位移动画（GPU 合成，不触发重排）。
 */
export const useRowDrag = <T extends object = any>(options: UseRowDragOptions) => {
    const { tbodyRef, rowRef } = options;
    const { props, data, reorderRow, tableRefs } = use(TableContext);
    const { isTreeTable } = use(TableBodyContext);
    const { rowSortEnabled, rowKey, onRowSortChange } = props;

    /** 是否启用行拖拽（树形表格、行数不足两条时禁用） */
    const rowDragEnabled = !!rowSortEnabled && !isTreeTable() && data.length > 1;
    /** 是否仅允许通过拖拽手柄（type=drag 列）发起拖拽 */
    const handleOnly = rowSortEnabled === 'handle';

    /** 正在拖拽的行下标（唯一进入 React 状态的拖拽数据，用于源行高亮） */
    const [draggingIndex, setDraggingIndex] = useState<number | undefined>(undefined);
    const draggingIndexRef = useRef<number | null>(null);

    /** 自定义拖拽图像节点与抓取偏移 */
    const ghostRef = useRef<HTMLDivElement | null>(null);
    const ghostOffsetRef = useRef({ x: 0, y: 0 });

    /** dragstart 时缓存的行几何信息（表格坐标系） */
    const rowRectsRef = useRef<CachedRowRect[]>([]);

    /** 当前插入缝隙下标（null 表示无效移动，不显示指示线） */
    const insertionIndexRef = useRef<number | null>(null);

    /** 最近一次指针位置（供 rAF 节流与自动滚动循环使用） */
    const pointerRef = useRef<{ x: number; y: number } | null>(null);

    /** document 级捕获监听（拖出表格外仍可持续跟踪） */
    const globalListenersRef = useRef<RowDragGlobalListeners | null>(null);

    /** dragover rAF 节流句柄与自动滚动循环句柄 */
    const dragOverRafRef = useRef<number | null>(null);
    const autoScrollRafRef = useRef<number | null>(null);

    /** FLIP 快照：重排前各行（按 rowKey 标识）的视口 top */
    const flipSnapshotRef = useRef<{ tops: Record<string, number>; movedKey: string } | null>(null);

    /** 获取纵向滚动容器（ElScrollbar 的 wrap 元素） */
    const getScrollContainer = useCallback(() => tableRefs.scrollBarRef.current?.wrapRef.current ?? null, [tableRefs]);

    /** 移除自定义拖拽图像节点 */
    const removeGhost = useCallback(() => {
        if (ghostRef.current) {
            ghostRef.current.parentElement?.removeChild(ghostRef.current);
            ghostRef.current = null;
        }
    }, []);

    /** 隐藏插入指示线 */
    const hideDragProxy = useCallback(() => {
        const proxy = tableRefs.rowDragHelper.current;
        if (proxy) {
            proxy.style.display = 'none';
        }
    }, [tableRefs]);

    /** 清除行上残留的 FLIP 内联样式（动画被打断或新一轮拖拽开始时调用） */
    const clearFlipStyles = useCallback(() => {
        Object.values(rowRef.current ?? {}).forEach(tr => {
            if (tr) {
                tr.style.transition = '';
                tr.style.transform = '';
                tr.classList.remove('is-row-dropped');
            }
        });
    }, [rowRef]);

    /** 拖拽结束统一清理（幂等，可被 dragend/drop 多次安全调用） */
    const cleanupDrag = useCallback(() => {
        if (dragOverRafRef.current !== null) {
            cancelAnimationFrame(dragOverRafRef.current);
            dragOverRafRef.current = null;
        }
        if (autoScrollRafRef.current !== null) {
            cancelAnimationFrame(autoScrollRafRef.current);
            autoScrollRafRef.current = null;
        }
        if (globalListenersRef.current) {
            document.removeEventListener('dragover', globalListenersRef.current.dragover, true);
            document.removeEventListener('drop', globalListenersRef.current.drop, true);
            document.removeEventListener('dragend', globalListenersRef.current.dragend, true);
            globalListenersRef.current = null;
        }
        removeGhost();
        hideDragProxy();
        pointerRef.current = null;
        insertionIndexRef.current = null;
        rowRectsRef.current = [];
        if (draggingIndexRef.current !== null) {
            draggingIndexRef.current = null;
            setDraggingIndex(undefined);
        }
    }, [hideDragProxy, removeGhost]);

    /** 移动自定义拖拽图像（x 方向限制在表格范围内，y 方向跟随指针） */
    const moveGhost = useCallback(
        (clientX: number, clientY: number) => {
            const ghost = ghostRef.current;
            const tableEl = tableRefs.tableBody.current;
            if (!ghost || !tableEl) {
                return;
            }
            const tableRect = tableEl.getBoundingClientRect();
            const x = Math.min(Math.max(clientX - ghostOffsetRef.current.x, tableRect.left), Math.max(tableRect.left, tableRect.right - ghost.offsetWidth));
            const y = clientY - ghostOffsetRef.current.y;
            ghost.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        },
        [tableRefs],
    );

    /**
     * 根据指针 y 坐标刷新插入目标与指示线。
     * 指针超出表格范围时钳制到边界，保证指示线始终反映最近的合法插入位置。
     */
    const updateDropTarget = useCallback(
        (clientY: number) => {
            const tableEl = tableRefs.tableBody.current;
            const rects = rowRectsRef.current;
            const fromIndex = draggingIndexRef.current;
            if (!tableEl || rects.length === 0 || fromIndex === null) {
                return;
            }
            const tableRect = tableEl.getBoundingClientRect();
            const totalHeight = rects[rects.length - 1].top + rects[rects.length - 1].height;
            const yInTable = Math.min(Math.max(clientY - tableRect.top, 0), totalHeight);
            const insertionIndex = computeInsertionIndex(yInTable, rects);

            // 无有效移动（落点即原位置）时隐藏指示线
            if (insertionToTargetIndex(insertionIndex, fromIndex, rects.length) === null) {
                insertionIndexRef.current = null;
                hideDragProxy();
                return;
            }
            insertionIndexRef.current = insertionIndex;

            // 指示线定位：插入缝隙的 y 坐标（表格坐标系 → wrapper 坐标系）
            const gapY = insertionIndex < rects.length ? rects[insertionIndex].top : totalHeight;
            const proxy = tableRefs.rowDragHelper.current;
            const wrapper = tableRefs.tableWrapper.current;
            if (proxy && wrapper) {
                const wrapperRect = wrapper.getBoundingClientRect();
                let top = tableRect.top + gapY - wrapperRect.top;
                if (top >= wrapperRect.height) {
                    top = wrapperRect.height - 2;
                }
                proxy.style.top = `${top}px`;
                proxy.style.display = 'block';
            }
        },
        [hideDragProxy, tableRefs],
    );

    /**
     * 创建克隆行拖拽图像：克隆 colgroup 保证列宽一致。
     * ghost 需要携带 .el-table 及尺寸修饰类，使表格作用域内的单元格样式（内边距、边框、字号）
     * 在 body 下继续生效；同时剥离固定列的 sticky 定位样式，避免脱离滚动容器后错位。
     */
    const createGhost = useCallback(
        (tr: HTMLTableRowElement, clientX: number, clientY: number) => {
            removeGhost();
            const rect = tr.getBoundingClientRect();
            const sourceTable = tr.closest('table');
            const ghost = document.createElement('div');
            // 复制表格根类与尺寸修饰类（large/default/small），继承单元格作用域样式
            const wrapperClasses = [`${namespace}-table`];
            tableRefs.tableWrapper.current?.classList.forEach(cls => {
                if (new RegExp(`^${namespace}-table--(large|default|small|border)$`).test(cls)) {
                    wrapperClasses.push(cls);
                }
            });
            wrapperClasses.push(`${namespace}-table__row-drag-ghost`);
            ghost.className = wrapperClasses.join(' ');

            const table = document.createElement('table');
            table.style.width = `${sourceTable?.getBoundingClientRect().width ?? rect.width}px`;
            table.style.tableLayout = sourceTable ? getComputedStyle(sourceTable).tableLayout : 'fixed';
            const colgroup = sourceTable?.querySelector('colgroup')?.cloneNode(true);
            if (colgroup) {
                table.appendChild(colgroup);
            }
            const ghostTbody = document.createElement('tbody');
            const clonedTr = tr.cloneNode(true) as HTMLTableRowElement;
            clonedTr.classList.remove('is-dragging');
            // 剥离固定列的 sticky 定位与偏移，让克隆行按普通流渲染
            clonedTr.querySelectorAll('td').forEach(td => {
                td.classList.remove(`${namespace}-table-fixed-column--left`, `${namespace}-table-fixed-column--right`);
                td.style.left = '';
                td.style.right = '';
                td.style.position = '';
            });
            ghostTbody.appendChild(clonedTr);
            table.appendChild(ghostTbody);
            ghost.appendChild(table);
            document.body.appendChild(ghost);

            ghostOffsetRef.current = { x: clientX - rect.left, y: clientY - rect.top };
            ghostRef.current = ghost;
            moveGhost(clientX, clientY);
        },
        [moveGhost, removeGhost, tableRefs],
    );

    /**
     * 自动滚动循环：指针接近滚动容器上下边缘时按帧滚动，
     * 滚动后同步刷新指示线位置（表格 rect 随滚动变化）。
     */
    const startAutoScrollLoop = useCallback(() => {
        const tick = () => {
            const container = getScrollContainer();
            const pointer = pointerRef.current;
            if (container && pointer) {
                const rect = container.getBoundingClientRect();
                let scrolled = false;
                if (pointer.y < rect.top + AUTO_SCROLL_EDGE) {
                    container.scrollTop -= AUTO_SCROLL_STEP;
                    scrolled = true;
                } else if (pointer.y > rect.bottom - AUTO_SCROLL_EDGE) {
                    container.scrollTop += AUTO_SCROLL_STEP;
                    scrolled = true;
                }
                if (scrolled) {
                    updateDropTarget(pointer.y);
                }
            }
            autoScrollRafRef.current = requestAnimationFrame(tick);
        };
        autoScrollRafRef.current = requestAnimationFrame(tick);
    }, [getScrollContainer, updateDropTarget]);

    /** 应用最近一次计算的插入目标，执行行重排并触发回调 */
    const applyDrop = useCallback(() => {
        const fromIndex = draggingIndexRef.current;
        const insertionIndex = insertionIndexRef.current;
        if (fromIndex === null || insertionIndex === null) {
            return;
        }
        const toIndex = insertionToTargetIndex(insertionIndex, fromIndex, data.length);
        if (toIndex === null) {
            return;
        }
        // 记录 FLIP 快照（重排前的行位置），供 data 更新后的动画使用
        if (rowKey) {
            const tops: Record<string, number> = {};
            data.forEach((row, index) => {
                const tr = rowRef.current?.[index];
                if (tr) {
                    tops[getRowIdentity(row, rowKey)] = tr.getBoundingClientRect().top;
                }
            });
            flipSnapshotRef.current = { tops, movedKey: getRowIdentity(data[fromIndex], rowKey) };
        }
        const next = reorderRow(fromIndex, toIndex);
        if (next) {
            onRowSortChange?.(next, { fromIndex, toIndex, row: data[fromIndex] });
        }
    }, [data, onRowSortChange, reorderRow, rowKey, rowRef]);

    /** 注册 document 级捕获监听：拖出表格边界仍可持续跟踪并更新反馈 */
    const startTracking = useCallback(() => {
        const onDragOver = (e: Event) => {
            const dragEvent = e as DragEvent;
            dragEvent.preventDefault();
            if (dragEvent.dataTransfer) {
                dragEvent.dataTransfer.dropEffect = 'move';
            }
            pointerRef.current = { x: dragEvent.clientX, y: dragEvent.clientY };
            // rAF 节流：同一帧内多次 dragover 只计算一次
            if (dragOverRafRef.current === null) {
                dragOverRafRef.current = requestAnimationFrame(() => {
                    dragOverRafRef.current = null;
                    const pointer = pointerRef.current;
                    if (pointer) {
                        moveGhost(pointer.x, pointer.y);
                        updateDropTarget(pointer.y);
                    }
                });
            }
        };
        const onDrop = (e: Event) => {
            const dragEvent = e as DragEvent;
            dragEvent.preventDefault();
            dragEvent.stopPropagation();
            applyDrop();
            cleanupDrag();
        };
        const onDragEnd = (e: Event) => {
            e.preventDefault();
            cleanupDrag();
        };
        document.addEventListener('dragover', onDragOver, true);
        document.addEventListener('drop', onDrop, true);
        document.addEventListener('dragend', onDragEnd, true);
        globalListenersRef.current = { dragover: onDragOver, drop: onDrop, dragend: onDragEnd };
    }, [applyDrop, cleanupDrag, moveGhost, updateDropTarget]);

    /** tbody 委托 dragstart：识别源行、创建拖拽图像并启动全局跟踪 */
    const handleDragStart = useCallback(
        (event: React.DragEvent<HTMLTableSectionElement>) => {
            if (!rowDragEnabled) {
                return;
            }
            const target = event.target as HTMLElement;
            const tr = target.closest('tr');
            if (!tr || !tbodyRef.current?.contains(tr)) {
                return;
            }
            // 手柄模式：仅允许从拖拽手柄发起
            if (handleOnly && !target.closest(`.${namespace}-table__row-drag-handle`)) {
                event.preventDefault();
                return;
            }
            const index = Number(tr.dataset.rowIndex);
            if (!Number.isInteger(index) || index < 0 || index >= data.length) {
                return;
            }

            if (event.dataTransfer) {
                event.dataTransfer.effectAllowed = 'move';
                // Firefox 必须写入数据拖拽才会启动
                event.dataTransfer.setData('text/plain', String(index));
                // 使用 1x1 透明图片隐藏原生拖拽快照，由自定义克隆行接管视觉反馈
                try {
                    const img = new Image();
                    img.src = TRANSPARENT_DRAG_IMAGE;
                    event.dataTransfer.setDragImage(img, 0, 0);
                } catch {
                    // 不支持时回退为原生拖拽快照
                }
            }

            clearFlipStyles();
            draggingIndexRef.current = index;
            setDraggingIndex(index);
            insertionIndexRef.current = null;

            // 一次性缓存所有行的表格坐标系几何信息（拖拽期间行不发生布局变化）
            const tableEl = tableRefs.tableBody.current;
            if (tableEl) {
                const tableRect = tableEl.getBoundingClientRect();
                rowRectsRef.current = data.map((_, i) => {
                    const rowTr = rowRef.current?.[i];
                    if (!rowTr) {
                        return { top: 0, height: 0 };
                    }
                    return { top: rowTr.getBoundingClientRect().top - tableRect.top, height: rowTr.offsetHeight };
                });
            }

            hideDragProxy();
            createGhost(tr, event.clientX, event.clientY);
            startTracking();
            startAutoScrollLoop();
        },
        [createGhost, data, handleOnly, hideDragProxy, rowDragEnabled, rowRef, startAutoScrollLoop, startTracking, tableRefs, tbodyRef, clearFlipStyles],
    );

    /** tbody 委托 dragover：保证行为合法放置目标（正常路径由全局捕获监听驱动） */
    const handleDragOver = useCallback(
        (event: React.DragEvent<HTMLTableSectionElement>) => {
            if (!rowDragEnabled || draggingIndexRef.current === null) {
                return;
            }
            event.preventDefault();
            if (event.dataTransfer) {
                event.dataTransfer.dropEffect = 'move';
            }
        },
        [rowDragEnabled],
    );

    /** tbody 委托 drop 兜底（全局捕获监听已处理时为 no-op） */
    const handleDrop = useCallback(
        (event: React.DragEvent<HTMLTableSectionElement>) => {
            if (!rowDragEnabled || !globalListenersRef.current) {
                return;
            }
            event.preventDefault();
        },
        [rowDragEnabled],
    );

    /** tbody 委托 dragend：拖拽中断（如按下 Esc）时兜底清理 */
    const handleDragEnd = useCallback(() => {
        cleanupDrag();
    }, [cleanupDrag]);

    /**
     * FLIP 动画：在 data 变化后的 useEffect 中调用。
     * 前提是行使用了 rowKey 稳定 key（React 会移动 DOM 节点而非原地复用），
     * 对位移行做 transform 反演后过渡回 0，实现平滑的行位移动画；
     * 被移动的行额外播放落点确认高亮。
     */
    const applyFlipAfterReorder = useCallback(() => {
        const snapshot = flipSnapshotRef.current;
        flipSnapshotRef.current = null;
        if (!snapshot || !rowKey) {
            return;
        }
        const movedRows: HTMLTableRowElement[] = [];
        data.forEach((row, index) => {
            const tr = rowRef.current?.[index];
            if (!tr) {
                return;
            }
            const beforeTop = snapshot.tops[getRowIdentity(row, rowKey)];
            if (beforeTop === undefined) {
                return;
            }
            const delta = beforeTop - tr.getBoundingClientRect().top;
            if (Math.abs(delta) < 1) {
                return;
            }
            // First：反向位移到旧位置（不参与过渡）
            tr.style.transition = 'none';
            tr.style.transform = `translateY(${delta}px)`;
            movedRows.push(tr);
        });
        if (movedRows.length === 0) {
            return;
        }
        // Last：强制回流让起始位置生效，再统一过渡到新位置
        void movedRows[0].offsetTop;
        requestAnimationFrame(() => {
            movedRows.forEach(tr => {
                tr.style.transition = `transform ${FLIP_DURATION}ms cubic-bezier(0.25, 0.8, 0.5, 1)`;
                tr.style.transform = '';
            });
        });
        // 落点确认动画：过渡结束后高亮被移动的行并清理内联样式
        setTimeout(() => {
            data.forEach((row, index) => {
                if (getRowIdentity(row, rowKey) !== snapshot.movedKey) {
                    return;
                }
                const tr = rowRef.current?.[index];
                if (!tr) {
                    return;
                }
                tr.classList.add('is-row-dropped');
                setTimeout(() => {
                    tr.classList.remove('is-row-dropped');
                    tr.style.transition = '';
                    tr.style.transform = '';
                }, DROP_FLASH_DURATION);
            });
        }, FLIP_DURATION + 20);
    }, [data, rowKey, rowRef]);

    /** 组件卸载时终止所有跟踪与动画（经 ref 持有最新清理函数，避免回调身份变化触发误清理） */
    const cleanupRef = useRef(cleanupDrag);
    useEffect(() => {
        cleanupRef.current = cleanupDrag;
    }, [cleanupDrag]);
    useEffect(() => () => cleanupRef.current(), []);

    return {
        /** 是否启用行拖拽 */
        rowDragEnabled,
        /** 是否仅手柄模式 */
        handleOnly,
        /** 正在拖拽的行下标（供源行高亮） */
        draggingIndex,
        /** 绑定到 tbody 的事件委托处理器 */
        tbodyDragHandlers: rowDragEnabled ? { onDragStart: handleDragStart, onDragOver: handleDragOver, onDrop: handleDrop, onDragEnd: handleDragEnd } : {},
        /** data 变化后调用，播放 FLIP 行位移动画 */
        applyFlipAfterReorder,
    };
};
