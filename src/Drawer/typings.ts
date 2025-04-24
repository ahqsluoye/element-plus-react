import React from 'react';
import { AnimationEventProps, BaseProps, NativeProps } from '../types/common';

export interface DrawerProps
    extends AnimationEventProps,
        BaseProps,
        NativeProps<
            | '--el-drawer-width'
            | '--el-drawer-height'
            | '--el-drawer-margin-top'
            | '--el-drawer-bg-color'
            | '--el-drawer-box-shadow'
            | '--el-drawer-title-font-size'
            | '--el-drawer-content-font-size'
            | '--el-drawer-font-line-height'
            | '--el-drawer-padding-primary'
            | '--el-drawer-border-radius'
        > {
    /** 是否显示抽屉（可控） */
    visible?: boolean;
    /** 默认是否显示抽屉 */
    defaultVisible?: boolean;
    /** 当设置为 true，Drawer 打开时会显示背景，点击背景会关闭 Drawer，如果不想关闭 Drawer，可以设置为 'static' */
    modal?: boolean;
    /** 是否可以通过点击 modal 关闭 Dialog */
    closeOnClickModal?: boolean;
    /** 是否在 Dialog 出现时将 body 滚动锁定 */
    lockScroll?: boolean;
    /** 应用于 backdrop DOM 节点的 css class */
    modalClassName?: string;
    /** Dialog 对话框 Dialog 的标题， 也可通过ElDialog.header传入 */
    title?: string | React.ReactElement;
    /** 控制是否显示 header 栏, 默认为 true, 当此项为 false 时, title 属性不生效 */
    withHeader?: boolean;
    /** 当设置为 true, 显示关闭按钮 */
    showClose?: boolean;
    /** 标题是否有边框 */
    border?: boolean;
    /** 设置 Drawer 尺寸 */
    size?: number | string;
    /** 设置 Drawer 显示的位置 */
    direction?: 'top' | 'bottom' | 'right' | 'left';
    /** Dialog 打开的回调 */
    onOpen?: () => void;
    /** Dialog 打开动画结束时的回调 */
    onOpened?: () => void;
    /** Dialog 关闭的回调 */
    onClose?: () => void;
    /** Dialog 关闭动画结束时的回调 */
    onClosed?: () => void;
    /** 关闭弹窗函数 */
    close: () => void;
    /** 关闭前的回调，会暂停 Dialog 的关闭. 回调函数内执行 done 参数方法的时候才是真正关闭对话框的时候. */
    beforeClose?: DialogBeforeCloseFn;
}

type DoneFn = (cancel?: boolean) => void;
export type DialogBeforeCloseFn = (done: DoneFn) => void;

export interface DrawerHeaderProps extends BaseProps, NativeProps {
    /** 当设置为 true, 显示关闭按钮 */
    showClose?: boolean;
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
}

export interface DrawerFooterProps extends BaseProps, NativeProps {
    /** 组件 CSS 类的前缀 */
    classPrefix?: string;
}
