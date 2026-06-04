import React, { RefObject } from 'react';
import type { UseNamespaceReturn } from '../hooks';
import type { BaseProps, NativeProps } from '../types/common';

/**
 * 锚点链接状态
 */
export interface AnchorLinkState {
    /** 链接对应的 DOM 元素 */
    el: HTMLElement;
    /** 链接的 href 地址 */
    href: string;
}

/**
 * 锚点上下文
 */
export interface AnchorContext {
    /** 命名空间工具 */
    ns: UseNamespaceReturn;
    /** 锚点方向 */
    direction: 'vertical' | 'horizontal';
    /** 当前激活的锚点 */
    currentAnchor: string;
    /** 注册锚点链接 */
    addLink: (state: AnchorLinkState) => void;
    /** 移除锚点链接 */
    removeLink: (href: string) => void;
    /** 点击事件处理 */
    handleClick: (e: React.MouseEvent, href?: string) => void;
}

/**
 * Anchor 组件 Props
 */
export interface AnchorProps extends BaseProps, NativeProps {
    /**
     * 滚动的容器
     */
    container?: string | RefObject<HTMLElement> | Window | null;
    /**
     * 设置锚点滚动的偏移量
     * @default 0
     */
    offset?: number;
    /**
     * 触发锚点的元素的位置偏移量
     * @default 15
     */
    bound?: number;
    /**
     * 设置容器滚动持续时间，单位为毫秒
     * @default 300
     */
    duration?: number;
    /**
     * 是否显示标记
     * @default true
     */
    marker?: boolean;
    /**
     * 设置锚点类型
     * @default 'default'
     */
    type?: 'default' | 'underline';
    /**
     * 设置锚点方向
     * @default 'vertical'
     */
    direction?: 'vertical' | 'horizontal';
    /**
     * 滚动时，链接是否选中位于顶部
     * @default false
     */
    selectScrollTop?: boolean;
    /**
     * 锚点链接改变时触发
     */
    onChange?: (href: string) => void;
    /**
     * 当用户点击链接时触发
     */
    onClick?: (e: React.MouseEvent, href?: string) => void;
}

/**
 * AnchorLink 组件 Props
 */
export interface AnchorLinkProps extends BaseProps, NativeProps {
    /**
     * 链接的文本内容
     */
    title?: string | React.ReactNode;
    /**
     * 链接的地址
     */
    href?: string;
}

/**
 * Anchor 组件暴露的实例方法
 */
export interface AnchorRef {
    /** 手动滚动到特定锚点位置 */
    scrollTo: (href: string) => void;
}
