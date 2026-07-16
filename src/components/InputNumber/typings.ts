import { InputRef } from '@qsxy/element-plus-react/Input/typings';
import { BaseProps, FormControlBaseProps, NativeProps } from '@qsxy/element-plus-react/types/common';
import React, { Ref } from 'react';

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
    /** 是否显示控制按钮 */
    controls?: boolean;
    /** 控制按钮位置 */
    controlsPosition?: '' | 'right';
    /** 当输入框被清空时显示的值 */
    valueOnClear?: 'min' | 'max' | number | null;
    /** 占位符 */
    placeholder?: string;
    /** 绑定值被改变时触发 */
    onChange?: (currentValue: number | string, oldValue?: number | string) => void;
    /** 样式前缀 */
    prefixCls?: string;
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
    /** 内部输入文本对齐 */
    align?: 'left' | 'right' | 'center';
    /** 禁用科学计数法的输入（例如输入 'e'） */
    disabledScientific?: boolean;
    /** 原生 inputmode 属性 */
    inputmode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
    /** 自定义减少按钮图标 */
    decreaseIcon?: React.ReactNode;
    /** 自定义增加按钮图标 */
    increaseIcon?: React.ReactNode;
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
