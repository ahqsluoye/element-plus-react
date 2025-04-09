import React, { RefObject } from 'react';
import { BaseProps, FormControlBaseProps, NativeProps } from '../types/common';

export type ValueType = string | number;
export type CheckboxRef = {
    ref: RefObject<HTMLSpanElement>;
    input: HTMLInputElement;
    isChcked: () => boolean;
    setChecked: (value: boolean) => void;
};

export interface CheckboxProps<V = ValueType>
    extends Omit<React.AllHTMLAttributes<HTMLElement>, 'value' | 'defaultValue' | 'loading' | 'size' | 'icon' | 'style' | 'onChange' | 'children'>,
        Omit<FormControlBaseProps<V>, 'onChange'>,
        BaseProps,
        NativeProps<
            | '--el-checkbox-text-color'
            | '--el-checkbox-input-width'
            | '--el-checkbox-input-height'
            | '--el-checkbox-bg-color'
            | '--el-checkbox-input-border'
            | '--el-checkbox-disabled-border-color'
            | '--el-checkbox-disabled-input-fill'
            | '--el-checkbox-disabled-icon-color'
            | '--el-checkbox-disabled-checked-input-fill'
            | '--el-checkbox-disabled-checked-input-border-color'
            | '--el-checkbox-disabled-checked-icon-color'
            | '--el-checkbox-checked-text-color'
            | '--el-checkbox-checked-input-border-color'
            | '--el-checkbox-checked-bg-color'
            | '--el-checkbox-checked-icon-color'
            | '--el-checkbox-input-border-color-hover'
        > {
    /** tooltip 提示*/
    title?: string;
    /** Inline layout */
    inline?: boolean;
    /** 是否只读 */
    readOnly?: boolean;
    /** 是否选中 */
    checked?: boolean;
    /** 默认是否选中 */
    defaultChecked?: boolean;
    /** 是否中间状态 */
    indeterminate?: boolean;
    /** 原生 name 属性 */
    name?: string;
    /** 点击checkbox时是否阻止默认事件 */
    prevent?: boolean;
    /** 当绑定值变化时触发的事件 */
    onChange?: (checked: boolean, value: ValueType, event: React.ChangeEvent<HTMLInputElement>) => void;
    /** 点击checkbox顶级div事件 */
    onClick?: (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void;
    /** 点击checkbox事件 */
    onCheckboxClick?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
}
