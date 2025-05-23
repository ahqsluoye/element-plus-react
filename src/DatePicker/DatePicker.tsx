import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import noop from 'lodash/noop';
import omit from 'lodash/omit';
import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Calendar, CalendarContext, ValueRagne, initDate, toDayjs } from '../Calendar';
import Icon from '../Icon/Icon';
import Input from '../Input/Input';
import { InputRef } from '../Input/typings';
import Popper from '../Popper/Popper';
import { PopperOptionRef } from '../Popper/typings';
import { isNotEmpty, mergeDefaultProps } from '../Util';
import { partitionAnimationProps, partitionHTMLProps, partitionPopperPropsUtils, useControlled, useDisabled, useSize } from '../hooks';
import { namespace } from '../hooks/prefix';
import { DatePickerProps, DatePickerRef } from './typings';

dayjs.extend(advancedFormat);
dayjs.extend(weekOfYear);

const DatePicker = memo(
    forwardRef<DatePickerRef, DatePickerProps>((props, ref) => {
        props = mergeDefaultProps({ readonly: true, clearable: true, type: 'date', isoWeek: true }, props);
        const { name, readonly, clearable, required, valueFormat, plain, onClick, prepend, append, error, warning, shortcuts, onChange, formatter, type, isoWeek, ...rest } = props;
        const [value, setValue] = useControlled(props.value, props.defaultValue);
        const [visible, setVisible] = useState(false);
        const popperInstRef = useRef<PopperOptionRef>(null);
        const inputRef = useRef<InputRef>(null);
        const currentDate = useRef<Dayjs>(null);

        const disabled = useDisabled(props.disabled);
        const size = useSize(props.size);

        const [htmlInputProps] = partitionHTMLProps(rest);
        const [animationInputProps] = partitionAnimationProps(rest);
        const [popperProps] = partitionPopperPropsUtils(rest);

        /** 没有指定格式时，根据日期类型初始格式 */
        const format = useMemo(() => {
            if (isNotEmpty(props.format)) {
                return props.format;
            } else {
                switch (type) {
                    case 'year':
                        return 'YYYY';
                    case 'month':
                        return 'YYYY-MM';
                    case 'week':
                        return 'YYYY[w]ww';
                    default:
                        return 'YYYY-MM-DD';
                }
            }
        }, [props.format, type]);

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

        /** 根据日期类型设定占位符 */
        const placeholder = useMemo(() => {
            if (isNotEmpty(props.placeholder)) {
                return props.placeholder;
            } else {
                switch (type) {
                    case 'year':
                        return '请选择年份';
                    case 'month':
                        return '请选择月份';
                    case 'week':
                        return '请选择周';
                    default:
                        return '请选择日期';
                }
            }
        }, [props.placeholder, type]);

        /** 日期参数转成dayjs对象 */
        const dateProp = useMemo(() => {
            let result = initDate();
            if (isNotEmpty(value)) {
                if (type === 'week') {
                    if (currentDate.current) {
                        result = currentDate.current;
                    } else if (value instanceof Date) {
                        result = currentDate.current = dayjs(value);
                    } else if (typeof value === 'number') {
                        result = currentDate.current = dayjs(new Date(value));
                    } else if (typeof value === 'string') {
                        result = currentDate.current = toDayjs<Dayjs>(value, props.valueFormat ?? format);
                    }
                } else {
                    if (value instanceof Date) {
                        result = dayjs(value);
                    } else if (typeof value === 'number') {
                        result = dayjs(new Date(value));
                    } else if (typeof value === 'string') {
                        result = toDayjs<Dayjs>(value, props.valueFormat ?? format);
                    }
                }
            }
            return result;
        }, [format, props.valueFormat, type, value]);

        useEffect(() => {
            if (isNotEmpty(value)) {
                setValue(dateProp.format(format));
                // inputRef.current.setValue(dateProp.format(format));
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        /** 日期参数转成dayjs对象 */
        const valueRange = useMemo(() => {
            return isNotEmpty(value)
                ? ([isoWeek ? dateProp.isoWeekday(1) : dateProp.isoWeekday(0), isoWeek ? dateProp.isoWeekday(7) : dateProp.isoWeekday(6)] as ValueRagne)
                : ([null, null] as ValueRagne);
        }, [dateProp, isoWeek, value]);

        const onActive = useCallback(
            e => {
                if (!disabled) {
                    setVisible(true);
                }
                onClick?.call(this, e);
            },
            [disabled, onClick],
        );

        /**
         * 选择日期后的回调
         * @param val
         */
        const handleChange = useCallback(
            (val: Dayjs) => {
                setValue(val ? val.format(format) : '');
                currentDate.current = val;
                if (valueFormat == 'x') {
                    onChange(val ? val.toDate().getTime() : '');
                } else if (isNotEmpty(props.valueFormat)) {
                    onChange?.(val ? val.format(valueFormat) : '');
                } else {
                    onChange?.(val ? val.toDate() : '');
                }
                setVisible(false);
            },
            [format, onChange, props.valueFormat, setValue, valueFormat],
        );

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
                    required={required}
                    clearable={clearable && !disabled}
                    prefix={!plain && <Icon name="calendar-days" />}
                    onClick={onActive}
                    value={formatValue}
                    onChange={noop}
                    onClear={() => handleChange?.(null)}
                    className={classNames({ [`${namespace}-date`]: readonly, 'is-active': visible })}
                    style={props.style}
                    error={error}
                    warning={warning}
                    prepend={prepend}
                    append={append}
                    plain={plain}
                    size={size}
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
                    onDestroy={() => setVisible(false)}
                    transitionAppear
                    unmountOnExit
                    {...animationInputProps}
                    {...popperProps}
                >
                    <CalendarContext.Provider
                        value={{
                            value: dateProp,
                            valueRange,
                            dateType: type,
                            isoWeek: props.isoWeek,
                            showToday: props.showToday,
                            popperInstRef,
                            onChange: handleChange,
                            disabledDate: props.disabledDate,
                            shortcuts,
                            formatter,
                        }}
                    >
                        <Calendar />
                    </CalendarContext.Provider>
                </Popper>
            </>
        );
    }),
);

DatePicker.displayName = 'ElDatePicker';

export default DatePicker;
