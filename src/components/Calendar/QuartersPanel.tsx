import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import { useLocale } from '@qsxy/element-plus-react/hooks/useLocale';
import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import React, { use, useCallback, useMemo } from 'react';
import CalendarContext from './CalendarContext';
import { Cell, CellType } from './typings';
import { initDate } from './util';

type Props = {
    value: Dayjs;
    values: Dayjs[];
    className?: string;
    children?: React.ReactNode;
    onPickDate: (date: Dayjs, dates: Dayjs[]) => void;
};

const QuartersPanel = (props: Props) => {
    const { value, values, onPickDate } = props;
    const { b, be } = useClassNames('quarter-table');
    const { value: valueProp, disabledDate, formatter } = use(CalendarContext);

    const { t } = useLocale();

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
            const classes: string[] = [disabled ? 'normal disabled' : 'available'];
            if (values.some(item => item.isSame(date, 'day'))) {
                classes.push('current');
            }
            return classNames(...classes);
        },
        [getFormattedDate, values],
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
            if (values.some(item => item.isSame(date, 'date'))) {
                onPickDate(
                    date,
                    values.filter(item => item.isSame(date, 'date') === false),
                );
            } else {
                onPickDate?.(date, [...values, date]);
            }
        },
        [getFormattedDate, onPickDate, values],
    );

    return (
        <div className={classNames(be('picker-panel', 'content', false), props.className)}>
            {props.children}
            <table cellSpacing="0" cellPadding="0" className={classNames(b(), 'is-week-mode')}>
                <tbody>
                    <tr>
                        {rows.map(cell => {
                            return (
                                <td key={cell.text} className={getCellClass(cell)} onClick={() => handlePickDate(cell)}>
                                    {formatter ? (
                                        formatter(getFormattedDate(cell.text, cell.type), cell.text)
                                    ) : (
                                        <div>
                                            <span className="cell">{t('el.datepicker.quarter', { quarter: cell.text })}</span>
                                        </div>
                                    )}
                                </td>
                            );
                        })}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

QuartersPanel.displayName = 'ElQuartersPanel';

export default QuartersPanel;
