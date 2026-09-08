import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import isObject from 'lodash/isObject';
import some from 'lodash/some';
import React, { use, useCallback, useEffect, useMemo, useRef } from 'react';
import TableCell from './TableCell';
import { TableBodyContext, TableContext } from './TableContext';
import { useRowDrag } from './hooks/useRowDrag';
import { TableColumnCtx } from './typings';
import { getRowIdentity } from './util';

const TableBody = () => {
    const { data, /* setData, */ props, tableId, flattenColumns, fixedLeftColumns, fixedRightColumns } = use(TableContext);
    const { state, oldActiveRow, treeProps } = use(TableBodyContext);
    const { stripe, rowClassName, rowStyle, onCurrentChange, highlightCurrentRow, currentRowKey, rowKey, spanMethod, rowSortEnabled } = props;
    const { e, em, bm, is } = useClassNames('table');

    const tbodyRef = useRef<HTMLTableSectionElement>(null);
    const rowRef = useRef<Record<number, HTMLTableRowElement>>({});
    const mergeAreaRef = useRef<[number, number, number, number][]>([]);

    const { rowDragEnabled, handleOnly, draggingIndex, tbodyDragHandlers, applyFlipAfterReorder } = useRowDrag({ tbodyRef, rowRef });

    /** 数据变化后播放行拖拽排序的 FLIP 位移动画（无快照时为 no-op） */
    useEffect(() => {
        applyFlipAfterReorder();
    }, [data, applyFlipAfterReorder]);

    useEffect(() => {
        if (
            currentRowKey && state.currentRow && oldActiveRow.current
                ? getRowIdentity(state.currentRow, currentRowKey + '') === getRowIdentity(oldActiveRow.current, currentRowKey + '')
                : !isEqual(state.currentRow, oldActiveRow.current)
        ) {
            onCurrentChange?.(state.currentRow, oldActiveRow.current);
        }
    }, [state.currentRow, onCurrentChange]);

    useEffect(() => {
        mergeAreaRef.current = [];
    }, [data]);

    const middleColumns = useMemo(
        () => flattenColumns.filter(item => !some([...fixedLeftColumns, ...fixedRightColumns], { id: item.id })),
        [fixedLeftColumns, fixedRightColumns, flattenColumns],
    );

    const isTreeTalbe = useMemo(() => data.some(item => treeProps.children in item || treeProps.hasChildren in item), [data, treeProps.children, treeProps.hasChildren]);

    // useEffect(() => {
    //     if (rowKey && isTreeTalbe && !defaultExpandAll) {
    //         hiddenRows.current = {};
    //         data.forEach(item => {
    //             if (item?.level > 0) {
    //                 hiddenRows.current[getRowIdentity(item, rowKey)] = true;
    //             }
    //         });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [data]);

    /** 获取合并单元格元数据 */
    const getSpans = useCallback(
        (row: any, rowIndex: number, column: TableColumnCtx<any>, columnIndex: number) => {
            if (spanMethod) {
                const result = spanMethod?.({ row, column, rowIndex, columnIndex });
                if (result instanceof Array && result.length > 0) {
                    return { rowSpan: result[0] || 1, colSpan: result?.[1] || 1 };
                } else if (isObject(result)) {
                    return { rowSpan: result['rowspan'] || 1, colSpan: result['colspan'] || 1 };
                }
            }
            return { rowSpan: row.rowSpan || 1, colSpan: row.colSpan || 1 };
        },
        [spanMethod],
    );

    /** 是否在合并单元格范围内 */
    const isMerge = useCallback(
        (row: any, rowIndex: number, column: TableColumnCtx<any>, columnIndex: number) => {
            let display = true;
            const { rowSpan, colSpan } = getSpans(row, rowIndex, column, columnIndex);
            if (rowSpan > 1 || colSpan > 1) {
                mergeAreaRef.current.push([rowIndex, columnIndex, rowIndex + rowSpan - 1, columnIndex + colSpan - 1]);
            }
            mergeAreaRef.current.forEach(item => {
                if (rowIndex >= item[0] && rowIndex <= item[2] && columnIndex >= item[1] && columnIndex <= item[3]) {
                    if (rowIndex === item[0] && columnIndex === item[1]) {
                        display = true;
                    } else {
                        display = false;
                    }
                }
            });
            return { rowSpan, colSpan, display };
        },
        [getSpans],
    );

    const renderTr = useCallback(
        (row: any, rowIndex: number) => {
            let columnIndex = -1;
            return (
                <tr
                    ref={ref => {
                        rowRef.current[rowIndex] = ref;
                    }}
                    data-row-index={rowIndex}
                    draggable={rowDragEnabled && !handleOnly ? true : undefined}
                    className={classNames(
                        e`row`,
                        { [em('row', 'striped')]: stripe && rowIndex % 2 === 1, 'current-row': highlightCurrentRow && isEqual(row, state.currentRow) },
                        typeof rowClassName === 'string' ? rowClassName : rowClassName?.({ row, rowIndex }),
                        { [em('row', `level-${row.level ?? 0}`)]: row.level > 0 || (row.level === 0 && (row[treeProps.children] || row[treeProps.hasChildren])) },
                        { 'is-dragging': draggingIndex === rowIndex },
                    )}
                    style={{
                        display: rowKey && isTreeTalbe && !row.display ? 'none' : '',
                        ...(typeof rowStyle === 'function' ? rowStyle?.({ row: row, rowIndex }) : rowStyle),
                    }}
                    // 行拖拽开启且提供 rowKey 时使用稳定 key，React 才会移动 DOM 节点（FLIP 动画的前提）
                    key={rowSortEnabled && rowKey ? `${tableId}_${getRowIdentity(row, rowKey)}` : `${tableId}_${rowIndex}`}
                >
                    {fixedLeftColumns.map(column => {
                        columnIndex++;
                        const { rowSpan, colSpan, display } = isMerge(row, rowIndex, column, columnIndex);
                        return (
                            display && (
                                <TableCell
                                    row={row}
                                    rowIndex={rowIndex}
                                    column={{ ...column, level: row.level }}
                                    columnIndex={columnIndex}
                                    rowSpan={rowSpan}
                                    colSpan={colSpan}
                                    className={classNames(bm('fixed-column', 'left'), is({ 'last-column': columnIndex === fixedLeftColumns.length - 1 }))}
                                    rowRef={rowRef}
                                    style={{ left: column.offsetWidth }}
                                    key={`${tableId}_${rowIndex}_${column.id}`}
                                />
                            )
                        );
                    })}

                    {middleColumns.map(column => {
                        columnIndex++;
                        const { rowSpan, colSpan, display } = isMerge(row, rowIndex, column, columnIndex);
                        return (
                            display && (
                                <TableCell
                                    row={row}
                                    rowIndex={rowIndex}
                                    column={{ ...column, level: row.level }}
                                    columnIndex={columnIndex}
                                    rowSpan={rowSpan}
                                    colSpan={colSpan}
                                    key={`${tableId}_${rowIndex}_${column.id}`}
                                    rowRef={rowRef}
                                />
                            )
                        );
                    })}

                    {fixedRightColumns.map((column, index) => {
                        columnIndex++;
                        const { rowSpan, colSpan, display } = isMerge(row, rowIndex, column, columnIndex);
                        return (
                            display && (
                                <TableCell
                                    row={row}
                                    rowIndex={rowIndex}
                                    column={{ ...column, level: row.level }}
                                    columnIndex={columnIndex}
                                    rowRef={rowRef}
                                    rowSpan={rowSpan}
                                    colSpan={colSpan}
                                    className={classNames(bm('fixed-column', 'right'), is({ 'first-column': index === 0 }))}
                                    style={{ right: column.offsetWidth }}
                                    key={`${tableId}_${rowIndex}_${column.id}`}
                                />
                            )
                        );
                    })}
                </tr>
            );
        },
        [
            bm,
            draggingIndex,
            e,
            em,
            fixedLeftColumns,
            fixedRightColumns,
            handleOnly,
            highlightCurrentRow,
            is,
            isMerge,
            isTreeTalbe,
            middleColumns,
            rowClassName,
            rowDragEnabled,
            rowKey,
            rowSortEnabled,
            rowStyle,
            state.currentRow,
            stripe,
            tableId,
            treeProps.children,
            treeProps.hasChildren,
        ],
    );

    return (
        <tbody ref={tbodyRef} {...tbodyDragHandlers}>
            {data.map(renderTr)}
        </tbody>
    );
};

TableBody.displayName = 'TableBody';
export default TableBody;
