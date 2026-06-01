import isArray from 'lodash/isArray';
import isNumber from 'lodash/isNumber';
import { CSSProperties, RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ScrollPos, useColumns, useData, useRow, useScrollbar, useStyles } from './composables';

import { useClassNames } from '@qsxy/element-plus-react/hooks';
import type { TableV2Props } from './table';
import type { TableGridInstance } from './table-grid';
import type { AnyColumns, KeyType } from './types';

interface UseTableReturn {
    // models
    columns: AnyColumns;
    containerRef: RefObject<HTMLDivElement>;
    mainTableRef: RefObject<TableGridInstance | null>;
    leftTableRef: RefObject<TableGridInstance | null>;
    rightTableRef: RefObject<TableGridInstance | null>;
    // states
    isDynamic: boolean;
    isResetting: RefObject<boolean>;
    isScrolling: boolean;
    hasFixedColumns: number;
    // records
    columnsStyles: Record<KeyType, CSSProperties>;
    columnsTotalWidth: number;
    data: any[];
    expandedRowKeys: KeyType[];
    depthMap: Record<KeyType, number>;
    fixedColumnsOnLeft: AnyColumns;
    fixedColumnsOnRight: AnyColumns;
    mainColumns: AnyColumns;
    // metadata
    bodyWidth: number;
    emptyStyle: CSSProperties;
    rootStyle: CSSProperties;
    footerHeight: CSSProperties;
    mainTableHeight: number;
    fixedTableHeight: number;
    leftTableWidth: number;
    rightTableWidth: number;
    // flags
    showEmpty: boolean;
    // methods
    getRowHeight: (rowIndex: number) => number;
    // event handlers
    onColumnSorted: (e: MouseEvent) => void;
    onRowHovered: any;
    onRowExpanded: any;
    onRowsRendered: any;
    onRowHeightChange: any;
    // use scrollbars
    scrollTo: (params: ScrollPos) => void;
    scrollToLeft: (scrollLeft: number) => void;
    scrollToTop: (scrollTop: number) => void;
    scrollToRow: (row: number, strategy?: string) => void;
    onScroll: (params: ScrollPos) => void;
    onVerticalScroll: ({ scrollTop }: ScrollPos) => void;
}

function useTable(props: TableV2Props): UseTableReturn {
    const mainTableRef = useRef<TableGridInstance>(null);
    const leftTableRef = useRef<TableGridInstance>(null);
    const rightTableRef = useRef<TableGridInstance>(null);

    const ns = useClassNames('table-v2');

    // state
    const [isScrolling, setIsScrolling] = useState(false);

    const { columns, columnsStyles, columnsTotalWidth, fixedColumnsOnLeft, fixedColumnsOnRight, hasFixedColumns, mainColumns, onColumnSorted } = useColumns(
        props,
        props.columns,
        props.fixed,
    );

    const {
        expandedRowKeys,
        setExpandedRowKeys,
        lastRenderedRowIndex,
        setLastRenderedRowIndex,
        isDynamic,
        isResetting,
        rowHeights,
        resetAfterIndex,
        onRowExpanded,
        onRowHeightChange,
        onRowHovered,
        onRowsRendered,
    } = useRow(props, {
        mainTableRef,
        leftTableRef,
        rightTableRef,
        tableInstance: {},
        ns,
        isScrolling,
    });

    const { data, depthMap } = useData(props, {
        expandedRowKeys,
        lastRenderedRowIndex,
        resetAfterIndex,
        setLastRenderedRowIndex,
    });

    const rowsHeight = useMemo(() => {
        const { estimatedRowHeight, rowHeight } = props;
        if (isNumber(estimatedRowHeight)) {
            // calculate the actual height
            return Object.values(rowHeights).reduce((acc, curr) => acc + curr, 0);
        }

        return data.length * rowHeight;
    }, [props, data.length, rowHeights]);

    const { bodyWidth, fixedTableHeight, mainTableHeight, leftTableWidth, rightTableWidth, windowHeight, footerHeight, emptyStyle, rootStyle, headerHeight } = useStyles(props, {
        columnsTotalWidth,
        fixedColumnsOnLeft,
        fixedColumnsOnRight,
        rowsHeight,
    });

    const [isEndReached, setIsEndReached] = useState(false);
    const { onEndReached, hScrollbarSize } = props;

    const onMaybeEndReached = useCallback(
        (scrollPos: ScrollPos) => {
            if (!onEndReached) {
                return;
            }

            const { scrollTop } = scrollPos;

            const _totalHeight = rowsHeight;
            const clientHeight = windowHeight;

            const remainDistance = _totalHeight - (scrollTop + clientHeight) + hScrollbarSize;

            if (!isEndReached && lastRenderedRowIndex >= 0 && _totalHeight <= scrollTop + mainTableHeight - headerHeight) {
                setIsEndReached(true);
                onEndReached?.(remainDistance);
            } else {
                setIsEndReached(false);
            }
        },
        [headerHeight, hScrollbarSize, isEndReached, lastRenderedRowIndex, mainTableHeight, onEndReached, rowsHeight, windowHeight],
    );

    const { scrollTo, scrollToLeft, scrollToTop, scrollToRow, onScroll, onVerticalScroll } = useScrollbar(props, {
        mainTableRef,
        leftTableRef,
        rightTableRef,
        onMaybeEndReached,
    });

    // DOM/Component refs
    const containerRef = useRef<HTMLDivElement>(null);

    const showEmpty = useMemo(() => {
        const noData = data.length === 0;

        return isArray(props.fixedData) ? props.fixedData.length === 0 && noData : noData;
    }, [data.length, props.fixedData]);

    const getRowHeight = useCallback(
        (rowIndex: number) => {
            const { estimatedRowHeight, rowHeight, rowKey } = props;

            if (!estimatedRowHeight) {
                return rowHeight;
            }

            return rowHeights[data[rowIndex][rowKey]] || estimatedRowHeight;
        },
        [props, rowHeights, data],
    );

    // Watch rowsHeight changes to reset isEndReached
    useEffect(() => {
        setIsEndReached(false);
    }, [rowsHeight]);

    // Watch expandedRowKeys prop changes
    useEffect(() => {
        if (props.expandedRowKeys) {
            setExpandedRowKeys(props.expandedRowKeys);
        }
    }, [props.expandedRowKeys]);

    return {
        // models
        columns,
        containerRef,
        mainTableRef,
        leftTableRef,
        rightTableRef,
        // states
        isDynamic,
        isResetting,
        isScrolling,
        hasFixedColumns,
        // records
        columnsStyles,
        columnsTotalWidth,
        data,
        expandedRowKeys,
        depthMap,
        fixedColumnsOnLeft,
        fixedColumnsOnRight,
        mainColumns,
        // metadata
        bodyWidth,
        emptyStyle,
        rootStyle,
        footerHeight,
        mainTableHeight,
        fixedTableHeight,
        leftTableWidth,
        rightTableWidth,
        // flags
        showEmpty,

        // methods
        getRowHeight,

        // event handlers
        onColumnSorted,
        onRowHovered,
        onRowExpanded,
        onRowsRendered,
        onRowHeightChange,
        // use scrollbars
        scrollTo,
        scrollToLeft,
        scrollToTop,
        scrollToRow,
        onScroll,
        onVerticalScroll,
    };
}

export { useTable };

export type { UseTableReturn };
