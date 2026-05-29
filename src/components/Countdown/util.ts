import { Dayjs } from 'dayjs';
import { isNumber } from '../Util';

/** 时间单位元组：[标识符, 毫秒值] */
const timeUnits = [
    ['Y', 1000 * 60 * 60 * 24 * 365], // years
    ['M', 1000 * 60 * 60 * 24 * 30], // months
    ['D', 1000 * 60 * 60 * 24], // days
    ['H', 1000 * 60 * 60], // hours
    ['m', 1000 * 60], // minutes
    ['s', 1000], // seconds
    ['S', 1], // million seconds
] as const;

/**
 * @description 将时间值转换为时间戳（毫秒）
 * @param value - 时间值，可以是数字时间戳或 Dayjs 对象
 * @returns 时间戳（毫秒）
 */
export function getTime(value: number | Dayjs): number {
    return isNumber(value) ? new Date(value).getTime() : value.valueOf();
}

/**
 * @description 格式化倒计时时间戳为显示字符串
 * @param timestamp - 剩余毫秒数
 * @param format - 格式化模板，支持 Y(年)/M(月)/D(天)/H(时)/m(分)/s(秒)/S(毫秒)，用 [] 包裹的文本不会被替换
 * @returns 格式化后的时间字符串
 */
export function formatTime(timestamp: number, format: string): string {
    let timeLeft = timestamp;
    const escapeRegex = /\[([^\]]*)]/g;

    const replacedText = timeUnits.reduce((current, [name, unit]) => {
        const replaceRegex = new RegExp(`${name}+(?![^\\[\\]]*\\])`, 'g');
        if (replaceRegex.test(current)) {
            const value = Math.floor(timeLeft / unit);
            timeLeft -= value * unit;
            return current.replace(replaceRegex, match => String(value).padStart(match.length, '0'));
        }
        return current;
    }, format);

    return replacedText.replace(escapeRegex, '$1');
}
