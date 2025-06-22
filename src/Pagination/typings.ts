import React from 'react';
import { IconName } from '../Icon';
import { BaseProps, NativeProps, TypeAttributes } from '../types/common';

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
    currentPage?: number;
    /** 当前页数的默认初始值，不设置时默认为 1 */
    defaultCurrentPage?: number;
    /** 分页大小 */
    size?: TypeAttributes.Size;
    /** 是否为分页按钮添加背景色 */
    background?: boolean;
    /** 禁用分页 */
    disabled?: boolean;
    /** 数据总数 */
    total: number;
    /** 默认的每页条数 */
    defaultPageSize?: number;
    /** 每页条数 */
    pageSize?: number;
    /** 设置最大页码按钮数。 页码按钮的数量，当总页数超过该值时会折叠 */
    pagerCount?: number;
    /** 指定每页可以显示多少条 */
    pageSizes?: Array<number>;
    /** 组件布局，子组件名用逗号分隔 'prev, pager, next, sizes, jumper, ->, total' */
    layout?: string;
    /** 替代图标显示的上一页文字 */
    prevText?: string;
    /** 上一页的图标， 比 prevText 优先级更高 */
    prevIcon?: IconName | React.ReactElement;
    /** 替代图标显示的下一页文字 */
    nextText?: string;
    /** 下一页的图标， 比 nextText 优先级更高 */
    nextIcon?: IconName | React.ReactElement;
    /** 只有一页时是否隐藏分页器 */
    hideOnSinglePage?: boolean;
    /** 是否可以快速跳转至某页 */
    showQuickJumper?: boolean | { goButton: React.ReactElement };
    /** 用于显示数据总量和当前数据顺序 */
    showTotal?: (total: number, [from, to]: [number, number]) => React.ReactElement | boolean | string;
    /** 是否显示原生 tooltip 页码提示 */
    showTitle?: boolean;
    /** pageSize 变化的回调 */
    onSizeChange?: (current?: number, size?: number) => void;
    /** 用于自定义页码的结构，可用于优化 SEO */
    itemRender?: (page: number, type: PageType, element: React.ReactElement) => React.ReactElement<{ disabled?: boolean }>;
    /** 页码或 pageSize 改变的回调，参数是改变后的页码及每页条数 */
    onChange?: (current: number, pageSize: number) => void;
    /** 当添加该属性时，显示为简单分页 */
    simple?: boolean;
}

export type PageType = 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next';

export interface PagerProps extends BaseProps, NativeProps {
    /** 页数 */
    page: number;
    /** 是否激活状态 */
    active?: boolean;
    /** 是否禁用状态 */
    disabled?: boolean;
    /** 点击事件 */
    onClick?: (page: number) => void;
}
