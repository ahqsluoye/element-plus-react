import { PopperOptionRef } from '@qsxy/element-plus-react/Popper/typings';
import { Dayjs } from 'dayjs';
import React, { createContext, RefObject } from 'react';
import { DateRangeType, DateType, Shortcuts } from './typings';

export interface ChangeParams {
    month?: number;
    defaultTime?: boolean;
    values?: Dayjs[];
}

export interface CalendarContextProps {
    initialValue?: string | string[];
    value?: Dayjs;
    values?: Dayjs[];
    valueRange?: Dayjs[];
    /** 显示类型 */
    dateType?: DateType | DateRangeType;
    /** 是否展示“今天”按钮 */
    showToday?: boolean;
    /** 是否展示“此刻”按钮 */
    showNow?: boolean;
    /** 是否展示“确认”按钮 */
    showConfirm?: boolean;
    /** 设置ISO周数，其中1为星期一，7为星期日 */
    isoWeek?: boolean;
    /** 在范围选择器里取消两个日期面板之间的联动 */
    unlinkPanels?: boolean;
    popperInstRef?: RefObject<PopperOptionRef>;
    /** 快捷方式 */
    shortcuts?: Shortcuts[];
    /** 一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数。 应该返回一个 Boolean 值。 */
    disabledDate?: (time: Date) => boolean;
    /** 关闭下拉框方法 */
    close?: () => void;
    /** 单选框提交数据方法 */
    onChange?: (value: Dayjs | Dayjs[], params?: ChangeParams) => void;
    /** 日期范围框提交数据方法 */
    onChangeRange?: (value: Dayjs[], finish: boolean) => void;
    formatter?: (value: Dayjs, text: number) => React.ReactElement;
}

const CalendarContext = createContext<CalendarContextProps>({
    value: null,
    values: [],
    dateType: null,
    showToday: false,
    showNow: false,
    showConfirm: false,
    isoWeek: true,
    unlinkPanels: false,
    popperInstRef: null,
    onChange: null,
    shortcuts: [],
});

export default CalendarContext;
