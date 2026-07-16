import { TooltipRef } from '@qsxy/element-plus-react/Tooltip/typings';
import { nextTick } from '@qsxy/element-plus-react/Util/base';
import clamp from 'lodash/clamp';
import debounce from 'lodash/debounce';
import React, { useCallback, useContext, useMemo, useRef, useState } from 'react';
import { SliderContext } from '../SliderContext';
import { SliderButtonInitData, SliderButtonProps, SliderContextValue, SliderValue } from '../typings';

const getClientXY = (event: React.MouseEvent | React.TouchEvent) => {
    let clientX: number;
    let clientY: number;
    if (event.type.startsWith('touch')) {
        clientY = (event as React.TouchEvent).touches[0].clientY;
        clientX = (event as React.TouchEvent).touches[0].clientX;
    } else {
        clientY = (event as React.MouseEvent).clientY;
        clientX = (event as React.MouseEvent).clientX;
    }
    return { clientX, clientY };
};

const useTooltip = (modelValue: number, formatTooltip: SliderContextValue['formatTooltip'], showTooltip: SliderContextValue['showTooltip']) => {
    const tooltipRef = useRef<TooltipRef>(null);

    const [tooltipVisible, setTooltipVisible] = useState(false);

    const enableFormat = useMemo(() => {
        return formatTooltip instanceof Function;
    }, [formatTooltip]);

    const formatValue = useMemo(() => {
        return (enableFormat && formatTooltip?.(modelValue)) || modelValue;
    }, [enableFormat, formatTooltip, modelValue]);

    const displayTooltip = debounce(() => {
        showTooltip && setTooltipVisible(true);
    }, 50);

    const hideTooltip = debounce(() => {
        showTooltip && setTooltipVisible(false);
    }, 50);

    return {
        tooltipRef,
        tooltipVisible,
        formatValue,
        displayTooltip,
        hideTooltip,
    };
};

