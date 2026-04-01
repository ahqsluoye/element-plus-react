import React from 'react';
import { TransitionProps } from '../Transition';
import { AnimationEventProps, BaseProps, NativeProps } from '../types/common';

export interface DialogProps
    extends AnimationEventProps,
        BaseProps,
        NativeProps<
            | '--el-dialog-width'
            | '--el-dialog-margin-top'
            | '--el-dialog-bg-color'
            | '--el-dialog-box-shadow'
            | '--el-dialog-title-font-size'
            | '--el-dialog-content-font-size'
            | '--el-dialog-font-line-height'
            | '--el-dialog-padding-primary'
            | '--el-dialog-border-radius'
        >,
        TransitionProps {
    /** 是否显示模态框（可控） */
    visible: boolean;
    /** 默认是否显示模态框 */
    defaultVisible?: boolean;
    /** 是否需要遮罩层 */
    modal?: boolean;
    /** 遮罩的自定义类名 */
    className?: string;
    /** 是否可以通过点击 modal 关闭 Dialog */
    closeOnClickModal?: boolean;
    /** 应用于 backdrop DOM 节点的 css class */
    backdropClassName?: string;
    /** 对话框的宽度，默认值为 50% */
    width?: string | number;
    /** header 部分的自定义 class 名 */
    headerClass?: string;
    /** Dialog 对话框 Dialog 的标题， 也可通过ElDialog.header传入 */
    title?: string | React.ReactElement;
    /** 当设置为 true, 显示关闭按钮 */
    showClose?: boolean;
    /** 标题是否有边框 */
    border?: boolean;
    /** dialog CSS 中的 margin-top 值，默认为 15vh */
    top?: string;
    /** 是否让 Dialog 的 header 和 footer 部分居中排列 */
    center?: boolean;
    /** 是否水平垂直对齐对话框 */
    alignCenter?: boolean;
    /** 为 Dialog 启用可拖拽功能 */
    draggable?: boolean;
    /** 拖动范围可以超出可视区 */
    overflow?: boolean;
    /** 是否为全屏 Dialog */
    fullscreen?: boolean;
    /** 是否在 Dialog 出现时将 body 滚动锁定 */
    lockScroll?: boolean;
    /** 是否可以通过按下 ESC 关闭 Dialog */
    // closeOnPressEscape?: boolean;
    /** 和原生的 CSS 的 z-index 相同，改变 z 轴的顺序 */
    zIndex?: number;
    // /** dialog 打开的延时时间，单位毫秒 */
    // openDelay?: number;
    // /** dialog 关闭的延时时间，单位毫秒 */
    // closeDelay?: number;
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

export interface DialogHeaderProps extends BaseProps {
    /** header 部分的自定义 class 名 */
    headerClass?: string;
    /** 当设置为 true, 显示关闭按钮 */
    showClose?: boolean;
    /** 标题是否有边框 */
    border?: boolean;
    /** 组件 CSS 类的前缀 */
    classPrefix?: string;
    /** 隐藏时的回调函数 */
    // onClose?: () => void;
    /** 自定义标题内联样式 */
    titleStyle?: React.CSSProperties;
}

export interface DialogBodyProps extends BaseProps, NativeProps {
    /** 组件 CSS 类的前缀 */
    classPrefix?: string;
    /** 内容区域padding */
    padding?: string | number;
}

export interface DialogFooterProps extends BaseProps, NativeProps {
    /** 组件 CSS 类的前缀 */
    classPrefix?: string;
    /** 内容位置 */
    position?: 'left' | 'center' | 'right';
}
