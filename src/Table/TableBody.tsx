import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import isObject from 'lodash/isObject';
import some from 'lodash/some';
import React, { useCallback, useContext, useEffect, useMemo, useRef } from 'react';
// import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { useClassNames } from '../hooks';
import TableCell from './TableCell';
import { TableBodyContext, TableContext } from './TableContext';
import { TableColumnCtx } from './typings';
import { getRowIdentity } from './util';

const TableBody = () => {
    const { data, /* setData, */ props, tableId, flattenColumns, fixedLeftColumns, fixedRightColumns } = useContext(TableContext);
    const { state, oldActiveRow, treeProps } = useContext(TableBodyContext);
    const { stripe, rowClassName, rowStyle, onCurrentChange, highlightCurrentRow, currentRowKey, rowKey, onDragChange, spanMethod } = props;
    const { e, em, bm, is } = useClassNames('table');

    const tbodyRef = useRef<HTMLTableSectionElement>(null);
    const rowRef = useRef<Record<number, HTMLTableRowElement>>({});
    const mergeAreaRef = useRef<[number, number, number, number][]>([]);

    useEffect(() => {
        if (
            currentRowKey && state.currentRow && oldActiveRow.current
                ? getRowIdentity(state.currentRow, currentRowKey + '') === getRowIdentity(oldActiveRow.current, currentRowKey + '')
                : !isEqual(state.currentRow, oldActiveRow.current)
        ) {
            onCurrentChange?.(state.currentRow, oldActiveRow.current);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.currentRow, onCurrentChange]);

    useEffect(() => {
        mergeAreaRef.current = [];
    }, [data]);

    const middleColumns = useMemo(
        () => flattenColumns.filter(item => !some([...fixedLeftColumns, ...fixedRightColumns], { id: item.id })),
        [fixedLeftColumns, fixedRightColumns, flattenColumns],
    );

    const isTreeTalbe = useMemo(
        () => props.data.some(item => treeProps.children in item || treeProps.hasChildren in item),
        [props.data, treeProps.children, treeProps.hasChildren],
    );

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
                    ref={ref => (rowRef.current[rowIndex] = ref)}
                    className={classNames(
                        e`row`,
                        { [em('row', 'striped')]: stripe && rowIndex % 2 === 1, 'current-row': highlightCurrentRow && isEqual(row, state.currentRow) },
                        typeof rowClassName === 'string' ? rowClassName : rowClassName?.({ row, rowIndex }),
                        { [em('row', `level-${row.level ?? 0}`)]: row.level > 0 || (row.level === 0 && (row[treeProps.children] || row[treeProps.hasChildren])) },
                    )}
                    style={{
                        display: rowKey && isTreeTalbe && !row.display ? 'none' : '',
                        ...(typeof rowStyle === 'function' ? rowStyle?.({ row: row, rowIndex }) : rowStyle),
                    }}
                    key={`${tableId}_${rowIndex}`}
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

                    {fixedRightColumns.map(column => {
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
                                    className={classNames(bm('fixed-column', 'right'), is({ 'first-column': columnIndex === 0 }))}
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
            e,
            em,
            fixedLeftColumns,
            fixedRightColumns,
            highlightCurrentRow,
            is,
            isMerge,
            isTreeTalbe,
            middleColumns,
            rowClassName,
            rowKey,
            rowStyle,
            state.currentRow,
            stripe,
            tableId,
            treeProps.children,
            treeProps.hasChildren,
        ],
    );

    /** 排序结束后回调 */
    // const onSortItems = useCallback(
    //     ({ oldIndex, newIndex }) => {
    //         const result = arrayMove(cloneDeep(data), oldIndex, newIndex);
    //         if (!isEqual(data, result)) {
    //             setData(result);
    //             onDragChange?.(result);
    //         }
    //     },
    //     [data, onDragChange, setData],
    // );

    // const isSortTable = useMemo(
    //     () => [...flattenColumns, ...fixedLeftColumns, ...fixedRightColumns].some(item => item.type === 'drag'),
    //     [fixedLeftColumns, fixedRightColumns, flattenColumns],
    // );

    // /** 拖拽容器 */
    // const Sortable = useMemo(() => {
    //     return SortableContainer(({ children }) => <tbody ref={tbodyRef}>{children}</tbody>);
    // }, []);

    // /** 拖拽项 */
    // const ListItem = useMemo(() => {
    //     return SortableElement(({ item: row, rowIndex }) => renderTr(row, rowIndex));
    // }, [renderTr]);

    // return isSortTable ? (
    //     // @ts-ignore
    //     <Sortable
    //         axis="y"
    //         helperClass="r-sort-placeholder"
    //         useDragHandle
    //         helperContainer={() => tbodyRef.current}
    //         onSortEnd={onSortItems}
    //         onSortStart={(_, event) => event.preventDefault()}
    //     >
    //         {data.map((row, rowIndex) => (
    //             // @ts-ignore
    //             <ListItem index={rowIndex} key={`${tableId}_${rowIndex}`} item={row} rowIndex={rowIndex} />
    //         ))}
    //     </Sortable>
    // ) : (
    // );
    return <tbody ref={tbodyRef}>{data.map(renderTr)}</tbody>;
};

TableBody.displayName = 'TableBody';
export default TableBody;
