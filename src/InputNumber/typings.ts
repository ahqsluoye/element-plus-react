import React, { Ref } from 'react';
import { InputRef } from '../Input/typings';
import { BaseProps, FormControlBaseProps, NativeProps } from '../types/common';

export type LiteralUnion<T extends U, U> = T | (U & {});

export type ValueType = number | string;

export interface InputNumberProps<V = ValueType>
    extends Omit<FormControlBaseProps<V>, 'onChange'>,
        BaseProps<HTMLDivElement>,
        NativeProps,
        Omit<
            React.AllHTMLAttributes<HTMLInputElement>,
            'value' | 'defaultValue' | 'size' | 'prefix' | 'type' | 'onInput' | 'onChange' | 'style' | 'value' | 'ref' | 'className' | 'readOnly' | 'disabled' | 'name' | 'children'
        > {
    /** 设置计数器允许的最大值 */
    max?: number;
    /** 设置计数器允许的最小值 */
    min?: number;
    /** 计数器步长 */
    step?: number;
    /** 是否只能输入 step 的倍数 */
    stepStrictly?: boolean;
    /** 数值精度 */
    precision?: number;
    /** 控制按钮位置 */
    controlsPositionRight?: boolean;
    /** 占位符 */
    placeholder?: string;
    /** 绑定值被改变时触发 */
    onChange?: (currentValue: number | string, oldValue?: number | string) => void;
    /** 样式前缀 */
    prefixCls?: string;
    /** 表单校验错误提示 */
    error?: boolean;
    /** 表单校验警告提示 */
    warning?: boolean;
    /** 输入框头部内容 */
    prefix?: React.ReactElement<any> | string | number;
    /** 输入框尾部内容 */
    suffix?: React.ReactElement<any> | string | number;
    /** 输入框前置内容 */
    prepend?: React.ReactElement<any> | string | number;
    /** 输入框后置内容 */
    append?: React.ReactElement | string | number;
    /** 最大输入长度 */
    maxLength?: number;
    /** 原生属性，最小输入长度 */
    minLength?: number;
}

export interface InputNumberRef {
    /** 顶级div */
    ref: Ref<HTMLDivElement>;
    /** input */
    input: Ref<InputRef>;
    getValue: () => number;
    /** 使 input 组件获得焦点 */
    focus: () => void;
    /** 使 input 组件失去焦点 */
    blur: () => void;
}
