import classNames from 'classnames';
import max from 'lodash/max';
import min from 'lodash/min';
import omit from 'lodash/omit';
import toFinite from 'lodash/toFinite';
import React, { forwardRef, memo, useCallback, useContext, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { ConfigProvider } from '../ConfigProvider';
import { Icon } from '../Icon';
import { Input, InputRef } from '../Input';
import { floatAdd, floatSub, formatNumber, isEmpty, isNotEmpty, mergeDefaultProps } from '../Util';
import { partitionHTMLProps, useClassNames, useControlled, useDisabled, useSize } from '../hooks';
import { InputNumberProps, InputNumberRef } from './typings';

const InputNumber = forwardRef<InputNumberRef, InputNumberProps>((props, ref) => {
    props = mergeDefaultProps(
        {
            step: 1,
            precision: 0,
            max: Infinity,
            min: -Infinity,
            placeholder: '请输入',
        },
        props,
    );
    const {
        name,
        max: _maxProp,
        min: _minProp,
        step,
        precision,
        onChange,
        classPrefix = 'input-number',
        prefix,
        suffix,
        prepend,
        append,
        placeholder,
        warning,
        error,
        maxLength,
        minLength,
        ...rest
    } = props;
    const { b, e, m, is } = useClassNames(classPrefix);
    const [htmlInputProps] = partitionHTMLProps(rest);

    const [value, setValue] = useControlled(props.value, props.defaultValue);
    const disabled = useDisabled(props.disabled);
    const size = useSize(props.size);

    const { inputNumber } = useContext(ConfigProvider);

    const valueRef = useRef(value);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<InputRef>(null);
    // 是否ctrl按键
    const isCtrlKey = useRef(false);

    const controlsPositionRight = useMemo(() => {
        return props.controlsPositionRight || inputNumber?.controlsPositionRight || isNotEmpty(prefix) || isNotEmpty(suffix) || isNotEmpty(prepend) || isNotEmpty(append);
    }, [append, inputNumber?.controlsPositionRight, prefix, prepend, props.controlsPositionRight, suffix]);

    // const containerRef = useMemo(() => props.containerRef ?? rootRef, [props.containerRef]);
    const maxProp = useMemo(() => _maxProp ?? inputNumber?.max ?? Infinity, [_maxProp, inputNumber?.max]);
    const minProp = useMemo(() => _minProp ?? inputNumber?.min ?? -Infinity, [_minProp, inputNumber?.min]);

    /** 递增 */
    const increase = useCallback(() => {
        if (disabled) {
            return;
        }
        const increaseValue = min([floatAdd(toFinite(value), step), maxProp]);
        const increaseOldValue = value;
        const formatVal = formatNumber(increaseValue, precision);
        setValue(formatVal);
        onChange?.(toFinite(formatVal), increaseOldValue);
    }, [disabled, value, step, maxProp, precision, setValue, onChange]);

    /** 递减 */
    const decrease = useCallback(() => {
        if (disabled) {
            return;
        }
        const decreaseValue = max([floatSub(toFinite(value), step), minProp]);
        const decreaseOldValue = value;
        const formatVal = formatNumber(decreaseValue, precision);
        setValue(formatVal);
        onChange?.(toFinite(formatVal), decreaseOldValue);
    }, [disabled, value, step, minProp, precision, setValue, onChange]);

    const onInput = useCallback(
        (inputVal: string) => {
            // 阻止输入错误位置的负号
            inputVal = inputVal
                .split('')
                .filter((item, index) => {
                    if (item === '-' && index > 0) {
                        return false;
                    }
                    return true;
                })
                .join('');
            // inputVal = inputVal.replace(/[^\d-\\.]/g, '').replace(/(?<=.)-/g, '');
            setValue(inputVal);
            valueRef.current = inputVal;
            // 输入小数点后，如果转为数字会丢失小数点，所以此时不提交数据
            if (!inputVal.endsWith('.') && !inputVal.endsWith('0')) {
                const _inputVal = isEmpty(inputVal) ? '' : toFinite(inputVal);
                setValue(_inputVal);
                onChange?.(_inputVal);
            }
            inputRef.current.input.current.value = isEmpty(inputVal) ? '' : inputVal;
        },
        [onChange, setValue],
    );

    /** 输入 */
    const onBlur = useCallback(() => {
        // 删除值
        if (isEmpty(valueRef.current)) {
            setValue('');
            onChange?.('');
            valueRef.current = '';
            inputRef.current.input.current.value = '';
            return;
        }

        const inputOldValue = value;
        const val = toFinite(valueRef.current);
        const formatVal = formatNumber(val, precision);

        // 限制最大最小
        if (val > maxProp) {
            setValue(maxProp);
            onChange?.(maxProp, inputOldValue);
            inputRef.current.input.current.value = maxProp + '';
            return;
        } else if (val < minProp) {
            setValue(minProp);
            onChange?.(minProp, inputOldValue);
            inputRef.current.input.current.value = minProp + '';
            return;
        }
        setValue(formatVal);
        onChange?.(toFinite(formatVal), inputOldValue);
        inputRef.current.input.current.value = formatVal;
    }, [maxProp, minProp, onChange, precision, setValue, value]);

    useEffect(() => {
        valueRef.current = value;
    }, [value]);

    useImperativeHandle(ref, () => ({
        get ref() {
            return containerRef;
        },
        get input() {
            return inputRef;
        },
        getValue: () => toFinite(value),
        focus: inputRef.current.focus,
        blur: inputRef.current.blur,
    }));

    return (
        <div className={classNames(b(), m({ [size]: size }), is({ 'controls-right': controlsPositionRight }), props.className)} style={props.style} ref={containerRef}>
            <span className={classNames(e`decrease`, is({ disabled: disabled || value == minProp }))} onClick={decrease}>
                <Icon prefix={controlsPositionRight ? 'fal' : 'far'} name={controlsPositionRight ? 'angle-down' : 'minus'} />
            </span>
            <span className={classNames(e`increase`, is({ disabled: disabled || value == maxProp }))} onClick={increase}>
                <Icon prefix={controlsPositionRight ? 'fal' : 'far'} name={controlsPositionRight ? 'angle-up' : 'plus'} />
            </span>
            <Input
                placeholder={placeholder}
                prefix={prefix}
                suffix={suffix}
                name={name}
                value={value}
                disabled={disabled}
                readOnly={props.readOnly}
                size={size}
                error={error}
                warning={warning}
                clearable={false}
                onBlur={onBlur}
                onChange={onInput}
                maxLength={maxLength}
                minLength={maxLength}
                onKeyDown={useCallback(event => {
                    if (event.ctrlKey) {
                        isCtrlKey.current = true;
                    }
                    // 复制、粘贴和剪切可以执行
                    if (isCtrlKey.current) {
                        if (!['c', 'v', 'x'].includes(event.key)) {
                            event.preventDefault();
                        }
                    } else if (!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '.', 'ArrowLeft', 'ArrowRight', 'Backspace', 'Delete'].includes(event.key)) {
                        event.preventDefault();
                    }
                    const val = valueRef.current;
                    if (isNotEmpty(val)) {
                        // 如果已经有小数点了，阻止输入小数点
                        if (val.toString().indexOf('.') > -1 && event.key === '.') {
                            event.preventDefault();
                        }
                        // 如果已经是负数了，阻止输入负号
                        if (val.toString().indexOf('-') > -1 && event.key === '-') {
                            event.preventDefault();
                        }
                    }
                }, [])}
                onKeyUp={useCallback(() => {
                    isCtrlKey.current = false;
                }, [])}
                ref={inputRef}
                {...omit(htmlInputProps, [
                    'disabled',
                    'size',
                    'onInput',
                    'onKeyDown',
                    'onKeyUp',
                    'size',
                    'onChange',
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

export default memo(InputNumber);
