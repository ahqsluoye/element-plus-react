import React from 'react';
import { IconName } from '../Icon';
import { PopperOptions } from '../Popper';
import { BaseProps, NativeProps, TypeAttributes } from '../types/common';

export interface PopconfirmProps extends BaseProps<React.ReactElement>, NativeProps, PopperOptions {
    /** 显示的内容 */
    title: string;
    /** 确认按钮文字 */
    confirmButtonText?: string;
    /** 取消按钮文字 */
    cancelButtonText?: string;
    /** 确认按钮类型 */
    confirmButtonType?: TypeAttributes.Appearance;
    /** 取消按钮类型 */
    cancelButtonType?: TypeAttributes.Appearance;
    /** 自定义图标 */
    icon?: IconName;
    /** Icon 颜色 */
    iconColor?: string;
    /** 是否隐藏 Icon */
    hideIcon?: boolean;
    /** 弹层宽度，最小宽度 150px  */
    width?: number;
    /** 点击确认按钮时触发 */
    onConfirm?: () => void;
    /** 点击取消按钮时触发 */
    onCancel?: () => void;
}
