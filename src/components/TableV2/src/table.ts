import React, { CSSProperties } from 'react';
import { GridDefaultSlotParams } from '../../VirtualList';
import type { SortOrder } from './constants';
import { TableV2GridProps } from './grid';
import { RowEventHandlers, RowExpandParams } from './row';
import type { Column, ColumnCommonParams, KeyType, RowCommonParams, SortState } from './types';

/**
 * Param types
 */
export type ColumnSortParams<T> = {
    column: Column<T>;
    key: KeyType;
    order: SortOrder;
};

/**
 * Renderer/Getter types
 */

export type ExtraCellPropGetter<T> = (params: ColumnCommonParams<T> & RowCommonParams & { cellData: T; rowData: any }) => any;

export type ExtractHeaderPropGetter<T> = (params: { columns: Column<T>[]; headerIndex: number }) => any;

export type ExtractHeaderCellPropGetter<T> = (params: ColumnCommonParams<T> & { headerIndex: number }) => any;

export type ExtractRowPropGetter<T> = (params: { columns: Column<T>[] } & RowCommonParams) => any;

export type HeaderClassNameGetter<T> = (params: { columns: Column<T>[]; headerIndex: number }) => string;

export type RowClassNameGetter<T> = (params: { columns: Column<T>[] } & RowCommonParams) => string;

/**
 * Handler types
 */
export type ColumnSortHandler<T> = (params: ColumnSortParams<T>) => void;
export type ColumnResizeHandler<T> = (column: Column<T>, width: number) => void;
export type ExpandedRowsChangeHandler = (expandedRowKeys: KeyType[]) => void;

export type RowsRenderedParams = {
    rowCacheStart: number;
    rowCacheEnd: number;
    rowVisibleStart: number;
    rowVisibleEnd: number;
};

export type ScrollParams = {
    xAxisScrollDir?: 'forward' | 'backward';
    scrollLeft?: number;
    yAxisScrollDir?: 'forward' | 'backward';
    scrollTop?: number;
};

export type TableV2Props = {
    /** 为了更好的渲染效果预先多加载的行数 */
    cache?: number;
    /** 渲染动态的单元格的预估高度 */
    estimatedRowHeight?: number;
    /** header 部分的自定义 class 名 */
    headerClass?: string | HeaderClassNameGetter<any>;
    /** header 部分的自定义 props 名 */
    headerProps?: object | ExtractHeaderPropGetter<any>;
    /** header cell 部分的自定义 props 名 */
    headerCellProps?: object | ExtractHeaderCellPropGetter<any>;
    /** header 的高度由height设置。 如果传入数组，它会使 header row 等于数组长度 */
    headerHeight?: number | number[];
    /** footer 的高度，当传入值时，这部分将被计算入 table 的高度里 */
    footerHeight?: number;
    /** row wrapper 部分的自定义 class 名 */
    rowClass?: string | RowClassNameGetter<any>;
    /** 每行的 key 值，如果不提供，将使用索引 index 代替 */
    rowKey?: string | symbol | number;
    /** row component 部分的自定义 class 名 */
    rowProps?: object | ExtractRowPropGetter<any>;
    /** 每行的高度, 用于计算表的总高度 */
    rowHeight?: number;
    /** 当每行添加了一系列事件处理器时触发 */
    rowEventHandlers?: RowEventHandlers;
    /** 每个单元格 cell 的自定义 props (除了 header cell 以外) */
    cellProps?: object | ExtraCellPropGetter<any>;
    /** 列 column 的配置数组 */
    columns: Column<any>[];
    /** 要在表中渲染的数据数组 */
    data: any[];
    /** 一个自定义方法从数据源获取数据 */
    dataGetter?: (data: any[]) => any[];
    /** 渲染行在表格主内容上方和 header 下方区域的数据 */
    fixedData?: any[];
    /** 列的 key 来标记哪个行可以被展开 */
    expandColumnKey?: string;
    /** 存放行展开状态的 key 的数组，可以和 v-model 搭配使用 */
    expandedRowKeys?: KeyType[];
    /** 默认展开的行的 key 的数组, 这个数据不是响应式的 */
    defaultExpandedRowKeys?: KeyType[];
    /** 表格的类名称，将应用于表格的全部的三个部分 (左、右、主) */
    className?: string | string[] | object | (() => string | string[] | object);
    /** 单元格宽度是自适应还是固定 */
    fixed?: boolean;
    /** 表格的宽度 */
    width?: number;
    /** 表格的高度 */
    height?: number;
    /** 表格的最大高度 */
    maxHeight?: number;
    /** 树形表的水平缩进 */
    indentSize?: number;
    /** 水平滚动条的大小，防止水平和垂直滚动条重叠。 */
    hScrollbarSize?: number;
    /** 垂直滚动条的大小，防止水平和垂直滚动条重叠。 */
    vScrollbarSize?: number;
    /** 滚动条是否总是显示，不论是否滚动 */
    scrollbarAlwaysOn?: boolean;
    /** 排序方式 */
    sortBy?: object;
    /** 多个排序 */
    sortState?: SortState;
    headerFormatter?: (props: HeaderSlotProps) => React.ReactNode;
    rowFormatter?: (props: TableGridRowSlotParams) => React.ReactNode;
    cellFormatter?: (props: CellFormatProps<any>) => React.ReactNode;
    /** 列排序时调用 */
    onColumnSort?: ColumnSortHandler<any>;
    /** 当行被渲染后触发 */
    onRowsRendered?: (params: RowsRenderedParams) => void;
    /** 行展开状态改变时触发 */
    onExpandedRowsChange?: ExpandedRowsChangeHandler;
    /** 点击箭头图标展开/折叠树节点时触发 */
    onRowExpand?: (params: RowExpandParams) => void;
    /** 表格被用户滚动后触发 */
    onScroll?: (params: ScrollParams) => void;
};

export type HeaderSlotProps = {
    cells: React.ReactNode[];
    columns: Column<any>[];
    headerIndex: number;
};

export type TableGridRowSlotParams = {
    columns: TableV2GridProps['columns'];
    rowData: any;
} & GridDefaultSlotParams;

export type RowFormatProps = {
    cells?: React.ReactNode[];
    columns: Column<any>[];
    rowData?: any;
    columnIndex?: number;
    rowIndex?: number;
    data?: any;
    key?: number | string;
    isScrolling?: boolean;
    style?: CSSProperties;
    depth?: number;
};

export type CellFormatProps<T> = {
    column: Column<T>;
    columns: Column<T>[];
    columnIndex: number;
    depth: number;
    style: CSSProperties;
    rowData: any;
    rowIndex: number;
    isScrolling: boolean;
    expandIconProps?:
        | {
              rowData: any;
              rowIndex: number;
              onExpand: (expand: boolean) => void;
          }
        | undefined;
};
