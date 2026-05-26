import React, { useEffect, useRef } from 'react';
import { SliderInitData, SliderProps, SliderValue } from '../typings';

export const useWatch = (
    val: SliderValue,
    props: SliderProps,
    initData: SliderInitData,
    setInitData: React.Dispatch<React.SetStateAction<SliderInitData>>,
    minValue: number,
    maxValue: number,
    emit: (event: 'input' | 'change', val: SliderValue) => void,
) => {
    const prevMinMax = useRef([props.min ?? 0, props.max ?? 100]);

    const valueChanged = () => {
        if (props.range) {
            return ![minValue, maxValue].every((item, index) => item === (initData.oldValue as number[])[index]);
        } else {
            return val !== initData.oldValue;
        }
    };

    const setValues = () => {
        const min = props.min ?? 0;
        const max = props.max ?? 100;

        if (min > max) {
            throw new Error('[ElSlider] min should not be greater than max.');
        }

        const range = props.range;

        if (range && Array.isArray(val)) {
            if (val[1] < min) {
                emit('change', [min, min]);
                emit('input', [min, min]);
            } else if (val[0] > max) {
                emit('change', [max, max]);
                emit('input', [max, max]);
            } else if (val[0] < min) {
                emit('change', [min, val[1]]);
                emit('input', [min, val[1]]);
            } else if (val[1] > max) {
                emit('change', [val[0], max]);
                emit('input', [val[0], max]);
            } else {
                setInitData(prev => ({ ...prev, firstValue: val[0], secondValue: val[1] }));
                const changed = valueChanged();

                setInitData(prev => ({ ...prev, firstValue: val[0], secondValue: val[1] }));
                if (changed) {
                    setInitData(prev => ({ ...prev, oldValue: val.slice() as [number, number] }));
                }
            }
        } else if (!range && typeof val === 'number' && !Number.isNaN(val)) {
            if (val < min) {
                emit('change', min);
                emit('input', min);
            } else if (val > max) {
                emit('change', max);
                emit('input', max);
            } else {
                setInitData(prev => ({ ...prev, firstValue: val }));
                if (valueChanged()) {
                    setInitData(prev => ({ ...prev, oldValue: val }));
                }
            }
        } else if (!range) {
            // setInitData(prev => ({ ...prev, firstValue: min }));
            // setInitData(prev => ({ ...prev, oldValue: min }));
        }
    };

    useEffect(() => {
        setValues();
    }, []);

    useEffect(() => {
        if (!initData.dragging) {
            setValues();
        }
    }, [initData.dragging]);

    useEffect(() => {
        // if (
        //     initData.dragging ||
        //     (Array.isArray(val) &&
        //         Array.isArray(initData.oldValue) &&
        //         (val as number[]).every((item, index) => item === (initData.oldValue as number[])[index]) &&
        //         initData.firstValue === val[0] &&
        //         initData.secondValue === val[1])
        // ) {
        //     return;
        // }
        setValues();
    }, [val, props.min, props.max]);

    // useEffect(() => {
    //     const newMin = props.min ?? 0;
    //     const newMax = props.max ?? 100;
    //     if (prevMinMax.current[0] !== newMin || prevMinMax.current[1] !== newMax) {
    //         prevMinMax.current = [newMin, newMax];
    //         setValues();
    //     }
    // }, [props.min, props.max]);
};
