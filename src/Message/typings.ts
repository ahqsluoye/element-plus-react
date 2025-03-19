/* eslint-disable lines-around-comment */
import React, { RefObject } from 'react';
import { AnimationEventProps, BaseProps, NativeProps } from '../types/common';

export interface MessageHandle {
    close: () => void;
    el: RefObject<HTMLElement>;
}

export interface MessageProps extends BaseProps, NativeProps, AnimationEventProps {
    id?: string;
    /** 文字是否居中 */
    center?: boolean;
    /** 显示时间，单位为毫秒。 设为 0 则不会自动关闭 */
    duration?: number; // default 3000
    /** 自定义图标 */
    iconClass?: string;
    /** 消息文字 */
    message?: string | React.ReactElement;
    /** Message 距离窗口顶部的偏移量 */
    offset?: number; // defaults 20
    /** 关闭时的回调函数, 参数为被关闭的 message 实例 */
    onClose?: (el?: RefObject<HTMLElement>) => void;
    /** 是否显示关闭按钮 */
    showClose?: boolean; // default false
    /** 消息类型 */
    type?: 'success' | 'warning' | 'info' | 'error' | '';
    /** 是否立即执行onClose方法 */
    immediate?: boolean;
    /** 合并内容相同的消息，不支持 VNode 类型的消息 */
    grouping?: boolean;
    userOnClose?: (el?: RefObject<HTMLElement>) => void;
}

export type MessageType = 'success' | 'warning' | 'info' | 'error' | '';

export type MessageDispatcher = (options?: MessageProps | string | React.ReactElement) => MessageHandle;
export type MessageParams = MessageProps | string | React.ReactElement;
export type TypedMessageParams = Omit<MessageProps, 'type'> | string | React.ReactElement;

export interface MessageMethod {
    (options?: MessageParams): MessageHandle;
    success: (options?: TypedMessageParams) => MessageHandle;
    warning: (options?: TypedMessageParams) => MessageHandle;
    info: (options?: TypedMessageParams) => MessageHandle;
    error: (options?: TypedMessageParams) => MessageHandle;
    closeAll: () => void;
}

export interface MessageRef {
    id: string;
    el: RefObject<HTMLElement>;
    top: number;
    message: string | React.ReactElement;
    close: () => void;
    setOffset: (val: number) => void;
    /** 设置重复数量 */
    setReapetNum: () => void;
}
export type MessageQueue = Array<RefObject<MessageRef>>;
