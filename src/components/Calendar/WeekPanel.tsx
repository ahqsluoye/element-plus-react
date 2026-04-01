import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import IsBetween from 'dayjs/plugin/isBetween';
import IsoWeek from 'dayjs/plugin/isoWeek';
import React, { FC, useCallback, useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useConfigProvider } from '../ConfigProvider/ConfigProviderContext';
import { useClassNames } from '../hooks';
import CalendarContext from './CalendarContext';
import { Cell, CellType, WeekPanelProps } from './typings';
import { initDate } from './util';

dayjs.extend(IsoWeek);
dayjs.extend(IsBetween);

const WeekPanel: FC<WeekPanelProps> = props => {
    const { value, valueRange, onPickDate, onPickDateRange } = props;
    const { b, e, be } = useClassNames('date-table');
    const { value: valueProp, dateType, isoWeek, disabledDate, formatter } = useContext(CalendarContext);

    const { locale } = useConfigProvider();
    const { t } = useTranslation();

    // 当前日期
    const currentDate = useMemo(() => {
        if (value.isValid()) {
            return value;
        }
        return initDate();
    }, [value]);

    // // 日期范围时的开始日期，与悬浮日期动态比较获取
    // const startDate = useMemo(() => {
    //     if (isNotEmpty(valueRange[0])) {
    //         if (isNotEmpty(valueRange[1])) {
    //             return valueRange[1].isSame(valueRange[0]) || valueRange[1]?.isAfter(valueRange[0]) ? valueRange[0] : valueRange[1];
    //         }
    //         return valueRange[0];
    //     }
    //     return null;
    // }, [valueRange]);

    // // 日期范围时的结束日期
    // // 有默认日期时则为默认日期，没有时根据悬浮日期与开始日期动态比较获取
    // const endDate = useMemo(() => {
    //     if (isNotEmpty(valueRange[1])) {
    //         return valueRange[1];
    //     } else {
    //         if (isNotEmpty(valueRange[0])) {
    //             if (isNotEmpty(valueRange[2])) {
    //                 return valueRange[2].isSame(valueRange[0]) || valueRange[2]?.isBefore(valueRange[0]) ? valueRange[0] : valueRange[2];
    //             }
    //             return valueRange[0];
    //         }
    //         return null;
    //     }
    // }, [valueRange]);

    // 日期范围时的开始日期，与悬浮日期动态比较获取
    const [startDate, setSartDate] = useState(null);
    // 日期范围时的结束日期
    const [endDate, setEndDate] = useState(null);

    // 今天
    const today = useMemo(() => {
        return dayjs();
    }, []);

    // 周数
    const WEEK_DAYS = useMemo(() => {
        return isoWeek
            ? [
                  t('el.datepicker.weeks.mon', { lng: locale }),
                  t('el.datepicker.weeks.tue', { lng: locale }),
                  t('el.datepicker.weeks.wed', { lng: locale }),
                  t('el.datepicker.weeks.thu', { lng: locale }),
                  t('el.datepicker.weeks.fri', { lng: locale }),
                  t('el.datepicker.weeks.sat', { lng: locale }),
                  t('el.datepicker.weeks.sun', { lng: locale }),
              ]
            : [
                  t('el.datepicker.weeks.sun', { lng: locale }),
                  t('el.datepicker.weeks.mon', { lng: locale }),
                  t('el.datepicker.weeks.tue', { lng: locale }),
                  t('el.datepicker.weeks.wed', { lng: locale }),
                  t('el.datepicker.weeks.thu', { lng: locale }),
                  t('el.datepicker.weeks.fri', { lng: locale }),
                  t('el.datepicker.weeks.sat', { lng: locale }),
              ];
    }, [isoWeek, locale, t]);

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
            const classes: string[] = [];
            if (type === 'current') {
                classes.push(disabled ? 'normal disabled' : 'available');
                if (date.isSame(today, 'day')) {
                    classes.push('today');
                }
            } else {
                classes.push(disabled ? 'normal disabled' : `${type}-month`);
            }
            // 日期范围时的样式
            if (dateType === 'week') {
                if (valueRange[0] && date.isSame(valueRange[0], 'day')) {
                    classes.push('in-range start-date');
                } else if (valueRange[1] && date.isSame(valueRange[1], 'day')) {
                    classes.push('in-range end-date');
                } else if (
                    (valueRange[0] && valueRange[1] && date.isBetween(valueRange[0], valueRange[1], 'day', '()')) ||
                    (startDate && endDate && date.isBetween(startDate, endDate, 'day', '[]'))
                ) {
                    classes.push('in-range');
                }
            } else {
                if (valueProp && date.isSame(valueProp, 'day')) {
                    classes.push('current');
                }
            }
            return classNames(...classes);
        },
        [getFormattedDate, dateType, today, valueRange, startDate, endDate, valueProp],
    );

    /**
     * 悬浮日期回调
     * @param param0
     */
    const onHoverDate = useCallback(
        ({ text, type }: Cell) => {
            if (dateType === 'week') {
                const date = getFormattedDate(text, type);
                setSartDate(isoWeek ? date.isoWeekday(1) : date.isoWeekday(0));
                setEndDate(isoWeek ? date.isoWeekday(7) : date.isoWeekday(6));
                // console.log(date.isoWeekday(1).format('YYYY-MM-DD'), date.isoWeekday(7).format('YYYY-MM-DD'));
            }
        },
        [dateType, getFormattedDate, isoWeek],
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
            onPickDateRange?.([isoWeek ? date.isoWeekday(1) : date.isoWeekday(0), isoWeek ? date.isoWeekday(7) : date.isoWeekday(6)]);
        },
        [getFormattedDate, isoWeek, onPickDate, onPickDateRange],
    );

    return (
        <div className={classNames(be('picker-panel', 'content', false), props.className)}>
            {props.children}
            <table cellSpacing="0" cellPadding="0" className={classNames(b(), 'is-week-mode')}>
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

WeekPanel.displayName = 'Calendar.WeekPanel';

export default WeekPanel;
