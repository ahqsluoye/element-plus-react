import classNames from 'classnames';
import dayjs from 'dayjs';
import React, { FC, useCallback, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useConfigProvider } from '../ConfigProvider/ConfigProviderContext';
import { isEmpty, isNotEmpty } from '../Util';
import { useClassNames } from '../hooks';
import CalendarContext from './CalendarContext';
import { Cell, MonthPanelProps } from './typings';
import { initDate } from './util';

const MonthPanel: FC<MonthPanelProps> = props => {
    const { value, valueRange, onPickMonth } = props;
    const { e, b } = useClassNames('picker-panel');
    const { value: valueProp, dateType, disabledDate } = useContext(CalendarContext);

    const { locale } = useConfigProvider();
    const { t } = useTranslation();

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

    /**
     * 当两个日期同时为空和不为空时，锁定鼠标悬浮样式
     */
    const lockHover = useMemo(() => {
        return dateType === 'monthrange' && ((isNotEmpty(valueRange[0]) && isNotEmpty(valueRange[1])) || (isEmpty(valueRange[0]) && isEmpty(valueRange[1])));
    }, [dateType, valueRange]);

    // 日期范围时的开始日期，与悬浮日期动态比较获取
    const startDate = useMemo(() => {
        if (dateType === 'monthrange' && isNotEmpty(valueRange[0])) {
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
        if (dateType === 'monthrange') {
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
            // 日期范围时的样式
            if (dateType === 'monthrange') {
                if (month.isSame(endDate) && month.isSame(startDate)) {
                    classes.push('in-range start-date end-date');
                } else if (month.isSame(startDate)) {
                    classes.push('in-range start-date');
                } else if (month.isBetween(startDate, endDate, null, '()')) {
                    classes.push('in-range');
                } else if (month.isSame(endDate)) {
                    classes.push('in-range end-date');
                }
            } else {
                if (valueProp) {
                    if (month.isSame(valueProp, 'month')) {
                        classes.push('current');
                    }
                }
            }
            return classNames(...classes);
        },
        [currentDate, dateType, endDate, startDate, today, valueProp],
    );

    /**
     * 悬浮日期回调
     * @param param0
     */
    const onHoverDate = useCallback(
        ({ text }: Cell) => {
            if (dateType === 'monthrange') {
                if (!lockHover) {
                    const month = currentDate.month(text);
                    onPickMonth?.(month, text, true);
                } else {
                    onPickMonth?.(null, text, true);
                }
            }
        },
        [currentDate, dateType, lockHover, onPickMonth],
    );

    const handlePickMonth = useCallback(
        ({ type, text, disabled }: Cell) => {
            if (disabled) {
                return;
            }
            if (type === 'special') {
                onPickMonth?.(currentDate.month(text + 1), text);
            } else {
                onPickMonth?.(currentDate.month(text), text);
            }
        },
        [currentDate, onPickMonth],
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
                                        <td key={cell.text} className={getCellClass(cell)} onClick={() => handlePickMonth(cell)} onMouseEnter={() => onHoverDate(cell)}>
                                            <div>
                                                <a className="cell">{t('el.datepicker.months.' + monthsI18n[cell.text], { lng: locale })}</a>
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

MonthPanel.displayName = 'Calendar.MonthPanel';

export default MonthPanel;
