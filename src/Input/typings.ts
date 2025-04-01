import React from 'react';
import { BaseProps, FormControlBaseProps, NativeProps, TypeAttributes } from '../types/common';

export type LiteralUnion<T extends U, U> = T | (U & {});

export type ValueType = React.AllHTMLAttributes<HTMLInputElement>['value'];

export type BaseInputRef = {
    /** 获取值 */
    getValue: () => ValueType;
    /** 设置值 */
    setValue: (value: ValueType) => void;
    onClear: (event?: any) => void;
    /** 重置值 */
    clear: (event?: any) => void;
    /** 使 input 组件获得焦点 */
    focus: () => void;
    /** 使 input 组件失去焦点 */
    blur: () => void;
    showClear?: (value: ValueType) => void;
    hideClear?: () => void;
};

export type InputRef = {
    ref: React.MutableRefObject<HTMLDivElement>;
    input: React.MutableRefObject<HTMLInputElement>;
} & BaseInputRef;

export type TextareaRef = {
    input: HTMLTextAreaElement;
} & BaseInputRef;

export interface InputProps
    extends FormControlBaseProps<ValueType>,
        BaseProps,
        NativeProps,
        Omit<React.AllHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'size' | 'prefix' | 'type' | 'onInput' | 'onChange' | 'style' | 'children'> {
    size?: TypeAttributes.Size;

    /** 初始值 */
    defaultValue?: ValueType;

    /**
     * text，textarea 和其他原生 input 的 type 值
     * ref: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#%3Cinput%3E_types */
    type?: LiteralUnion<
        'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'number' | 'password' | 'range' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week',
        string
    >;

    /** 输入框头部内容，只对 type="text" 有效 */
    prefix?: React.ReactElement<any> | string | number;

    /** 输入框尾部内容，只对 type="text" 有效 */
    suffix?: React.ReactElement<any> | string | number;

    /** 输入框前置内容，只对 type="text" 有效 */
    prepend?: React.ReactElement<any> | string | number;

    /** 输入框后置内容，只对 type="text" 有效 */
    append?: React.ReactElement | string | number;

    /** 是否可清空 */
    clearable?: boolean;

    /** 是否显示切换密码图标 */
    showPassword?: boolean;

    /** 是否纯文本模式，即无边框 */
    plain?: boolean;

    /** 表单校验错误提示 */
    error?: boolean;

    /** 表单校验警告提示 */
    warning?: boolean;

    /** 输入是否防抖动 */
    debounceInput?: boolean;
    /** 获取输入建议的防抖延时，单位为毫秒 */
    debounceTime?: number;
    /** input自定义内联样式 */
    innerStyle?: React.CSSProperties;

    /** 范围选择时开始输入框的占位内容 */
    startPlaceholder?: string;

    /** 范围选择时结束输入框的占位内容 */
    endPlaceholder?: string;
    /** 最大输入长度 */
    maxLength?: number;
    /** 原生属性，最小输入长度 */
    minLength?: number;
    /** 是否显示统计字数, 只在 type 为 'text' 或 'textarea' 的时候生效	 */
    showWordLimit?: boolean;
    /** 是否隐藏值 */
    hiddenValue?: boolean;
    /** 在点击由 clearable 属性生成的清空按钮时触发 */
    onClear?: (e: MouseEvent) => void;

    /** 在 Input 值改变时触发 */
    onChange?: (value: ValueType, event?: React.ChangeEvent) => void;
}
export interface InputGroupProps extends BaseProps, NativeProps {
    /** 输入框前置内容，只对 type="text" 有效 */
    prepend?: React.ReactElement<any> | string | number;

    /** 输入框后置内容，只对 type="text" 有效 */
    append?: React.ReactElement | string | number;
}

export interface TextareaProps
    extends Omit<React.AllHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'size' | 'prefix' | 'type' | 'onInput' | 'onChange' | 'style' | 'children'>,
        FormControlBaseProps<ValueType>,
        BaseProps,
        NativeProps {
    /** 初始值 */
    defaultValue?: ValueType;

    /** 表单校验错误提示 */
    error?: boolean;

    /** 表单校验警告提示 */
    warning?: boolean;

    /** 是否纯文本模式，即无边框 */
    plain?: boolean;

    rows?: number;

    /** input自定义内联样式 */
    innerStyle?: React.CSSProperties;
    /** 最大输入长度 */
    maxLength?: number;
    /** 原生属性，最小输入长度 */
    minLength?: number;
    /** 是否显示统计字数, 只在 type 为 'text' 或 'textarea' 的时候生效	 */
    showWordLimit?: boolean;
    /** 在 Input 值改变时触发 */
    onChange?: (value: ValueType, event?: React.ChangeEvent) => void;
}

export type InputRangeValueType = [string | null, string | null] | [number | null, number | null];

export interface InputRangeProps<T = InputRangeValueType> extends Omit<FormControlBaseProps<T>, 'name' | 'onChange'>, BaseProps, NativeProps {
    name?: [string, string];

    size?: TypeAttributes.Size;

    /** 只读 */
    readOnly?: boolean;

    /** 是否激活状态 */
    active?: boolean;

    onClick?: React.MouseEventHandler<HTMLDivElement>;

    /**
     * text，textarea 和其他原生 input 的 type 值
     * ref: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#%3Cinput%3E_types */
    type?: 'text' | 'hidden' | 'number';

    /** 输入框头部内容，只对 type="text" 有效 */
    prefix?: React.ReactElement<any> | string | number;

    /** 输入框尾部内容，只对 type="text" 有效 */
    suffix?: React.ReactElement<any> | string | number;

    /** 输入框前置内容，只对 type="text" 有效 */
    prepend?: React.ReactElement<any> | string | number;

    /** 输入框后置内容，只对 type="text" 有效 */
    append?: React.ReactElement | string | number;

    /** 数值精度 */
    precision?: number;

    /** 是否可清空 */
    clearable?: boolean;

    /** 是否纯文本模式，即无边框 */
    plain?: boolean;

    /** 表单校验失败 */
    error?: boolean;

    /** 表单校验失败 */
    warning?: boolean;

    /** 选择范围时的分隔符 */
    rangeSeparator?: string;

    /** 输入是否防抖动 */
    debounceInput?: boolean;

    /** input自定义内联样式 */
    innerStyle?: React.CSSProperties;

    /** 范围选择时开始输入框的占位内容 */
    startPlaceholder?: string;

    /** 范围选择时结束输入框的占位内容 */
    endPlaceholder?: string;

    /** 在点击由 clearable 属性生成的清空按钮时触发 */
    onClear?: (e: MouseEvent) => void;

    /** 选中值发生变化时触发 */
    onChange?: (value: InputRangeValueType | null, event?: Event) => void;
}
