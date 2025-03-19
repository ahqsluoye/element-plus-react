import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import IsBetween from 'dayjs/plugin/isBetween';
import IsoWeek from 'dayjs/plugin/isoWeek';
import React, { FC, useCallback, useContext, useMemo } from 'react';
import { isEmpty, isNotEmpty } from '../Util';
import { useClassNames } from '../hooks';
import CalendarContext from './CalendarContext';
import { Cell, CellType, DatePanelProps } from './typings';
import { initDate } from './util';

dayjs.extend(IsoWeek);
dayjs.extend(IsBetween);

const DatePanel: FC<DatePanelProps> = props => {
    const { value, valueRange, onPickDate } = props;
    const { b, e, be } = useClassNames('date-table');
    const { value: valueProp, dateType, isoWeek, disabledDate, formatter } = useContext(CalendarContext);

    // 当前日期
    const currentDate = useMemo(() => {
        if (value.isValid()) {
            return value;
        }
        return initDate();
    }, [value]);

    /**
     * 当两个日期同时为空和不为空时，锁定鼠标悬浮样式
     */
    const lockHover = useMemo(() => {
        return dateType === 'daterange' && ((isNotEmpty(valueRange[0]) && isNotEmpty(valueRange[1])) || (isEmpty(valueRange[0]) && isEmpty(valueRange[1])));
    }, [dateType, valueRange]);

    // 日期范围时的开始日期，与悬浮日期动态比较获取
    const startDate = useMemo(() => {
        if (dateType === 'daterange' && isNotEmpty(valueRange[0])) {
            if (isNotEmpty(valueRange[2])) {
                return valueRange[2].isSame(valueRange[0]) || valueRange[2]?.isAfter(valueRange[0]) ? valueRange[0] : valueRange[2];
            }
            return valueRange[0];
        }
        return null;
    }, [dateType, valueRange]);

    // 日期范围时的结束日期
    // 有默认日期时则为默认日期，没有时根据悬浮日期与开始日期动态比较获取
    const endDate = useMemo(() => {
        if (dateType === 'daterange') {
            if (isNotEmpty(valueRange[1])) {
                return valueRange[1];
            } else {
                if (isNotEmpty(valueRange[0])) {
                    if (isNotEmpty(valueRange[2])) {
                        return valueRange[2].isSame(valueRange[0]) || valueRange[2]?.isBefore(valueRange[0]) ? valueRange[0] : valueRange[2];
                    }
                    return valueRange[0];
                }
                return null;
            }
        }
    }, [dateType, valueRange]);

    // 今天
    const today = useMemo(() => {
        return dayjs();
    }, []);

    // 周数
    const WEEK_DAYS = useMemo(() => {
        return isoWeek ? ['一', '二', '三', '四', '五', '六', '日'] : ['日', '一', '二', '三', '四', '五', '六'];
    }, [isoWeek]);

    const rows: Cell[] = useMemo(() => {
        const TOTAL_DAYS = 7 * 6;
        const days: Cell[] = [];
        // 递增本月天数
        let dayUp = 1;

        // 本月第一天
        const firstDayOfMonth: Dayjs = currentDate.date(1);
        // 上月显示天数
        const prevMonthDays: number = ((): number => {
            // 如果本月第一天刚好处在周日或者iso周的周一时，那么上月天数就是0，所以将上月天数改为显示一周
            const day = isoWeek ? firstDayOfMonth.isoWeekday() - 1 : firstDayOfMonth.day();
            return day === 0 ? 7 : day;
        })();
        // 本月天数
        const curMonthDays: number = currentDate.daysInMonth();
        // 剩余为下月显示天数
        const nextMonthDays: number = TOTAL_DAYS - prevMonthDays - curMonthDays;
        // 本月最后一天
        const lastDayOfMonth: Dayjs = currentDate.date(curMonthDays);
        // 显示6周，所以是42天
        for (let i = 0; i < 42; i++) {
            // 第一行肯定有上月天数，先遍历上月的
            if (i === 0 && i < prevMonthDays) {
                for (let j = prevMonthDays; j > 0; j--) {
                    const date = firstDayOfMonth.subtract(j, 'd');
                    days.push({
                        text: date.date(),
                        type: 'prev',
                        disabled: disabledDate && disabledDate(date.toDate()),
                    });
                    i++;
                }
            } else if (dayUp <= curMonthDays) {
                const date = firstDayOfMonth.add(dayUp - 1, 'd');
                days.push({
                    text: dayUp++,
                    type: 'current',
                    disabled: disabledDate && disabledDate(date.toDate()),
                });
            } else {
                // 遍历下月天数
                for (let j = 0; j < nextMonthDays; j++) {
                    const date = lastDayOfMonth.add(j + 1, 'd');
                    days.push({
                        text: date.date(),
                        type: 'next',
                        disabled: disabledDate && disabledDate(date.toDate()),
                    });
                    i++;
                }
            }
        }
        return days;
    }, [currentDate, disabledDate, isoWeek]);

    const getFormattedDate = useCallback(
        (day: number, type: CellType): Dayjs => {
            switch (type) {
                case 'prev':
                    return currentDate.startOf('month').subtract(1, 'month').date(day);
                case 'next':
                    return currentDate.startOf('month').add(1, 'month').date(day);
                case 'current':
                    return currentDate.date(day);
            }
        },
        [currentDate],
    );

    const getCellClass = useCallback(
        ({ text, type, disabled }: Cell): string => {
            const date = getFormattedDate(text, type);
            if (type === 'current') {
                const classes: string[] = [disabled ? 'normal disabled' : 'available'];
                if (date.isSame(today, 'day')) {
                    classes.push('today');
                }
                // 日期范围时的样式
                if (dateType === 'daterange') {
                    if (date.isSame(endDate) && date.isSame(startDate)) {
                        classes.push('in-range start-date end-date');
                    } else if (date.isSame(startDate)) {
                        classes.push('in-range start-date');
                    } else if (date.isBetween(startDate, endDate, null, '()')) {
                        classes.push('in-range');
                    } else if (date.isSame(endDate)) {
                        classes.push('in-range end-date');
                    }
                } else {
                    if (valueProp && date.isSame(valueProp, 'day')) {
                        classes.push('current');
                    }
                }
                return classNames(...classes);
            } else {
                return disabled ? 'normal disabled' : `${type}-month`;
            }
        },
        [getFormattedDate, today, dateType, startDate, endDate, valueProp],
    );

    /**
     * 悬浮日期回调
     * @param param0
     */
    const onHoverDate = useCallback(
        ({ text, type }: Cell) => {
            if (dateType === 'daterange') {
                if (!lockHover) {
                    const date = getFormattedDate(text, type);
                    onPickDate?.(date, true);
                } else {
                    onPickDate?.(null, true);
                }
            }
        },
        [dateType, getFormattedDate, lockHover, onPickDate],
    );

    /**
     * 选中日期回调
     * @param param0
     */
    const handlePickDate = useCallback(
        ({ text, type, disabled }: Cell) => {
            if (disabled) {
                return;
            }
            const date = getFormattedDate(text, type);
            onPickDate?.(date);
        },
        [getFormattedDate, onPickDate],
    );

    return (
        <div className={classNames(be('picker-panel', 'content', false), props.className)}>
            {props.children}
            <table cellSpacing="0" cellPadding="0" className={b()}>
                <tbody>
                    <tr>
                        {WEEK_DAYS.map(item => {
                            return <th key={item}>{item}</th>;
                        })}
                    </tr>
                    {new Array(6).fill('').map((row, i) => {
                        return (
                            <tr key={i} className={e('row')}>
                                {rows.slice(i * 7, (i + 1) * 7).map(cell => {
                                    return (
                                        <td key={cell.text} className={getCellClass(cell)} onClick={() => handlePickDate(cell)} onMouseEnter={() => onHoverDate(cell)}>
                                            {formatter ? (
                                                formatter(getFormattedDate(cell.text, cell.type), cell.text)
                                            ) : (
                                                <div className={b('cell')}>
                                                    <span className={be('cell', 'text')}>{cell.text}</span>
                                                </div>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

DatePanel.displayName = 'Calendar.DatePanel';

export default DatePanel;
