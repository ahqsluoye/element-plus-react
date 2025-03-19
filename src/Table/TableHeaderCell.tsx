import { useMount } from 'ahooks';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Checkbox } from '../Checkbox';
import { isEmpty, isNotEmpty } from '../Util';
import { useClassNames } from '../hooks';
import { NativeProps } from '../types/common';
import { TableBodyContext, TableContext, TableHeaderContext } from './TableContext';
import { useResize } from './hooks/useResize';
import { onCheck } from './hooks/useSelection';
import { mergeTreeData } from './treeUtil';
import { TableColumnCtx } from './typings';
import { getRowIdentity } from './util';

interface Props extends NativeProps {
    row: any;
    rowIndex: number;
    column: TableColumnCtx<any>;
    columnIndex: number;
    scheduleLayout: (needUpdateColumns?: boolean, immediate?: boolean) => void;
}

const TableHeaderCell = (p: Props) => {
    const { row, rowIndex, column, columnIndex, scheduleLayout, className, style } = p;
    const { data, props, setData, flattenColumns } = useContext(TableContext);
    const { sortProp, setSortProp, init } = useContext(TableHeaderContext);
    const { state, dispatch, initialData, sortedData, disabledRows, treeProps, treeNodes } = useContext(TableBodyContext);
    const { rowKey, headerCellClassName, headerCellStyle, onHeaderClick, onHeaderContextmenu, onSelectAll, onSelectionChange, selectOnIndeterminate, defaultSort, onSortChange } =
        props;
    const { e, is, bm } = useClassNames('table');

    const { handleMouseDown, handleMouseMove, handleMouseOut } = useResize(scheduleLayout);

    /** 是否启用排序 */
    const enableSort = useMemo(() => {
        if (column.sortable === true || column.sortable === 'custom') {
            return true;
        } else if (defaultSort?.prop && isNotEmpty(column.prop || column.name)) {
            return defaultSort.prop === (column.prop || column.name);
        }
        return false;
    }, [column.name, column.prop, column.sortable, defaultSort?.prop]);

    const sortOrders = useMemo<('ascending' | 'descending' | null)[]>(() => column?.sortOrders ?? ['ascending', 'descending', null], [column?.sortOrders]);
    const activeSort = useMemo(() => isNotEmpty(sortProp) && sortProp === (column.prop || column.name), [column.name, column.prop, sortProp]);

    const [order, setOrder] = useState<'ascending' | 'descending' | undefined | null>(() => (activeSort && !init.current ? defaultSort?.order : null));

    useEffect(() => {
        if (enableSort && init.current && !activeSort) {
            // 设置为最后一个排序，为了在下次点击时切换到第一个
            setOrder(sortOrders[sortOrders.length - 1]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortProp]);

    /** 全选点击事件 */
    const handleCheckAll = useCallback(
        (checked: boolean) => {
            let selected = [];
            const filterData = data.filter(
                item1 => !disabledRows.current.some(item2 => (rowKey ? getRowIdentity<any>(item1, rowKey) === getRowIdentity<any>(item2, rowKey) : isEqual(item1, item2))),
            );
            if (selectOnIndeterminate) {
                selected = checked ? filterData : [];
            } else {
                selected = state.selection.length > 0 ? [] : filterData;
            }
            dispatch(onCheck({ selection: selected, isIndeterminate: false }));
            onSelectAll?.(selected);
            onSelectionChange?.(selected);
        },
        [data, disabledRows, dispatch, onSelectAll, onSelectionChange, rowKey, selectOnIndeterminate, state.selection.length],
    );

    /** 排序 */
    const handleSort = useCallback(
        (_sort?: 'ascending' | 'descending' | null) => {
            if (column.sortable === 'custom' && sortProp && _sort) {
                const _data = onSortChange?.({ column, prop: sortProp, order: _sort });
                if (_data && _data instanceof Array) {
                    try {
                        setData(mergeTreeData(initialData.current, treeNodes.current, treeProps, rowKey));
                    } catch (error) {
                        // eslint-disable-next-line no-console
                        console.warn('warning： 返回的数据似乎有问题');
                    }
                } else {
                    // eslint-disable-next-line no-console
                    console.warn('warning： 返回的数据格式有问题');
                }
            } else if (column.sortMethod) {
                const _data = initialData.current.sort((a, b) => column.sortMethod(a, b));
                setData(mergeTreeData(_data, treeNodes.current, treeProps, rowKey));
            } else if (isEmpty(_sort)) {
                // 没有排序，恢复到原始顺序
                setData(mergeTreeData(initialData.current, treeNodes.current, treeProps, rowKey));
            } else {
                const _data = sortBy(initialData.current, column.sortBy ? column.sortBy : column.prop || column.name);
                sortedData.current = _sort === 'descending' ? _data.reverse() : _data;
                setData(mergeTreeData(sortedData.current, treeNodes.current, treeProps, rowKey));
            }
        },
        [column, sortProp, onSortChange, initialData, setData, treeNodes, treeProps, rowKey, sortedData],
    );

    useMount(() => {
        if (activeSort) {
            handleSort(order);
        }
    });

    /** 表头点击事件 */
    const handleHeaderClick = useCallback(
        (event: any) => {
            onHeaderClick?.(column, event);
            if (enableSort && order !== undefined) {
                let nextIndex = sortOrders.indexOf(order) + 1;
                nextIndex = nextIndex >= 3 ? 0 : nextIndex;
                setOrder(sortOrders[nextIndex]);
                if (!activeSort) {
                    setSortProp(column.prop || column.name);
                }
                init.current = true;
                handleSort(sortOrders[nextIndex]);
            }
        },
        [activeSort, column, enableSort, handleSort, init, onHeaderClick, order, setSortProp, sortOrders],
    );

    return (
        <th
            className={classNames(
                column.id,
                e`cell`,
                { [bm('column', 'selection')]: column.type === 'selection', [order]: activeSort },
                is(column.headerAlign || column.align, { leaf: column.isSubColumn, sortable: enableSort }),
                column.labelClassName,
                className,
                typeof headerCellClassName === 'function' ? headerCellClassName?.({ row, column, rowIndex, columnIndex }) : headerCellClassName,
            )}
            style={{ ...style, ...(typeof headerCellStyle === 'function' ? headerCellStyle?.({ row, column, rowIndex, columnIndex }) : headerCellStyle) }}
            colSpan={column.colSpan || 1}
            rowSpan={column.rowSpan || 1}
            onClick={handleHeaderClick}
            onContextMenu={event => onHeaderContextmenu?.(column, event)}
            onMouseDown={event =>
                handleMouseDown(
                    event,
                    flattenColumns.find(item => item.id === column.id),
                )
            }
            onMouseMove={event => handleMouseMove(event, column)}
            onMouseOut={handleMouseOut}
        >
            <div className={e`cell-content`}>
                {(() => {
                    if (data.length > 0 && column.type === 'selection') {
                        return (
                            <Checkbox
                                disabled={disabledRows.current?.length === data.length}
                                checked={state.selection?.length > 0 && state.selection?.length + disabledRows.current?.length === data.length}
                                indeterminate={state.selection?.length > 0 && state.isIndeterminate}
                                onChange={checked => handleCheckAll(checked)}
                            />
                        );
                    } else {
                        return (
                            <>
                                {column.label}
                                {enableSort && (
                                    <span className="caret-wrapper">
                                        <i className="sort-caret ascending" />
                                        <i className="sort-caret descending" />
                                    </span>
                                )}
                            </>
                        );
                    }
                })()}
            </div>
        </th>
    );
};

export default TableHeaderCell;
