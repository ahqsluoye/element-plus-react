import React, { RefObject } from 'react';
import { DialogFooterProps, DialogProps } from '../Dialog/typings';
import { IconName, IconProps } from '../Icon';
import { AnimationEventProps, BaseProps, NativeProps, TypeAttributes } from '../types/common';

export interface MessageBoxProps extends BaseProps, NativeProps, AnimationEventProps {
    /** 标题 */
    title?: string | React.ReactElement;
    /** 消息正文内容 */
    message?: string | React.ReactElement;
    /** 是否将 message 属性作为 HTML 片段处理 */
    // dangerouslyUseHTMLString?: boolean;
    /** 消息类型，用于显示图标 */
    type?: 'success' | 'info' | 'warning' | 'error';
    /** 消息自定义图标，该属性会覆盖 type 的图标 */
    icon?: IconName | React.ReactElement<IconProps>;
    /** 遮罩的自定义类名 */
    modalClass?: string;
    /** 自定义确认按钮及取消按钮的大小 */
    width?: DialogProps['width'];
    // (action: MessageBoxAction, done?: () => void, ref?: RefObject<MessageBoxRef>) => void;
    /** 若不使用 Promise，可以使用此参数指定 MessageBox 关闭后的回调函数, instance 为 MessageBox 实例， 可以通过它访问实例上的属性和方法 */
    callback?: (value: string, action: Action) => any | ((action: Action) => any);
    /** 是否显示右上角关闭按钮 */
    showClose?: boolean;
    /** 是否可以通过点击 modal 关闭 MessageBox */
    closeOnClickModal?: boolean;
    /** 关闭前的回调，会暂停消息弹出框的关闭过程；instance为 MessageBox 实例，可以通过它访问实例上的属性和方法；done用于关闭 MessageBox 实例 */
    beforeClose?: (action?: Action, done?: () => void, ref?: RefObject<MessageBoxRef>) => void;
    /** 是否显示取消按钮（以 confirm 和 prompt 方式调用时为 true） */
    showCancelButton?: boolean;
    /** 是否显示确定按钮 */
    showConfirmButton?: boolean;
    /** 取消按钮的文本内容 */
    cancelButtonText?: string;
    /** 确定按钮的文本内容 */
    confirmButtonText?: string;
    /** 取消按钮的自定义类名 */
    cancelButtonClass?: string;
    /** 确定按钮的自定义类名 */
    confirmButtonClass?: string;
    /** 自定义确认和取消按钮的尺寸 */
    buttonSize?: TypeAttributes.Size;
    /** 按钮位置 */
    buttonPosition?: DialogFooterProps['position'];
    /** 是否将取消（点击取消按钮）与关闭（点击关闭按钮或遮罩层、按下 Esc 键）进行区分 */
    distinguishCancelAndClose?: boolean;
    /** 内容区域padding */
    padding?: string | number;
    /** 是否在 MessageBox 出现时将 body 滚动锁定 */
    lockScroll?: boolean;
    /** 是否显示输入框 */
    showInput?: boolean;
    /** 输入框占位文本 */
    inputPlaceholder?: string;
    /** 输入框的类型 */
    inputType?: string;
    /** 输入框的初始文本 */
    inputValue?: string;
    /** 输入框的校验表达式 */
    inputPattern?: RegExp;
    /** 输入框的校验函数。 应该返回一个 boolean 或者 string， 如果返回的是一个 string 类型，那么该返回值会被赋值给 inputErrorMessage 用于向用户展示错误消息。 */
    inputValidator?: (value: string) => boolean | string;
    /** 校验未通过时的提示文本 */
    inputErrorMessage?: string;
    /** 是否居中布局 */
    center?: boolean;
    /** 为 MessageBox 启用可拖拽功能 */
    draggable?: boolean;
    /** 拖动范围可以超出可视区 */
    overflow?: boolean;
    /** 是否使用圆角按钮 */
    roundButton?: boolean;
}

export type MessageState = {
    boxType: '' | 'prompt' | 'alert' | 'confirm';
    onAction: (action: Action, value?: string) => any;
    options: MessageBoxProps;
};

export type Action = 'confirm' | 'cancel' | 'close';
export type MessageBoxType = '' | 'prompt' | 'alert' | 'confirm';
export type MessageBoxData = MessageBoxInputData | Action;
export interface MessageBoxInputData {
    value: string;
    action: Action;
}

export type ElMessageBoxShortcutMethod =
    | ((message: MessageBoxProps['message'], title: MessageBoxProps['title'], options?: Omit<MessageBoxProps, 'message' | 'title'>) => Promise<MessageBoxData>) &
          ((message: MessageBoxProps['message'], options?: Omit<MessageBoxProps, 'message' | 'title'>) => Promise<MessageBoxData>);

export interface MessageBoxMethod {
    (options?: MessageBoxProps): Promise<MessageBoxData>;

    /**
     * 消息弹窗提示
     * @param message 消息内容
     * @param title 标题
     * @param options 其他设置项
     * @returns
     */
    alert: ElMessageBoxShortcutMethod;

    /**
     * 确认消息
     * @param message 消息内容
     * @param title 标题
     * @param options 其他设置项
     * @returns
     */
    confirm: ElMessageBoxShortcutMethod;

    prompt: ElMessageBoxShortcutMethod;
}

export interface MessageBoxRef {
    ref: RefObject<HTMLDivElement>;
    /** 关闭方法 */
    close: () => void;
    /** 设置确认按钮是否加载状态 */
    setConfirmButtonLoading: (value: boolean) => void;
    /** 修改确认按钮文本方法 */
    setConfirmButtonText: (value: string) => void;
}
