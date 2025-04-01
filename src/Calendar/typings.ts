import { Dayjs } from 'dayjs';
import { BaseProps, ComponentChildren, NativeProps } from '../types/common';

export type DateType = 'year' | 'month' | 'date' | 'dates' | 'week' | 'datetime' | 'datetimerange' | 'time';
export type DateRangeType = 'daterange' | 'monthrange' | 'yearrange';
export type RangePosition = 'left' | 'right';
export type ValueRagne = [value: Dayjs, value: Dayjs];
export type ValueRagneTemp = [value: Dayjs, value: Dayjs, value: Dayjs];
/** 快捷方式 */
export interface Shortcuts {
    text: string;
    value: Date | (() => Date);
}

export interface CalendarProps extends BaseProps, NativeProps {
    /** 是否显示时间 */
    hasTime?: boolean;
}

export interface HeaderProps {
    /**  */
    prefix?: string;

    /** 年 */
    year?: number | string;

    /** 月 */
    month?: number | string;

    /** 是否禁用 */
    disabled?: boolean;

    /**  */
    // showSwitchMonth?: boolean;

    /**  */
    // showDate?: boolean;

    /** 是否显示月份 */
    showMonth?: boolean;

    /** 是否显示后退按钮 */
    showBackward?: boolean;

    /** 是否显示前进按钮 */
    showForward?: boolean;

    /** 是否纯文本模式 */
    plain?: boolean;

    /** 是否显示边框 */
    border?: boolean;

    postion?: RangePosition;
    disabledForward?: boolean;
    disabledBackward?: boolean;
    disabledForwards?: boolean;
    disabledBackwards?: boolean;
    /**  */
    onToggleView?: (type: DateType, postion?: RangePosition) => void;

    /**  */
    onMoveBackward?: () => void;

    /**  */
    onMoveForward?: () => void;

    /**  */
    onMoveBackwards?: () => void;

    /**  */
    onMoveForwards?: () => void;
}

export type YearPanelProps = {
    value: Dayjs;
    className?: string;
    valueRange?: ValueRagneTemp;
    onSwitchDate?: (value: string) => void;
    onPickYear?: (value?: Dayjs, year?: number, hover?: boolean) => void;
    children?: ComponentChildren;
};

export type MonthPanelProps = {
    value: Dayjs;

    valueRange?: ValueRagneTemp;

    className?: string;

    onSwitchDate?: (value: string) => void;

    onPickMonth?: (value?: Dayjs, month?: number, hover?: boolean) => void;

    children?: ComponentChildren;
};

export type MonthRangePanelProps = {
    value: ValueRagne;

    valueRange: ValueRagneTemp;

    className?: string;

    onToggleView?: (viewType: DateType) => void;

    onSwitchDate?: (value: string) => void;

    onPickDateRange?: (value: ValueRagne, finish: boolean) => void;

    onHoverDate?: (valueRange?: ValueRagneTemp) => void;
};

export type DatePanelProps = {
    value: Dayjs;

    valueRange?: ValueRagneTemp;

    className?: string;

    onSwitchDate?: (value: string) => void;

    onPickDate?: (value: Dayjs, hover?: boolean) => void;

    children?: ComponentChildren;
};

export type WeekPanelProps = {
    value: Dayjs;

    valueRange?: ValueRagne;

    className?: string;

    onSwitchDate?: (value: string) => void;

    onPickDate?: (value: Dayjs, hover?: boolean) => void;

    onPickDateRange?: (value: ValueRagne) => void;

    children?: ComponentChildren;
};

export type DateRangePanelProps = {
    value: ValueRagne;

    valueRange: ValueRagneTemp;

    className?: string;

    onToggleView?: (viewType: DateType) => void;

    onSwitchDate?: (value: string) => void;

    onPickDateRange?: (value: ValueRagne, finish: boolean) => void;

    onHoverDate?: (valueRange?: ValueRagneTemp) => void;
};

export type CellType = 'next' | 'prev' | 'current' | 'special';

export interface Cell {
    text: number;
    type: CellType;
    disabled: boolean;
}
