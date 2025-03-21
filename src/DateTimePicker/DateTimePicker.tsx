import classNames from 'classnames';
import { Dayjs } from 'dayjs';
import omit from 'lodash/omit';
import React, { forwardRef, memo, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Calendar, CalendarContext, ChangeParams, initDate, toDayjs } from '../Calendar';
import { Icon } from '../Icon';
import { Input, InputRef } from '../Input';
import { Popper, PopperOptionRef } from '../Popper';
import { TimePanelRef } from '../TimePicker';
import TimePickerPanel from '../TimePicker/TimePickerPanel';
import { Transition } from '../Transition';
import { isEmpty } from '../Util';
import { partitionAnimationProps, partitionHTMLProps, partitionPopperPropsUtils, useClassNames, useControlled, useDisabled, useSize } from '../hooks';
import { DateTimePickerProps, DateTimePickerRef } from './typings';
import { extractDateFormat, extractTimeFormat } from './util';

const DateTimePicker = forwardRef<DateTimePickerRef, DateTimePickerProps>((props, ref) => {
    props = {
        format: 'YYYY-MM-DD HH:mm:ss',
        readonly: true,
        isoWeek: true,
        clearable: true,
        disabled: false,
        placeholder: '请选择日期时间',
        ...props,
    };
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
        warning,
        error,
        formatter,
        ...rest
    } = props;
    const { e, is } = useClassNames(classPrefix);
    const [value, setValue] = useControlled(props.value, props.defaultValue);
    const [visible, setVisible] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [enter, setEnter] = useState(false);

    const disabled = useDisabled(props.disabled);
    const size = useSize(props.size);

    const timeReferenceElement = useRef<InputRef>(null);
    const timePanelRef = useRef<TimePanelRef>();
    const popperInstRef = useRef<PopperOptionRef>();
    const inputRef = useRef<InputRef>(null);

    const [htmlInputProps] = partitionHTMLProps(rest);
    const [animationInputProps] = partitionAnimationProps(rest);
    const [popperProps] = partitionPopperPropsUtils(rest);

    /** 日期参数转成dayjs对象 */
    const dateProp = useMemo(() => {
        return typeof value === 'string' ? toDayjs<Dayjs>(value, valueFormat ?? format) : initDate();
    }, [format, value, valueFormat]);

    const [date, setDate] = useState(value ? dateProp.format(extractDateFormat(valueFormat ?? format)) : null);
    const [time, setTime] = useState(value ? dateProp.format(extractTimeFormat(valueFormat ?? format)) : null);

    const onActive = useCallback(() => {
        if (!disabled) {
            setVisible(true);
        }
    }, [disabled]);

    const handleChange = useCallback(
        (val: Dayjs, { defaultTime }: ChangeParams = { defaultTime: false }) => {
            if (isEmpty(time) && !defaultTime) {
                val = val.hour(0).minute(0).second(0);
            }
            const formatValue = val ? val.format(valueFormat ?? format) : '';
            setValue(formatValue);
            setDate(val ? val.format(extractDateFormat(valueFormat ?? format)) : null);
            setTime(val ? val.format(extractTimeFormat(valueFormat ?? format)) : null);
            onChange?.(formatValue);
        },
        [format, onChange, setValue, time, valueFormat],
    );

    useImperativeHandle(ref, () => ({
        inputInstance: inputRef.current,
        popperInstRef: popperInstRef.current,
        getValue: () => value,
        setValue,
        setVisible,
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
                prefix={<Icon name="clock" />}
                onClick={onActive}
                value={value}
                onClear={() => handleChange(null, {})}
                className={classNames({ 'r-date': readonly }, is({ active: visible }))}
                style={props.style}
                error={error}
                warning={warning}
                prepend={prepend}
                append={append}
                plain={props.plain}
                {...omit(htmlInputProps, [
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
                    setShowTime(false);
                }}
                {...animationInputProps}
                transitionAppear
                unmountOnExit
                {...animationInputProps}
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
                        close: () => setVisible(false),
                        shortcuts,
                        formatter,
                    }}
                >
                    <Calendar hasTime>
                        <div className={e`time-header`}>
                            <div className={e`editor-wrap`}>
                                <Input placeholder="选择日期" value={date} clearable={false} />
                            </div>
                            <div className={e`editor-wrap`}>
                                <Input placeholder="选择时间" value={time} clearable={false} onFocus={() => setShowTime(true)} ref={timeReferenceElement} />
                                <Transition
                                    nodeRef={() => ({ current: timePanelRef.current.ref })}
                                    visible={showTime}
                                    name="r-slide-up"
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
                                        showSeconds={(valueFormat || format).includes('s')}
                                        referenceElement={() => timeReferenceElement?.current?.ref}
                                        onDestroy={() => setShowTime(false)}
                                        ref={timePanelRef}
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
});

DateTimePicker.displayName = 'DateTimePicker';

export default memo(DateTimePicker);
