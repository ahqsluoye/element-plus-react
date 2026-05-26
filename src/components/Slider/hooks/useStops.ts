import { CSSProperties, useMemo } from 'react';
import { SliderInitData, SliderProps } from '../typings';

export const useStops = (props: SliderProps, initData: SliderInitData, minValue: number, maxValue: number) => {
    const { showStops, min, max, step, range, vertical } = props;
    const stops = useMemo(() => {
        if (!showStops || min > max) {
            return [];
        }
        if (step === 'mark' || step === 0) {
            if (step === 0 && process.env.NODE_ENV !== 'production') {
                console.warn('[ElSlider] step should not be 0.');
            }
            return [];
        }

        const stopCount = Math.ceil((max - min) / step);
        const stepWidth = (100 * step) / (max - min);
        const result = Array.from<number>({ length: stopCount - 1 }).map((_, index) => (index + 1) * stepWidth);

        if (range) {
            return result.filter(s => {
                return s < (100 * (minValue - min)) / (max - min) || s > (100 * (maxValue - min)) / (max - min);
            });
        } else {
            return result.filter(s => s > (100 * (initData.firstValue - min)) / (max - min));
        }
    }, [showStops, min, max, step, range, minValue, maxValue, initData.firstValue]);

    const getStopStyle = (position: number): CSSProperties => {
        return vertical ? { bottom: `${position}%` } : { left: `${position}%` };
    };

    return {
        stops,
        getStopStyle,
    };
};
