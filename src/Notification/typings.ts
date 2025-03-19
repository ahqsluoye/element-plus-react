/* eslint-disable lines-around-comment */
import React, { RefObject } from 'react';
import { AnimationEventProps, BaseProps, NativeProps } from '../types/common';

export type Position = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
export interface INotificationHandle {
    close: () => void;
    el: HTMLElement;
}

export type MessageType = 'success' | 'warning' | 'info' | 'error' | '';
export type TypedMessageParams<T extends MessageType> = { type?: T } & Omit<NotificationProps, 'type'>;

export interface INotification {
    (options?: NotificationProps): INotificationHandle;
    success: (options?: TypedMessageParams<'success'>) => INotificationHandle;
    warning: (options?: TypedMessageParams<'warning'>) => INotificationHandle;
    info: (options?: TypedMessageParams<'info'>) => INotificationHandle;
    error: (options?: TypedMessageParams<'error'>) => INotificationHandle;
    closeAll: () => void;
}

export interface NotificationProps extends BaseProps, NativeProps, AnimationEventProps {
    /** 标题 */
    title?: string;
    /** 通知栏正文内容 */
    message?: string | React.ReactElement;
    /** 是否将 message 属性作为 HTML 片段处理 */
    dangerouslyUseHTMLString?: boolean; // default false
    /** 通知的类型	 */
    type?: 'success' | 'warning' | 'info' | 'error' | '';
    /** 显示时间, 单位为毫秒。 值为 0 则不会自动关闭 */
    duration?: number; // default 4500
    /** 自定义弹出位置 */
    position?: Position;
    /** 是否显示关闭按钮 */
    showClose?: boolean;
    /** 关闭时的回调函数 */
    onClose?: () => void;
    /**  */
    iconClass?: string;
    /**  */
    id?: string;
    /** 点击 Notification 时的回调函数 */
    onClick?: () => void;
    /** 相对屏幕顶部的偏移量 偏移的距离，在同一时刻，所有的 Notification 实例应当具有一个相同的偏移量 */
    offset?: number;
    /**  */
    onSuccess?: (ref: HTMLDivElement) => void;
}

export interface NotificationRef {
    id: string;
    el: RefObject<HTMLElement>;
    top: number;
    close: () => void;
    setOffset: (val: number) => void;
}

export type NotificationQueue = Array<RefObject<NotificationRef>>;
