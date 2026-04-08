import { useClassNames } from '@qsxy/element-plus-react/hooks';
import React, { CSSProperties, forwardRef, useImperativeHandle, useMemo } from 'react';
import { TableV2Props } from './table';
import { TableV2Context } from './tokens';
import { useTable } from './use-table';
// renderers
import Cell from './renderers/cell';
import Empty from './renderers/empty';
import Footer from './renderers/footer';
import Header from './renderers/header';
import HeaderCell from './renderers/header-cell';
import LeftTable from './renderers/left-table';
import MainTable from './renderers/main-table';
import Overlay from './renderers/overlay';
import RightTable from './renderers/right-table';
import Row from './renderers/row';

import { mergeDefaultProps } from '@qsxy/element-plus-react/Util';
import classNames from 'classnames';
import type { TableV2RowCellRenderParam } from './components';
import type { ScrollStrategy } from './composables/use-scrollbar';
import type { TableGridRowSlotParams } from './table-grid';
import type { KeyType } from './types';

const COMPONENT_NAME = 'ElTableV2';

export interface TableV2Instance {
    /**
     * @description scroll to a given position
     * @params params {{ scrollLeft?: number, scrollTop?: number }} where to scroll to.
     */
    scrollTo: (param: { scrollLeft?: number; scrollTop?: number }) => void;
    /**
     * @description scroll to a given position horizontally
     * @params scrollLeft {Number} where to scroll to.
     */
    scrollToLeft: (scrollLeft: number) => void;
    /**
     * @description scroll to a given position vertically
     * @params scrollTop { Number } where to scroll to.
     */
    scrollToTop: (scrollTop: number) => void;
    /**
     * @description scroll to a given row
     * @params row {Number} which row to scroll to
     * @params strategy {ScrollStrategy} use what strategy to scroll to
     */
    scrollToRow(row: number, strategy?: ScrollStrategy): void;
}

