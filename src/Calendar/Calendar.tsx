import classNames from 'classnames';
import dayjs, { Dayjs, ManipulateType } from 'dayjs';
import head from 'lodash/head';
import last from 'lodash/last';
import React, { FC, forwardRef, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { isNotEmpty } from '../Util';
import { useClassNames } from '../hooks';
import CalendarContext from './CalendarContext';
import DatePanel from './DatePanel';
import DateRangePanel from './DateRangePanel';
import Footer from './Footer';
import Header from './Header';
import MonthPanel from './MonthPanel';
import MonthRangePanel from './MonthRangePanel';
import ShortCuts from './ShortCuts';
import WeekPanel from './WeekPanel';
import YearPanel from './YearPanel';
import YearRangePanel from './YearRangePanel';
import { CalendarProps, DateRangeType, DateType, RangePosition, ValueRagne, ValueRagneTemp } from './typings';
import { initDate } from './util';

const Calendar: FC<CalendarProps> = forwardRef<HTMLDivElement, CalendarProps>((props, ref) => {
    const {
        initialValue,
        value: valueProp,
        valueRange: valueRangeProp,
        dateType,
        showToday,
        showNow,
        popperInstRef,
        onChange,
        onChangeRange,
        shortcuts,
    } = useContext(CalendarContext);
    const { wb, e } = useClassNames('picker-panel');

    // 单日期的默认日期
    const [value, setValue] = useState(valueProp);

    useEffect(() => {
        setValue(valueProp);
    }, [valueProp]);

    // 日期范围的默认日期
    const [valueRange, setValueRange] = useState<ValueRagne>(valueRangeProp);
    // 日期范围的选中的日期，三个值分别为左边日期，右边日期，以及鼠标悬浮的临时值
    const [valueRangeTemp, setValueRangeTemp] = useState<ValueRagneTemp>(
        initialValue instanceof Array && isNotEmpty(initialValue) ? [...valueRangeProp, null] : [null, null, null],
    );
    // 日期面板类型
    const [view, setView] = useState<DateType | DateRangeType>(dateType);
    // 日期范围组件的位置，分别为左和右
    const [rangePosition, setRangePosition] = useState<RangePosition>('left');

    // 默认日期，字符串格式
    const defaultValue = useMemo(() => {
        if (['daterange', 'monthrange', 'yearrange'].includes(dateType)) {
            return rangePosition === 'left' ? head(valueRange) : last(valueRange);
        }
        return value;
    }, [dateType, value, rangePosition, valueRange]);

    // 当前日期，dayjs对象
    const currentDate = useMemo(() => {
        if (defaultValue.isValid()) {
            return defaultValue;
        }
        return initDate();
    }, [defaultValue]);

    // 当前年份
    const currentYear = useMemo(() => {
        if (view === 'year') {
            const curYear: number = currentDate.year();
            const position: number = currentDate.year() % 10;
            return `${curYear - position} ~ ${curYear + (9 - position)}`;
        } else {
            return currentDate.year() + '年';
        }
    }, [currentDate, view]);

    // 是否要选择月份
    const hasMonth = useMemo(() => {
        return dateType !== 'year';
    }, [dateType]);

    // 当前面板是否是范围组件
    const isRange = useMemo(() => {
        return ['daterange', 'monthrange', 'yearrange'].includes(view);
    }, [view]);

    // 切换年月
    const switchDate = useCallback(
        (duration: number, unit?: ManipulateType) => {
            let date: Dayjs;
            if (view === 'year') {
                date = currentDate.add(duration * 10, 'y');
                setValue(date);
            } else {
                date = currentDate.add(duration, unit);
                setValue(date);
            }

            // 日期范围框
            if (['daterange', 'monthrange', 'yearrange'].includes(dateType)) {
                const startDate = dayjs(valueRange[0]);
                const endDate = dayjs(valueRange[1]);
                switch (rangePosition) {
                    case 'left':
                        if (date.isAfter(endDate)) {
                            // @ts-ignore
                            setValueRange([date, date.add(1, view)]);
                        } else {
                            setValueRange([date, endDate]);
                        }
                        break;
                    case 'right':
                        if (date.isBefore(startDate)) {
                            // @ts-ignore
                            setValueRange([date.subtract(1, view), date]);
                        } else {
                            setValueRange([startDate, date]);
                        }
                        break;

                    default:
                        break;
                }
            }
        },
        [view, dateType, currentDate, valueRange, rangePosition],
    );

    // 切换日期面板的回调
    const onToggleView = useCallback(
        (viewType: DateType, position?: RangePosition) => {
            setView(viewType);
            popperInstRef?.current?.update();
            setRangePosition(position);
        },
        [popperInstRef],
    );

    /**
     * 选中年后的回调
     * @param date
     */
    const onPickYear = useCallback(
        (date: Dayjs) => {
            if (hasMonth) {
                if (dateType === 'daterange') {
                    setValueRange(rangePosition === 'left' ? [date, valueRange[1]] : [valueRange[0], date]);
                }
                setValue(date);

                // 如果是日期范围类型，就要判断左右日期的大小，如果不是左边日期小于右边日期的话，进行修正
                if (dateType === 'monthrange') {
                    const startDate = dayjs(valueRange[0]);
                    const endDate = dayjs(valueRange[1]);
                    switch (rangePosition) {
                        case 'left':
                            if (date.isAfter(endDate)) {
                                setValueRange([date, date.add(1, 'y')]);
                            } else {
                                setValueRange([date, endDate]);
                            }
                            break;
                        case 'right':
                            if (date.isBefore(startDate)) {
                                setValueRange([date.subtract(1, 'y'), date]);
                            } else {
                                setValueRange([startDate, date]);
                            }
                            break;

                        default:
                            break;
                    }
                    setView('monthrange');
                } else {
                    setView('month');
                }
                popperInstRef?.current?.update();
            } else {
                onChange?.(date);
            }
        },
        [dateType, hasMonth, onChange, popperInstRef, rangePosition, valueRange],
    );

    /**
     * 选中月份后的回调
     * @param date
     */
    const onPickMonth = useCallback(
        (date: Dayjs, month: number) => {
            if (dateType !== 'month') {
                setView(dateType);
                setValue(date);
                popperInstRef?.current?.update();
                // 如果是日期范围类型，就要判断左右日期的大小，如果不是左边日期小于右边日期的话，进行修正
                if (dateType === 'daterange') {
                    const startDate = dayjs(valueRange[0]);
                    const endDate = dayjs(valueRange[1]);
                    switch (rangePosition) {
                        case 'left':
                            if (date.isAfter(endDate)) {
                                setValueRange([date, date.add(1, 'M')]);
                            } else {
                                setValueRange([date, endDate]);
                            }
                            break;
                        case 'right':
                            if (date.isBefore(startDate)) {
                                setValueRange([date.subtract(1, 'M'), date]);
                            } else {
                                setValueRange([startDate, date]);
                            }
                            break;

                        default:
                            break;
                    }
                }
            } else {
                // 如果日期类型就是月份的话，直接返回值
                onChange?.(date, { month });
            }
        },
        [dateType, onChange, popperInstRef, rangePosition, valueRange],
    );

    /**
     * 选中日期后的回调
     * @param date
     */
    const onPickDate = useCallback(
        (date: Dayjs) => {
            onChange?.(date);
        },
        [onChange],
    );

    /**
     * 选中范围日期后的回调
     * @param date 日期范围
     * @param finish 是否两个值都选中
     */
    const onPickDateRange = useCallback(
        (date: ValueRagne, finish: boolean) => {
            setValueRange(date);
            if (finish) {
                onChangeRange?.(date, finish);
            }
        },
        [onChangeRange],
    );

    /**
     * 选中范围日期后的回调
     * @param date 日期范围
     * @param finish 是否两个值都选中
     */
    const onPickWeek = useCallback((date: ValueRagne) => {
        setValueRange(date);
    }, []);

    /**
     * 选择范围日期时记录临时日期
     * @param v
     */
    const onHoverDate = useCallback((v: ValueRagneTemp) => {
        setValueRangeTemp(v);
    }, []);

    return (
        <div
            className={classNames(
                wb(['daterange', 'monthrange', 'yearrange'].includes(view) ? 'date-range-picker' : 'date-picker', false),
                {
                    'has-time': props.hasTime,
                    'has-sidebar': isNotEmpty(shortcuts),
                },
                props.className,
            )}
            style={props.style}
            ref={ref}
        >
            <div className={e`body-wrapper`}>
                <ShortCuts shortcuts={shortcuts} onChange={onChange} e={e} />
                <div className={e`body`}>
                    {props.children}

                    {!isRange && (
                        <Header
                            year={currentYear}
                            month={`${currentDate.month() + 1}月`}
                            showMonth={['date', 'dates', 'week'].includes(view)}
                            border={['year', 'month'].includes(view)}
                            onToggleView={onToggleView}
                            onMoveBackward={() => switchDate(-1, 'M')}
                            onMoveForward={() => switchDate(1, 'M')}
                            onMoveBackwards={() => switchDate(-1, 'y')}
                            onMoveForwards={() => switchDate(1, 'y')}
                        />
                    )}

                    {view === 'year' && <YearPanel value={defaultValue} onPickYear={onPickYear} />}
                    {view === 'month' && <MonthPanel value={defaultValue} onPickMonth={onPickMonth} />}
                    {view === 'date' && <DatePanel value={defaultValue} onPickDate={onPickDate} />}
                    {view === 'week' && <WeekPanel value={defaultValue} valueRange={valueRange} onPickDate={onPickDate} onPickDateRange={onPickWeek} />}
                    {view === 'daterange' && (
                        <DateRangePanel value={valueRange} valueRange={valueRangeTemp} onToggleView={onToggleView} onPickDateRange={onPickDateRange} onHoverDate={onHoverDate} />
                    )}
                    {view === 'monthrange' && (
                        <MonthRangePanel value={valueRange} valueRange={valueRangeTemp} onToggleView={onToggleView} onPickDateRange={onPickDateRange} onHoverDate={onHoverDate} />
                    )}
                    {view === 'yearrange' && (
                        <YearRangePanel value={valueRange} valueRange={valueRangeTemp} onToggleView={onToggleView} onPickDateRange={onPickDateRange} onHoverDate={onHoverDate} />
                    )}
                </div>
            </div>
            {(showToday || showNow) && <Footer />}
        </div>
    );
});

Calendar.displayName = 'ElCalendar';

export default Calendar;
