import classNames from 'classnames';
import { Dayjs, ManipulateType } from 'dayjs';
import React, { FC, useCallback, useContext, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useConfigProvider } from '../ConfigProvider/ConfigProviderContext';
import { isEmpty, isNotEmpty } from '../Util';
import { useClassNames } from '../hooks';
import CalendarContext from './CalendarContext';
import Header from './Header';
import YearPanel from './YearPanel';
import { DateRangePanelProps, RangePosition } from './typings';
import { initDate } from './util';

const YearRangePanel: FC<DateRangePanelProps> = props => {
    const { value, valueRange, onPickDateRange, onHoverDate } = props;
    const { e, is } = useClassNames('date-range-picker');
    const { unlinkPanels } = useContext(CalendarContext);

    const { locale } = useConfigProvider();
    const { t } = useTranslation();

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
            // if (value[1].diff(value[0], 'y') <= 9) {
            //     return startDate.add(10, 'y')
            // }
            if ((value[0] && value[1].diff(value[0], 'y') > 9) || !value[0]) {
                const date = value[1];
                if (date.isValid()) {
                    return date;
                }
            }
        }
        return startDate.add(10, 'y');
    }, [value, startDate]);

    const disabledForwards = useMemo(() => {
        const curYear: number = startDate.year();
        const position: number = startDate.year() % 10;
        return curYear + (9 - position) + 1 == endDate.year() - (endDate.year() % 10);
    }, [endDate, startDate]);

    // 当前年份
    const leftYear = useMemo(() => {
        const curYear: number = startDate.year();
        const position: number = startDate.year() % 10;
        return `${curYear - position} ${t('el.datepicker.year', { lng: locale })} - ${curYear + (9 - position)} ${t('el.datepicker.year', { lng: locale })}`;
    }, [startDate]);

    // 当前年份
    const rightYear = useMemo(() => {
        const curYear: number = endDate.year();
        const position: number = endDate.year() % 10;
        return `${curYear - position} ~ ${curYear + (9 - position)}`;
    }, [endDate]);

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
    const onPickYear = useCallback(
        (date: Dayjs, year, hover = false) => {
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
            <YearPanel value={startDate} valueRange={valueRange} className={classNames(e`content`, is`left`)} onPickYear={onPickYear}>
                <Header
                    year={leftYear}
                    showForward={!unlinkPanels}
                    plain
                    prefix="date-range-picker"
                    postion="left"
                    showMonth={false}
                    onToggleView={props.onToggleView}
                    disabledForwards={disabledForwards}
                    onMoveBackwards={() => switchDate(-10, 'y', 'left')}
                    onMoveForwards={() => switchDate(10, 'y', 'left')}
                />
            </YearPanel>
            <YearPanel value={endDate} valueRange={valueRange} className={classNames(e`content`, is`right`)} onPickYear={onPickYear}>
                <Header
                    year={rightYear}
                    showBackward={!unlinkPanels}
                    plain
                    prefix="date-range-picker"
                    postion="right"
                    showMonth={false}
                    onToggleView={props.onToggleView}
                    disabledBackwards={disabledForwards}
                    onMoveBackwards={() => switchDate(-10, 'y', 'right')}
                    onMoveForwards={() => switchDate(10, 'y', 'right')}
                />
            </YearPanel>
        </>
    );
};

YearRangePanel.displayName = 'Calendar.YearRangePanel';

export default YearRangePanel;
