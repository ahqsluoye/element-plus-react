import { namespace } from '@qsxy/element-plus-react/hooks/prefix';
import { use, useCallback, useRef } from 'react';
import { TableContext } from '../TableContext';
import { TableColumnCtx } from '../typings';

/** 1x1 透明图片，配合 setDragImage 隐藏浏览器原生拖拽快照，改用自定义方块拖拽图像 */
const TRANSPARENT_DRAG_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

/** 根据鼠标坐标计算出的插入目标 */
interface DropTarget {
    /** 目标列 id */
    id?: string;

    /** 插入位置 */
    placement: 'before' | 'after';

    /** 指示线的视口 x 坐标 */
    x: number;
}

/** 拖拽期间的 document 级事件监听器集合 */
interface ColumnDragGlobalListeners {
    dragover: (e: Event) => void;
    drop: (e: Event) => void;
}

export const useColumnDrag = <T>(column: TableColumnCtx<T>) => {
    const { props, columns, reorderColumn, columnDragState, setColumnDragState, tableRefs } = use(TableContext);

    /** 自定义方块拖拽图像节点 */
    const ghostRef = useRef<HTMLElement | null>(null);

    /** 拖拽图像相对鼠标的水平抓取偏移 */
    const ghostOffsetX = useRef(0);

    /** 拖拽图像固定的垂直位置（表头行顶部，拖拽期间不变） */
    const ghostTop = useRef(0);

    /** 拖拽期间的 document 级捕获监听器（鼠标移出表头后仍可持续跟踪） */
    const globalListenersRef = useRef<ColumnDragGlobalListeners | null>(null);

    /** 最近一次根据鼠标坐标计算的插入目标 */
    const dropTargetRef = useRef<{ id?: string; placement: 'before' | 'after' } | null>(null);

    /** drop 是否已由全局监听处理（防止单元格级兜底逻辑重复执行） */
    const dropHandledRef = useRef(false);

    const { columnSortEnabled: columnDraggable, onColumnSortChange: onColumnDragEnd } = props;
    const { draggingId } = columnDragState;

    /** 当前列是否可拖拽（非固定列） */
    const dragEnabled = !!columnDraggable;

    /** 更新拖拽图像的水平位置（限制在表格范围内），垂直位置锁定在表头行 */
    const moveGhost = useCallback(
        (clientX: number) => {
            const ghost = ghostRef.current;
            const tableEl = tableRefs.tableWrapper.current;
            if (!ghost || !tableEl) {
                return;
            }
            const tableRect = tableEl.getBoundingClientRect();
            const minX = 0;
            const maxX = Math.max(minX, tableRect.right - ghost.offsetWidth);
            // const x = Math.min(Math.max(clientX - ghostOffsetX.current, minX), maxX);
            const x = Math.min(Math.max(clientX - ghostOffsetX.current, minX), maxX);
            ghost.style.transform = `translate3d(${clientX - ghostOffsetX.current}px, ${ghostTop.current}px, 0)`;
        },
        [tableRefs],
    );

    /** 移除自定义拖拽图像节点 */
    const removeGhost = useCallback(() => {
        if (ghostRef.current) {
            ghostRef.current.parentElement?.removeChild(ghostRef.current);
            ghostRef.current = null;
        }
    }, []);

    /** 移除 document 级全局拖拽监听 */
    const stopTracking = useCallback(() => {
        if (globalListenersRef.current) {
            document.removeEventListener('dragover', globalListenersRef.current.dragover, true);
            document.removeEventListener('drop', globalListenersRef.current.drop, true);
            globalListenersRef.current = null;
        }
    }, []);

    /** 可参与排序的表头首行列（非分组、非固定）及其 th 元素，按显示顺序返回 */
    const getDroppableColumns = useCallback(() => {
        const topRow = columns[0] || [];
        const tableEl = tableRefs.tableWrapper.current;
        const list: { id?: string; el: HTMLElement }[] = [];
        if (!tableEl) {
            return list;
        }
        topRow.forEach(item => {
            if (!item || item.fixed || (item.children && item.children.length > 0)) {
                return;
            }
            const el = tableEl.querySelector(`th.${item.id}`) as HTMLElement | null;
            if (el) {
                list.push({ id: item.id, el });
            }
        });
        return list;
    }, [columns, tableRefs]);

    /**
     * 基于鼠标 X 坐标与各列边界实时计算插入目标。
     * 每次均通过 getBoundingClientRect 读取最新布局，天然兼容表格横向/纵向滚动；
     * 鼠标超出表格范围时钳制到边缘列的边界，保证指示线始终反映最近的合法插入位置。
     */
    const computeDropTarget = useCallback(
        (rawClientX: number): DropTarget | null => {
            const list = getDroppableColumns();
            const tableEl = tableRefs.tableWrapper.current;
            if (!list.length || !tableEl) {
                return null;
            }
            const tableRect = tableEl.getBoundingClientRect();
            const firstRect = list[0].el.getBoundingClientRect();
            const lastRect = list[list.length - 1].el.getBoundingClientRect();
            // 钳制到可排序区域（表格视口）内，处理拖出表格边缘的场景
            const minX = Math.min(tableRect.left, firstRect.left);
            const maxX = Math.max(tableRect.right, lastRect.right);
            const clientX = Math.min(Math.max(rawClientX, minX), maxX);

            for (const item of list) {
                const rect = item.el.getBoundingClientRect();
                if (clientX < rect.left) {
                    return { id: item.id, placement: 'before', x: rect.left };
                }
                if (clientX <= rect.right) {
                    // 光标位于该列左/右半区，决定插入到列前还是列后
                    const before = clientX - rect.left < rect.width / 2;
                    return { id: item.id, placement: before ? 'before' : 'after', x: before ? rect.left : rect.right };
                }
            }
            // 越过最后一列：插入到末尾
            const last = list[list.length - 1];
            return { id: last.id, placement: 'after', x: last.el.getBoundingClientRect().right };
        },
        [getDroppableColumns, tableRefs],
    );

    /** 显示并定位全高的插入指示线（x 为视口坐标） */
    const showDragProxy = useCallback(
        (x: number) => {
            const proxy = tableRefs.columnDragHelper.current;
            const tableEl = tableRefs.tableWrapper.current;
            if (!proxy || !tableEl) {
                return;
            }
            const { left: tableLeft, width: tableWidth } = tableEl.getBoundingClientRect();
            // 先定位再显示，避免首次出现时从左边缘滑入
            if (x - tableLeft <= 0) {
                proxy.style.left = '1px';
            } else if (x - tableLeft >= tableWidth) {
                proxy.style.left = `${tableWidth - 1}px`;
            } else {
                proxy.style.left = `${x - tableLeft}px`;
            }
            proxy.style.display = 'block';
        },
        [tableRefs],
    );

    /** 隐藏插入指示线 */
    const hideDragProxy = useCallback(() => {
        const proxy = tableRefs.columnDragHelper.current;
        if (proxy) {
            proxy.style.display = 'none';
        }
    }, [tableRefs]);

    /** 根据鼠标坐标刷新插入目标与指示线（由全局 dragover 持续驱动，不受表头边界限制） */
    const updateDropIndicator = useCallback(
        (clientX: number) => {
            const target = computeDropTarget(clientX);
            if (!target || target.id === column.id) {
                // 悬停在源列自身或无有效目标：无插入意义，隐藏指示线并清空目标
                dropTargetRef.current = null;
                hideDragProxy();
                return;
            }
            dropTargetRef.current = { id: target.id, placement: target.placement };
            showDragProxy(target.x);
        },
        [column.id, computeDropTarget, hideDragProxy, showDragProxy],
    );

    /** 应用最近一次计算的插入目标，执行列重排 */
    const applyDrop = useCallback(() => {
        const target = dropTargetRef.current;
        dropTargetRef.current = null;
        if (!target) {
            // 未释放到有效目标（如回到源列），视为不移动
            return;
        }
        const topRow = columns[0] || [];
        const fromIndex = topRow.findIndex(item => item.id === column.id);
        const toIndex = topRow.findIndex(item => item.id === target.id);
        if (fromIndex < 0 || toIndex < 0) {
            return;
        }
        const nextRow = reorderColumn(column.id || '', target.id || '', target.placement);
        if (nextRow) {
            onColumnDragEnd?.({
                fromColumn: topRow[fromIndex],
                toColumn: topRow[toIndex],
                fromIndex,
                toIndex,
                columns: nextRow,
            });
        }
    }, [column.id, columns, onColumnDragEnd, reorderColumn]);

    /** 拖拽结束统一清理 */
    const cleanupDrag = useCallback(() => {
        stopTracking();
        removeGhost();
        hideDragProxy();
        setColumnDragState({});
    }, [hideDragProxy, removeGhost, setColumnDragState, stopTracking]);

    /**
     * 注册 document 级捕获监听：dragover 在任意元素上都会派发，
     * 因此鼠标移出表头（内容区、表格边缘外）仍能持续跟踪并更新指示线；
     * 全局 drop 优先处理并阻止冒泡，避免单元格级监听重复执行。
     */
    const startTracking = useCallback(() => {
        stopTracking();
        const onDragOver = (e: Event) => {
            const dragEvent = e as DragEvent;
            dragEvent.preventDefault();
            if (dragEvent.dataTransfer) {
                dragEvent.dataTransfer.dropEffect = 'move';
            }
            moveGhost(dragEvent.clientX);
            updateDropIndicator(dragEvent.clientX);
        };
        const onDrop = (e: Event) => {
            const dragEvent = e as DragEvent;
            dragEvent.preventDefault();
            dragEvent.stopPropagation();
            dropHandledRef.current = true;
            applyDrop();
            cleanupDrag();
        };
        document.addEventListener('dragover', onDragOver, true);
        document.addEventListener('drop', onDrop, true);
        globalListenersRef.current = { dragover: onDragOver, drop: onDrop };
    }, [applyDrop, cleanupDrag, moveGhost, stopTracking, updateDropIndicator]);

    /** 创建方块样式的拖拽图像，并记录抓取偏移与锁定的垂直位置 */
    const createGhost = useCallback(
        (el: HTMLElement, clientX: number) => {
            removeGhost();
            const rect = el.getBoundingClientRect();
            const ghost = document.createElement('div');
            ghost.className = `${namespace}-table__column-drag-ghost`;
            const content = el.querySelector(`.${namespace}-table__cell-content`);
            ghost.textContent = (typeof column.label === 'string' ? column.label : content?.textContent) || '';
            // ghost.style.width = `${rect.width}px`;
            ghost.style.height = `${rect.height}px`;
            ghostOffsetX.current = clientX - rect.left;
            // 垂直位置锁定在表头行，拖拽过程中不再变化
            ghostTop.current = rect.top;
            document.body.appendChild(ghost);
            ghost.style.left = `${clientX - rect.left - ghost.offsetWidth / 2}px`;
            ghostRef.current = ghost;
            moveGhost(clientX);
        },
        [column.label, moveGhost, removeGhost],
    );

    const handleDragStart = useCallback(
        (event: any) => {
            if (!dragEnabled) {
                return;
            }
            const dragEvent = event as DragEvent;
            const el = dragEvent.currentTarget as HTMLElement;
            if (dragEvent.dataTransfer) {
                dragEvent.dataTransfer.effectAllowed = 'move';
                dragEvent.dataTransfer.setData('text/plain', column.id || '');
                // 使用 1x1 透明图片隐藏原生拖拽快照，由自定义方块图像接管视觉反馈
                try {
                    const img = new Image();
                    img.src = TRANSPARENT_DRAG_IMAGE;
                    dragEvent.dataTransfer.setDragImage(img, 0, 0);
                } catch (e) {
                    // 不支持时回退为原生拖拽快照
                }
            }
            dropHandledRef.current = false;
            dropTargetRef.current = null;
            createGhost(el, dragEvent.clientX);
            startTracking();
            hideDragProxy();
            setColumnDragState({ draggingId: column.id });
        },
        [column.id, createGhost, dragEnabled, hideDragProxy, setColumnDragState, startTracking],
    );

    const handleDragEnter = useCallback(
        (event: any) => {
            if (!dragEnabled || !columnDragState.draggingId) {
                return;
            }
            const dragEvent = event as DragEvent;
            dragEvent.preventDefault();
            if (dragEvent.dataTransfer) {
                dragEvent.dataTransfer.dropEffect = 'move';
            }
        },
        [columnDragState.draggingId, dragEnabled],
    );

    /** 单元格级兜底：正常路径由全局捕获监听驱动指示线，这里仅保证表头单元格可作为放置目标 */
    const handleDragOver = useCallback(
        (event: any) => {
            if (!dragEnabled || !columnDragState.draggingId) {
                return;
            }
            const dragEvent = event as DragEvent;
            dragEvent.preventDefault();
            if (dragEvent.dataTransfer) {
                dragEvent.dataTransfer.dropEffect = 'move';
            }
        },
        [columnDragState.draggingId, dragEnabled],
    );

    /** 全局跟踪下指示线位置由鼠标坐标持续计算，dragleave 无需处理 */
    const handleDragLeave = useCallback(() => {
        // no-op：移出单元格不再影响指示线，避免闪烁
    }, []);

    /** 单元格级兜底 drop（全局监听已处理时跳过） */
    const handleDrop = useCallback(
        (event: any) => {
            if (!dragEnabled || dropHandledRef.current) {
                return;
            }
            const dragEvent = event as DragEvent;
            dragEvent.preventDefault();
            // 兜底路径：用释放坐标即时刷新目标，保证位置精确
            updateDropIndicator(dragEvent.clientX);
            applyDrop();
            cleanupDrag();
        },
        [applyDrop, cleanupDrag, dragEnabled, updateDropIndicator],
    );

    const handleDragEnd = useCallback(() => {
        cleanupDrag();
    }, [cleanupDrag]);

    return {
        dragEnabled,
        draggingId,
        handleDragStart,
        handleDragEnter,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleDragEnd,
    };
};
