import classNames from 'classnames';
import { Dayjs, ManipulateType } from 'dayjs';
import React, { FC, useCallback, useContext, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useConfigProvider } from '../ConfigProvider/ConfigProviderContext';
import { isEmpty, isNotEmpty } from '../Util';
import { useClassNames } from '../hooks';
import CalendarContext from './CalendarContext';
import Header from './Header';
import MonthPanel from './MonthPanel';
import { DateRangePanelProps, RangePosition } from './typings';
import { initDate } from './util';

const MonthRangePanel: FC<DateRangePanelProps> = props => {
    const { value, valueRange, onPickDateRange, onHoverDate } = props;
    const { e, is } = useClassNames('date-range-picker');
    const { unlinkPanels } = useContext(CalendarContext);

    const { t } = useTranslation();
    const { locale } = useConfigProvider();

    const hoverDate = useRef<Dayjs>(null);

    // 开始日期
    const startDate = useMemo(() => {
        if (value[0]) {
            const date = value[0];
            if (date.isValid()) {
                return date;
            }
        }
        return initDate();
    }, [value]);

    /**
     * 结束日期
     * 当结束日期不为空且大于开始日期时有效
     * 开始日期为空但有结束日期不为空时也有效
     */
    const endDate = useMemo(() => {
        if (value[1]) {
            if ((value[0] && value[1].isAfter(value[0], 'y')) || !value[0]) {
                const date = value[1];
                if (date.isValid()) {
                    return date;
                }
            }
        }
        return startDate.add(1, 'y');
    }, [value, startDate]);

    const disabledForwards = useMemo(() => startDate.year() + 1 === endDate.year(), [endDate, startDate]);

    /**
     * 切换年月
     * @param unlinkPanels 在范围选择器里取消两个日期面板之间的联动
     */
    const switchDate = useCallback(
        (duration: number, unit?: ManipulateType, positon?: RangePosition) => {
            if (unlinkPanels) {
                const start = startDate.add(duration, unit);
                const end = endDate.add(duration, unit);
                onPickDateRange?.([start, end], false);
            } else {
                const start = positon === 'left' ? startDate.add(duration, unit) : startDate;
                const end = positon === 'right' ? endDate.add(duration, unit) : endDate;
                onPickDateRange?.([start, end], false);
            }
        },
        [unlinkPanels, startDate, endDate, onPickDateRange],
    );

    /**
     * 选中或悬浮日期后的回调
     * @param date
     * @param hover 是否为悬浮日期
     */
    const onPickMonth = useCallback(
        (date: Dayjs, month, hover = false) => {
            // 记录悬浮时的日期，用来处理样式
            if (hover) {
                if (isNotEmpty(date)) {
                    hoverDate.current = date;
                    onHoverDate?.([valueRange[0], valueRange[1], date]);
                }
            } else {
                // 当两个日期同时为空和不为空时，填充开始日期
                // 然后判断悬浮日期和开始日期的大小，动态改变两个日期的位置
                if ((isEmpty(valueRange[0]) && isEmpty(valueRange[1])) || (isNotEmpty(valueRange[0]) && isNotEmpty(valueRange[1]))) {
                    onHoverDate?.([date, null, hoverDate.current]);
                } else if (date.isSame(valueRange[0])) {
                    onHoverDate?.([date, date, hoverDate.current]);
                    onPickDateRange?.([date, date], true);
                } else if (date.isBefore(valueRange[0])) {
                    onHoverDate?.([date, valueRange[0], hoverDate.current]);
                    onPickDateRange?.([date, valueRange[0]], true);
                } else if (date.isAfter(valueRange[0])) {
                    onHoverDate?.([valueRange[0], date, hoverDate.current]);
                    onPickDateRange?.([valueRange[0], date], true);
                }
            }
        },
        [onHoverDate, onPickDateRange, valueRange],
    );

    return (
        <>
            <MonthPanel value={startDate} valueRange={valueRange} className={classNames(e`content`, is`left`)} onPickMonth={onPickMonth}>
                <Header
                    year={startDate.year() + t('el.datepicker.year', { lng: locale })}
                    month={t(`el.datepicker.month${startDate.month() + 1}`, { lng: locale })}
                    showForward={!unlinkPanels}
                    plain={unlinkPanels}
                    prefix="date-range-picker"
                    postion="left"
                    showMonth={false}
                    onToggleView={props.onToggleView}
                    disabledForwards={disabledForwards}
                    onMoveBackward={() => switchDate(-1, 'M', 'left')}
                    onMoveForward={() => switchDate(1, 'M', 'left')}
                    onMoveBackwards={() => switchDate(-1, 'y', 'left')}
                    onMoveForwards={() => switchDate(1, 'y', 'left')}
                />
            </MonthPanel>
            <MonthPanel value={endDate} valueRange={valueRange} className={classNames(e`content`, is`right`)} onPickMonth={onPickMonth}>
                <Header
                    year={endDate.year() + t('el.datepicker.year', { lng: locale })}
                    month={t(`el.datepicker.month${endDate.month() + 1}`, { lng: locale })}
                    showBackward={!unlinkPanels}
                    plain={unlinkPanels}
                    prefix="date-range-picker"
                    postion="right"
                    showMonth={false}
                    onToggleView={props.onToggleView}
                    disabledBackwards={disabledForwards}
                    onMoveBackward={() => switchDate(-1, 'M', 'right')}
                    onMoveForward={() => switchDate(1, 'M', 'right')}
                    onMoveBackwards={() => switchDate(-1, 'y', 'right')}
                    onMoveForwards={() => switchDate(1, 'y', 'right')}
                />
            </MonthPanel>
        </>
    );
};

MonthRangePanel.displayName = 'Calendar.MonthRangePanel';

export default MonthRangePanel;
