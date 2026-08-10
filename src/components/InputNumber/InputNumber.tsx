import { useConfigProvider } from '@qsxy/element-plus-react/ConfigProvider/ConfigProviderContext';
import { partitionHTMLProps } from '@qsxy/element-plus-react/hooks/htmlPropsUtils';
import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import { useDisabled, useSize } from '@qsxy/element-plus-react/hooks/useCommonProps';
import useControlled from '@qsxy/element-plus-react/hooks/useControlled';
import ElIcon from '@qsxy/element-plus-react/Icon/Icon';
import ElInput from '@qsxy/element-plus-react/Input/Input';
import { InputRef } from '@qsxy/element-plus-react/Input/typings';
import { isNotEmpty, isNumber, isUndefined, mergeDefaultProps } from '@qsxy/element-plus-react/Util/base';
import { useMount, useUnmount } from 'ahooks';
import classNames from 'classnames';
import isNil from 'lodash/isNil';
import omit from 'lodash/omit';
import toFinite from 'lodash/toFinite';
import React, { memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InputNumberProps, InputNumberRef } from './typings';

const InputNumber = memo(({ ref, ...props }: InputNumberProps & { ref?: React.Ref<InputNumberRef | null> }) => {
    const { locale } = useConfigProvider();
    const { t } = useTranslation();

    props = mergeDefaultProps(
        {
            disabled: undefined,
            step: 1,
            precision: undefined,
            max: Number.MAX_SAFE_INTEGER,
            min: Number.MIN_SAFE_INTEGER,
            placeholder: '',
            controls: true,
            stepStrictly: false,
            valueOnClear: null,
            // validateEvent: true,
            inputmode: undefined,
            align: 'center',
        },
        props,
    );

    const {
        name,
        id,
        max: _maxProp,
        min: _minProp,
        step,
        precision: precisionProp,
        stepStrictly,
        valueOnClear,
        // validateEvent,
        inputmode,
        align,
        disabledScientific,
        controls,
        controlsPosition,
        onChange,
        onFocus,
        onBlur,
        classPrefix = 'input-number',
        prefix,
        suffix,
        placeholder,

        maxLength,
        minLength,
        decreaseIcon,
        increaseIcon,
        ...rest
    } = props;

    const { b, e, m, is } = useClassNames(classPrefix);
    const [htmlInputProps] = partitionHTMLProps(rest);
    const [tooltipEvents] = partitionHTMLProps(props, { htmlProps: ['onMouseEnter', 'onMouseLeave', 'onClick', 'onContextMenu'] });

    const [value, setValue] = useControlled(props.value, props.defaultValue);
    const disabled = useDisabled(props.disabled);
    const size = useSize(props.size);

    const { inputNumber } = useConfigProvider();

    const valueRef = useRef(value);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<InputRef>(null);
    const [userInput, setUserInput] = useState<string | number | null>(null);
    const userInputRef = useRef<string | number | null>(null);

    const isMouseDown = useRef(false);
    const timerRef = useRef<any>(null);

    // Computed properties equivalent
    const controlsAtRight = useMemo(() => {
        return (controls && controlsPosition === 'right') || (controlsPosition !== '' && inputNumber?.controlsPosition === 'right');
    }, [controls, controlsPosition, inputNumber?.controlsPosition]);

    const maxProp = useMemo(() => _maxProp ?? inputNumber?.max ?? Number.MAX_SAFE_INTEGER, [_maxProp, inputNumber?.max]);
    const minProp = useMemo(() => _minProp ?? inputNumber?.min ?? Number.MIN_SAFE_INTEGER, [_minProp, inputNumber?.min]);

    // Utility functions
    const getPrecision = useCallback((val: number | string | null | undefined): number => {
        if (val == null) {
            return 0;
        }
        const valueString = val.toString();
        const dotPosition = valueString.indexOf('.');
        let precision = 0;
        if (dotPosition !== -1) {
            precision = valueString.length - dotPosition - 1;
        }
        return precision;
    }, []);

    const numPrecision = useMemo(() => {
        const stepPrecision = getPrecision(step);
        if (!isUndefined(props.precision)) {
            if (stepPrecision > precisionProp) {
                if (process.env.NODE_ENV !== 'production') {
                    console.warn('[InputNumber] precision should not be less than the decimal places of step');
                }
            }
            return precisionProp;
        } else {
            return Math.max(getPrecision(value), stepPrecision);
        }
    }, [getPrecision, step, props.precision, precisionProp, value]);

    const minDisabled = useCallback(() => {
        if (isMouseDown.current) {
            return userInputRef.current !== null && Number(userInputRef.current) <= minProp;
        }
        return typeof value === 'number' && value <= minProp;
    }, [value, minProp]);

    const maxDisabled = useCallback(() => {
        if (isMouseDown.current) {
            return userInputRef.current !== null && Number(userInputRef.current) >= maxProp;
        }
        return typeof value === 'number' && value >= maxProp;
    }, [value, maxProp]);

    const displayValue = useMemo(() => {
        if (userInput !== null) {
            return userInput ?? '';
        }
        let currentValue: number | string | undefined | null = value;
        if (isNil(currentValue)) {
            return '';
        }
        if (isNumber(currentValue)) {
            if (Number.isNaN(currentValue)) {
                return '';
            }
            if (!isUndefined(precisionProp)) {
                currentValue = currentValue.toFixed(precisionProp);
            }
        }
        return currentValue ?? '';
    }, [userInput, value, precisionProp]);

    const toPrecision = useCallback(
        (num: number, pre?: number): number => {
            if (pre === undefined) {
                pre = numPrecision;
            }
            if (pre === 0) {
                return Math.round(num);
            }
            let snum = String(num);
            const pointPos = snum.indexOf('.');
            if (pointPos === -1) {
                return num;
            }
            const nums = snum.replace('.', '').split('');
            const datum = nums[pointPos + pre];
            if (!datum) {
                return num;
            }
            const length = snum.length;
            if (snum.charAt(length - 1) === '5') {
                snum = `${snum.slice(0, Math.max(0, length - 1))}6`;
            }
            return Number.parseFloat(Number(snum).toFixed(pre));
        },
        [numPrecision],
    );

    const ensurePrecision = useCallback(
        (val: number, coefficient: 1 | -1 = 1): number => {
            if (typeof val !== 'number') {
                return value as number;
            }
            if (val >= Number.MAX_SAFE_INTEGER && coefficient === 1) {
                if (process.env.NODE_ENV !== 'production') {
                    console.warn('InputNumber', 'The value has reached the maximum safe integer limit.');
                }
                return val;
            } else if (val <= Number.MIN_SAFE_INTEGER && coefficient === -1) {
                if (process.env.NODE_ENV !== 'production') {
                    console.warn('InputNumber', 'The value has reached the minimum safe integer limit.');
                }
                return val;
            }
            return toPrecision(val + step * coefficient);
        },
        [toPrecision, step, value],
    );

    const verifyValue = useCallback(
        (val: number | string | null | undefined, shouldUpdate = false): number | null => {
            if (maxProp < minProp) {
                throw new Error('InputNumber: min should not be greater than max.');
            }

            let newVal = Number(val);
            if (val == null || Number.isNaN(newVal)) {
                return null;
            }

            if (val === '') {
                if (valueOnClear === null) {
                    return null;
                }

                if (typeof valueOnClear === 'string') {
                    newVal = valueOnClear === 'min' ? minProp : maxProp;
                } else {
                    newVal = valueOnClear;
                }
            }

            if (stepStrictly) {
                newVal = toPrecision(Math.round(toPrecision(newVal / step)) * step, precisionProp);
                if (newVal !== val && shouldUpdate) {
                    // Emit update event - handled by parent in React
                }
            }

            if (precisionProp !== undefined) {
                newVal = toPrecision(newVal, precisionProp);
            }

            if (newVal > maxProp || newVal < minProp) {
                newVal = newVal > maxProp ? maxProp : minProp;
                if (shouldUpdate) {
                    // Emit update event - handled by parent in React
                }
            }
            return newVal;
        },
        [maxProp, minProp, valueOnClear, stepStrictly, toPrecision, step, precisionProp],
    );

    const setCurrentValue = useCallback(
        (val: number | string | null | undefined, emitChange = true) => {
            const oldVal = value;
            const newVal = verifyValue(val);

            if (!emitChange) {
                setValue(newVal);
                return;
            }
            setUserInput(null);
            userInputRef.current = null;
            if (oldVal === newVal && val) {
                return;
            }

            setValue(newVal);
            if (oldVal !== newVal && onChange) {
                onChange(newVal as number, oldVal as number);
            }

            // Form validation would go here if needed
        },
        [value, verifyValue, setValue, onChange],
    );

    const increase = useCallback(() => {
        if (props.readOnly || disabled || maxDisabled()) {
            return;
        }
        const val = Number(displayValue) || 0;
        const newVal = ensurePrecision(val);
        setCurrentValue(newVal);
        onChange?.(newVal);
    }, [props.readOnly, disabled, maxDisabled, displayValue, ensurePrecision, setCurrentValue, onChange]);

    const decrease = useCallback(() => {
        if (props.readOnly || disabled || minDisabled()) {
            return;
        }
        const val = Number(displayValue) || 0;
        const newVal = ensurePrecision(val, -1);
        setCurrentValue(newVal);
        onChange?.(newVal);
    }, [props.readOnly, disabled, minDisabled, displayValue, ensurePrecision, setCurrentValue, onChange]);

    // Event handlers
    const handleKeydown = useCallback(
        (event: React.KeyboardEvent) => {
            const key = event.key;
            const code = event.code;

            if (disabledScientific && ['e', 'E'].includes(key)) {
                event.preventDefault();
                return;
            }

            switch (code) {
                case 'ArrowUp': {
                    event.preventDefault();
                    increase();
                    break;
                }
                case 'ArrowDown': {
                    event.preventDefault();
                    decrease();
                    break;
                }
            }
        },
        [decrease, disabledScientific, increase],
    );

    const handleInput = useCallback(
        (inputVal: string) => {
            setUserInput(inputVal);
            userInputRef.current = inputVal;
            const newVal = inputVal === '' ? null : Number(inputVal);
            onChange?.(newVal);
            setCurrentValue(newVal, false);
        },
        [onChange, setCurrentValue],
    );

    const handleInputChange = useCallback(
        (inputVal: string) => {
            const newVal = inputVal !== '' ? Number(inputVal) : '';
            // onChange?.(newVal);
            // setCurrentValue(newVal, true);
            if ((typeof newVal === 'number' && !Number.isNaN(newVal)) || inputVal === '') {
                setUserInput(inputVal);
                userInputRef.current = inputVal;
                onChange?.(newVal);
                // setCurrentValue(newVal);
            }
            // setUserInput(null);
        },
        [onChange],
    );

    const handleFocus = useCallback(
        (event: React.FocusEvent<HTMLInputElement>) => {
            onFocus?.(event);
        },
        [onFocus],
    );

    const handleBlur = useCallback(
        (event: React.FocusEvent<HTMLInputElement>) => {
            // setUserInput(null);
            // Handle Firefox bug where non-numeric content isn't cleared
            if (value === null && inputRef.current?.input.current) {
                inputRef.current.input.current.value = '';
            }
            onBlur?.(event);
            if (isNotEmpty(userInputRef.current)) {
                setCurrentValue(String(userInputRef.current), true);
                setUserInput(null);
                userInputRef.current = null;
            }
            // Form validation would go here
        },
        [value, onBlur, setCurrentValue, userInputRef],
    );

    // Effects
    useEffect(() => {
        valueRef.current = value;
    }, [value]);

    useEffect(() => {
        const innerInput = inputRef.current?.input.current;
        if (innerInput) {
            innerInput.setAttribute('role', 'spinbutton');
            if (Number.isFinite(maxProp)) {
                innerInput.setAttribute('aria-valuemax', String(maxProp));
            } else {
                innerInput.removeAttribute('aria-valuemax');
            }
            if (Number.isFinite(minProp)) {
                innerInput.setAttribute('aria-valuemin', String(minProp));
            } else {
                innerInput.removeAttribute('aria-valuemin');
            }
            innerInput.setAttribute('aria-valuenow', value != null ? String(value) : '');
            innerInput.setAttribute('aria-disabled', String(disabled));

            // Add wheel event listener
            const handleWheel = (event: WheelEvent) => {
                if (document.activeElement === event.target) {
                    event.preventDefault();
                }
            };
            innerInput.addEventListener('wheel', handleWheel, { passive: false });

            return () => {
                innerInput.removeEventListener('wheel', handleWheel);
            };
        }
    }, [maxProp, minProp, value, disabled]);

    const handleMouseUp = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            clearInterval(timerRef.current);
        }
        if (isMouseDown.current) {
            setCurrentValue(userInputRef.current, false);
            onChange?.(userInputRef.current);
            userInputRef.current = null;
            isMouseDown.current = false;
        }
    }, [onChange, setCurrentValue, userInputRef, isMouseDown]);

    useMount(() => {
        document.addEventListener('mouseup', handleMouseUp);
    });

    useUnmount(() => {
        document.removeEventListener('mouseup', handleMouseUp);
    });

    // Ref methods
    useImperativeHandle(ref, () => ({
        ref: containerRef,
        input: inputRef,
        getValue: () => toFinite(value),
        focus: () => inputRef.current?.focus(),
        blur: () => inputRef.current?.blur(),
    }));

    return (
        <div
            className={classNames(b(), m(size), is({ disabled, 'without-controls': !controls, 'controls-right': controls && controlsAtRight, align: !!align }), props.className)}
            style={props.style}
            ref={containerRef}
            {...tooltipEvents}
            onDragStart={event => event.preventDefault()}
        >
            {controls && (
                <span
                    className={classNames(e`decrease`, is({ disabled: minDisabled() }))}
                    role="button"
                    aria-label={t('el.inputNumber.decrease', { lng: locale })}
                    tabIndex={0}
                    onKeyDown={event => event.key === 'Enter' && decrease()}
                    onMouseDown={() => {
                        decrease();
                        timerRef.current = setTimeout(() => {
                            isMouseDown.current = true;
                            timerRef.current = setInterval(() => {
                                const val = userInputRef.current !== null ? Number(userInputRef.current) || 0 : Number(displayValue) || 0;
                                const newVal = verifyValue(ensurePrecision(val, -1));
                                setUserInput(!isUndefined(precisionProp) ? newVal.toFixed(precisionProp) : newVal);
                                userInputRef.current = newVal;
                            }, 100);
                        }, 500);
                    }}
                    // onClick={decrease}
                >
                    {decreaseIcon || <ElIcon name={controlsAtRight ? 'angle-down' : 'minus'} prefix={controlsAtRight ? 'fal' : 'far'} />}
                </span>
            )}

            {controls && (
                <span
                    className={classNames(e`increase`, is({ disabled: maxDisabled() }))}
                    role="button"
                    aria-label={t('el.inputNumber.increase', { lng: locale })}
                    tabIndex={0}
                    onKeyDown={event => event.key === 'Enter' && increase()}
                    onMouseDown={() => {
                        increase();
                        timerRef.current = setTimeout(() => {
                            isMouseDown.current = true;
                            timerRef.current = setInterval(() => {
                                const val = userInputRef.current !== null ? Number(userInputRef.current) || 0 : Number(displayValue) || 0;
                                const newVal = verifyValue(ensurePrecision(val));
                                setUserInput(!isUndefined(precisionProp) ? newVal.toFixed(precisionProp) : newVal);
                                userInputRef.current = newVal;
                            }, 100);
                        }, 500);
                    }}
                    // onClick={increase}
                >
                    {increaseIcon || <ElIcon name={controlsAtRight ? 'angle-up' : 'plus'} prefix={controlsAtRight ? 'fal' : 'far'} />}
                </span>
            )}

            <ElInput
                id={id}
                placeholder={placeholder}
                prefix={prefix}
                suffix={suffix}
                name={name}
                value={displayValue}
                disabled={disabled}
                readOnly={props.readOnly}
                size={size}
                clearable={false}
                onBlur={handleBlur}
                onFocus={handleFocus}
                // onInput={handleInput}
                onChange={handleInputChange}
                onKeyDown={handleKeydown}
                maxLength={maxLength}
                minLength={minLength}
                inputMode={inputmode}
                ref={inputRef}
                {...omit(htmlInputProps, [
                    'value',
                    'defaultValue',
                    'disabled',
                    'size',
                    'onInput',
                    'onChange',
                    'onKeyDown',
                    'style',
                    'className',
                    'type',
                    'name',
                    'prefix',
                    'readOnly',
                    'maxLength',
                    'minLength',
                ])}
            />
        </div>
    );
});

InputNumber.displayName = 'ElInputNumber';

export default InputNumber;