export const useSliderButton = (modelValue: number, props: SliderButtonProps, onChange: (val: SliderValue) => void) => {
    const context = useContext(SliderContext);

    const disabled = context?.disabled ?? false;
    const min = context?.min ?? 0;
    const max = context?.max ?? 100;
    const step = context?.step ?? 1;
    const showTooltip = context?.showTooltip ?? true;
    const persistent = context?.persistent ?? true;
    const precision = context?.precision ?? 0;
    const sliderSize = context?.sliderSize ?? 1;
    const formatTooltip = context?.formatTooltip;
    const emitChange = context?.emitChange;
    const resetSize = context?.resetSize;
    const updateDragging = context?.updateDragging;
    const markList = useMemo(() => context?.markList ?? [], [context?.markList]);

    const initData = useRef<SliderButtonInitData>({
        hovering: false,
        dragging: false,
        isClick: false,
        startX: 0,
        currentX: 0,
        startY: 0,
        currentY: 0,
        startPosition: 0,
        newPosition: 0,
        oldValue: modelValue,
    });
    const setInitData = (data: SliderButtonInitData | ((prev: SliderButtonInitData) => SliderButtonInitData)) => {
        initData.current = typeof data === 'function' ? data(initData.current) : data;
    };
    const [hovering, setHovering] = useState(false);
    const [dragging, setDragging] = useState(false);

    const { tooltipRef, tooltipVisible, formatValue, displayTooltip, hideTooltip } = useTooltip(modelValue, formatTooltip, showTooltip);

    const buttonRef = useRef<HTMLDivElement>(null);

    const currentPosition = useMemo(() => {
        return `${((modelValue - min) / (max - min)) * 100}%`;
    }, [modelValue, min, max]);

    const tooltipPersistent = useMemo(() => {
        return !showTooltip ? false : persistent;
    }, [showTooltip, persistent]);

    const wrapperStyle = useMemo(() => {
        return props.vertical ? { bottom: currentPosition } : { left: currentPosition };
    }, [props.vertical, currentPosition]);

    const shouldMoveToMark = useMemo(() => {
        return step === 'mark' && markList.length > 0;
    }, [step, markList]);

    const setPosition = useCallback(
        async (newPosition: number) => {
            if (newPosition === null || Number.isNaN(+newPosition)) {
                return;
            }

            newPosition = clamp(newPosition, 0, 100);

            let value: number;

            if (step === 'mark') {
                if (markList.length === 0) {
                    value = newPosition <= 50 ? min : max;
                } else {
                    const closestMark = markList.reduce((prev, curr) => {
                        return Math.abs(curr.position - newPosition) < Math.abs(prev.position - newPosition) ? curr : prev;
                    });
                    value = closestMark.point;
                }
            } else {
                const fullSteps = Math.floor((max - min) / step);
                const fullRangePercentage = ((fullSteps * step) / (max - min)) * 100;
                const threshold = fullRangePercentage + (100 - fullRangePercentage) / 2;
                if (newPosition < fullRangePercentage) {
                    const valueBetween = fullRangePercentage / fullSteps;
                    const steps = Math.round(newPosition / valueBetween);
                    value = min + steps * step;
                } else if (newPosition < threshold) {
                    value = min + fullSteps * step;
                } else {
                    value = max;
                }
                value = Number.parseFloat(value.toFixed(precision));
            }

            if (value !== initData.current.oldValue) {
                onChange(value);
                initData.current.oldValue = value;
            }

            await nextTick();
            if (initData.current.dragging) {
                displayTooltip();
                tooltipRef.current?.updatePopper();
            }
        },
        [step, markList, min, max, precision, onChange, displayTooltip, tooltipRef],
    );

    const handleMouseEnter = useCallback(() => {
        setInitData(prev => ({ ...prev, hovering: true }));
        setHovering(true);
        displayTooltip();
    }, [displayTooltip]);

    const handleMouseLeave = useCallback(() => {
        setInitData(prev => ({ ...prev, hovering: false }));
        setHovering(false);
        if (!initData.current.dragging) {
            hideTooltip();
        }
    }, [hideTooltip]);

    const incrementPosition = useCallback(
        (amount: number) => {
            if (disabled) {
                return;
            }
            const newPosition = Number.parseFloat(currentPosition) + (amount / (max - min)) * 100;
            setInitData(prev => ({ ...prev, newPosition: newPosition }));
            setPosition(newPosition);
            emitChange?.();
        },
        [disabled, currentPosition, max, min, setPosition, emitChange],
    );

    const moveToMark = useCallback(
        (amount: number) => {
            if (disabled || !markList.length) {
                return;
            }

            const current = modelValue;
            const epsilon = Number.EPSILON;
            const stride = Math.abs(amount);
            let target: number | undefined;

            if (amount > 0) {
                const startIndex = markList.findIndex(m => m.point > current + epsilon);
                if (startIndex !== -1) {
                    const targetIndex = Math.min(startIndex + stride - 1, markList.length - 1);
                    target = markList[targetIndex].point;
                }
            } else {
                let startIndex = -1;
                for (let i = markList.length - 1; i >= 0; i--) {
                    if (markList[i].point < current - epsilon) {
                        startIndex = i;
                        break;
                    }
                }

                if (startIndex !== -1) {
                    const targetIndex = Math.max(startIndex - (stride - 1), 0);
                    target = markList[targetIndex].point;
                }
            }

            if (target !== undefined && target !== current) {
                const newPos = ((target - min) / (max - min)) * 100;
                setPosition(newPos);
                emitChange?.();
            }
        },
        [disabled, markList, modelValue, min, max, setPosition, emitChange],
    );

    const onLeftKeyDown = useCallback(() => {
        if (shouldMoveToMark) {
            moveToMark(-1);
        } else if (typeof step === 'number') {
            incrementPosition(-step);
        }
    }, [shouldMoveToMark, moveToMark, step, incrementPosition]);

    const onRightKeyDown = useCallback(() => {
        if (shouldMoveToMark) {
            moveToMark(1);
        } else if (typeof step === 'number') {
            incrementPosition(step);
        }
    }, [shouldMoveToMark, moveToMark, step, incrementPosition]);

    const onPageDownKeyDown = useCallback(() => {
        if (shouldMoveToMark) {
            moveToMark(-4);
        } else if (typeof step === 'number') {
            incrementPosition(-step * 4);
        }
    }, [shouldMoveToMark, moveToMark, step, incrementPosition]);

    const onPageUpKeyDown = useCallback(() => {
        if (shouldMoveToMark) {
            moveToMark(4);
        } else if (typeof step === 'number') {
            incrementPosition(step * 4);
        }
    }, [shouldMoveToMark, moveToMark, step, incrementPosition]);

    const onHomeKeyDown = useCallback(() => {
        if (disabled) {
            return;
        }
        setPosition(0);
        emitChange?.();
    }, [disabled, emitChange, setPosition]);

    const onEndKeyDown = useCallback(() => {
        if (disabled) {
            return;
        }
        setPosition(100);
        emitChange?.();
    }, [disabled, emitChange, setPosition]);

    const onKeyDown = useCallback(
        (event: React.KeyboardEvent) => {
            const code = event.code;
            let isPreventDefault = true;

            switch (code) {
                case 'ArrowLeft':
                case 'ArrowDown':
                    onLeftKeyDown();
                    break;
                case 'ArrowRight':
                case 'ArrowUp':
                    onRightKeyDown();
                    break;
                case 'Home':
                    onHomeKeyDown();
                    break;
                case 'End':
                    onEndKeyDown();
                    break;
                case 'PageDown':
                    onPageDownKeyDown();
                    break;
                case 'PageUp':
                    onPageUpKeyDown();
                    break;
                default:
                    isPreventDefault = false;
                    break;
            }

            if (isPreventDefault) {
                event.preventDefault();
            }
        },
        [onLeftKeyDown, onRightKeyDown, onHomeKeyDown, onEndKeyDown, onPageDownKeyDown, onPageUpKeyDown],
    );

    const onDragStart = useCallback(
        (event: React.MouseEvent | React.TouchEvent) => {
            const { clientX, clientY } = getClientXY(event);
            setInitData(prev => ({
                ...prev,
                dragging: true,
                isClick: true,
                [props.vertical ? 'startY' : 'startX']: props.vertical ? clientY : clientX,
                startPosition: Number.parseFloat(currentPosition),
                newPosition: initData.current.startPosition,
            }));
            setDragging(true);
            updateDragging?.(true);
        },
        [updateDragging, props.vertical, currentPosition],
    );

    const onDragging = useCallback(
        (event: MouseEvent | TouchEvent) => {
            if (initData.current.dragging) {
                setInitData(prev => ({ ...prev, isClick: false }));
                displayTooltip();
                resetSize?.();
                let diff: number;
                const { clientX, clientY } = getClientXY(event as unknown as React.MouseEvent | React.TouchEvent);
                if (props.vertical) {
                    setInitData(prev => ({ ...prev, currentY: clientY }));
                    diff = ((initData.current.startY - initData.current.currentY) / sliderSize) * 100;
                } else {
                    setInitData(prev => ({ ...prev, currentX: clientX }));
                    diff = ((initData.current.currentX - initData.current.startX) / sliderSize) * 100;
                }
                setInitData(prev => ({ ...prev, newPosition: initData.current.startPosition + diff }));
                setPosition(initData.current.newPosition);
            }
        },
        [initData, displayTooltip, resetSize, props.vertical, setPosition, sliderSize],
    );

    const onDragEnd = useCallback(() => {
        if (initData.current.dragging) {
            setTimeout(() => {
                setInitData(prev => ({ ...prev, dragging: false }));
                setDragging(false);
                updateDragging?.(false);
                if (!initData.current.hovering) {
                    hideTooltip();
                }
                if (!initData.current.isClick) {
                    setPosition(initData.current.newPosition);
                }
                emitChange?.();
            }, 0);
            window.removeEventListener('mousemove', onDragging);
            window.removeEventListener('touchmove', onDragging);
            window.removeEventListener('mouseup', onDragEnd);
            window.removeEventListener('touchend', onDragEnd);
            window.removeEventListener('contextmenu', onDragEnd);
        }
    }, [onDragging, updateDragging, emitChange, hideTooltip, setPosition]);

    const onButtonDown = useCallback(
        (event: React.MouseEvent | React.TouchEvent) => {
            if (disabled) {
                return;
            }
            event.preventDefault();
            onDragStart(event);
            window.addEventListener('mousemove', onDragging);
            window.addEventListener('touchmove', onDragging);
            window.addEventListener('mouseup', onDragEnd);
            window.addEventListener('touchend', onDragEnd);
            window.addEventListener('contextmenu', onDragEnd);
            buttonRef.current?.focus();
        },
        [disabled, onDragStart, onDragging, onDragEnd],
    );

    // useEffect(() => {
    //     const buttonEl = buttonRef.current;
    //     if (!buttonEl) {
    //         return;
    //     }

    //     const handleTouchStart = e => {
    //         onButtonDown(e as React.TouchEvent | React.MouseEvent);
    //     };

    //     buttonEl.addEventListener('touchstart', handleTouchStart, {
    //         passive: false,
    //     });

    //     return () => {
    //         buttonEl.removeEventListener('touchstart', handleTouchStart);
    //     };
    // }, []);

    return {
        tooltipRef,
        initData,
        disabled,
        buttonRef,
        tooltipVisible,
        tooltipPersistent,
        showTooltip,
        wrapperStyle,
        formatValue,
        hovering,
        dragging,
        handleMouseEnter,
        handleMouseLeave,
        onButtonDown,
        onKeyDown,
        setPosition,
        onDragEnd,
    };
};
