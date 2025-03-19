import classNames from 'classnames';
import dayjs from 'dayjs';
import React, { FC, useCallback, useContext, useMemo } from 'react';
import { isEmpty, isNotEmpty } from '../Util';
import { useClassNames } from '../hooks';
import CalendarContext from './CalendarContext';
import { Cell, YearPanelProps } from './typings';
import { initDate } from './util';

const YearPanel: FC<YearPanelProps> = props => {
    const { value, valueRange, onPickYear } = props;
    const { e, b } = useClassNames('picker-panel');
    const { value: valueProp, dateType, disabledDate } = useContext(CalendarContext);

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
        return dateType === 'yearrange' && ((isNotEmpty(valueRange[0]) && isNotEmpty(valueRange[1])) || (isEmpty(valueRange[0]) && isEmpty(valueRange[1])));
    }, [dateType, valueRange]);

    // 日期范围时的开始日期，与悬浮日期动态比较获取
    const startDate = useMemo(() => {
        if (dateType === 'yearrange' && isNotEmpty(valueRange[0])) {
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
        if (dateType === 'yearrange') {
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

                // 日期范围时的样式
                if (dateType === 'yearrange') {
                    if (year.isSame(endDate) && year.isSame(startDate)) {
                        classes.push('in-range start-date end-date');
                    } else if (year.isSame(startDate)) {
                        classes.push('in-range start-date');
                    } else if (year.isBetween(startDate, endDate, null, '()')) {
                        classes.push('in-range');
                    } else if (year.isSame(endDate)) {
                        classes.push('in-range end-date');
                    }
                } else {
                    if (valueProp && year.isSame(valueProp, 'year')) {
                        classes.push('current');
                    }
                }

                return classNames(...classes);
            } else {
                return `${type}-year`;
            }
        },
        [currentDate, dateType, endDate, startDate, today, valueProp],
    );

    /**
     * 悬浮日期回调
     * @param param0
     */
    const onHoverDate = useCallback(
        ({ text }: Cell) => {
            if (dateType === 'yearrange') {
                if (!lockHover) {
                    const year = currentDate.year(text);
                    onPickYear?.(year, text, true);
                } else {
                    onPickYear?.(null, text, true);
                }
            }
        },
        [currentDate, dateType, lockHover, onPickYear],
    );

    const handlePickYear = useCallback(
        ({ text, disabled }: Cell) => {
            if (disabled) {
                return;
            }
            onPickYear?.(currentDate.year(text), text);
        },
        [currentDate, onPickYear],
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
                                        <td key={cell.text} className={getCellClass(cell)} onClick={() => handlePickYear(cell)} onMouseEnter={() => onHoverDate(cell)}>
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

YearPanel.displayName = 'Calendar.YearPanel';

export default YearPanel;
