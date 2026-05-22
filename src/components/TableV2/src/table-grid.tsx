import isNumber from 'lodash/isNumber';
import isObject from 'lodash/isObject';
import React, { forwardRef, useCallback, useContext, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { Header, TableV2HeaderInstance } from './components';
import { TableV2Context } from './tokens';
import { sum } from './utils';

import {
    DynamicSizeGrid,
    DynamicSizeGridInstance,
    FixedSizeGrid,
    GridDefaultSlotParams,
    GridItemKeyGetter,
    GridItemRenderedEvtParams,
    GridScrollOptions,
    ResetAfterIndex,
} from '@qsxy/element-plus-react/VirtualList';
import classNames from 'classnames';
import { ScrollStrategy } from './composables';
import { TableV2GridProps } from './grid';

const COMPONENT_NAME = 'ElTableV2Grid';

const useTableGrid = (props: TableV2GridProps) => {
    const headerRef = useRef<TableV2HeaderInstance>(null);
    const bodyRef = useRef<DynamicSizeGridInstance>(null);
    // const [scrollLeft, setScrollLeft] = useState(0);
    const scrollLeft = useRef(0);

    const totalHeight = useMemo(() => {
        const { data, rowHeight, estimatedRowHeight } = props;

        if (estimatedRowHeight) {
            return undefined;
        }

        return data.length * (rowHeight as number);
    }, [props]);

    const fixedRowHeight = useMemo(() => {
        const { fixedData, rowHeight } = props;

        return (fixedData?.length || 0) * (rowHeight as number);
    }, [props]);

    const headerHeight = useMemo(() => sum(props.headerHeight), [props.headerHeight]);

    const gridHeight = useMemo(() => {
        const { height } = props;
        return Math.max(0, height - headerHeight - fixedRowHeight);
    }, [props, headerHeight, fixedRowHeight]);

    const hasHeader = useMemo(() => {
        return headerHeight + fixedRowHeight > 0;
    }, [headerHeight, fixedRowHeight]);

    const itemKey: GridItemKeyGetter = useCallback(({ data, rowIndex }) => data[rowIndex][props.rowKey], [props.rowKey]);

    const onItemRendered = useCallback(
        ({ rowCacheStart, rowCacheEnd, rowVisibleStart, rowVisibleEnd }: GridItemRenderedEvtParams) => {
            props.onRowsRendered?.({
                rowCacheStart,
                rowCacheEnd,
                rowVisibleStart,
                rowVisibleEnd,
            });
        },
        [props],
    );

    const resetAfterRowIndex = useCallback((index: number, forceUpdate: boolean) => {
        bodyRef.current?.resetAfterRowIndex(index, forceUpdate);
    }, []);

    const scrollTo = useCallback((leftOrOptions: number | GridScrollOptions, top?: number) => {
        const header$ = headerRef.current;
        const body$ = bodyRef.current;

        if (isObject(leftOrOptions)) {
            header$?.scrollToLeft((leftOrOptions as GridScrollOptions).scrollLeft);
            scrollLeft.current = (leftOrOptions as GridScrollOptions).scrollLeft;
            body$?.scrollTo(leftOrOptions);
        } else {
            header$?.scrollToLeft(leftOrOptions);
            scrollLeft.current = leftOrOptions;
            body$?.scrollTo({
                scrollLeft: leftOrOptions,
                scrollTop: top,
            });
        }
    }, []);

    const scrollToTop = useCallback((scrollTop: number) => {
        bodyRef.current?.scrollTo({
            scrollTop,
        });
    }, []);

    const scrollToRow = useCallback(
        (row: number, strategy: ScrollStrategy) => {
            const body = bodyRef.current;
            if (!body) {
                return;
            }

            const prevScrollLeft = scrollLeft.current;

            body.scrollToItem(row, 0, strategy);

            if (prevScrollLeft) {
                scrollTo({
                    scrollLeft: prevScrollLeft,
                });
            }
        },
        [scrollLeft, scrollTo],
    );

    const forceUpdate = useCallback(() => {
        (bodyRef.current as any)?.forceUpdate?.();
        (headerRef.current as any)?.forceUpdate?.();
    }, []);

    // Watch bodyWidth changes
    useEffect(() => {
        console.log(props.bodyWidth);
        if (isNumber(props.estimatedRowHeight)) {
            bodyRef.current?.resetAfter({ columnIndex: 0 }, false);
        }
    }, [props.bodyWidth]);

    return {
        bodyRef,
        forceUpdate,
        fixedRowHeight,
        gridHeight,
        hasHeader,
        headerHeight,
        headerRef,
        totalHeight,

        itemKey,
        onItemRendered,
        resetAfterRowIndex,
        scrollTo,
        scrollToTop,
        scrollToRow,
        scrollLeft,
    };
};

export interface TableGridInstance {
    forceUpdate: () => void;
    totalHeight: number | undefined;
    scrollTo(leftOrOptions: number | GridScrollOptions, top?: number): void;
    scrollToTop(scrollTop: number): void;
    scrollToRow(row: number, strategy: ScrollStrategy): void;
    resetAfterRowIndex: ResetAfterIndex;
}

const TableGrid = forwardRef<TableGridInstance, TableV2GridProps>((props, ref) => {
    const context = useContext(TableV2Context);
    if (!context) {
        throw new Error('TableGrid must be used within TableV2Context.Provider');
    }
    const { ns } = context;

    const {
        bodyRef,
        fixedRowHeight,
        gridHeight,
        hasHeader,
        headerRef,
        headerHeight,
        totalHeight,

        forceUpdate,
        itemKey,
        onItemRendered,
        resetAfterRowIndex,
        scrollTo,
        scrollToTop,
        scrollToRow,
        scrollLeft,
    } = useTableGrid(props);

    // onActivated equivalent - handle when component becomes active
    useEffect(() => {
        const timer = setTimeout(async () => {
            const scrollTop = (bodyRef.current as any)?.states?.scrollTop;
            if (scrollTop) {
                scrollToTop(Math.round(scrollTop) + 1);
            }
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    // Expose methods via ref
    useImperativeHandle(
        ref,
        () => ({
            forceUpdate,
            totalHeight,
            scrollTo,
            scrollToTop,
            scrollToRow,
            resetAfterRowIndex,
        }),
        [forceUpdate, totalHeight, scrollTo, scrollToTop, scrollToRow, resetAfterRowIndex],
    );

    const getColumnWidth = () => props.bodyWidth;

    const {
        cache,
        columns,
        data,
        fixedData,
        useIsScrolling,
        scrollbarAlwaysOn,
        scrollbarEndGap,
        scrollbarStartGap,
        style,
        rowHeight,
        bodyWidth,
        estimatedRowHeight,
        headerWidth,
        height,
        width,
        getRowHeight,
        onScroll,
        className,
        rowFormatter,
        headerFormatter,
    } = props;

    const isDynamicRowEnabled = isNumber(estimatedRowHeight);
    const Grid = isDynamicRowEnabled ? DynamicSizeGrid : FixedSizeGrid;
    const _headerHeight = headerHeight;

    return (
        <TableV2Context.Provider value={{ ...context, scrollLeft: scrollLeft.current }}>
            <div role="table" className={classNames(ns.e('table'), className)} style={style}>
                <Grid
                    ref={bodyRef}
                    // special attrs
                    data={data}
                    useIsScrolling={useIsScrolling}
                    itemKey={itemKey}
                    // column attrs
                    columnCache={0}
                    columnWidth={isDynamicRowEnabled ? getColumnWidth : bodyWidth}
                    totalColumn={1}
                    // row attrs
                    totalRow={data.length}
                    rowCache={cache}
                    rowHeight={isDynamicRowEnabled ? getRowHeight : rowHeight}
                    // DOM attrs
                    width={width}
                    height={gridHeight}
                    className={ns.e('body')}
                    role="rowgroup"
                    scrollbarStartGap={scrollbarStartGap}
                    scrollbarEndGap={scrollbarEndGap}
                    scrollbarAlwaysOn={scrollbarAlwaysOn}
                    // handlers
                    onScroll={onScroll}
                    itemRendered={onItemRendered}
                    perfMode={false}
                    rowFormatter={rowFormatter}
                >
                    {params =>
                        props.children &&
                        props.children({
                            ...params,
                            columns,
                            rowData: data[params.rowIndex],
                        })
                    }
                </Grid>
                {hasHeader && (
                    <Header
                        ref={headerRef}
                        className={ns.e('header-wrapper')}
                        columns={columns}
                        headerData={data}
                        headerHeight={props.headerHeight}
                        fixedHeaderData={fixedData}
                        rowWidth={headerWidth}
                        rowHeight={rowHeight}
                        width={width}
                        height={Math.min(_headerHeight + fixedRowHeight, height)}
                        dynamic={headerFormatter}
                        fixed={rowFormatter}
                    />
                )}
            </div>
        </TableV2Context.Provider>
    );
});

TableGrid.displayName = COMPONENT_NAME;

export default TableGrid;

export type TableGridRowSlotParams = {
    columns: TableV2GridProps['columns'];
    rowData: any;
} & GridDefaultSlotParams;
