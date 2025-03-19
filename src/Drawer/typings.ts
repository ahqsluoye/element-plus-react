/* eslint-disable lines-around-comment */
import React from 'react';
import { AnimationEventProps, BaseProps, NativeProps } from '../types/common';

export interface DrawerProps extends AnimationEventProps, BaseProps, NativeProps {
    /** 是否显示抽屉（可控） */
    visible?: boolean;

    /** 默认是否显示抽屉 */
    defaultVisible?: boolean;

    /** 当设置为 true，Drawer 打开时会显示背景，点击背景会关闭 Drawer，如果不想关闭 Drawer，可以设置为 'static' */
    backdrop?: boolean | 'static';

    /** 应用于 backdrop DOM 节点的 css class */
    backdropClassName?: string;

    /** 设置 Drawer 尺寸 */
    size?: 'full' | 'large' | 'md' | 'small' | 'xs';

    /** 设置 Drawer 显示的位置 */
    placement?: 'top' | 'bottom' | 'right' | 'left';

    /** 显示时的回调函数 */
    onOpen?: () => void;

    /** 隐藏时的回调函数 */
    onClose?: () => void;
}

export interface DrawerHeaderProps extends BaseProps, NativeProps {
    /** 当设置为 true, 显示关闭按钮 */
    closeButton?: boolean;

    /** 标题是否有边框 */
    border?: boolean;

    /** 组件 CSS 类的前缀 */
    classPrefix?: string;

    /** 隐藏时的回调函数 */
    onClose?: () => void;

    /** 自定义标题内联样式 */
    titleStyle?: React.CSSProperties;
}

export interface DrawerBodyProps extends BaseProps, NativeProps {
    /** 组件 CSS 类的前缀 */
    classPrefix?: string;
    /** 内容区域padding */
    padding?: string | number;
}

export interface DrawerFooterProps extends BaseProps, NativeProps {
    /** 组件 CSS 类的前缀 */
    classPrefix?: string;
}
