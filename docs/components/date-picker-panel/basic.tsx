import { ElDatePickerPanel, ElSpace } from '@qsxy/element-plus-react';
import classNames from 'classnames';
import React from 'react';
import '../date-picker/custom-content.scss';

type Holiday = Record<string, { holiday: boolean; name: string }>;

const holidays = [
    { date: '2026-01-01', name: '元旦', isOffDay: true },
    { date: '2026-01-02', name: '元旦', isOffDay: true },
    { date: '2026-01-03', name: '元旦', isOffDay: true },
    { date: '2026-01-04', name: '元旦', isOffDay: false },
    { date: '2026-02-14', name: '春节', isOffDay: false },
    { date: '2026-02-15', name: '春节', isOffDay: true },
    { date: '2026-02-16', name: '春节', isOffDay: true },
    { date: '2026-02-17', name: '春节', isOffDay: true },
    { date: '2026-02-18', name: '春节', isOffDay: true },
    { date: '2026-02-19', name: '春节', isOffDay: true },
    { date: '2026-02-20', name: '春节', isOffDay: true },
    { date: '2026-02-21', name: '春节', isOffDay: true },
    { date: '2026-02-22', name: '春节', isOffDay: true },
    { date: '2026-02-23', name: '春节', isOffDay: true },
    { date: '2026-02-28', name: '春节', isOffDay: false },
    { date: '2026-04-04', name: '清明节', isOffDay: true },
    { date: '2026-04-05', name: '清明节', isOffDay: true },
    { date: '2026-04-06', name: '清明节', isOffDay: true },
    { date: '2026-05-01', name: '劳动节', isOffDay: true },
    { date: '2026-05-02', name: '劳动节', isOffDay: true },
    { date: '2026-05-03', name: '劳动节', isOffDay: true },
    { date: '2026-05-04', name: '劳动节', isOffDay: true },
    { date: '2026-05-05', name: '劳动节', isOffDay: true },
    { date: '2026-05-09', name: '劳动节', isOffDay: false },
    { date: '2026-06-19', name: '端午节', isOffDay: true },
    { date: '2026-06-20', name: '端午节', isOffDay: true },
    { date: '2026-06-21', name: '端午节', isOffDay: true },
    { date: '2026-09-20', name: '国庆节', isOffDay: false },
    { date: '2026-09-25', name: '中秋节', isOffDay: true },
    { date: '2026-09-26', name: '中秋节', isOffDay: true },
    { date: '2026-09-27', name: '中秋节', isOffDay: true },
    { date: '2026-10-01', name: '国庆节', isOffDay: true },
    { date: '2026-10-02', name: '国庆节', isOffDay: true },
    { date: '2026-10-03', name: '国庆节', isOffDay: true },
    { date: '2026-10-04', name: '国庆节', isOffDay: true },
    { date: '2026-10-05', name: '国庆节', isOffDay: true },
    { date: '2026-10-06', name: '国庆节', isOffDay: true },
    { date: '2026-10-07', name: '国庆节', isOffDay: true },
    { date: '2026-10-10', name: '国庆节', isOffDay: false },
];

const holidayMap = holidays.reduce((acc, cur) => {
    acc[cur.date] = { holiday: cur.isOffDay, name: cur.name };
    return acc;
}, {} as Holiday);

const App = () => {
    return (
        <ElSpace style={{ width: '100%' }} justify="center">
            <ElDatePickerPanel
                isoWeek
                formatter={(value, text, extra) => {
                    if (extra?.view === 'date') {
                        const isHoliday = holidayMap[value.format('YYYY-MM-DD')];
                        const isoWeekday = value.isoWeekday();
                        // console.log(value.format('YYYY-MM-DD'), isoWeekday);
                        return (
                            <div
                                className={classNames('el-date-table-cell custom-cell-content', {
                                    'is-holiday': isHoliday?.holiday === true,
                                    'is-workday': isHoliday?.holiday === false,
                                })}
                            >
                                <span
                                    className={classNames('el-date-table-cell__text', {
                                        'is-holiday': isHoliday?.holiday === true || (isHoliday?.holiday !== false && (isoWeekday === 7 || isoWeekday === 6)),
                                    })}
                                >
                                    {text}
                                </span>
                                {isHoliday?.holiday && <span className="holiday">{isHoliday.name}</span>}
                            </div>
                        );
                    } else {
                        return (
                            <div>
                                <span className="cell">{extra?.defaultText}</span>
                            </div>
                        );
                    }
                }}
            />
        </ElSpace>
    );
};

export default App;
