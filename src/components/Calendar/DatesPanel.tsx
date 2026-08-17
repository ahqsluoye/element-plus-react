import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import { useLocale } from '@qsxy/element-plus-react/hooks/useLocale';
import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import IsBetween from 'dayjs/plugin/isBetween';
import IsoWeek from 'dayjs/plugin/isoWeek';
import React, { use, useCallback, useMemo } from 'react';
import CalendarContext from './CalendarContext';
import { Cell, CellType } from './typings';
import { initDate } from './util';

dayjs.extend(IsoWeek);
dayjs.extend(IsBetween);

type Props = {
    value: Dayjs[];
    className?: string;
    children?: React.ReactNode;
    onPickDate: (dates: Dayjs[]) => void;
};

const DatesPanel = (props: Props) => {
    const { value, onPickDate } = props;
    const { b, e, be } = useClassNames('date-table');
    const { value: valueProp, dateType, isoWeek, disabledDate, formatter } = use(CalendarContext);

    const { t } = useLocale();

    // 当前日期
    const currentDate = useMemo(() => {
        if (dateType === 'dates') {
            if (value.length > 0) {
                return value[0];
            }
            return initDate();
        }
        return initDate();
    }, [dateType, value]);

    // 今天
    const today = useMemo(() => {
        return dayjs();
    }, []);

    // 周数
    const WEEK_DAYS = useMemo(() => {
        return isoWeek
            ? [
                  t('el.datepicker.weeks.mon'),
                  t('el.datepicker.weeks.tue'),
                  t('el.datepicker.weeks.wed'),
                  +t('el.datepicker.weeks.thu'),
                  t('el.datepicker.weeks.fri'),
                  t('el.datepicker.weeks.sat'),
                  t('el.datepicker.weeks.sun'),
              ]
            : [
                  t('el.datepicker.weeks.sun'),
                  t('el.datepicker.weeks.mon'),
                  t('el.datepicker.weeks.tue'),
                  t('el.datepicker.weeks.wed'),
                  t('el.datepicker.weeks.thu'),
                  t('el.datepicker.weeks.fri'),
                  t('el.datepicker.weeks.sat'),
              ];
    }, [isoWeek, t]);

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
                if (dateType === 'dates') {
                    if (value.some(item => item.isSame(date, 'day'))) {
                        classes.push('current');
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
        [getFormattedDate, today, dateType, value, valueProp],
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
            if (value.some(item => item.isSame(date, 'date'))) {
                onPickDate(value.filter(item => item.isSame(date, 'date') === false));
            } else {
                onPickDate?.([...value, date]);
            }
        },
        [getFormattedDate, onPickDate, value],
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
                                        <td key={cell.text} className={getCellClass(cell)} onClick={() => handlePickDate(cell)}>
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

DatesPanel.displayName = 'ElDatesPanel';

export default DatesPanel;
