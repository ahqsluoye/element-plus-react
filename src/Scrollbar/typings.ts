import React, { RefObject } from 'react';
import { BaseProps, NativeProps } from '../types/common';

export interface ScrollbarRef {
    ref: RefObject<HTMLDivElement>;
    /** 滚动到一组特定坐标 */
    scrollTo: (options: number, yCoord?: number) => void;
    /** 设置滚动条到顶部的距离 */
    setScrollTop: (value: number) => void;
    /** 设置滚动条到左边的距离 */
    setScrollLeft: (value: number) => void;
    /** 手动更新滚动条状态 */
    update: () => void;
    /** 滚动条包裹的 ref 对象 */
    wrapRef: RefObject<HTMLDivElement>;
    /** 视图ref对象 */
    resizeRef: RefObject<any>;
}

export interface ScrollbarProps
    extends BaseProps,
        NativeProps<'--el-scrollbar-opacity' | '--el-scrollbar-bg-color' | '--el-scrollbar-hover-opacity' | '--el-scrollbar-hover-bg-color' | '--el-scrollbar-width'> {
    /** 滚动条高度 */
    height?: number | string;
    /** 滚动条最大高度 */
    maxHeight?: number | string;
    /** 是否使用原生滚动条样式 */
    native?: boolean;
    /** 包裹容器的自定义样式 */
    wrapStyle?: React.CSSProperties;
    /** 包裹容器的自定义类名 */
    wrapClass?: string;
    /** 视图的自定义样式 */
    viewStyle?: React.CSSProperties;
    /** 视图的自定义类名 */
    viewClass?: string;
    /** 不响应容器尺寸变化，如果容器尺寸不会发生变化，最好设置它可以优化性能 */
    noresize?: boolean;
    /** 视图的元素标签 */
    tag?: string;
    /** 滚动条总是显示 */
    always?: boolean;
    /** 滚动条最小尺寸 */
    minSize?: number;
    /** 是否显示横向滚动条 */
    showHorizontal?: boolean;
    /** 是否显示纵向滚动条 */
    showVertical?: boolean;
    /** 滚动时触发的事件 */
    onScroll?: (data: { e: React.UIEvent<HTMLDivElement, UIEvent>; scrollTop: number; scrollLeft: number }) => void;
}

export interface BarProps {
    vertical?: boolean;
    size: string;
    move: number;
    ratio: number;
    always: boolean;
    scrollbar: RefObject<HTMLElement>;
    wrapRef: RefObject<HTMLElement>;
}

type ScrollBehavior = 'auto' | 'instant' | 'smooth';

interface ScrollOptions {
    behavior?: ScrollBehavior;
}

export interface ScrollToOptions extends ScrollOptions {
    left?: number;
    top?: number;
}
