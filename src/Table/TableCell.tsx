import classNames from 'classnames';
import { addClass, hasClass, removeClass } from 'dom-lib';
import isEqual from 'lodash/isEqual';
import last from 'lodash/last';
import omit from 'lodash/omit';
import some from 'lodash/some';
import uniqWith from 'lodash/uniqWith';
import words from 'lodash/words';
import React, { RefObject, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Root, createRoot } from 'react-dom/client';
// import { SortableHandle } from 'react-sortable-hoc';
import { Checkbox } from '../Checkbox';
import { Icon } from '../Icon';
import { TooltipRef } from '../Tooltip/typings';
import { isEmpty, isNotEmpty } from '../Util';
import { useClassNames, useUpdateEffect } from '../hooks';
import { TableBodyContext, TableContext } from './TableContext';
import { activeRow, onCheck } from './hooks/useSelection';
import { addTreeChildren, getAllChildren, mergeTreeData } from './treeUtil';
import { TableColumnCtx, TreeNode } from './typings';
import { createTablePopper, getRowIdentity, getRowIndex, getStyle, insertAfter } from './util';

interface Props {
    row: any;
    rowIndex: number;
    column: TableColumnCtx<any>;
    columnIndex: number;
    className?: string;
    rowRef: RefObject<Record<number, HTMLTableRowElement>>;
    style?: React.CSSProperties;
    rowSpan?: number;
    colSpan?: number;
}

