import ElInputNumber from '@qsxy/element-plus-react/InputNumber/InputNumber';
import { mergeDefaultProps } from '@qsxy/element-plus-react/Util/base';
import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import { useSize } from '@qsxy/element-plus-react/hooks/useCommonProps';
import useControlled from '@qsxy/element-plus-react/hooks/useControlled';
import classNames from 'classnames';
import React, { memo, useCallback, useEffect, useImperativeHandle, useMemo } from 'react';
import SliderButton from './Button';
import SliderMarker from './Marker';
import { SliderContext } from './SliderContext';
import { useMarks, useSlider, useStops, useWatch } from './hooks';
import { useLifecycle } from './hooks/useLifecycle';
import type { SliderProps, SliderRef, SliderValue } from './typings';

const Slider = memo(({ ref, ...props }: SliderProps & { ref?: React.Ref<SliderRef | null> }) => {
    props = mergeDefaultProps(
        {
            min: 0,
            max: 100,
            step: 1,
            showInputControls: true,
            showInput: false,
            showStops: false,
            showTooltip: true,
        },
        props,
    );
    const {
        min: minProp,
        max: maxProp,
        step,
        showInput,
        showInputControls,
        size,
        inputSize,
        showStops,
        formatTooltip,
        range,
        vertical,
        rangeStartLabel,
        rangeEndLabel,
        formatValueText,
        tooltipClass,
        placement = 'top',
        ariaLabel,
        onChange,
        onInput,
        className,
        style,
    } = props;

    const ns = useClassNames('slider');

    const [value, setValue] = useControlled(props.value, props.defaultValue);

    const emit = useCallback(
        (event: 'input' | 'change', val: SliderValue) => {
            switch (event) {
                case 'input':
                    onInput?.(val);
                    break;
                case 'change':
                    setValue(val);
                    onChange?.(val);
                    break;
            }
        },
        [setValue, onInput, onChange],
    );

    const {
        sliderRef,
        firstButtonRef,
        secondButtonRef,
        sliderDisabled,
        minValue,
        maxValue,
        runwayStyle,
        barStyle,
        resetSize,
        emitChange,
        onSliderWrapperPrevent,
        onSliderClick,
        onSliderDown,
        onSliderMarkerDown,
        setFirstValue,
        setSecondValue,
        initData,
        setInitData,
        updateDragging,
    } = useSlider(value, props, emit);

    const markList = useMarks(props);

    const { stops, getStopStyle } = useStops(props, initData, minValue, maxValue);

    const sliderWrapperSize = useSize(size);
    const sliderInputSize = useMemo(() => inputSize || size, [inputSize, size]);
    const { firstValue, secondValue, sliderSize } = initData;

    const renderInput = useMemo(() => {
        return showInput && !range && step !== 'mark';
    }, [showInput, range, step]);

    useWatch(value, props, initData, setInitData, minValue, maxValue, emit);

    const precision = useMemo(() => {
        const stepValue = typeof step === 'number' ? step : 1;
        const precisions = [minProp, maxProp, stepValue].map(item => {
            const decimal = `${item}`.split('.')[1];
            return decimal ? decimal.length : 0;
        });
        return Math.max.apply(null, precisions);
    }, [minProp, maxProp, step]);

    const sliderInputStep = useMemo(() => {
        return typeof step === 'number' ? step : 1;
    }, [step]);

    const { sliderWrapper } = useLifecycle(value, props, initData, resetSize);

    useEffect(() => {
        const wrapper = sliderWrapper.current;
        if (wrapper) {
            wrapper.addEventListener('touchstart', onSliderWrapperPrevent, { passive: false });
            wrapper.addEventListener('touchmove', onSliderWrapperPrevent, { passive: false });
            return () => {
                wrapper.removeEventListener('touchstart', onSliderWrapperPrevent);
                wrapper.removeEventListener('touchmove', onSliderWrapperPrevent);
            };
        }
    }, []);

    const contextValue = useMemo(
        () => ({
            ...props,
            sliderSize,
            disabled: sliderDisabled,
            precision,
            markList,
            formatTooltip,
            emitChange,
            resetSize,
            updateDragging,
        }),
        [props, sliderSize, sliderDisabled, precision, markList, formatTooltip, emitChange, resetSize, updateDragging],
    );

    const sliderKls = classNames(ns.b(), ns.m(sliderWrapperSize), ns.is({ vertical: vertical }), { [ns.m('with-input')]: renderInput }, className);

    useImperativeHandle(ref, () => ({
        onSliderClick: (event: React.MouseEvent | React.TouchEvent) => {
            onSliderClick(event);
        },
    }));

    const firstValueText = formatValueText ? formatValueText(firstValue) : `${firstValue}`;

    const secondValueText = formatValueText ? formatValueText(secondValue) : `${secondValue}`;

    return (
        <SliderContext value={contextValue}>
            <div
                ref={sliderWrapper}
                className={sliderKls}
                role={range ? 'group' : undefined}
                aria-label={range ? ariaLabel : undefined}
                style={style}
                onTouchStart={e => {
                    onSliderWrapperPrevent(e.nativeEvent);
                }}
                onTouchMove={e => {
                    onSliderWrapperPrevent(e.nativeEvent);
                }}
            >
                <div
                    ref={sliderRef}
                    className={classNames(ns.e('runway'), { 'show-input': renderInput }, ns.is({ disabled: sliderDisabled }))}
                    style={runwayStyle}
                    onMouseDown={e => onSliderDown(e)}
                    onTouchStart={e => onSliderDown(e)}
                >
                    <div className={ns.e('bar')} style={barStyle} />
                    <SliderButton
                        ref={firstButtonRef}
                        value={firstValue}
                        vertical={vertical}
                        tooltipClass={tooltipClass}
                        placement={placement}
                        role="slider"
                        aria-label={range ? rangeStartLabel : ariaLabel}
                        aria-valuemin={minProp}
                        aria-valuemax={range ? secondValue : maxProp}
                        aria-valuenow={firstValue}
                        aria-valuetext={firstValueText}
                        aria-orientation={vertical ? 'vertical' : 'horizontal'}
                        aria-disabled={sliderDisabled}
                        onChange={setFirstValue}
                    />
                    {range && (
                        <SliderButton
                            ref={secondButtonRef}
                            value={secondValue}
                            vertical={vertical}
                            tooltipClass={tooltipClass}
                            placement={placement}
                            role="slider"
                            aria-label={rangeEndLabel}
                            aria-valuemin={firstValue}
                            aria-valuemax={maxProp}
                            aria-valuenow={secondValue}
                            aria-valuetext={secondValueText}
                            aria-orientation={vertical ? 'vertical' : 'horizontal'}
                            aria-disabled={sliderDisabled}
                            onChange={setSecondValue}
                        />
                    )}
                    {showStops && (
                        <div>
                            {stops.map((item, key) => (
                                <div key={key} className={ns.e('stop')} style={getStopStyle(item)} />
                            ))}
                        </div>
                    )}
                    {markList.length > 0 && (
                        <>
                            <div>
                                {markList.map((item, key) => (
                                    <div key={key} style={getStopStyle(item.position)} className={classNames(ns.e('stop'), ns.e('marks-stop'))} />
                                ))}
                            </div>
                            <div className={ns.e('marks')}>
                                {markList.map((item, key) => (
                                    <SliderMarker
                                        key={key}
                                        mark={item.mark}
                                        style={getStopStyle(item.position)}
                                        onMousedown={e => {
                                            e.stopPropagation();
                                            onSliderMarkerDown(item.position);
                                        }}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
                {renderInput && (
                    <ElInputNumber
                        value={firstValue}
                        className={ns.e('input')}
                        step={sliderInputStep}
                        disabled={sliderDisabled}
                        controls={showInputControls}
                        min={minProp}
                        max={maxProp}
                        precision={precision}
                        size={sliderInputSize}
                        onChange={(val: number) => {
                            if (!Number.isNaN(val)) {
                                setFirstValue(val);
                                emitChange();
                            }
                        }}
                    />
                )}
            </div>
        </SliderContext>
    );
});

Slider.displayName = 'ElSlider';

export default Slider;
