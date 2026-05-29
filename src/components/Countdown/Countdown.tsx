import { useMount, useUnmount } from 'ahooks';
import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import Statistic from '../Statistic/Statistic';
import { cAF, rAF } from '../Util';
import { mergeDefaultProps } from '../Util/base';
import type { CountdownProps, CountdownRef } from './typings';
import { formatTime, getTime } from './util';

const Countdown = memo(
    forwardRef<CountdownRef, CountdownProps>((props, ref) => {
        props = mergeDefaultProps(
            {
                format: 'HH:mm:ss',
                value: 0,
                valueStyle: undefined,
            },
            props,
        );
        const { format, value, title, prefix, suffix, valueStyle, onChange, onFinish, className, style, children } = props;

        const timerRef = useRef<ReturnType<typeof requestAnimationFrame> | undefined>(undefined);
        const [rawValue, setRawValue] = useState<number>(0);

        /**
         * @description 计算格式化后的倒计时显示值
         */
        const displayValue = useMemo(() => formatTime(rawValue, format), [rawValue, format]);

        /**
         * @description 自定义格式化函数，传递给 Statistic 组件
         */
        const formatter = useCallback((val: number | string) => formatTime(Number(val), format), [format]);

        /**
         * @description 停止计时器
         */
        const stopTimer = useCallback(() => {
            if (timerRef.current !== undefined) {
                cAF(timerRef.current);
                timerRef.current = undefined;
            }
        }, []);

        /**
         * @description 启动倒计时计时器
         */
        const startTimer = useCallback(() => {
            const timestamp = getTime(value);

            const frameFunc = () => {
                let diff = timestamp - Date.now();
                onChange?.(diff);

                if (diff <= 0) {
                    diff = 0;
                    stopTimer();
                    onFinish?.();
                } else {
                    timerRef.current = rAF(frameFunc);
                }

                setRawValue(diff);
            };

            timerRef.current = rAF(frameFunc);
        }, [value, onChange, onFinish, stopTimer]);

        useMount(() => {
            setRawValue(getTime(value) - Date.now());
        });

        useUnmount(() => {
            stopTimer();
        });

        /**
         * @description 组件挂载时初始化倒计时并启动计时器
         */
        useEffect(() => {
            stopTimer();
            startTimer();
        }, [value, format]);

        /**
         * @description 暴露 displayValue 给父组件
         */
        useImperativeHandle(ref, () => ({
            ref: { current: null },
            displayValue,
        }));

        return (
            <Statistic value={rawValue} title={title} prefix={prefix} suffix={suffix} formatter={formatter} valueStyle={valueStyle} className={className} style={style}>
                {children}
            </Statistic>
        );
    }),
);

Countdown.displayName = 'ElCountdown';

export default Countdown;