const TableCell = (p: Props) => {
    const { row, column, columnIndex, className = '', style = {}, rowSpan = 1, colSpan = 1 } = p;
    const { data, setData, props, tableRefs, flattenColumns } = useContext(TableContext);
    const { state, dispatch, disabledRows, isTreeExpandCell, treeProps, treeNodes, initialData, sortedData } = useContext(TableBodyContext);
    const {
        cellClassName,
        cellStyle,
        onSelect,
        onSelectionChange,
        onCellMouseEnter,
        onCellMouseLeave,
        onCellClick,
        onCellDblclick,
        onCellContextmenu,
        onRowClick,
        onRowContextmenu,
        onRowDblclick,
        expandable = () => Promise.resolve(true),
        onExpandChange,
        hideIconOnNotExpand,
        highlightCurrentRow,
        onCurrentChange,
        tableLayout,
        rowHeight,
        rowKey,
        indent = 16,
        lazy,
        load,
    } = props;
    const { b, bm, e, em, is } = useClassNames('table');

    const expand = useRef(false);
    const trRef = useRef<HTMLTableRowElement | null>(null);
    const tdRef = useRef<HTMLTableCellElement | null>(null);
    const expandCell = useRef<HTMLDivElement | null>(null);
    // 树形表格开始展开/折叠行树，为了保证递归展开/折叠行时不重复执行
    const startRowIndex = useRef<number>();
    const nextRow = useRef<HTMLTableRowElement>(null);
    const rootRef = useRef<Root | null>(null);
    const tooltipRef = useRef<TooltipRef>(null);
    // 懒加载
    const [loading, setLoading] = useState(false);

    /** 鼠标悬浮单元格事件 */
    const handleCellMouseEnter = useCallback(
        (_row: any, _column: TableColumnCtx<any>, event: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => {
            onCellMouseEnter?.(_row, _column, event.currentTarget, event);
            if (!['index', 'selection'].includes(_column?.type || '') && column.showOverflowTooltip) {
                const cell = event.currentTarget as HTMLElement;
                const cellChild = (event.currentTarget as HTMLElement).querySelector('.' + e`cell-content`) as HTMLElement;
                const range = document.createRange();
                range.setStart(cellChild, 0);
                range.setEnd(cellChild, cellChild.childNodes.length);
                const rangeWidth = range.getBoundingClientRect().width;
                const padding = (Number.parseInt(getStyle(cellChild, 'paddingLeft'), 10) || 0) + (Number.parseInt(getStyle(cellChild, 'paddingRight'), 10) || 0);
                if (rangeWidth + padding > cellChild.offsetWidth || cellChild.scrollWidth > cellChild.offsetWidth) {
                    // tableRefs.tableWrapper.current && console.log(tableRefs.tableWrapper.current.getBoundingClientRect());
                    tableRefs.tableWrapper.current &&
                        createTablePopper(
                            tableRefs.tableWrapper.current,
                            // {
                            //     getBoundingClientRect: tableRefs.tableWrapper.current.getBoundingClientRect(),
                            // },
                            cell,
                            cell.innerText || cell.textContent || '',
                            tooltipRef,
                        );
                }
            }
        },
        [column.showOverflowTooltip, e, onCellMouseEnter, tableRefs.tableWrapper],
    );

    const rowIndex = useMemo(() => getRowIndex(column.index, p.rowIndex, row), [column.index, p.rowIndex, row]);
    const disabled = useMemo(() => column.type === 'selection' && column?.selectable?.(row, rowIndex) === false, [column, row, rowIndex]);

    /** 选中行事件 */
    const handleCheck = useCallback(
        (checked: boolean, _row: any) => {
            const allChildren = getAllChildren([_row], treeProps, rowKey).filter(item => column.type === 'selection' && column?.selectable?.(item, rowIndex) !== false);
            let selectedRows: any[] = JSON.parse(JSON.stringify(state.selection));
            allChildren.forEach(item => {
                if (checked) {
                    selectedRows.push(item);
                } else {
                    selectedRows = selectedRows?.filter((item1: any) => (rowKey ? getRowIdentity(item, rowKey) !== getRowIdentity(item1, rowKey) : !isEqual(item, item1)));
                }
            });
            dispatch(onCheck({ isIndeterminate: selectedRows?.length > 0 && selectedRows?.length + disabledRows.current?.length !== data.length, selection: selectedRows }));
            onSelect?.(selectedRows, _row);
            onSelectionChange?.(selectedRows);
        },
        [treeProps, rowKey, state.selection, dispatch, disabledRows, data.length, onSelect, onSelectionChange, column, rowIndex],
    );

    const getCellStyle = useCallback(
        (_column: TableColumnCtx<any>) => {
            const res: React.CSSProperties = {};
            if (rowHeight && typeof rowHeight === 'number') {
                Object.assign(res, { height: rowHeight });
            }
            if (tableLayout === 'fixed' && _column.showOverflowTooltip) {
                Object.assign(res, { width: (column.width || column.realWidth || column.minWidth || 80) - 1 });
            }
            return res;
        },
        [column.minWidth, column.realWidth, column.width, rowHeight, tableLayout],
    );

    /** 获取树形表格行层级 */
    const getLevel = useCallback(
        (div: HTMLDivElement) => {
            if (div) {
                const pattern = new RegExp(em('row', 'level-'));
                const levelClassName = Array.from(div.classList).find(item => pattern.test(item));
                if (levelClassName) {
                    const _level = parseFloat(last(words(levelClassName)));
                    if (!isNaN(_level)) {
                        return _level;
                    }
                }
            }
            return 0;
        },
        [em],
    );

    /**
     * 展开或折叠树形表格行
     * @param nextRow 下一行表格tr
     * @param level 树层级
     * @param willExpand 展开或折叠
     */
    const expandOrCollapseTreeRow = useCallback(
        (level: number, willExpand: boolean) => {
            while (nextRow.current) {
                if (hasClass(nextRow.current, em('row', 'level-0'))) {
                    break;
                } else {
                    const _level = getLevel(nextRow.current);
                    if (willExpand) {
                        // 展开时，需要保持次级行的展开/折叠情况
                        if (level === _level) {
                            // addStyle(nextRow.current, 'display', '');
                            const nextId = getRowIdentity(data[startRowIndex.current], rowKey);
                            treeNodes.current = treeNodes.current.map(item => (item.id === nextId ? { ...item, display: true } : item));
                            const expandIcon = nextRow.current.querySelector(`.${e`expand-icon`}`) as HTMLDivElement;
                            if (expandIcon) {
                                // 下一行层级为0或层级小于当前行层级时，说明子级行遍历结束，跳出循环
                                const nextLevel = getLevel(nextRow.current.nextSibling as HTMLTableRowElement);
                                if (nextLevel === 0 || nextLevel < level) {
                                    break;
                                }
                                const expanded = hasClass(expandIcon, em('expand-icon', 'expanded'));
                                treeNodes.current = treeNodes.current.map(item => (item.id === nextId ? { ...item, expanded } : item));
                                startRowIndex.current++;
                                nextRow.current = nextRow.current.nextSibling as HTMLTableRowElement;
                                expandOrCollapseTreeRow(level + 1, expanded);
                            }
                        }
                    } else {
                        // 折叠时，所有的子行都隐藏
                        if (level > 0) {
                            // addStyle(nextRow.current.current, 'display', 'none');
                            const nextId = getRowIdentity(data[startRowIndex.current], rowKey);
                            treeNodes.current = treeNodes.current.map(item => (item.id === nextId ? { ...item, display: false } : item));
                        }
                    }

                    // 下一行层级为0或层级小于当前行层级时，说明子级行遍历结束，跳出循环
                    const nextLevel = getLevel(nextRow.current.nextSibling as HTMLTableRowElement);
                    if (nextLevel === 0 || nextLevel < level) {
                        break;
                    }
                    startRowIndex.current++;
                    nextRow.current = nextRow.current.nextSibling as HTMLTableRowElement;
                }
            }
        },
        [data, e, em, getLevel, rowKey, treeNodes],
    );

    /** 展开/折叠树 */
    const handleExpandTreeCell = useCallback(() => {
        if (tdRef.current?.parentNode && expandCell.current) {
            const willExpand = !hasClass(expandCell.current, em('expand-icon', 'expanded'));
            if (lazy && row.noLazyChildren) {
                setLoading(true);
                const parentId = getRowIdentity(row, rowKey);
                new Promise<TreeNode[]>(resolve => {
                    load?.(
                        row,
                        treeNodes.current.find(item => item.id === parentId),
                        resolve,
                    );
                }).then(result => {
                    setLoading(false);
                    result = result.map(item => {
                        const treeNode: TreeNode = { parentId, display: true, level: row.level + 1, expanded: false, noLazyChildren: true };
                        treeNodes.current.push({ id: getRowIdentity(item, rowKey), ...treeNode });
                        return { ...item, ...treeNode };
                    });

                    // 添加新增的子节点
                    addTreeChildren(initialData.current, getRowIdentity(row, rowKey), result, treeProps, rowKey);
                    addTreeChildren(sortedData.current, getRowIdentity(row, rowKey), result, treeProps, rowKey);

                    let _data = data.map(item => {
                        if (rowKey ? getRowIdentity(item, rowKey) === getRowIdentity(row, rowKey) : isEqual(item, row)) {
                            const treeNode: TreeNode = treeNodes.current.find(item1 => item1.id === getRowIdentity(item, rowKey));
                            Object.assign(treeNode, {
                                noLazyChildren: result.length === 0,
                                expanded: true,
                                [treeProps.children]: result,
                                [treeProps.hasChildren]: result.length > 0,
                            });
                            return { ...row, ...omit(treeNode, 'id') };
                        }
                        return item;
                    });
                    _data.splice(rowIndex + 1, 0, result);
                    _data = _data.flat();
                    setData(_data);
                });
                // .catch(() => {
                //     setLoading(false);
                //     setData([
                //         ...data.slice(0, rowIndex),
                //         { ...row, noLazyChildren: true, expanded: true, [treeProps.children]: [], [treeProps.hasChildren]: false },
                //         ...data.slice(rowIndex + 1),
                //     ]);
                // });
            } else {
                startRowIndex.current = rowIndex + 1;
                nextRow.current = tdRef.current.parentNode?.nextSibling as HTMLTableRowElement;
                if (nextRow.current) {
                    const nextId = getRowIdentity(data[rowIndex], rowKey);
                    treeNodes.current = treeNodes.current.map(item => (item.id === nextId ? { ...item, expanded: willExpand } : item));
                    expandOrCollapseTreeRow(column.level + 1, willExpand);
                    setData(mergeTreeData(sortedData.current, treeNodes.current, treeProps, rowKey));
                }
            }

            // if (willExpand) {
            //     addClass(expandCell.current, em('expand-icon', 'expanded'));
            // } else {
            //     removeClass(expandCell.current, em('expand-icon', 'expanded'));
            // }
            onExpandChange?.(row, willExpand);
        }
    }, [rowIndex, em, lazy, row, onExpandChange, rowKey, load, treeNodes, initialData, treeProps, sortedData, data, setData, expandOrCollapseTreeRow, column.level]);

    // 展开内容区域变化时进行更新
    useUpdateEffect(() => {
        if (rootRef.current && trRef.current && expand.current === true) {
            rootRef.current.render(
                createPortal(
                    <td colSpan={flattenColumns.length} className={classNames(e`cell`, e`expanded-cell`)}>
                        {column?.renderCell && column.renderCell({ row, column, $index: rowIndex })}
                    </td>,
                    trRef.current,
                ),
            );
        }
    });

    useEffect(() => {
        if (column.type === 'selection') {
            if (disabled) {
                disabledRows.current.push(row);
            } else {
                disabledRows.current = disabledRows.current.filter(item => (rowKey ? getRowIdentity<any>(item, rowKey) !== getRowIdentity<any>(row, rowKey) : !isEqual(item, row)));
                // 去重
                disabledRows.current = uniqWith(
                    disabledRows.current,
                    rowKey ? (item1, item2) => getRowIdentity<any>(item1, rowKey) === getRowIdentity<any>(item2, rowKey) : isEqual,
                );
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [disabled, row]);

    /** 展开/折叠行 */
    const handleExpand = useCallback(() => {
        if (expandCell.current) {
            if (expand.current === false) {
                expandable(row).then(canExpand => {
                    if (canExpand) {
                        addClass(expandCell.current, em('expand-icon', 'expanded'));
                        expand.current = true;
                        if (tdRef.current?.parentNode?.parentNode) {
                            const tr = document.createElement('tr');
                            insertAfter(tr, tdRef.current.parentNode as HTMLElement);
                            trRef.current = tr;
                            rootRef.current = createRoot(tr);
                            rootRef.current.render(
                                createPortal(
                                    <td colSpan={flattenColumns.length} className={classNames(e`cell`, e`expanded-cell`)}>
                                        {column?.renderCell && column.renderCell({ row, column, $index: rowIndex })}
                                    </td>,
                                    tr,
                                ),
                            );
                            onExpandChange?.(row, true);
                        }
                    } else {
                        if (hideIconOnNotExpand) {
                            expandCell.current.style.display = 'none';
                        }
                    }
                });
            } else {
                removeClass(expandCell.current, em('expand-icon', 'expanded'));
                expand.current = false;
                if (tdRef.current?.parentNode?.parentNode && trRef.current) {
                    rootRef.current?.unmount();
                    tdRef.current?.parentNode?.parentNode.removeChild(trRef.current);
                    onExpandChange?.(row, false);
                }
            }
        }
    }, [column, e, em, expandable, flattenColumns.length, hideIconOnNotExpand, onExpandChange, row, rowIndex]);

    /**  */
    const treeSuffix = useMemo(() => {
        return (
            isTreeExpandCell(column.id) && (
                <>
                    {column.level > 0 && <span className={e`indent`} style={{ paddingLeft: indent * column.level }} />}
                    {(isNotEmpty(row[treeProps.children]) || row[treeProps.hasChildren]) && (
                        <div ref={expandCell} className={classNames(e`expand-icon`, { [em('expand-icon', 'expanded')]: row?.expanded })} onClick={handleExpandTreeCell}>
                            {loading ? <Icon name="loader" prefix="far" spin /> : <Icon name="angle-right" />}
                        </div>
                    )}
                    {isEmpty(row[treeProps.children]) && !row[treeProps.hasChildren] && <span className={e`placeholder`} />}
                </>
            )
        );
    }, [column.id, column.level, e, em, handleExpandTreeCell, indent, isTreeExpandCell, loading, row, treeProps.children, treeProps.hasChildren]);

    /** 拖拽手柄 */
    // const DragHandle = useMemo(() => {
    //     return SortableHandle(() => (
    //         <div style={{ cursor: 'grab' }}>
    //             <Icon name="grip-vertical" prefix="fas" />
    //             {/* <Icon name="grip-dots-vertical" prefix="fas" /> */}
    //         </div>
    //     ));
    // }, []);

    return (
        <td
            ref={tdRef}
            className={classNames(
                column.id,
                e`cell`,
                { [bm('column', 'selection')]: column.type === 'selection' },
                column.className,
                is(column.align),
                className,
                typeof cellClassName === 'function' ? cellClassName?.({ row, column, rowIndex, columnIndex }) : cellClassName,
            )}
            style={{ ...style, ...(typeof cellStyle === 'function' ? cellStyle?.({ row, column, rowIndex, columnIndex }) : cellStyle) }}
            rowSpan={rowSpan}
            colSpan={colSpan}
            onMouseEnter={event => handleCellMouseEnter(row, column, event)}
            onMouseLeave={event => onCellMouseLeave?.(row, column, event.currentTarget, event)}
            onContextMenu={event => {
                onCellContextmenu?.(row, column, event.currentTarget, event);
                onRowContextmenu?.(row, column, event);
            }}
            onClick={event => {
                event.stopPropagation();
                if (highlightCurrentRow) {
                    dispatch(activeRow(row));
                    if (!isEqual(state.currentRow, row)) {
                        onCurrentChange?.(row, state.currentRow);
                    }
                }
                onCellClick?.(row, column, event.currentTarget, event);
                onRowClick?.(row, column, event);
            }}
            onDoubleClick={event => {
                onCellDblclick?.(row, column, event.currentTarget, event);
                onRowDblclick?.(row, column, event);
            }}
        >
            <div className={classNames(e`cell-content`, { [b('tooltip', false)]: column.showOverflowTooltip })} style={getCellStyle(column)}>
                {(() => {
                    if (column.type === 'index') {
                        return <div className={e`cell-index`}>{rowIndex}</div>;
                    } else if (column.type === 'expand') {
                        return (
                            <div ref={expandCell} className={e`expand-icon`} onClick={handleExpand}>
                                <Icon name="angle-right" />
                            </div>
                        );
                    } else if (column.type === 'drag') {
                        // return <DragHandle />;
                    } else if (column.type === 'selection') {
                        return (
                            <Checkbox
                                onClick={event => event.stopPropagation()}
                                checked={
                                    !disabled && some(state.selection || [], item => (rowKey ? getRowIdentity(item, rowKey) === getRowIdentity(row, rowKey) : isEqual(item, row)))
                                }
                                disabled={disabled}
                                onChange={checked => handleCheck(checked, row)}
                            />
                        );
                    } else if (column.renderCell) {
                        return (
                            <>
                                {treeSuffix}
                                {column.renderCell({ row, column, $index: rowIndex })}
                            </>
                        );
                    } else if (column.formatter) {
                        return (
                            <>
                                {treeSuffix}
                                {column.formatter(row, column, column.name || column.prop ? row[column.name || column.prop] : '', rowIndex)}
                            </>
                        );
                    } else {
                        return (
                            <>
                                {treeSuffix}
                                {column.name || column.prop ? row[column.name || column.prop] : ''}
                            </>
                        );
                    }
                })()}
            </div>
        </td>
    );
};

TableCell.displayName = 'TableCell';

export default TableCell;