const TableV2 = forwardRef<TableV2Instance, TableV2Props>((props, ref) => {
    props = mergeDefaultProps<any>(props, {
        cache: 2,
        headerHeight: 50,
        footerHeight: 0,
        rowHeight: 50,
        rowKey: 'id',
        indentSize: 12,
        hScrollbarSize: 6,
        vScrollbarSize: 6,
        sortBy: {},
        sortState: undefined,
    });

    const ns = useClassNames('table-v2');

    const {
        columnsStyles,
        fixedColumnsOnLeft,
        fixedColumnsOnRight,
        mainColumns,
        mainTableHeight,
        fixedTableHeight,
        leftTableWidth,
        rightTableWidth,
        data,
        depthMap,
        expandedRowKeys,
        hasFixedColumns,
        mainTableRef,
        leftTableRef,
        rightTableRef,
        isDynamic,
        isResetting,
        isScrolling,

        bodyWidth,
        emptyStyle,
        rootStyle,
        footerHeight,

        showEmpty,

        // exposes
        scrollTo,
        scrollToLeft,
        scrollToTop,
        scrollToRow,

        getRowHeight,
        onColumnSorted,
        onRowHeightChange,
        onRowHovered,
        onRowExpanded,
        onRowsRendered,
        onScroll,
        onVerticalScroll,
    } = useTable(props);

    // Expose methods via ref
    useImperativeHandle(
        ref,
        () => ({
            scrollTo,
            scrollToLeft,
            scrollToTop,
            scrollToRow,
        }),
        [scrollTo, scrollToLeft, scrollToTop, scrollToRow],
    );

    // Provide context to child components
    const contextValue = useMemo(
        () => ({
            ns,
            isResetting,
            isScrolling,
        }),
        [ns, isResetting, isScrolling],
    );

    const {
        cache,
        cellProps,
        estimatedRowHeight,
        expandColumnKey,
        fixedData,
        headerHeight,
        headerClass,
        headerProps,
        headerCellProps,
        sortBy,
        sortState,
        rowHeight,
        rowClass,
        rowEventHandlers,
        rowKey,
        rowProps,
        scrollbarAlwaysOn,
        indentSize,
        iconSize,
        useIsScrolling,
        vScrollbarSize,
        width,
        className,
        rowFormatter,
        cellFormatter,
        headerFormatter,
        headerCellFormatter,
        footer,
        empty,
        overlay,
    } = props;

    const mainTableProps = useMemo(
        () => ({
            cache,
            className: ns.e('main'),
            columns: mainColumns,
            data,
            fixedData,
            estimatedRowHeight,
            bodyWidth,
            headerHeight,
            headerWidth: bodyWidth,
            height: mainTableHeight,
            mainTableRef,
            rowKey,
            rowHeight,
            scrollbarAlwaysOn,
            scrollbarStartGap: 2,
            scrollbarEndGap: vScrollbarSize,
            useIsScrolling,
            width,
            getRowHeight,
            onRowsRendered,
            onScroll,
        }),
        [
            cache,
            ns,
            mainColumns,
            data,
            fixedData,
            estimatedRowHeight,
            bodyWidth,
            headerHeight,
            mainTableHeight,
            mainTableRef,
            rowKey,
            rowHeight,
            scrollbarAlwaysOn,
            vScrollbarSize,
            useIsScrolling,
            width,
            getRowHeight,
            onRowsRendered,
            onScroll,
        ],
    );

    const leftColumnsWidth = leftTableWidth;
    const _fixedTableHeight = fixedTableHeight;

    const leftTableProps = useMemo(
        () => ({
            cache,
            className: ns.e('left'),
            columns: fixedColumnsOnLeft,
            data,
            fixedData,
            estimatedRowHeight,
            leftTableRef,
            rowHeight,
            bodyWidth: leftColumnsWidth,
            headerWidth: leftColumnsWidth,
            headerHeight,
            height: _fixedTableHeight,
            rowKey,
            scrollbarAlwaysOn,
            scrollbarStartGap: 2,
            scrollbarEndGap: vScrollbarSize,
            useIsScrolling,
            width: leftColumnsWidth,
            getRowHeight,
            onScroll: onVerticalScroll,
        }),
        [
            cache,
            ns,
            fixedColumnsOnLeft,
            data,
            fixedData,
            estimatedRowHeight,
            leftTableRef,
            rowHeight,
            leftColumnsWidth,
            headerHeight,
            _fixedTableHeight,
            rowKey,
            scrollbarAlwaysOn,
            vScrollbarSize,
            useIsScrolling,
            getRowHeight,
            onVerticalScroll,
        ],
    );

    const rightColumnsWidth = rightTableWidth;

    const rightTableProps = useMemo(
        () => ({
            cache,
            className: ns.e('right'),
            columns: fixedColumnsOnRight,
            data,
            fixedData,
            estimatedRowHeight,
            rightTableRef,
            rowHeight,
            bodyWidth: rightColumnsWidth,
            headerWidth: rightColumnsWidth,
            headerHeight,
            height: _fixedTableHeight,
            rowKey,
            scrollbarAlwaysOn,
            scrollbarStartGap: 2,
            scrollbarEndGap: vScrollbarSize,
            width: rightColumnsWidth,
            style: { [`--${ns.cssVarName('table-scrollbar-size')}`]: `${vScrollbarSize}px` } as CSSProperties,
            useIsScrolling,
            getRowHeight,
            onScroll: onVerticalScroll,
        }),
        [
            cache,
            ns,
            fixedColumnsOnRight,
            data,
            fixedData,
            estimatedRowHeight,
            rightTableRef,
            rowHeight,
            rightColumnsWidth,
            headerHeight,
            _fixedTableHeight,
            rowKey,
            scrollbarAlwaysOn,
            vScrollbarSize,
            useIsScrolling,
            getRowHeight,
            onVerticalScroll,
        ],
    );

    const tableRowProps = useMemo(
        () => ({
            ns,
            depthMap,
            columnsStyles,
            expandColumnKey,
            expandedRowKeys,
            estimatedRowHeight,
            hasFixedColumns,
            rowProps,
            rowClass,
            rowKey,
            rowEventHandlers,
            onRowHovered,
            onRowExpanded,
            onRowHeightChange,
        }),
        [
            ns,
            depthMap,
            columnsStyles,
            expandColumnKey,
            expandedRowKeys,
            estimatedRowHeight,
            hasFixedColumns,
            rowProps,
            rowClass,
            rowKey,
            rowEventHandlers,
            onRowHovered,
            onRowExpanded,
            onRowHeightChange,
        ],
    );

    const tableCellProps = useMemo(
        () => ({
            cellProps,
            expandColumnKey,
            indentSize,
            iconSize,
            rowKey,
            expandedRowKeys,
            ns,
        }),
        [cellProps, expandColumnKey, indentSize, iconSize, rowKey, expandedRowKeys, ns],
    );

    const tableHeaderProps = useMemo(
        () => ({
            ns,
            headerClass,
            headerProps,
            columnsStyles,
        }),
        [ns, headerClass, headerProps, columnsStyles],
    );

    const tableHeaderCellProps = useMemo(
        () => ({
            ns,
            sortBy,
            sortState,
            headerCellProps,
            onColumnSorted,
        }),
        [ns, sortBy, sortState, headerCellProps, onColumnSorted],
    );

    const rootKls = useMemo(() => classNames(className, ns.b(), ns.e('root'), ns.is({ isDynamic })), [className, ns, isDynamic]);

    const footerProps = useMemo(
        () => ({
            className: ns.e('footer'),
            style: footerHeight,
        }),
        [ns, footerHeight],
    );

    const formatters = useMemo(() => {
        return {
            rowFormatter: (params: TableGridRowSlotParams) => (
                <Row
                    {...params}
                    {...tableRowProps}
                    key={`row_${params.rowIndex}`}
                    rowFormatter={rowFormatter}
                    cellFormatter={(cellParams: TableV2RowCellRenderParam) =>
                        cellFormatter ? (
                            <Cell
                                {...cellParams}
                                {...tableCellProps}
                                key={`row_${params.rowIndex}_${cellParams.columnIndex}`}
                                style={columnsStyles[cellParams.column.key as KeyType]}
                            >
                                {cellFormatter(cellParams)}
                            </Cell>
                        ) : (
                            <Cell
                                {...cellParams}
                                {...tableCellProps}
                                key={`row_${params.rowIndex}_${cellParams.columnIndex}`}
                                style={columnsStyles[cellParams.column.key as KeyType]}
                            />
                        )
                    }
                ></Row>
            ),
            headerFormatter: (headerParams: any) => (
                <Header
                    {...headerParams}
                    {...tableHeaderProps}
                    key={`header_${headerParams.headerIndex}`}
                    headerFormatter={headerFormatter}
                    cellFormatter={(headerCellParams: any) =>
                        headerCellFormatter ? (
                            <HeaderCell
                                {...headerCellParams}
                                {...tableHeaderCellProps}
                                key={`headerCell_${headerCellParams.columnIndex}`}
                                style={columnsStyles[headerCellParams.column.key as KeyType]}
                            >
                                {headerCellFormatter(headerCellParams)}
                            </HeaderCell>
                        ) : (
                            <HeaderCell
                                {...headerCellParams}
                                {...tableHeaderCellProps}
                                key={`headerCell_${headerCellParams.columnIndex}`}
                                style={columnsStyles[headerCellParams.column.key as KeyType]}
                            />
                        )
                    }
                ></Header>
            ),
        };
    }, [cellFormatter, columnsStyles, headerCellFormatter, headerFormatter, rowFormatter, tableCellProps, tableHeaderCellProps, tableHeaderProps, tableRowProps]);

    return (
        <TableV2Context.Provider value={contextValue}>
            <div className={rootKls} style={rootStyle}>
                <MainTable ref={mainTableRef} {...mainTableProps} {...formatters}></MainTable>
                <LeftTable ref={leftTableRef} {...leftTableProps} {...formatters}></LeftTable>
                <RightTable ref={rightTableRef} {...rightTableProps} {...formatters}></RightTable>
                {footer && <Footer {...footerProps}>{footer}</Footer>}
                {showEmpty && (
                    <Empty className={ns.e('empty')} style={emptyStyle}>
                        {empty}
                    </Empty>
                )}
                {overlay && <Overlay className={ns.e('overlay')}>{overlay}</Overlay>}
            </div>
        </TableV2Context.Provider>
    );
});

TableV2.displayName = COMPONENT_NAME;

export default TableV2;
