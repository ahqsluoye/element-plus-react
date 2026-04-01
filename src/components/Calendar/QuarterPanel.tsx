import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import React, { FC, useCallback, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useConfigProvider } from '../ConfigProvider/ConfigProviderContext';
import { useClassNames } from '../hooks';
import CalendarContext from './CalendarContext';
import { Cell, CellType, WeekPanelProps } from './typings';
import { initDate } from './util';

const QuarterPanel: FC<WeekPanelProps> = props => {
    const { value, onPickDate } = props;
    const { b, be } = useClassNames('quarter-table');
    const { value: valueProp, disabledDate, formatter } = useContext(CalendarContext);

    const { locale } = useConfigProvider();
    const { t } = useTranslation();

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
        return Array.from({ length: 4 }).map((row, i) => ({
            text: i + 1,
            type: 'current',
            disabled:
                disabledDate &&
                disabledDate(
                    currentDate
                        .month(i * 3)
                        .date(1)
                        .toDate(),
                ),
        }));
    }, [currentDate, disabledDate]);

    const getFormattedDate = useCallback(
        (quarter: number, type: CellType): Dayjs => {
            switch (type) {
                case 'current':
                    return currentDate.month((quarter - 1) * 3).date(1);
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
            if (valueProp && date.isSame(valueProp, 'day')) {
                classes.push('current');
            }
            return classNames(...classes);
        },
        [getFormattedDate, today, valueProp],
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
            <table cellSpacing="0" cellPadding="0" className={classNames(b(), 'is-week-mode')}>
                <tbody>
                    {rows.map(cell => {
                        return (
                            <td key={cell.text} className={getCellClass(cell)} onClick={() => handlePickDate(cell)}>
                                {formatter ? (
                                    formatter(getFormattedDate(cell.text, cell.type), cell.text)
                                ) : (
                                    <div>
                                        <span className="cell">{t('el.datepicker.quarter', { lng: locale, quarter: cell.text })}</span>
                                    </div>
                                )}
                            </td>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

QuarterPanel.displayName = 'Calendar.QuarterPanel';

export default QuarterPanel;
