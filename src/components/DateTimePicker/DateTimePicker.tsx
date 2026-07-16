import { Calendar, CalendarContext, initDate, toDayjs } from '@qsxy/element-plus-react/Calendar';
import { partitionAnimationProps } from '@qsxy/element-plus-react/hooks/animationPropsUtils';
import { partitionHTMLProps } from '@qsxy/element-plus-react/hooks/htmlPropsUtils';
import { partitionPopperPropsUtils } from '@qsxy/element-plus-react/hooks/popperPropsUtils';
import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import { useDisabled, useSize } from '@qsxy/element-plus-react/hooks/useCommonProps';
import useControlled from '@qsxy/element-plus-react/hooks/useControlled';
import Icon from '@qsxy/element-plus-react/Icon/Icon';
import Input from '@qsxy/element-plus-react/Input/Input';
import { InputRef } from '@qsxy/element-plus-react/Input/typings';
import Popper from '@qsxy/element-plus-react/Popper/Popper';
import { PopperOptionRef } from '@qsxy/element-plus-react/Popper/typings';
import { TimePanelRef } from '@qsxy/element-plus-react/TimePicker';
import TimePickerPanel from '@qsxy/element-plus-react/TimePicker/TimePickerPanel';
import Transition from '@qsxy/element-plus-react/Transition/Transition';
import { isEmpty, isNotEmpty, mergeDefaultProps } from '@qsxy/element-plus-react/Util/base';
import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import omit from 'lodash/omit';
import React, { forwardRef, memo, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { DateTimePickerProps, DateTimePickerRef } from './typings';
import { extractDateFormat, extractTimeFormat } from './util';

const DateTimePicker = memo(
    forwardRef<DateTimePickerRef, DateTimePickerProps>((props, ref) => {
        props = mergeDefaultProps(
            {
                format: 'YYYY-MM-DD HH:mm:ss',
                readonly: true,
                isoWeek: true,
                clearable: true,
                placeholder: '',
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
            classPrefix = 'date-picker',
            onChange,
            prepend,
            shortcuts,
            append,
            defaultTime,
            formatter,
            onClear,
            onVisibleChange,
            ...rest
        } = props;
        const { b, e, is } = useClassNames(classPrefix);
        const [value, setValue] = useControlled(props.value, props.defaultValue ?? '');
        const [visible, setVisible] = useState(false);
        const [showTime, setShowTime] = useState(false);
        const [enter, setEnter] = useState(false);

        const disabled = useDisabled(props.disabled);
        const size = useSize(props.size);

        const timePickerRef = useRef<InputRef>(null);
        const timePanelRef = useRef<TimePanelRef>(null);
        const popperInstRef = useRef<PopperOptionRef>(null);
        const inputRef = useRef<InputRef>(null);

        const [htmlInputProps] = partitionHTMLProps(rest);
        const [animationInputProps] = partitionAnimationProps(rest);
        const [popperProps] = partitionPopperPropsUtils(rest);

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

        /** 日期参数转成dayjs对象 */
        const dateProp = useMemo(() => {
            let result = initDate();
            if (value instanceof Date) {
                result = dayjs(value);
            } else if (typeof value === 'number') {
                result = dayjs(new Date(value));
            } else if (typeof value === 'string') {
                result = toDayjs<Dayjs>(value, props.valueFormat ?? format);
            }
            return result;
        }, [format, props.valueFormat, value]);

        const [date, setDate] = useState(value ? dateProp.format(extractDateFormat(format === 'x' ? 'YYYY-MM-DD' : format)) : '');
        const [time, setTime] = useState(value ? dateProp.format(extractTimeFormat(format === 'x' ? 'HH:mm:ss' : format)) : '');
        const timeRef = useRef('');

        const onActive = useCallback(() => {
            if (!disabled) {
                setVisible(true);
                onVisibleChange?.(true);
            }
        }, [disabled, onVisibleChange]);

        const handleChange = useCallback(
            (val: Dayjs) => {
                if (isEmpty(timeRef.current) && !defaultTime) {
                    val = val.hour(0).minute(0).second(0);
                } else if (defaultTime) {
                    const defTime = dayjs(defaultTime);
                    val = val.hour(defTime.hour()).minute(defTime.minute()).second(defTime.second());
                }
                setValue(val ? val.format(format) : '');
                setDate(val ? val.format(extractDateFormat(format === 'x' ? 'YYYY-MM-DD' : format)) : '');
                setTime(val ? val.format(extractTimeFormat(format === 'x' ? 'HH:mm:ss' : format)) : '');
                timeRef.current = val ? val.format(extractTimeFormat(format === 'x' ? 'HH:mm:ss' : format)) : '';
                if (valueFormat == 'x') {
                    onChange(val ? val.toDate().getTime() : '');
                } else if (isNotEmpty(props.valueFormat)) {
                    onChange?.(val ? val.format(valueFormat) : '');
                } else {
                    onChange?.(val ? val.toDate() : '');
                }
            },
            [defaultTime, format, onChange, props.valueFormat, setValue, valueFormat],
        );

        const setSelectionRange = useCallback((start: number, end: number) => {
            const _inputs = timePickerRef.current?.input?.current;
            if (!_inputs?.value) {
                return;
            }
            _inputs.setSelectionRange(start, end);
            _inputs.focus();
        }, []);

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
                    ref={inputRef}
                    name={name}
                    placeholder={placeholder}
                    readOnly={readonly}
                    disabled={disabled}
                    size={size}
                    clearable={clearable && !disabled}
                    isSelect
                    prefix={<Icon name="clock" />}
                    onClick={onActive}
                    value={formatValue}
                    onClear={() => {
                        handleChange(null);
                        onClear?.();
                        if (visible) {
                            setVisible(false);
                            onVisibleChange?.(false);
                        }
                    }}
                    className={classNames({ [b('date', false)]: readonly }, is({ focus: visible }))}
                    style={props.style}
                    prepend={prepend}
                    append={append}
                    plain={props.plain}
                    {...omit(htmlInputProps, [
                        'value',
                        'defaultValue',
                        'style',
                        'prefix',
                        'readOnly',
                        'disabled',
                        'size',
                        'onInput',
                        'onClick',
                        'onChange',
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
                    onDestroy={() => {
                        setVisible(false);
                        onVisibleChange?.(false);
                        setShowTime(false);
                    }}
                    transitionAppear
                    unmountOnExit
                    popperClass="is-pure"
                    {...animationInputProps}
                    onEnter={() => {
                        props.onEnter?.();
                        popperInstRef.current?.update();
                    }}
                    {...popperProps}
                >
                    <CalendarContext.Provider
                        value={{
                            value: dateProp,
                            dateType: 'date',
                            isoWeek: props.isoWeek,
                            showNow: true,
                            popperInstRef,
                            onChange: handleChange,
                            disabledDate: props.disabledDate,
                            close: () => {
                                if (isEmpty(value)) {
                                    timeRef.current = dayjs().format(extractTimeFormat(format === 'x' ? 'HH:mm:ss' : format));
                                    handleChange(dayjs());
                                }
                                setVisible(false);
                                onVisibleChange?.(false);
                            },
                            shortcuts,
                            formatter,
                        }}
                    >
                        <Calendar hasTime>
                            <div className={e`time-header`}>
                                <div className={e`editor-wrap`}>
                                    <Input placeholder="选择日期" value={date} clearable={false} readOnly />
                                </div>
                                <div className={e`editor-wrap`}>
                                    <Input placeholder="选择时间" value={time} clearable={false} onClick={() => setShowTime(true)} ref={timePickerRef} readOnly />
                                    <Transition
                                        nodeRef={() => ({ current: timePanelRef.current.ref })}
                                        visible={showTime}
                                        name={b('slide-up', false)}
                                        transitionAppear
                                        unmountOnExit
                                        display=""
                                        onEnter={() => setEnter(true)}
                                        afterEnter={() => timePanelRef.current?.adjustSpinners()}
                                        onLeave={() => setEnter(false)}
                                    >
                                        <TimePickerPanel
                                            value={dateProp}
                                            onChange={handleChange}
                                            visible={enter}
                                            showSeconds={(valueFormat || format).includes('s') || (valueFormat || format) === 'x'}
                                            referenceElement={() => timePickerRef?.current?.ref}
                                            onDestroy={() => setShowTime(false)}
                                            ref={timePanelRef}
                                            // setSelectionRange={setSelectionRange}
                                            onOk={() => {
                                                setShowTime(false);
                                            }}
                                        />
                                    </Transition>
                                </div>
                            </div>
                        </Calendar>
                    </CalendarContext.Provider>
                </Popper>
            </>
        );
    }),
);

DateTimePicker.displayName = 'ElDatePicker';

export default DateTimePicker;
