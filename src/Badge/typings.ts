/* eslint-disable lines-around-comment */
import React from 'react';
import { AnimationEventProps, BaseProps, NativeProps, TypeAttributes } from '../types/common';

export interface BadgeProps
    extends BaseProps,
        NativeProps<'--el-badge-bg-color' | '--el-badge-radius' | '--el-badge-font-size' | '--el-badge-padding' | '--el-badge-size'>,
        AnimationEventProps {
    /** 显示值 */
    value?: string | number;
    /** 最大值，超过最大值会显示 {max}+。 只有当 value 是数字类型时起作用。 */
    max?: number;
    /** 是否显示小圆点。 */
    isDot?: boolean;
    /** 是否隐藏 Badge。 */
    hidden?: Boolean;
    /** 类型 */
    type?: TypeAttributes.Appearance;
    /** 值为零时是否显示 Badge */
    showZero?: boolean;
    /** 背景色 */
    color?: string;
    /** badge 的偏移量 */
    offset?: [number, number];
    /** 自定义 badge 样式 */
    badgeStyle?: React.CSSProperties;
    /** 自定义 badge 类名  */
    badgeClass?: string;
}
