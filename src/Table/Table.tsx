import classNames from 'classnames';
import React, { Ref, RefObject, forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { Loading } from '../Loading';
import { Scrollbar, ScrollbarRef } from '../Scrollbar';
import { mergeDefaultProps } from '../Util';
import { useClassNames } from '../hooks';
import Colgroup from './Colgroup';
import TableBody from './TableBody';
import { TableBodyContext, TableContext } from './TableContext';
import TableHeader from './TableHeader';
import { useScroll } from './hooks/useScroll';
import { useSelection } from './hooks/useSelection';
import { useTable } from './hooks/useTable';
import { TableProps, TableRef, TableRefs, TreeNode } from './typings';
import { TableIdManager } from './util';

function InternalTable<RecordType extends object = TreeNode>(props: TableProps<RecordType>, ref: RefObject<TableRef<RecordType>>) {
    props = mergeDefaultProps(
        {
            data: [],
            fit: true,
            showHeader: true,
            tableLayout: 'fixed',
            style: {},
            emptyText: '暂无数据',
            selectOnIndeterminate: true,
        },
        props,
    );
    const { height, maxHeight, size, stripe = false, fit, border, tableLayout, showHeader, showSummary, emptyText, append, loading } = props;
    const { b, e, m } = useClassNames('table');

    const refs: TableRefs = {
        tableWrapper: useRef<HTMLDivElement>(null),
        innerWrpper: useRef<HTMLDivElement>(null),
        headerWrapper: useRef<HTMLDivElement>(null),
        footerWrapper: useRef<HTMLDivElement>(null),
        scrollBarRef: useRef<ScrollbarRef>(null),
        resizeHelper: useRef<HTMLDivElement>(null),
        tableHeader: useRef<HTMLTableElement>(null),
        tableBody: useRef<HTMLTableElement>(null),
        emptyBlock: useRef<HTMLDivElement>(null),
    };

    const tableId = useMemo(() => TableIdManager.nextTableId(), []);
    const {
        data,
        setData,
        _children,
        columns,
        flattenColumns,
        fixedLeftColumns,
        fixedRightColumns,
        isGroup,
        bodyWidth,
        scheduleLayout,
        setScrollClass,
        initialData,
        sortedData,
        treeNodes,
        treeProps,
        isTreeTable,
        isTreeExpandCell,
    } = useTable<RecordType>(props, refs, tableId);

    const { state, dispatch, oldActiveRow, setCurrentRow, toggleRowSelection, toggleAllSelection, getSelectionRows, clearSelection, disabledRows } = useSelection(props, data);
    const { setHeight, scrollTo, setScrollLeft, setScrollTop } = useScroll(props, data, refs, m);

    useImperativeHandle(ref, () => ({
        refs,
        clearSelection,
        getSelectionRows,
        toggleRowSelection,
        toggleAllSelection,
        setCurrentRow,
        setHeight,
        doLayout: scheduleLayout,
        scrollTo,
        setScrollLeft,
        setScrollTop,
    }));

    return (
        <TableContext.Provider
            value={{
                props,
                tableId,
                columns,
                flattenColumns,
                fixedLeftColumns,
                fixedRightColumns,
                tableRefs: refs,
                data,
                setData,
            }}
        >
            <div
                className={classNames(
                    {
                        [m`fit`]: fit,
                        [m`striped`]: stripe,
                        [m`border`]: border || isGroup,
                        // [ns.m('hidden')]: isHidden,
                        [m`group`]: isGroup,
                        [m`fluid-height`]: maxHeight,
                        // [ns.m('scrollable-x')]: layout.scrollX.value,
                        // [ns.m('scrollable-y')]: layout.scrollY.value,
                        [m`enable-row-hover`]: true,
                        [m('enable-row-transition')]: (data || []).length !== 0 && (data || []).length < 100,
                        'has-footer': showSummary,
                    },
                    b(),
                    m(size),
                    props.className,
                    m`layout${tableLayout}`,
                )}
                style={{ ...props.style, height, maxHeight }}
                ref={refs.tableWrapper}
            >
                <div ref={refs.innerWrpper} className={e`inner-wrapper`} style={{ height, maxHeight }}>
                    <div className="hidden-columns">{_children}</div>
                    {showHeader && tableLayout === 'fixed' && (
                        <div className={e`header-wrapper`} ref={refs.headerWrapper}>
                            {/* @ts-ignore */}
                            <table ref={refs.tableHeader} className={e`header`} border={0} cellPadding={0} cellSpacing={0}>
                                <Colgroup columns={flattenColumns} tableLayout={tableLayout} />
                                <TableBodyContext.Provider
                                    value={{ oldActiveRow, state, dispatch, initialData, sortedData, disabledRows, treeProps, isTreeTable, isTreeExpandCell, treeNodes }}
                                >
                                    <TableHeader scheduleLayout={scheduleLayout} />
                                </TableBodyContext.Provider>
                            </table>
                        </div>
                    )}

                    <div className={e`body-wrapper`}>
                        <Scrollbar
                            ref={refs.scrollBarRef}
                            viewStyle={{ display: 'inline-block', verticalAlign: 'middle' }}
                            onScroll={({ scrollLeft }) => {
                                if (refs.headerWrapper.current) {
                                    refs.headerWrapper.current.scrollLeft = scrollLeft;
                                }
                                if (scrollLeft === 0) {
                                    setScrollClass('is-scrolling-left');
                                } else if (refs.tableWrapper.current && scrollLeft > 0 && scrollLeft + refs.tableWrapper.current?.clientWidth + 2 < bodyWidth.current) {
                                    setScrollClass('is-scrolling-middle');
                                } else {
                                    setScrollClass('is-scrolling-right');
                                }
                            }}
                        >
                            {/* @ts-ignore */}
                            <table ref={refs.tableBody} className={e`body`} border={0} cellPadding={0} cellSpacing={0} style={{ tableLayout }}>
                                <Colgroup columns={flattenColumns} tableLayout={tableLayout} />
                                <TableBodyContext.Provider
                                    value={{ oldActiveRow, state, dispatch, initialData, sortedData, disabledRows, treeProps, isTreeTable, isTreeExpandCell, treeNodes }}
                                >
                                    {tableLayout === 'auto' && <TableHeader scheduleLayout={scheduleLayout} />}
                                    <TableBody />
                                </TableBodyContext.Provider>
                            </table>
                            {append && <div className={e`append-wrapper`}>{append}</div>}
                        </Scrollbar>

                        {!loading && data.length === 0 && (
                            // @ts-ignore
                            <div ref={refs.emptyBlock} className={e`empty-block`} style={{ height: '100%', position: tableLayout === 'auto' ? 'unset' : '' }}>
                                <span className={e`empty-text`}>{emptyText}</span>
                            </div>
                        )}

                        <Loading className={e`loading`} fullscreen={false} background="rgba(255, 255, 255, 0.6)" text="正在加载中..." visible={loading} />
                    </div>
                    {showSummary && <div className={e`footer-wrapper`} ref={refs.footerWrapper} />}
                </div>
                <div className={e`column-resize-proxy`} ref={refs.resizeHelper} style={{ display: 'none' }} />
            </div>
        </TableContext.Provider>
    );
}

const ForwardTable = forwardRef(InternalTable) as <RecordType extends object = any>(props: TableProps<RecordType> & { ref?: Ref<TableRef<RecordType>> }) => React.ReactElement;

type InternalTableType = typeof ForwardTable;

interface TableInterface extends InternalTableType {
    displayName?: string;
    defaultProps?: Partial<TableProps<any>>;
}

const Table = ForwardTable as TableInterface;

Table.displayName = 'Table';

export default Table;
