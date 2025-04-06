import { useMount } from 'ahooks';
import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import head from 'lodash/head';
import omit from 'lodash/omit';
import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import Icon from '../Icon/Icon';
import Input from '../Input/Input';
import { InputRef } from '../Input/typings';
import Popper from '../Popper/Popper';
import { PopperOptionRef } from '../Popper/typings';
import { isNotEmpty, mergeDefaultProps } from '../Util';
import { partitionAnimationProps, partitionHTMLProps, useControlled, useDisabled, useSize } from '../hooks';
import { namespace } from '../hooks/prefix';
import TimePickerPanel from './TimePickerPanel';
import { TimePanelRef, TimePickerProps, TimePickerRef, TimeType } from './typings';
import { getAvailableArrs } from './useTimePicker';

const TimePicker = forwardRef<TimePickerRef, TimePickerProps>((props, ref) => {
    props = mergeDefaultProps(
        {
            format: 'HH:mm:ss',
            disabledHours: () => [],
            disabledMinutes: () => [],
            disabledSeconds: () => [],
            readonly: true,
            isoWeek: true,
            clearable: true,
            disabled: false,
            placeholder: '请选择时间',
        },
        props,
    );
    const {
        name,
        readonly,
        clearable,
        valueFormat,
        format,
        placeholder,
        onChange,
        disabledHours,
        disabledMinutes,
        disabledSeconds,
        prepend,
        append,
        warning,
        error,
        onClear,
        onVisibleChange,
        prefixIcon,
        ...rest
    } = props;
    const [value, setValue] = useControlled(props.value, props.defaultValue);
    const [visible, setVisible] = useState(false);
    // const [enter, setEnter] = useState(false);

    const formatValue = useMemo(() => {
        if (typeof value === 'string') {
            return value;
        } else if (typeof value === 'number') {
            return dayjs(new Date(value)).format(format);
        } else if (value instanceof Date) {
            return dayjs(value).format(valueFormat ?? format);
        }
        return '';
    }, [format, value, valueFormat]);

    const disabled = useDisabled(props.disabled);
    const size = useSize(props.size);

    // const containerRef = useRef<HTMLInputElement>(null);
    const timeReferenceElement = useRef<HTMLInputElement>(null);
    const popperInstRef = useRef<PopperOptionRef>(null);
    const initialValue = useRef<string | number | Date>('');
    const timePanelRef = useRef<TimePanelRef>(null);
    const inputRef = useRef<InputRef>(null);

    const [animationInputProps] = partitionAnimationProps(rest);
    const [htmlInputProps] = partitionHTMLProps(rest);

    const showSeconds = useMemo(() => {
        return (valueFormat || format).includes('s') || (valueFormat || format) === 'x';
    }, [format, valueFormat]);

    const spinnerItems: TimeType[] = useMemo(() => {
        const arr: TimeType[] = ['hours', 'minutes', 'seconds'];
        return showSeconds ? arr : arr.slice(0, 2);
    }, [showSeconds]);

    const { getAvailableHours, getAvailableMinutes, getAvailableSeconds } = useMemo(() => {
        return getAvailableArrs(props.disabledHours, props.disabledMinutes, props.disabledSeconds);
    }, [props.disabledHours, props.disabledMinutes, props.disabledSeconds]);

    const adjustDateProp = useCallback(
        (date: Dayjs) => {
            if (date) {
                spinnerItems.forEach(item => {
                    let available: number[] = [];
                    switch (item) {
                        case 'hours':
                            available = getAvailableHours('start');
                            if (!available.includes(date.hour())) {
                                date = date.hour(head(available));
                            }
                            break;
                        case 'minutes':
                            available = getAvailableMinutes(date.hour(), 'start');
                            if (!available.includes(date.minute())) {
                                date = date.minute(head(available));
                            }
                            break;
                        case 'seconds':
                            available = getAvailableSeconds(date.hour(), date.minute(), 'start');
                            if (!available.includes(date.second())) {
                                date = date.second(head(available));
                            }
                            break;
                        default:
                            break;
                    }
                });
            }
            return date;
        },
        [getAvailableHours, getAvailableMinutes, getAvailableSeconds, spinnerItems],
    );

    /** 日期参数转成dayjs对象 */
    const dateProp = useMemo(() => {
        if (isNotEmpty(value)) {
            if (value instanceof Date) {
                return dayjs(value);
            } else if (typeof value === 'number') {
                return dayjs(new Date(value));
            }
            return adjustDateProp(dayjs(`${dayjs().format('YYYY-MM-DD')} ${value}`, valueFormat ?? format));
        }
        return adjustDateProp(visible ? dayjs() : null);
    }, [adjustDateProp, format, value, valueFormat, visible]);

    const onActive = useCallback(() => {
        if (!disabled) {
            setVisible(true);
            onVisibleChange?.(true);
        }
    }, [disabled, onVisibleChange]);

    const handleChange = useCallback(
        (val: Dayjs) => {
            val = val && adjustDateProp(val);
            setValue(val ? val.format(format) : '');
            if (valueFormat == 'x') {
                onChange(val ? val.toDate().getTime() : '');
            } else if (isNotEmpty(props.valueFormat)) {
                onChange?.(val ? val.format(valueFormat) : '');
            } else {
                onChange?.(val ? val.toDate() : '');
            }
        },
        [adjustDateProp, format, onChange, props.valueFormat, setValue, valueFormat],
    );

    const setSelectionRange = useCallback((start, end, pos = 'min') => {
        const _inputs = inputRef.current.input.current;
        if (!_inputs.value) {
            return;
        }
        if (!pos || pos === 'min') {
            _inputs.setSelectionRange(start, end);
            _inputs.focus();
        } else if (pos === 'max') {
            _inputs[1].setSelectionRange(start, end);
            _inputs[1].focus();
        }
    }, []);

    useMount(() => {
        initialValue.current = value ?? '';
    });

    useImperativeHandle(ref, () => ({
        input: inputRef,
        focus: () => inputRef.current.focus(),
        blur: () => inputRef.current.blur(),
        handleOpen: () => setVisible(true),
        handleClose: () => setVisible(false),
    }));

    return (
        <>
            <Input
                name={name}
                placeholder={placeholder}
                readOnly={readonly}
                disabled={disabled}
                size={size}
                clearable={clearable && !disabled}
                prefix={prefixIcon ? prefixIcon : <Icon name="clock" />}
                onClick={onActive}
                value={formatValue}
                onClear={() => {
                    handleChange(null);
                    initialValue.current = '';
                    if (visible) {
                        setVisible(false);
                        onVisibleChange?.(false);
                    }
                    onClear?.();
                    setTimeout(() => {
                        setValue('');
                    }, 500);
                }}
                className={classNames({ [`${namespace}-date`]: readonly, 'is-active': visible })}
                style={props.style}
                error={error}
                warning={warning}
                append={append}
                prepend={prepend}
                ref={inputRef}
                {...omit(htmlInputProps, [
                    'style',
                    'prefix',
                    'readOnly',
                    'size',
                    'onClick',
                    'onInput',
                    'onChange',
                    'disabled',
                    'className',
                    'type',
                    'maxLength',
                    'minLength',
                    'name',
                ])}
            />

            <Popper
                visible={visible}
                referenceElement={() => inputRef?.current?.ref}
                popperInstRef={popperInstRef}
                // afterEnter={(node?: HTMLElement | Text) => {
                //     setEnter(true);
                //     afterEnter?.(node);
                // }}
                // afterLeave={(node?: HTMLElement | Text) => {
                //     setEnter(false);
                //     afterLeave?.(node);
                // }}
                onDestroy={() => {
                    setVisible(false);
                    setValue(initialValue.current);
                    onVisibleChange?.(false);
                }}
                onEnter={() => timePanelRef.current.adjustSpinners()}
                {...animationInputProps}
                transitionAppear
                unmountOnExit
            >
                <TimePickerPanel
                    ref={timePanelRef}
                    value={dateProp}
                    onChange={handleChange}
                    // visible={enter}
                    referenceElement={timeReferenceElement}
                    showSeconds={showSeconds}
                    setSelectionRange={setSelectionRange}
                    onDestroy={() => {
                        setVisible(false);
                        onVisibleChange?.(false);
                        setValue(initialValue.current);
                    }}
                    onOk={() => {
                        setVisible(false);
                        onVisibleChange?.(false);
                        initialValue.current = value ?? '';
                    }}
                    disabledHours={disabledHours}
                    disabledMinutes={disabledMinutes}
                    disabledSeconds={disabledSeconds}
                />
            </Popper>
        </>
    );
});

TimePicker.displayName = 'ElTimePicker';

export default TimePicker;
