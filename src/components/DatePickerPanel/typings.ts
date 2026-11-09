import { DateRangeType, DateType, Shortcuts } from '@qsxy/element-plus-react/Calendar';
import { InputRef } from '@qsxy/element-plus-react/Input/typings';
import { AnimationEventProps, BaseProps, FormControlBaseProps, NativeProps } from '@qsxy/element-plus-react/types/common';
import { Dayjs } from 'dayjs';
import React, { RefObject } from 'react';

export type DatePickerRef = {
    input?: RefObject<InputRef>;
    focus: () => void;
    blur: () => void;
    handleOpen: () => void;
    handleClose: () => void;
};

// type ValueType = string | number | Date;

export interface DatePickerPanelProps extends Omit<FormControlBaseProps, 'name' | 'value' | 'defaultValue' | 'onChange'>, BaseProps, NativeProps, AnimationEventProps, CommonProps {
    /** 选中项绑定值 */
    value?: string | number | Date | number[] | string[] | Date[];
    /** 默认值 */
    defaultValue?: string | number | Date | number[] | string[] | Date[];
    /** 是否展示边框 */
    border?: boolean;
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
    /** 是否显示周数 */
    showWeekNumber?: boolean;
    /** 一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数。 应该返回一个 Boolean 值。 */
    disabledDate?: (time: Date) => boolean;
    shortcuts?: Shortcuts[];
    /** 点击确定按钮的回调 */
    onOk?: () => void;
    onChange?: (value: string | Date | number | number[] | string[] | Date[], formatDate?: string) => void;
    /** 格式化 */
    formatter?: (value: Dayjs, text: number, extra?: { view?: DateType | DateRangeType; defaultText?: string | number }) => React.ReactElement;
}

export interface DatePickerRangeProps extends Omit<FormControlBaseProps, 'name' | 'value' | 'defaultValue' | 'onChange'>, BaseProps, AnimationEventProps, CommonProps, NativeProps {
    /** 选中项绑定值 */
    value?: number[] | string[] | Date[];
    /** 默认值 */
    defaultValue?: number[] | string[] | Date[];
    /** 禁用 */
    disabled?: boolean;
    /** 显示类型 */
    type?: DateRangeType;
    /** 显示在输入框中的格式 */
    format?: string;
    /** 可选，绑定值的格式。 不指定则绑定值为 Date 对象 */
    valueFormat?: string;
    /** 在范围选择器里取消两个日期面板之间的联动 */
    unlinkPanels?: boolean;
    /** 是否显示周数 */
    showWeekNumber?: boolean;
    /** 设置ISO周数，其中1为星期一，7为星期日 */
    isoWeek?: boolean;
    /** 点击确定按钮的回调 */
    onOk?: () => void;
    /** 一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数。 应该返回一个 Boolean 值。 */
    disabledDate?: (time: Date) => boolean;
    onChange?: (value: number[] | string[] | Date[], event?: Event) => void;
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

export interface AllDatePickerPanelProps
    extends Omit<FormControlBaseProps, 'name' | 'value' | 'defaultValue' | 'onChange'>, BaseProps, NativeProps, AnimationEventProps, CommonProps {
    /** 选中项绑定值 */
    value?: string | Date | number | number[] | string[] | Date[];
    /** 默认值 */
    defaultValue?: string | Date | number | number[] | string[] | Date[];
    /** 是否显示边框 */
    border?: boolean;
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
    /** 是否显示周数 */
    showWeekNumber?: boolean;
    /** 一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数。 应该返回一个 Boolean 值。 */
    disabledDate?: (time: Date) => boolean;
    shortcuts?: Shortcuts[];
    /** 点击确定按钮的回调 */
    onOk?: () => void;
    onChange?: (value: string | Date | number | number[] | string[] | Date[], event?: Event) => void;
    /** 格式化 */
    formatter?: (value: Dayjs, text: number) => React.ReactElement;
    /** 禁用 */
    disabled?: boolean;
    /** 在范围选择器里取消两个日期面板之间的联动 */
    unlinkPanels?: boolean;
    /** 选择日期后的默认时间值。 如未指定则默认时间值为 `00:00:00` */
    defaultTime?: Date;
}
