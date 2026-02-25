import type { CSSProperties, ReactNode, RefObject } from 'react';
import { BaseProps, NativeProps } from '../types/common';

export interface StatisticProps
    extends NativeProps<
            | '--el-statistic-title-font-weight'
            | '--el-statistic-title-font-size'
            | '--el-statistic-title-color'
            | '--el-statistic-content-font-weight'
            | '--el-statistic-content-font-size'
            | '--el-statistic-content-color'
        >,
        BaseProps {
    /** 数字内容 */
    value?: number | string;
    /** 小数点符号 */
    decimalSeparator?: string;
    /** 自定义数字格式化 */
    formatter?: (value: number | string) => ReactNode;
    /** 千分位标识符 */
    groupSeparator?: string;
    /** 数字精度 */
    precision?: number;
    /** 前缀内容 */
    prefix?: string | ReactNode;
    /** 后缀内容 */
    suffix?: string | ReactNode;
    /** 数字标题 */
    title?: string | ReactNode;
    /** 数字样式 */
    valueStyle?: CSSProperties;
}

export interface StatisticRef {
    /** 数字统计 html 元素	 */
    ref: RefObject<HTMLDivElement>;
    /** 当前显示值 */
    displayValue: ReactNode;
}
