/* eslint-disable lines-around-comment */
import { Dayjs } from 'dayjs';
import { RefObject } from 'react';
import { ValueRagne } from '../Calendar';
import { DatePickerProps, DatePickerRangeProps } from '../DatePicker';
import { InputRef } from '../Input';
import { PopperOptionRef } from '../Popper';
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
    inputInstance?: InputRef;
    popperInstRef: PopperOptionRef;
    getValue: () => string;
    setValue: (value: string) => void;
    // onClear: (event?: any) => void;
    setVisible: (value: boolean) => void;
};

export type TimePickerRangeRef = {
    popperInstRef: PopperOptionRef;
    getValue: () => [string, string];
    setValue: (value: [string, string]) => void;
    // onClear: (event?: any) => void;
    setVisible: (value: boolean) => void;
};

export type TimePickerProps = Omit<DatePickerProps, 'type' | 'instance'> & {
    disabledHours?: DisabledHours;
    disabledMinutes?: DisabledMinutes;
    disabledSeconds?: DisabledSeconds;
    /** 等价于原生 name 属性 */
    name?: string;
    /** 选中项绑定值 */
    value?: string;
    /** 默认值 */
    defaultValue?: string;
};

export type TimePickerRangeProps = Omit<DatePickerRangeProps, 'type' | 'instance'> & {
    disabledHours?: DisabledHours;
    disabledMinutes?: DisabledMinutes;
    disabledSeconds?: DisabledSeconds;
    instance?: RefObject<TimePickerRangeRef>;
};

export interface TimeSpinnerProps extends BaseProps, NativeProps, AnimationEventProps {
    // eslint-disable-next-line lines-around-comment

    /** 值 */
    value: Dayjs;

    disabledHours?: DisabledHours;
    disabledMinutes?: DisabledMinutes;
    disabledSeconds?: DisabledSeconds;

    showSeconds?: boolean;

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
        Omit<TimePickerRangeProps, 'instance' | 'value' | 'onChange'> {
    value: ValueRagne;
    onChange: (value: ValueRagne, params?: ChangeParams) => void;
    /** 是否显示 */
    visible: boolean;
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
