import { useDisabled } from '@qsxy/element-plus-react/hooks';
import { nextTick } from '@qsxy/element-plus-react/Util';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { SliderInitData, SliderProps, SliderValue } from '../typings';

export const useSlider = (value: SliderValue, props: SliderProps, emit: (event: 'input' | 'change', val: SliderValue) => void) => {
    const { min, max, range, vertical, height } = props;
    const [initData, setInitData] = useState<SliderInitData>({
        firstValue: 0,
        secondValue: 0,
        oldValue: 0,
        dragging: false,
        sliderSize: 1,
    });

    const sliderRef = useRef<HTMLDivElement>(null);
    const firstButtonRef = useRef<any>(null);
    const secondButtonRef = useRef<any>(null);

    const sliderDisabled = useDisabled(props.disabled);

    const minValue = useMemo(() => {
        return Math.min(initData.firstValue, initData.secondValue);
    }, [initData.firstValue, initData.secondValue]);

    const maxValue = useMemo(() => {
        return Math.max(initData.firstValue, initData.secondValue);
    }, [initData.firstValue, initData.secondValue]);

    const barSize = useMemo(() => {
        return range ? `${(100 * (maxValue - minValue)) / (max - min)}%` : `${(100 * (initData.firstValue - min)) / (max - min)}%`;
    }, [range, maxValue, minValue, max, min, initData.firstValue]);

    const barStart = useMemo(() => {
        return range ? `${(100 * (minValue - min)) / (max - min)}%` : '0%';
    }, [range, minValue, min, max]);

    const runwayStyle = useMemo(() => {
        return vertical ? { height } : {};
    }, [vertical, height]);

    const barStyle = useMemo(() => {
        return vertical
            ? {
                  height: barSize,
                  bottom: barStart,
              }
            : {
                  width: barSize,
                  left: barStart,
              };
    }, [vertical, barSize, barStart]);

    const resetSize = useCallback(() => {
        if (sliderRef.current) {
            const rect = sliderRef.current.getBoundingClientRect();
            setInitData(prev => ({
                ...prev,
                sliderSize: rect[vertical ? 'height' : 'width'],
            }));
        }
    }, [vertical]);

    const getButtonRefByPercent = useCallback(
        (percent: number) => {
            const targetValue = min + (percent * (max - min)) / 100;
            if (!range) {
                return firstButtonRef;
            }
            let buttonRefName: 'firstButton' | 'secondButton';
            if (Math.abs(Math.min(initData.firstValue, initData.secondValue) - targetValue) < Math.abs(Math.max(initData.firstValue, initData.secondValue) - targetValue)) {
                buttonRefName = initData.firstValue < initData.secondValue ? 'firstButton' : 'secondButton';
            } else {
                buttonRefName = initData.firstValue > initData.secondValue ? 'firstButton' : 'secondButton';
            }
            return buttonRefName === 'firstButton' ? firstButtonRef : secondButtonRef;
        },
        [min, max, range, initData.firstValue, initData.secondValue],
    );

    const _emit = useCallback(
        (val: SliderValue) => {
            emit('change', val);
            emit('input', val);
        },
        [emit],
    );

    const setPosition = useCallback(
        (percent: number) => {
            const buttonRef = getButtonRefByPercent(percent);
            if (buttonRef.current) {
                buttonRef.current.setPosition(percent);
            }
            return buttonRef;
        },
        [getButtonRefByPercent],
    );

    const emitChange = useCallback(async () => {
        await nextTick();
        const currentValue = range ? [Math.min(initData.firstValue, initData.secondValue), Math.max(initData.firstValue, initData.secondValue)] : value;
        // emit('change', currentValue);
    }, [range, initData.firstValue, initData.secondValue, value]);

    const setFirstValue = useCallback(
        (firstValue: number | undefined) => {
            setInitData(prev => ({
                ...prev,
                firstValue: firstValue ?? min,
            }));
            _emit(range ? [Math.min(firstValue ?? min, initData.secondValue), Math.max(firstValue ?? min, initData.secondValue)] : firstValue ?? min);
        },
        [_emit, range, initData.secondValue, min],
    );

    const setSecondValue = useCallback(
        (secondValue: number) => {
            setInitData(prev => ({
                ...prev,
                secondValue: secondValue,
            }));

            if (range) {
                _emit([Math.min(initData.firstValue, secondValue), Math.max(initData.firstValue, secondValue)]);
            }
        },
        [_emit, range, initData.firstValue],
    );

    const handleSliderPointerEvent = useCallback(
        (event: MouseEvent | TouchEvent) => {
            if (sliderDisabled || initData.dragging) {
                return;
            }
            resetSize?.();
            let newPercent = 0;
            if (vertical) {
                const clientY = (event as TouchEvent).touches?.item(0)?.clientY ?? (event as MouseEvent).clientY;
                const sliderOffsetBottom = sliderRef.current.getBoundingClientRect().bottom;
                newPercent = ((sliderOffsetBottom - clientY) / initData.sliderSize) * 100;
            } else {
                const clientX = (event as TouchEvent).touches?.item(0)?.clientX ?? (event as MouseEvent).clientX;
                const sliderOffsetLeft = sliderRef.current.getBoundingClientRect().left;
                newPercent = ((clientX - sliderOffsetLeft) / initData.sliderSize) * 100;
            }
            if (newPercent < 0 || newPercent > 100) {
                return;
            }
            return setPosition(newPercent);
        },
        [sliderDisabled, initData.dragging, initData.sliderSize, resetSize, vertical, setPosition],
    );

    const onSliderWrapperPrevent = useCallback((event: TouchEvent) => {
        if (firstButtonRef.current?.dragging || secondButtonRef.current?.dragging) {
            event.preventDefault();
        }
    }, []);

    const onSliderDown = useCallback(
        async (event: React.MouseEvent | React.TouchEvent) => {
            const buttonRef = handleSliderPointerEvent(event.nativeEvent);
            if (buttonRef) {
                await nextTick();
                buttonRef.current.onButtonDown(event.nativeEvent);
            }
        },
        [handleSliderPointerEvent],
    );

    const onSliderClick = useCallback(
        (event: React.MouseEvent | React.TouchEvent) => {
            const buttonRef = handleSliderPointerEvent(event.nativeEvent);
            if (buttonRef) {
                emitChange();
            }
        },
        [handleSliderPointerEvent, emitChange],
    );

    const onSliderMarkerDown = useCallback(
        (position: number) => {
            if (sliderDisabled || initData.dragging) {
                return;
            }
            const buttonRef = setPosition(position);
            if (buttonRef) {
                emitChange();
            }
        },
        [sliderDisabled, initData, setPosition, emitChange],
    );

    const updateDragging = useCallback(
        (val: boolean) => {
            setInitData({
                ...initData,
                dragging: val,
            });
        },
        [initData],
    );

    return {
        sliderRef,
        firstButtonRef,
        secondButtonRef,
        sliderDisabled,
        minValue,
        maxValue,
        runwayStyle,
        barStyle,
        initData,
        setInitData,
        resetSize,
        setPosition,
        emitChange,
        onSliderWrapperPrevent,
        onSliderClick,
        onSliderDown,
        onSliderMarkerDown,
        setFirstValue,
        setSecondValue,
        updateDragging,
    };
};
