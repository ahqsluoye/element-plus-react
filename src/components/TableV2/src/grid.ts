import { NativeProps } from '@qsxy/element-plus-react/types/common';
import { CSSProperties } from 'react';
import { Column } from './types';

export type onRowRenderedParams = {
    rowCacheStart: number;
    rowCacheEnd: number;
    rowVisibleStart: number;
    rowVisibleEnd: number;
};

export type TableV2GridProps = {
    /** 列 column 的配置数组 */
    columns: Column<any>[];
    /** 要在表中渲染的数据数组 */
    data: any[];
    /** 渲染行在表格主内容上方和 header 下方区域的数据 */
    fixedData: any[];
    /** 估计的行高 */
    estimatedRowHeight: number;
    /** 表的高度 */
    height: number;
    /** 表的宽度 */
    width: number;
    /** header 的高度由height设置。 如果传入数组，它会使 header row 等于数组长度 */
    headerHeight?: number | number[];
    /** footer 的高度，当传入值时，这部分将被计算入 table 的高度里 */
    footerHeight?: number;
    /**  */
    bodyWidth?: number;
    /**  */
    rowHeight?: number;
    /** 为了更好的渲染效果预先多加载的行数 */
    cache?: number;
    /**  */
    useIsScrolling?: boolean;
    /** 滚动条是否总是显示，不论是否滚动 */
    scrollbarAlwaysOn?: boolean;
    /** 滚动条始端 Gap */
    scrollbarStartGap?: number;
    /** 滚动条终端 Gap */
    scrollbarEndGap?: number;
    containerStyle?: CSSProperties;
    getRowHeight: (index: number) => number;
    /** 每行的 key 值，如果不提供，将使用索引 index 代替 */
    rowKey?: string | symbol | number;
    onRowsRendered?: (params: onRowRenderedParams) => void;
    onScroll?: (...args: any[]) => void;
} & NativeProps;
