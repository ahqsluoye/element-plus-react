/* eslint-disable lines-around-comment */
import React from 'react';
import { BaseProps, NativeProps } from '../types/common';

export interface PaginationRef {
    /** 当前页数 */
    pageNum: number;
    /** 每页条数 */
    pageSize: number;
    /** 设置当前页数 */
    setPageNum: (value: number) => void;
    /** 设置每页条数 */
    setPageSize: (value: number) => void;
}

export interface PaginationProps extends BaseProps, NativeProps {
    /** 当前页数 */
    current?: number;
    /** 默认的当前页数 */
    defaultCurrent?: number;
    /** 禁用分页 */
    disabled?: boolean;
    /** 数据总数 */
    total: number;
    /** 默认的每页条数 */
    defaultPageSize?: number;
    /** 每页条数 */
    pageSize?: number;
    /** 指定每页可以显示多少条 */
    pageSizeOptions?: Array<string>;
    /** 只有一页时是否隐藏分页器 */
    hideOnSinglePage?: boolean;
    /**  */
    showPrevNextJumpers?: boolean;
    /** 是否可以快速跳转至某页 */
    showQuickJumper?: boolean | { goButton: React.ReactElement };
    /** 用于显示数据总量和当前数据顺序 */
    showTotal?: (total: number, [from, to]: [number, number]) => React.ReactElement | boolean | string;
    /** 是否显示较少页面内容 */
    showLessItems?: boolean;
    /** 是否显示原生 tooltip 页码提示 */
    showTitle?: boolean;
    /** 是否展示 pageSize 切换器，当 total 大于 50 时默认为 true */
    showSizeChanger?: boolean;
    /** pageSize 变化的回调 */
    onShowSizeChange?: (current?: number, size?: number) => void;
    /** 用于自定义页码的结构，可用于优化 SEO */
    itemRender?: (page: number, type: PageType, element: React.ReactElement) => React.ReactElement<{ disabled?: boolean }>;
    /** 页码或 pageSize 改变的回调，参数是改变后的页码及每页条数 */
    onChange?: (current: number, pageSize: number) => void;
    /** 当添加该属性时，显示为简单分页 */
    simple?: boolean;
    /** 当为 small 时，是小尺寸分页 */
    size?: 'small';
}

export type PageType = 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next';

export interface PagerProps extends BaseProps, NativeProps {
    /** 页数 */
    page: number;
    /** 是否显示原生 tooltip 页码提示 */
    showTitle?: boolean;
    /** 是否激活状态 */
    active?: boolean;
    /** 点击事件 */
    onClick?: (page: number) => void;
    /** 用于自定义页码的结构，可用于优化 SEO */
    itemRender?: (current: number, type: PageType, element: React.ReactElement) => React.ReactElement;
}
