import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
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

const YearsPanel = (props: Props) => {
    const { value, values, onPickDate } = props;
    const { e, b } = useClassNames('picker-panel');
    const { value: valueProp, dateType, disabledDate } = use(CalendarContext);

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
        const years: Cell[] = [];
        // 当前年份
        const curYear: number = currentDate.year();
        // 当前年份在本年代的位置
        const position: number = currentDate.year() % 10;
        // 10年前一年
        // years.push({ text: curYear - position - 1, type: 'prev', disabled: disabledDate && disabledDate(currentDate.year(curYear - position - 1).toDate()) });
        for (let i = position; i > 0; i--) {
            years.push({ text: curYear - i, type: 'current', disabled: disabledDate && disabledDate(currentDate.year(curYear - i).toDate()) });
        }
        for (let i = 0; i < 10 - position; i++) {
            years.push({ text: curYear + i, type: 'current', disabled: disabledDate && disabledDate(currentDate.year(curYear + i).toDate()) });
        }
        // 10年一年
        // years.push({ text: curYear + (10 - position), type: 'next', disabled: disabledDate && disabledDate(currentDate.year(curYear + (10 - position)).toDate()) });
        return years;
    }, [currentDate, disabledDate]);

    const getCellClass = useCallback(
        ({ text, type, disabled }: Cell): string => {
            if (type === 'current') {
                const classes: string[] = [''];
                const year = currentDate.year(text);
                if (year.isSame(today, 'year')) {
                    classes.push('today');
                }
                if (disabled) {
                    classes.push('disabled');
                }

                if (values.some(item => item.isSame(year, 'year'))) {
                    classes.push('current');
                }

                return classNames(...classes);
            } else {
                return `${type}-year`;
            }
        },
        [currentDate, today, values],
    );

    const handlePickYear = useCallback(
        ({ text, disabled }: Cell) => {
            if (disabled) {
                return;
            }
            const year = currentDate.year(text);
            if (values.some(item => item.isSame(year, 'year'))) {
                onPickDate(
                    year,
                    values.filter(item => item.isSame(year, 'year') === false),
                );
            } else {
                onPickDate?.(year, [...values, year]);
            }
        },
        [currentDate, onPickDate, values],
    );

    return (
        <div className={classNames(e`content`, props.className)}>
            {props.children}
            <table cellSpacing="0" cellPadding="0" className={b('year-table', false)}>
                <tbody>
                    {new Array(4).fill('').map((_, i) => {
                        return (
                            <tr key={i}>
                                {rows.slice(i * 4, (i + 1) * 4).map(cell => {
                                    return (
                                        <td key={cell.text} className={getCellClass(cell)} onClick={() => handlePickYear(cell)}>
                                            <div>
                                                <a className="cell">{cell.text}</a>
                                            </div>
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

YearsPanel.displayName = 'ElYearsPanel';

export default YearsPanel;
