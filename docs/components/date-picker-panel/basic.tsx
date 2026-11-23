import { ElDatePickerPanel, ElSpace } from '@qsxy/element-plus-react';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import '../date-picker/custom-content.scss';

type Holiday = Record<string, { holiday: boolean; name: string }>;

/** 中国法定节假日调休补班日历（ICS 订阅源） */
const CALENDAR_URL = 'https://yangh9.github.io/ChinaCalendar/cal_holiday.ics';

/** 解析 ICS 属性行：处理 DTSTART;VALUE=DATE:20260101 这类带参数的形式 */
function splitIcsLine(line: string): [string, string] {
    const colon = line.indexOf(':');
    if (colon < 0) {
        return ['', ''];
    }
    return [line.slice(0, colon).split(';')[0], line.slice(colon + 1)];
}

/** 20260101 或 20260104T090000 → 2026-01-01 */
function toDateString(value: string): string | undefined {
    const match = /^(\d{4})(\d{2})(\d{2})/.exec(value.trim());
    return match ? `${match[1]}-${match[2]}-${match[3]}` : undefined;
}

/**
 * 解析 ICS 日历文本为节假日映射 { 'YYYY-MM-DD': { holiday, name } }
 * - 假期事件：SUMMARY 形如「元旦 假期」第1天/共3天，isOffDay = true
 * - 补班事件：SUMMARY 形如「元旦 补班」第1天/共1天，isOffDay = false
 */
function parseIcsHolidays(text: string): Holiday {
    // 处理 RFC5545 折行（以空格/制表符开头的行是上一行的续行）
    const unfolded: string[] = [];
    for (const line of text.replace(/\r\n/g, '\n').split('\n')) {
        if (/^[ \t]/.test(line) && unfolded.length) {
            unfolded[unfolded.length - 1] += line.slice(1);
        } else {
            unfolded.push(line);
        }
    }

    const holidays: Holiday = {};
    let date: string | undefined;
    let summary: string | undefined;

    for (const line of unfolded) {
        if (line === 'BEGIN:VEVENT') {
            date = undefined;
            summary = undefined;
            continue;
        }
        if (line === 'END:VEVENT') {
            if (date && summary) {
                const match = /「(.+?)\s+(假期|补班)」/.exec(summary);
                if (match) {
                    holidays[date] = { name: match[1], holiday: match[2] === '假期' };
                }
            }
            continue;
        }
        const [key, value] = splitIcsLine(line);
        if (key === 'DTSTART') {
            date = toDateString(value);
        } else if (key === 'SUMMARY') {
            summary = value;
        }
    }
    return holidays;
}

const App = () => {
    const [holidayMap, setHolidayMap] = useState<Holiday>({});

    useEffect(() => {
        let cancelled = false;
        fetch(CALENDAR_URL)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP ${res.status}`);
                }
                return res.text();
            })
            .then(text => {
                if (!cancelled) {
                    setHolidayMap(parseIcsHolidays(text));
                }
            })
            .catch(error => {
                console.error('节假日日历订阅加载失败，节假日/补班标识暂不可用：', error);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <ElSpace style={{ width: '100%' }} justify="center">
            <ElDatePickerPanel
                isoWeek
                formatter={(value, text, extra) => {
                    if (extra?.view === 'date') {
                        const isHoliday = holidayMap[value.format('YYYY-MM-DD')];
                        const isoWeekday = value.isoWeekday();
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
