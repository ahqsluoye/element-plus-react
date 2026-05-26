import { useEffect, useMemo } from 'react';
import { Mark, SliderProps } from '../typings';

export const useMarks = (props: SliderProps): Mark[] => {
    const marks = props.marks;
    const min = props.min ?? 0;
    const max = props.max ?? 100;

    const markList = useMemo(() => {
        if (!marks) {
            return [];
        }
        const marksKeys = Object.keys(marks);
        return marksKeys
            .map(Number.parseFloat)
            .sort((a, b) => a - b)
            .filter(point => point <= max && point >= min)
            .map(
                (point): Mark => ({
                    point,
                    position: ((point - min) * 100) / (max - min),
                    mark: marks[point],
                }),
            );
    }, [marks, min, max]);

    useEffect(() => {
        if (props.step === 'mark' && !props.marks) {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('[ElSlider] marks prop must be provided when step is mark');
            }
        }
        if (props.marks) {
            const keys = Object.keys(props.marks);
            const validPoints = markList.map(m => m.point);
            const invalidKeys = keys.filter(key => {
                const parsed = Number.parseFloat(key);
                return Number.isNaN(parsed) || !validPoints.includes(parsed);
            });
            if (invalidKeys.length > 0) {
                if (process.env.NODE_ENV !== 'production') {
                    console.warn(`[ElSlider] Some marks keys are invalid (not a number or out of [min, max]): [${invalidKeys.map(k => `'${k}'`).join(', ')}] and will be ignored.`);
                }
            }
        }
    }, [props.marks, props.step, markList]);

    return markList;
};
