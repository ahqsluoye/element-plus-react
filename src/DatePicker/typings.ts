import { Dayjs } from 'dayjs';
import React, { RefObject } from 'react';
import { DateRangeType, DateType, Shortcuts } from '../Calendar';
import { InputRef } from '../Input/typings';
import { AnimationEventProps, BaseProps, FormControlBaseProps, NativeProps, TypeAttributes } from '../types/common';

export type DatePickerRef = {
    input?: RefObject<InputRef>;
    focus: () => void;
    blur: () => void;
    handleOpen: () => void;
    handleClose: () => void;
};

// type ValueType = string | number | Date;

export interface DatePickerProps
    extends Omit<FormControlBaseProps, 'name' | 'value' | 'defaultValue' | 'onChange'>,
        BaseProps,
        NativeProps,
        AnimationEventProps,
        CommonProps,
        Omit<
            React.AllHTMLAttributes<HTMLInputElement>,
            'value' | 'defaultValue' | 'size' | 'prefix' | 'type' | 'onInput' | 'onChange' | 'className' | 'style' | 'readOnly' | 'disabled' | 'children'
        > {
    /** 等价于原生 name 属性 */
    name?: string;
    /** 选中项绑定值 */
    value?: string | number | Date;
    /** 默认值 */
    defaultValue?: string | number | Date;
    /** 只读 */
    readonly?: boolean;
    /** 必输项*/
    required?: boolean;
    /** 是否显示清除按钮 */
    clearable?: boolean;
    /** 非范围选择时的占位内容 */
    placeholder?: string;
    /** 是否展示“今天”按钮 */
    showToday?: boolean;
    /** 显示类型 */
    type?: DateType;
    /** 显示在输入框中的格式 */
    format?: string;
    /** 可选，绑定值的格式。 不指定则绑定值为 Date 对象 */
    valueFormat?: string;
    /** 设置ISO周数，其中1为星期一，7为星期日 */
    isoWeek?: boolean;
    /** 表单校验错误提示 */
    error?: boolean;
    /** 表单校验警告提示 */
    warning?: boolean;
    /** 输入框前置内容，只对 type="text" 有效 */
    prepend?: React.ReactElement<any> | string | number;
    /** 输入框后置内容，只对 type="text" 有效 */
    append?: React.ReactElement | string | number;
    /** 是否纯文本模式，即无边框 */
    plain?: boolean;
    size?: TypeAttributes.Size;
    /** 一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数。 应该返回一个 Boolean 值。 */
    disabledDate?: (time: Date) => boolean;
    shortcuts?: Shortcuts[];
    /** 是否追加到body下 */
    appendToBody?: boolean;
    /** 点击确定按钮的回调 */
    onOk?: () => void;
    onChange?: (value: string | Date | number, event?: Event) => void;
    /** 格式化 */
    formatter?: (value: Dayjs, text: number) => React.ReactElement;
}

export interface DatePickerRangeProps extends Omit<FormControlBaseProps, 'name' | 'value' | 'defaultValue' | 'onChange'>, BaseProps, AnimationEventProps, CommonProps, NativeProps {
    /** 等价于原生 name 属性 */
    name?: [string, string];
    /** 选中项绑定值 */
    value?: [string, string] | [number, number] | [Date, Date];
    /** 默认值 */
    defaultValue?: [string, string] | [number, number] | [Date, Date];
    /** 只读 */
    readOnly?: boolean;
    /** 禁用 */
    disabled?: boolean;
    /** 是否显示清除按钮 */
    clearable?: boolean;
    /** 范围选择时开始日期的占位内容 */
    startPlaceholder?: string;
    /** 范围选择时结束日期的占位内容 */
    endPlaceholder?: string;
    /** 显示类型 */
    type?: DateRangeType;
    /** 显示在输入框中的格式 */
    format?: string;
    /** 可选，绑定值的格式。 不指定则绑定值为 Date 对象 */
    valueFormat?: string;
    /** 选择范围时的分隔符 */
    rangeSeparator?: string;
    /** 在范围选择器里取消两个日期面板之间的联动 */
    unlinkPanels?: boolean;
    /** 设置ISO周数，其中1为星期一，7为星期日 */
    isoWeek?: boolean;
    /** 表单校验错误提示 */
    error?: boolean;
    /** 表单校验警告提示 */
    warning?: boolean;
    /** 输入框前置内容，只对 type="text" 有效 */
    prepend?: React.ReactElement<any> | string | number;
    /** 输入框后置内容，只对 type="text" 有效 */
    append?: React.ReactElement | string | number;
    /** 点击确定按钮的回调 */
    onOk?: () => void;
    /** 一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数。 应该返回一个 Boolean 值。 */
    disabledDate?: (time: Date) => boolean;
    onChange?: (value: [string, string] | [Date, Date] | [number, number], event?: Event) => void;
    /** 格式化 */
    formatter?: (value: Dayjs, text: number) => React.ReactElement;
}

