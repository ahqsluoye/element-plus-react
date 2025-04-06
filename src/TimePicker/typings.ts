import { Dayjs } from 'dayjs';
import React, { RefObject } from 'react';
import { ValueRagne } from '../Calendar';
import { AllDatePickerProps, DatePickerProps, DatePickerRangeProps } from '../DatePicker/typings';
import { InputRef } from '../Input/typings';
import { AnimationEventProps, BaseProps, NativeProps } from '../types/common';

export type RoleType = 'start' | string;
export type Compare = any;
export type TimeType = 'hours' | 'minutes' | 'seconds';

export type DisabledHours = (role?: RoleType, compare?: Compare) => number[];
export type DisabledMinutes = (hour: number, role?: RoleType, compare?: Compare) => number[];
export type DisabledSeconds = (hour: number, minute: number, role?: RoleType, compare?: Compare) => number[];

export interface TimeList {
    value: number;
    disabled: boolean;
}

export interface ChangeParams {
    month?: number;
    defaultTime?: boolean;
}

export type TimePickerRef = {
    input?: RefObject<InputRef>;
    focus: () => void;
    blur: () => void;
    handleOpen: () => void;
    handleClose: () => void;
};

// export type TimePickerRangeRef = {
//     ref: React.MutableRefObject<HTMLDivElement>;
//     popperInstRef: PopperOptionRef;
//     getValue: () => [string, string];
//     setValue: (value: [string, string]) => void;
//     setVisible: (value: boolean) => void;
// };

export type CommonProps = {
    /** 自定义前缀图标 */
    prefixIcon?: string | React.ReactElement;
    /** 可清空的模式下用户点击清空按钮时触发 */
    onClear?: () => void;
    /** 当 TimePicker 的下拉列表出现/消失时触发 */
    onVisibleChange?: (visibility: boolean) => void;
};

export type TimePickerProps = Omit<DatePickerProps, 'type'> &
    CommonProps & {
        disabledHours?: DisabledHours;
        disabledMinutes?: DisabledMinutes;
        disabledSeconds?: DisabledSeconds;
    };

export type TimePickerRangeProps = Omit<DatePickerRangeProps, 'type'> &
    CommonProps & {
        disabledHours?: DisabledHours;
        disabledMinutes?: DisabledMinutes;
        disabledSeconds?: DisabledSeconds;
    };

export type AllTimePickerProps = Omit<AllDatePickerProps, 'type'> &
    CommonProps & {
        disabledHours?: DisabledHours;
        disabledMinutes?: DisabledMinutes;
        disabledSeconds?: DisabledSeconds;
        /** 是否为时间范围选择 */
        isRange?: boolean;
    };

export interface TimeSpinnerProps extends BaseProps, NativeProps, AnimationEventProps {
    /** 值 */
    value: Dayjs;
    disabledHours?: DisabledHours;
    disabledMinutes?: DisabledMinutes;
    disabledSeconds?: DisabledSeconds;
    showSeconds?: boolean;
    /** 是否为时间范围选择 */
    isRange?: boolean;
    role?: RoleType;
    /** 单选框提交数据方法 */
    onChange: (value: Dayjs, params?: ChangeParams) => void;
    setSelectionRange?: (start: number, end: number, pos?: 'min' | 'max') => void;
}

export interface TimePanelProps extends BaseProps, NativeProps, AnimationEventProps, TimeSpinnerProps {
    /** 是否显示 */
    visible?: boolean;
    /**  */
    referenceElement: RefObject<HTMLElement> | (() => RefObject<HTMLElement>);
    /** 关闭时回调函数 */
    onDestroy: () => void;
    /** 单选框提交数据方法 */
    onOk: () => void;
}

export interface TimeRangePanelProps
    extends BaseProps,
        NativeProps,
        AnimationEventProps,
        Omit<TimeSpinnerProps, 'value' | 'onChange'>,
        Omit<TimePickerRangeProps, 'value' | 'onChange'> {
    value: ValueRagne;
    onChange: (value: ValueRagne, params?: ChangeParams) => void;
    /** 是否显示 */
    visible: boolean;
    setStartSelectionRange?: (start: number, end: number, pos?: 'min' | 'max') => void;
    setEndSelectionRange?: (start: number, end: number, pos?: 'min' | 'max') => void;
    /**  */
    // referenceElement: RefObject<HTMLElement>;
    /** 关闭时回调函数 */
    onDestroy?: () => void;
    /** 单选框提交数据方法 */
    onOk: () => void;
}

export interface TimePanelRef {
    ref: HTMLDivElement;
    adjustSpinners: () => void;
}

export interface TimeRangePanelRef {
    ref: HTMLDivElement;
    // adjustSpinners: () => void;
}

export interface SpinnerRef {
    adjustSpinners: () => void;
}
