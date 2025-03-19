/* eslint-disable indent */
import { useDebounceFn } from 'ahooks';
import cloneDeep from 'lodash/cloneDeep';
import React, { Children, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { isNotEmpty } from '../../Util';
import { useChildrenInstance } from '../../hooks';
import { flatTreeData } from '../treeUtil';
import { TableColumnCtx, TableColumnProps, TableProps, TableRefs, TreeNode } from '../typings';
import { TableIdManager, getRowIdentity } from '../util';

/**
 * @author	Parker
 * @CreateTime	2022/9/11 12:24:23
 * @LastEditor	Parker
 * @LastEditor	Parker
 * @ModifyTime	2022/11/19 23:23:42
 */
export const useTable = <T extends object>(props: TableProps<T>, refs: TableRefs, tableId: string) => {
    const getChildren = useChildrenInstance<TableColumnProps<T>>('TableColumn');
    const _children = getChildren(props.children);

    const maxLevel = useRef<number>(0);
    const flatColumns = useRef<TableColumnCtx<T>[][]>([]);
    // 表格宽度
    const oldBodyWidth = useRef(400);
    const bodyWidth = useRef(400);
    const scrollX = useRef(false);
    const initialData = useRef<T[]>([]);
    const sortedData = useRef<T[]>([]);
    const isTree = useRef<boolean>(false);
    const treeNodes = useRef<TreeNode[]>([]);

    const [data, setData] = useState<T[]>([]);

    const treeProps = useMemo(() => {
        return { hasChildren: 'hasChildren', children: 'children', ...(props.treeProps ?? {}) };
    }, [props.treeProps]);

    useEffect(() => {
        isTree.current = props.rowKey && props.data.some(item => treeProps.children in item || treeProps.hasChildren in item);
        sortedData.current = initialData.current = cloneDeep(props.data);

        if (isTree.current) {
            const _data = flatTreeData(cloneDeep(props.data), treeProps, props.rowKey, props.defaultExpandAll, props.expandRowKeys);
            treeNodes.current = _data.map(item => {
                const { parentId, expanded, loading, display, level, noLazyChildren, indent } = item;
                const id = getRowIdentity(item, props.rowKey);
                return { id, parentId, expanded, loading, display, level, noLazyChildren, indent };
            });
            setData(_data);
        } else {
            setData(props.data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.data]);

    // 多级列
    const [columns, setColumns] = useState<TableColumnCtx<T>[][]>([]);
    // 最后一级列
    const [flattenColumns, setFlattenColumns] = useState<TableColumnCtx<T>[]>([]);
    // 固定列
    // const [fixedColumns, setFixedColumns] = useState<TableColumnCtx<T>[]>([]);
    // 左固定列
    const [fixedLeftColumns, setFixedLeftColumns] = useState<TableColumnCtx<T>[]>([]);
    // 右固定列
    const [fixedRightColumns, setFixedRightColumns] = useState<TableColumnCtx<T>[]>([]);
    // 是否组合列
    const [isGroup, setIsGroup] = useState(false);

    /** 初始化列 */
    const initColumns = useCallback(
        (cols: TableProps<T>['children'], level = 0): TableColumnCtx<T>[] => {
            return Children.map(cols, item => {
                if (level > maxLevel.current) {
                    maxLevel.current = level;
                }

                let children: TableColumnCtx<T>[] = [],
                    renderCell: TableColumnCtx<T>['renderCell'];
                if (item.props?.children) {
                    if (item.props.children instanceof Function) {
                        renderCell = item.props.children as unknown as TableColumnCtx<T>['renderCell'];
                    } else {
                        const _columns = getChildren(item.props.children);
                        if (_columns.length > 0) {
                            children = initColumns(item.props.children as React.ReactElement<TableColumnProps<T>>[], level + 1);
                        } else {
                            renderCell = (() => item.props.children) as unknown as TableColumnCtx<T>['renderCell'];
                        }
                    }
                }

                const column: TableColumnCtx<T> = {
                    ...item.props,
                    id: tableId + '_' + TableIdManager.nextColumnId(),
                    children,
                    level,
                    colSpan:
                        children.length > 0
                            ? children.reduce<number>((prev, child) => {
                                  const len = child?.children?.length ?? 1;
                                  return prev + (len >= 1 ? len : 1);
                              }, 0)
                            : 1,
                    isColumnGroup: children.length > 0,
                    isSubColumn: children.length === 0,
                    renderCell,
                    width: item.props?.type === 'expand' ? item.props?.width ?? 48 : item.props?.width,
                    align: ['index', 'selection', 'expand'].includes(item.props?.type) ? item.props?.align ?? 'center' : item.props?.align ?? 'left',
                    resizable: item.props?.type === 'expand' ? false : item.props?.resizable,
                };
                return column;
            }).filter(item => item !== null);
        },
        [getChildren, tableId],
    );

    /** 分组列 */
    const groupColumns = useCallback((cols: TableColumnCtx<T>[], level = 0): TableColumnCtx<T>[] => {
        return cols.map(item => {
            if (!flatColumns.current[level]) {
                flatColumns.current[level] = [];
            }

            let children: TableColumnCtx<T>[] = [];
            if (item.children) {
                children = groupColumns(item.children, level + 1);
            }

            const column: TableColumnCtx<T> = { ...item, children, rowSpan: children.length > 0 ? 1 : maxLevel.current - level + 1 };
            flatColumns.current[level].push(column);

            return column;
        });
    }, []);

    const getFlattenColumns = useCallback(
        (immediate = true) => {
            const result: TableColumnCtx<T>[] = [];
            columns.forEach(row => {
                row.forEach(col => {
                    if (col.isSubColumn) {
                        const find = flattenColumns.find(item => item.id === col.id);
                        if (find && immediate) {
                            // 表格重新布局后，同步下自定义宽度
                            col = ['width', 'minWidth', 'realWidth'].reduce((prev, item) => {
                                if (find[item]) {
                                    return { ...prev, [item]: find[item] };
                                }
                                return prev;
                            }, col);
                            result.push(col);
                        } else {
                            result.push(col);
                        }
                    }
                });
            });
            return result;
        },
        [columns, flattenColumns],
    );

    const getFixedColumns = useCallback(() => {
        const fixed: TableColumnCtx<T>[] = [];
        const fixedLeft: TableColumnCtx<T>[] = [];
        const fixedRight: TableColumnCtx<T>[] = [];
        const dataColumns: TableColumnCtx<T>[] = getFlattenColumns();

        dataColumns.forEach(item => {
            if (item.level === 0 && item.isSubColumn) {
                if (item.fixed === true || item.fixed === 'left') {
                    fixed.push(item);
                    fixedLeft.push(item);
                } else if (item.fixed === 'right') {
                    fixedRight.push(item);
                }
            }
        });
        return {
            fixed,
            fixedLeft,
            fixedRight,
        };
    }, [getFlattenColumns]);

    const setbodyWidth = useCallback(
        (width: number) => {
            if (width > 0 && oldBodyWidth.current !== width) {
                oldBodyWidth.current = bodyWidth.current;
                bodyWidth.current = width;
                if (refs.tableHeader.current) {
                    refs.tableHeader.current.style.width = width + 'px';
                }
                if (refs.tableBody.current) {
                    refs.tableBody.current.style.width = width + 'px';
                }
                // if (refs.emptyBlock.current) {
                //     refs.emptyBlock.current.style.width = width + 'px';
                // }
            }
        },
        [refs.tableBody, refs.tableHeader],
    );

    const updateColumnsWidth = useCallback(
        (immediate = true) => {
            const { fit } = props;
            let bodyMinWidth = 0;
            const _bodyWidth = refs.tableWrapper.current?.clientWidth || 0;

            const dataColumns: TableColumnCtx<T>[] = getFlattenColumns(immediate);
            const flexColumns = dataColumns.filter(column => typeof column.width !== 'number');
            dataColumns.forEach(column => {
                // Clean those columns whose width changed from flex to unflex
                if (typeof column.width === 'number' && column.realWidth) {
                    column.realWidth = undefined;
                }
            });

            if (flexColumns.length > 0 && fit) {
                dataColumns.forEach(column => {
                    bodyMinWidth += Number(column.width || column.minWidth || 80);
                });
                if (bodyMinWidth <= _bodyWidth) {
                    // DON'T HAVE SCROLL BAR
                    scrollX.current = false;

                    const totalFlexWidth = _bodyWidth - bodyMinWidth;

                    if (flexColumns.length === 1) {
                        flexColumns[0].realWidth = Number(flexColumns[0].minWidth || 80) + totalFlexWidth;
                    } else {
                        const allColumnsWidth = flexColumns.reduce((prev, column) => prev + Number(column.minWidth || 80), 0);
                        const flexWidthPerPixel = totalFlexWidth / allColumnsWidth;
                        let noneFirstWidth = 0;

                        flexColumns.forEach((column, index) => {
                            if (index === 0) {
                                return;
                            }
                            const flexWidth = Math.floor(Number(column.minWidth || 80) * flexWidthPerPixel);
                            noneFirstWidth += flexWidth;
                            column.realWidth = Number(column.minWidth || 80) + flexWidth;
                        });

                        flexColumns[0].realWidth = Number(flexColumns[0].minWidth || 80) + totalFlexWidth - noneFirstWidth;
                    }
                } else {
                    // HAVE HORIZONTAL SCROLL BAR
                    scrollX.current = true;
                    flexColumns.forEach(column => {
                        column.realWidth = Number(column.minWidth || 80);
                    });
                }

                setbodyWidth(Math.max(bodyMinWidth, _bodyWidth));
                // this.table.state.resizeState.value.width = this.bodyWidth.value;
            } else {
                dataColumns.forEach(column => {
                    if (!column.width && !column.minWidth) {
                        column.realWidth = 80;
                    } else {
                        column.realWidth = Number(column.width || column.minWidth);
                    }
                    bodyMinWidth += column.realWidth;
                });
                scrollX.current = bodyMinWidth > _bodyWidth;
                setbodyWidth(bodyMinWidth);
            }

            const { /* fixed,  */ fixedLeft, fixedRight } = getFixedColumns();

            // if (fixedLeftColumns.length > 0) {
            //     setFixedColumns(fixed);
            // }

            if (fixedLeft.length > 0) {
                let fixedWidth = 0;
                setFixedLeftColumns(
                    fixedLeft.map(column => {
                        column.offsetWidth = fixedWidth;
                        fixedWidth += Number(column.realWidth || column.width);
                        return column;
                    }),
                );

                // this.fixedWidth.value = fixedWidth;
            }

            if (fixedRight.length > 0) {
                let rightFixedWidth = 0;
                setFixedRightColumns(
                    fixedRight
                        .reverse()
                        .map(column => {
                            column.offsetWidth = rightFixedWidth;
                            rightFixedWidth += Number(column.realWidth || column.width);
                            return column;
                        })
                        .reverse(),
                );

                // this.rightFixedWidth.value = rightFixedWidth;
            }

            setFlattenColumns(dataColumns);
        },
        [getFixedColumns, getFlattenColumns, props, refs.tableWrapper, setbodyWidth],
    );

    // // 更新列
    // const updateColumns = () => {
    //     const fixedColumns = flattenColumns.filter(item => item.fixed === true || item.fixed === 'left');
    //     const rightFixedColumns = flattenColumns.filter(column => column.fixed === 'right');
    //     if (fixedColumns.length > 0 && flattenColumns[0] && flattenColumns[0].type === 'selection' && !flattenColumns[0].fixed) {
    //         flattenColumns[0].fixed = true;
    //         fixedColumns.unshift(flattenColumns[0]);
    //     }

    //     const notFixedColumns = flattenColumns.filter(column => !column.fixed);
    //     const originColumns = [].concat(fixedColumns).concat(notFixedColumns).concat(rightFixedColumns);
    //     const leafColumns = doFlattenColumns(notFixedColumns);
    //     const fixedLeafColumns = doFlattenColumns(fixedColumns);
    //     const rightFixedLeafColumns = doFlattenColumns(rightFixedColumns);

    //     const leafColumnsLength = leafColumns.length;
    //     const fixedLeafColumnsLength = fixedLeafColumns.length;
    //     const rightFixedLeafColumnsLength = rightFixedLeafColumns.length;

    //     setFlattenColumns([].concat(fixedLeafColumns).concat(leafColumns).concat(rightFixedLeafColumns));
    //     // isComplex = fixedColumns.length > 0 || rightFixedColumns.length > 0;
    // };

    const setScrollClassByEl = (el: HTMLElement, className: string) => {
        if (!el) {
            return;
        }
        const classList = Array.from(el.classList).filter(item => !item.startsWith('is-scrolling-'));
        classList.push(scrollX.current ? className : 'is-scrolling-none');
        classList.push(className);
        el.className = classList.join(' ');
    };
    const setScrollClass = (className: string) => {
        const { tableWrapper } = refs;
        if (tableWrapper.current) {
            setScrollClassByEl(tableWrapper.current, className);
        }
    };
    const hasScrollClass = (className: string) => {
        const { tableWrapper } = refs;
        return !!(tableWrapper.current && tableWrapper.current.classList.contains(className));
    };

    const syncPosition = function () {
        if (!refs.scrollBarRef.current) {
            return;
        }
        if (!scrollX.current) {
            const scrollingNoneClass = 'is-scrolling-none';
            if (!hasScrollClass(scrollingNoneClass)) {
                setScrollClass(scrollingNoneClass);
            }
            return;
        }
        const scrollContainer = refs.scrollBarRef.current.wrapRef;
        if (!scrollContainer.current) {
            return;
        }
        const { scrollLeft, offsetWidth, scrollWidth } = scrollContainer.current;
        const { headerWrapper, footerWrapper } = refs;
        if (headerWrapper.current) {
            headerWrapper.current.scrollLeft = scrollLeft;
        }
        if (footerWrapper.current) {
            footerWrapper.current.scrollLeft = scrollLeft;
        }
        const maxScrollLeftPosition = scrollWidth - offsetWidth - 1;
        if (scrollLeft >= maxScrollLeftPosition) {
            setScrollClass('is-scrolling-right');
        } else if (scrollLeft === 0) {
            setScrollClass('is-scrolling-left');
        } else {
            setScrollClass('is-scrolling-middle');
        }
    };

    /**
     * 更新 DOM
     * @param immediate 是否立即更新
     * @returns
     */
    const scheduleLayout = (/* needUpdateColumns?: boolean, */ immediate = true) => {
        if (refs.tableWrapper.current?.clientWidth === 0) {
            return;
        }
        updateColumnsWidth(immediate);
        requestAnimationFrame(syncPosition);
        // if (needUpdateColumns) {
        //     updateColumns();
        // }
        // if (immediate) {
        //     instance.state.doLayout();
        // } else {
        //     instance.state.debouncedUpdateLayout();
        // }
    };

    const { run } = useDebounceFn(
        () => {
            scheduleLayout();
        },
        {
            wait: 200,
        },
    );

    window.addEventListener('resize', run);

    useEffect(() => {
        if (refs.tableWrapper.current?.clientWidth === 0) {
            // warning(false, '表格宽度为0，无法初始化，如果表格所在的容器是懒加载，请忽略此消息！');
            return;
        }
        TableIdManager.columnId = 0;
        const children = getChildren(props.children);
        const _columns = initColumns(children);
        groupColumns(_columns);
        setColumns(flatColumns.current);
        setIsGroup(flatColumns.current.length > 1);
        flatColumns.current = [];
        // requestAnimationFrame(scheduleLayout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.children]);

    useEffect(() => {
        scheduleLayout();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [columns]);

    const treeExpandCell = useMemo(() => {
        let dataColumns: TableColumnCtx<T>[] = [];
        if (fixedLeftColumns.length > 0) {
            dataColumns = fixedLeftColumns.filter(item => !['index', 'selection', 'expand'].includes(item.type));
        }
        if (dataColumns.length === 0) {
            dataColumns = flattenColumns.filter(item => !['index', 'selection', 'expand'].includes(item.type));
        }
        return dataColumns.length > 0 ? dataColumns[0] : undefined;
    }, [fixedLeftColumns, flattenColumns]);

    const isTreeTable = useCallback(() => isTree.current === true, []);

    const isTreeExpandCell = useCallback(
        (id: string) => {
            if (isTreeTable() && isNotEmpty(props.rowKey) && treeExpandCell) {
                return treeExpandCell.id === id;
            }
            return false;
        },
        [isTreeTable, props.rowKey, treeExpandCell],
    );

    return {
        data,
        setData,
        _children,
        columns,
        flattenColumns,
        // fixedColumns,
        fixedLeftColumns,
        fixedRightColumns,
        isGroup,
        bodyWidth,
        maxLevel,
        scheduleLayout,
        setScrollClass,
        syncPosition,
        initialData,
        sortedData,
        treeNodes,
        treeProps,
        isTreeTable,
        isTreeExpandCell,
    };
};
