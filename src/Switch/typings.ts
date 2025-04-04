import React from 'react';
import { IconName } from '../Icon';
import { BaseProps, FormControlBaseProps, NativeProps, TooltipBaseProps } from '../types/common';

export type ValueType = boolean | string | number;
export type ChangeValue = {
    checked: boolean;
    value: ValueType;
};

export interface SwitchProps<V = ValueType>
    extends Omit<FormControlBaseProps<V>, 'onChange'>,
        BaseProps,
        NativeProps<'--el-switch-on-color' | '--el-switch-off-color'>,
        TooltipBaseProps<HTMLDivElement> {
    /** switch 的宽度 */
    width?: number;
    /** switch 打开时的文字描述 */
    activeText?: string;
    /** switch 的状态为 off 时的文字描述 */
    inactiveText?: string;
    /** switch 打开时的文字描述 */
    activeIcon?: IconName | React.ReactElement<any>;
    /** switch 的状态为 off 时的文字描述 */
    inactiveIcon?: IconName | React.ReactElement<any>;
    /** 当在 on 状态时的背景颜色 */
    activeColor?: string;
    /** off 状态时的背景颜色 */
    inactiveColor?: string;
    /** 开关的边框颜色 */
    borderColor?: string;
    /** switch 状态为 on 时的值 */
    activeValue?: V;
    /** switch的状态为 off 时的值 */
    inactiveValue?: V;
    /**  */
    validateEvent?: boolean;
    /** 是否显示加载中 */
    loading?: boolean;
    /** 无论图标或文本是否显示在点内，只会呈现文本的第一个字符 */
    inlinePrompt?: boolean;
    /** switch 状态改变前的钩子， 返回 false 或者返回 Promise 且被 reject 则停止切换 */
    beforeChange?: () => Promise<boolean> | boolean;
    /** switch 状态发生变化时的回调函数 */
    onChange?: (value?: ValueType, checked?: boolean, e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
