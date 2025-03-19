/* eslint-disable lines-around-comment */
import React from 'react';
import { BaseProps, FormControlBaseProps, NativeProps } from '../types/common';

export type ValueType = React.AllHTMLAttributes<HTMLInputElement>['value'];

export type RadioRef = {
    input: HTMLInputElement;
    isChcked: () => boolean;
    setChecked: (value: boolean) => void;
};

export interface RadioProps<T = ValueType>
    extends Omit<React.AllHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'type' | 'value' | 'defaultValue' | 'onChange' | 'style' | 'children'>,
        Omit<FormControlBaseProps<T>, 'onChange'>,
        BaseProps,
        NativeProps {
    /** tooltip 提示*/
    title?: string;
    /** 是否只读 */
    readOnly?: boolean;
    /** Render the control as plain text */
    plaintext?: boolean;
    /** 是否选中 */
    checked?: boolean;
    /** 默认是否选中 */
    defaultChecked?: boolean;
    /** 原生 name 属性 */
    name?: string;
    /** 当绑定值变化时触发的事件 */
    onChange?: (checked: boolean, value: T, event: React.ChangeEvent<HTMLInputElement>) => void;
}
