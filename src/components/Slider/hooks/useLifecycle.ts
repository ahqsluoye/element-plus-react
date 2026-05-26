import { isNumber, nextTick } from '@qsxy/element-plus-react/Util/base';
import { useMount } from 'ahooks';
import { useEffect, useRef } from 'react';
import { SliderInitData, SliderProps, SliderValue } from '../typings';

export const useLifecycle = (value: SliderValue, props: SliderProps, initData: SliderInitData, resetSize: () => void) => {
    const sliderWrapper = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.addEventListener('resize', resetSize);
        return () => {
            window.removeEventListener('resize', resetSize);
        };
    }, []);

    useMount(async () => {
        if (props.range) {
            if (Array.isArray(value)) {
                initData.firstValue = Math.max(props.min, value[0]);
                initData.secondValue = Math.min(props.max, value[1]);
            } else {
                initData.firstValue = props.min;
                initData.secondValue = props.max;
            }
            initData.oldValue = [initData.firstValue, initData.secondValue];
        } else {
            if (!isNumber(value) || Number.isNaN(value)) {
                initData.firstValue = props.min;
            } else {
                initData.firstValue = Math.min(props.max, Math.max(props.min, value));
            }
            initData.oldValue = initData.firstValue;
        }
        await nextTick();
        resetSize?.();
    });

    return {
        sliderWrapper,
    };
};
