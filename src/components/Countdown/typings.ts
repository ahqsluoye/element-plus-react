import { Dayjs } from 'dayjs';
import type { CSSProperties, ReactNode, RefObject } from 'react';
import type { BaseProps, NativeProps } from '../types/common';

/**
 * @description Countdown 倒计时组件属性
 */
export interface CountdownProps extends BaseProps, NativeProps {
    /**
     * @description 格式化倒计时显示，支持 Y(年)/M(月)/D(天)/H(时)/m(分)/s(秒)/S(毫秒)
     * @default 'HH:mm:ss'
     */
    format?: string;
    /**
     * @description 设置倒计时的前缀
     */
    prefix?: string | ReactNode;
    /**
     * @description 设置倒计时的后缀
     */
    suffix?: string | ReactNode;
    /**
     * @description 倒计时标题
     */
    title?: string | ReactNode;
    /**
     * @description 目标时间，支持时间戳（毫秒）或 dayjs 等时间对象
     * @default 0
     */
    value?: number | Dayjs;
    /**
     * @description 倒计时数值的样式
     */
    valueStyle?: CSSProperties;
    /**
     * @description 倒计时数值变化时触发
     * @param value - 剩余毫秒数
     */
    onChange?: (value: number) => void;
    /**
     * @description 倒计时结束时触发
     */
    onFinish?: () => void;
}

/**
 * @description Countdown 组件暴露的 ref 接口
 */
export interface CountdownRef {
    /** 倒计时容器 DOM 引用 */
    ref: RefObject<HTMLDivElement>;
    /** 当前格式化后的显示值 */
    displayValue: string | ReactNode;
}
