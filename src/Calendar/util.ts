import dayjs, { Dayjs, ManipulateType } from 'dayjs';
import { isNotEmpty } from '../Util';
import { ValueRagne, ValueRagneTemp } from './typings';

type ValueType = Dayjs | ValueRagne | ValueRagneTemp;

export function toDayjs<T extends ValueType>(date: string | string[], format: string, unit?: ManipulateType): T {
    if (isNotEmpty(date)) {
        if (date instanceof Array && date.length === 2) {
            const start = isNotEmpty(date[0]) ? dayjs(date[0], format) : initDate();
            const end = isNotEmpty(date[1]) ? dayjs(date[1], format) : start.add(1, unit);
            // @ts-ignore
            return [start, end];
        } else if (date instanceof Array && date.length === 3) {
            const start = isNotEmpty(date[0]) ? dayjs(date[0], format) : null;
            const end = isNotEmpty(date[1]) ? dayjs(date[1], format) : null;
            const temp = isNotEmpty(date[2]) ? dayjs(date[2], format) : null;
            // @ts-ignore
            return [start, end, temp];
        } else {
            // @ts-ignore
            return dayjs(date, format);
        }
    } else {
        // @ts-ignore
        return dayjs();
    }
}

export function initDate(): Dayjs {
    return dayjs();
}
export function initDateTime(): Dayjs {
    return dayjs().hour(0).minute(0).second(0);
}

export function initDateRange(format: string, unit?: ManipulateType): ValueRagne {
    const start = initDate();
    return [start, start.add(1, unit)];
}

export function toDateString(date: ValueRagne, format: string): [string, string] {
    const start = isNotEmpty(date[0]) ? dayjs(date[0], format).format(format) : '';
    const end = isNotEmpty(date[1]) ? dayjs(date[1], format).format(format) : '';
    return [start, end];
}