export type CommonProps = {
    /** 自定义前缀图标 */
    prefixIcon?: string | React.ReactElement;
    /** 可清空的模式下用户点击清空按钮时触发 */
    onClear?: () => void;
    /** 当 TimePicker 的下拉列表出现/消失时触发 */
    onVisibleChange?: (visibility: boolean) => void;
};

export interface AllDatePickerProps
    extends Omit<FormControlBaseProps, 'name' | 'value' | 'defaultValue' | 'onChange'>,
        BaseProps,
        NativeProps,
        AnimationEventProps,
        CommonProps,
        Omit<
            React.AllHTMLAttributes<HTMLInputElement>,
            'name' | 'value' | 'defaultValue' | 'size' | 'prefix' | 'type' | 'onInput' | 'onChange' | 'className' | 'style' | 'readOnly' | 'disabled' | 'children'
        > {
    /** 等价于原生 name 属性 */
    name?: string | [string, string];
    /** 选中项绑定值 */
    value?: string | Date | number | [string, string] | [Date, Date] | [number, number];
    /** 默认值 */
    defaultValue?: string | Date | number | [string, string] | [Date, Date] | [number, number];
    /** 只读 */
    readonly?: boolean;
    /** 必输项*/
    required?: boolean;
    /** 是否显示清除按钮 */
    clearable?: boolean;
    /** 非范围选择时的占位内容 */
    placeholder?: string;
    /** 是否展示“今天”按钮 */
    showToday?: boolean;
    /** 显示类型 */
    type?: DateType | DateRangeType;
    /** 显示在输入框中的格式 */
    format?: string;
    /** 可选，绑定值的格式。 不指定则绑定值为 Date 对象 */
    valueFormat?: string;
    /** 设置ISO周数，其中1为星期一，7为星期日 */
    isoWeek?: boolean;
    /** 表单校验错误提示 */
    error?: boolean;
    /** 表单校验警告提示 */
    warning?: boolean;
    /** 输入框前置内容，只对 type="text" 有效 */
    prepend?: React.ReactElement<any> | string | number;
    /** 输入框后置内容，只对 type="text" 有效 */
    append?: React.ReactElement | string | number;
    /** 是否纯文本模式，即无边框 */
    plain?: boolean;
    size?: TypeAttributes.Size;
    /** 一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数。 应该返回一个 Boolean 值。 */
    disabledDate?: (time: Date) => boolean;
    shortcuts?: Shortcuts[];
    /** 是否追加到body下 */
    appendToBody?: boolean;
    /** 点击确定按钮的回调 */
    onOk?: () => void;
    onChange?: (value: string | Date | number | [string, string] | [Date, Date] | [number, number], event?: Event) => void;
    /** 格式化 */
    formatter?: (value: Dayjs, text: number) => React.ReactElement;

    /** 禁用 */
    disabled?: boolean;
    /** 范围选择时开始日期的占位内容 */
    startPlaceholder?: string;
    /** 范围选择时结束日期的占位内容 */
    endPlaceholder?: string;
    /** 选择范围时的分隔符 */
    rangeSeparator?: string;
    /** 在范围选择器里取消两个日期面板之间的联动 */
    unlinkPanels?: boolean;
    /** 选择日期后的默认时间值。 如未指定则默认时间值为 `00:00:00` */
    defaultTime?: Date;
}
