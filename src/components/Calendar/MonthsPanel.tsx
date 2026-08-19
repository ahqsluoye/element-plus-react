import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import { useLocale } from '@qsxy/element-plus-react/hooks/useLocale';
import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import React, { use, useCallback, useMemo } from 'react';
import CalendarContext from './CalendarContext';
import { Cell } from './typings';
import { initDate } from './util';

type Props = {
    value: Dayjs;
    values: Dayjs[];
    className?: string;
    children?: React.ReactNode;
    onPickDate: (date: Dayjs, dates: Dayjs[]) => void;
};

const MonthsPanel = (props: Props) => {
    const { value, values, onPickDate } = props;
    const { e, b } = useClassNames('picker-panel');
    const { value: valueProp, dateType, disabledDate, formatter } = use(CalendarContext);

    const { t } = useLocale();

    const monthsI18n = useMemo(
        () =>
            dayjs()
                .locale('en')
                .localeData()
                .monthsShort()
                .map(_ => _.toLowerCase()),
        [],
    );

    // 当前日期
    const currentDate = useMemo(() => {
        if (value.isValid()) {
            return value;
        }
        return initDate();
    }, [value]);

    // 今天
    const today = useMemo(() => {
        return dayjs();
    }, []);

    const rows: Cell[] = useMemo(() => {
        const months: Cell[] = [];
        for (let i = 0; i < 12; i++) {
            const month = currentDate.month(i);
            months.push({ text: i, type: 'current', disabled: disabledDate && disabledDate(month.toDate()) });
        }
        return months;
    }, [currentDate, disabledDate]);

    const getCellClass = useCallback(
        ({ text, disabled }: Cell): string => {
            const classes: string[] = [''];
            const month = currentDate.month(text);
            if (month.isSame(today, 'month')) {
                classes.push('today');
            }
            if (disabled) {
                return 'disabled';
            }
            if (values.some(item => item.isSame(month, 'month'))) {
                classes.push('current');
            }
            return classNames(...classes);
        },
        [currentDate, today, values],
    );

    const handlePickMonth = useCallback(
        ({ text, disabled }: Cell) => {
            if (disabled) {
                return;
            }
            const month = currentDate.month(text);
            if (values.some(item => item.isSame(month, 'month'))) {
                onPickDate(
                    month,
                    values.filter(item => item.isSame(month, 'month') === false),
                );
            } else {
                onPickDate?.(month, [...values, month]);
            }
        },
        [currentDate, onPickDate, values],
    );

    return (
        <div className={classNames(e`content`, props.className)}>
            {props.children}
            <table cellSpacing="0" cellPadding="0" className={b('month-table', false)}>
                <tbody>
                    {new Array(4).fill('').map((_, i) => {
                        return (
                            <tr key={i}>
                                {rows.slice(i * 4, (i + 1) * 4).map(cell => {
                                    return (
                                        <td key={cell.text} className={getCellClass(cell)} onClick={() => handlePickMonth(cell)}>
                                            {formatter ? (
                                                formatter(currentDate.month(cell.text), cell.text)
                                            ) : (
                                                <div>
                                                    <a className="cell">{t('el.datepicker.months.' + monthsI18n[cell.text])}</a>
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

MonthsPanel.displayName = 'ElMonthPanel';

export default MonthsPanel;
