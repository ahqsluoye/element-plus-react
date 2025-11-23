import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import noop from 'lodash/noop';
import omit from 'lodash/omit';
import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, CalendarContext, ValueRagne, initDate, toDayjs } from '../Calendar';
import { useConfigProvider } from '../ConfigProvider/ConfigProviderContext';
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
dayjs.extend(quarterOfYear);

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

        const { locale } = useConfigProvider();
        const { t } = useTranslation();

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
                    case 'quarter':
                        return 'YYYY-[Q]Q';
                    default:
                        return 'YYYY-MM-DD';
                }
            }
        }, [props.format, type]);

        const formatValue = useMemo<string>(() => {
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
                        return t('el.datepicker.placeholder.year', { lng: locale });
                    case 'month':
                        return t('el.datepicker.placeholder.month', { lng: locale });
                    case 'week':
                        return t('el.datepicker.placeholder.week', { lng: locale });
                    case 'quarter':
                        return t('el.datepicker.placeholder.quarter', { lng: locale });
                    default:
                        return t('el.datepicker.placeholder.date', { lng: locale });
                }
            }
        }, [locale, props.placeholder, t, type]);

        /** 日期参数转成dayjs对象 */
        const dateProp = useMemo(() => {
            let result = initDate();
            if (isNotEmpty(value)) {
                if (type === 'week' || type === 'quarter') {
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
                if (type === 'quarter') {
                    const quarter = result.quarter();
                    result = result.month((quarter - 1) * 3).date(1);
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
                    onChange(val ? val.toDate().getTime() : '', formatValue);
                } else if (isNotEmpty(props.valueFormat)) {
                    onChange?.(val ? val.format(valueFormat) : '', formatValue);
                } else {
                    onChange?.(val ? val.toDate() : '', formatValue);
                }
                setVisible(false);
            },
            [format, formatValue, onChange, props.valueFormat, setValue, valueFormat],
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
                    className={classNames({ [`${namespace}-date`]: readonly, 'is-focus': visible })}
                    style={props.style}
                    error={error}
                    warning={warning}
                    prepend={prepend}
                    append={append}
                    plain={plain}
                    size={size}
                    {...omit(htmlInputProps, [
                        'value',
                        'defaultValue',
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
