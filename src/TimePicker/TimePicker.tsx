import { useMount } from 'ahooks';
import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import head from 'lodash/head';
import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Icon } from '../Icon';
import { Input, InputRef } from '../Input';
import { Popper, PopperOptionRef } from '../Popper';
import { isNotEmpty } from '../Util';
import { partitionAnimationProps, useControlled, useDisabled, useSize } from '../hooks';
import { globalKey } from '../hooks/prefix';
import TimePickerPanel from './TimePickerPanel';
import { TimePanelRef, TimePickerProps, TimePickerRef, TimeType } from './typings';
import { getAvailableArrs } from './useTimePicker';

/**
 * @LastEditor	Parker
 * @ModifyTime	2022/4/5 21:16:52
 * @CreateTime	2022/4/5 11:15:37
 * @LastEditor	Parker
 * @ModifyTime	2025/2/21 20:55:34
 * @Description 用于选择或输入日期
 */
const TimePicker = forwardRef<TimePickerRef, TimePickerProps>((props, ref) => {
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
        // afterEnter,
        // afterLeave,
        ...rest
    } = props;
    const [value, setValue] = useControlled(props.value, props.defaultValue);
    const [visible, setVisible] = useState(false);
    // const [enter, setEnter] = useState(false);

    const disabled = useDisabled(props.disabled);
    const size = useSize(props.size);

    // const containerRef = useRef<HTMLInputElement>();
    const timeReferenceElement = useRef<HTMLInputElement>();
    const popperInstRef = useRef<PopperOptionRef>();
    const initialValue = useRef<string>('');
    const timePanelRef = useRef<TimePanelRef>();
    const inputInstance = useRef<InputRef>(null);

    const [animationInputProps] = partitionAnimationProps(rest);

    const showSeconds = useMemo(() => {
        return (valueFormat || format).includes('s');
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
            return adjustDateProp(dayjs(`${dayjs().format('YYYY-MM-DD')} ${value}`, valueFormat ?? format));
        }
        return adjustDateProp(visible ? dayjs() : null);
    }, [adjustDateProp, format, value, valueFormat, visible]);

    const onActive = useCallback(() => {
        if (!disabled) {
            setVisible(true);
        }
    }, [disabled]);

    const handleChange = useCallback(
        (val: Dayjs) => {
            val = val && adjustDateProp(val);
            const formatValue = val ? val.format(valueFormat ?? format) : '';
            setValue(formatValue);
            onChange?.(formatValue);
        },
        [adjustDateProp, format, onChange, setValue, valueFormat],
    );

    // const setSelectionRange = useCallback(
    //     (start, end, pos = 'min') => {
    //         const _inputs = (ref || referenceElement).current;
    //         if (!_inputs.value) {
    //             return;
    //         }
    //         if (!pos || pos === 'min') {
    //             _inputs.setSelectionRange(start, end);
    //             _inputs.focus();
    //         } else if (pos === 'max') {
    //             _inputs[1].setSelectionRange(start, end);
    //             _inputs[1].focus();
    //         }
    //     },
    //     [ref],
    // );

    useMount(() => {
        initialValue.current = value ?? '';
    });

    useImperativeHandle(ref, () => ({
        popperInstRef: popperInstRef.current,
        inputInstance: inputInstance.current,
        getValue: () => value,
        setValue,
        setVisible,
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
                prefix={<Icon name="clock" />}
                onClick={onActive}
                value={value}
                onClear={() => {
                    handleChange(null);
                    initialValue.current = '';
                }}
                className={classNames({ [`${globalKey}-date`]: readonly, 'is-active': visible })}
                style={props.style}
                error={error}
                warning={warning}
                append={append}
                prepend={prepend}
                ref={inputInstance}
            />

            <Popper
                visible={visible}
                referenceElement={() => inputInstance?.current?.ref}
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
                }}
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
                    // setSelectionRange={setSelectionRange}
                    onDestroy={() => {
                        setVisible(false);
                        setValue(initialValue.current);
                    }}
                    onOk={() => {
                        setVisible(false);
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

TimePicker.defaultProps = {
    format: 'HH:mm:ss',
    disabledHours: () => [],
    disabledMinutes: () => [],
    disabledSeconds: () => [],
    readonly: true,
    isoWeek: true,
    clearable: true,
    disabled: false,
    placeholder: '请选择时间',
};

TimePicker.displayName = 'TimePicker';

export default TimePicker;
