import { Calendar, CalendarContext, ChangeParams, ValueRagne, initDate, toDayjs } from '@qsxy/element-plus-react/Calendar';
import { partitionAnimationProps } from '@qsxy/element-plus-react/hooks/animationPropsUtils';
import { partitionHTMLProps } from '@qsxy/element-plus-react/hooks/htmlPropsUtils';
import { partitionPopperPropsUtils } from '@qsxy/element-plus-react/hooks/popperPropsUtils';
import { namespace } from '@qsxy/element-plus-react/hooks/prefix';
import { useDisabled, useIsoWeek, useSize } from '@qsxy/element-plus-react/hooks/useCommonProps';
import useControlled from '@qsxy/element-plus-react/hooks/useControlled';
import { useLocale } from '@qsxy/element-plus-react/hooks/useLocale';
import ElIcon from '@qsxy/element-plus-react/Icon/Icon';
import ElInput from '@qsxy/element-plus-react/Input/Input';
import { InputRef } from '@qsxy/element-plus-react/Input/typings';
import ElPopper from '@qsxy/element-plus-react/Popper/Popper';
import { PopperOptionRef } from '@qsxy/element-plus-react/Popper/typings';
import { isNotEmpty, mergeDefaultProps } from '@qsxy/element-plus-react/Util/base';
import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import noop from 'lodash/noop';
import omit from 'lodash/omit';
import React, { memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { DatePickerProps, DatePickerRef } from './typings';

dayjs.extend(advancedFormat);
dayjs.extend(weekOfYear);
dayjs.extend(quarterOfYear);

const DatePicker = memo(({ ref, ...props }: DatePickerProps & { ref?: React.Ref<DatePickerRef | null> }) => {
    props = mergeDefaultProps({ readonly: true, clearable: true, type: 'date' }, props);
    const { name, readonly, clearable, required, valueFormat, plain, onClick, prepend, append, shortcuts, onChange, formatter, type, ...rest } = props;

    const [value, setValue] = useControlled(props.value, props.defaultValue);
    const [visible, setVisible] = useState(false);
    const popperInstRef = useRef<PopperOptionRef>(null);
    const inputRef = useRef<InputRef>(null);
    const currentDateRef = useRef<Dayjs>(null);
    const currentDatesRef = useRef<Dayjs[]>([]);

    const disabled = useDisabled(props.disabled);
    const size = useSize(props.size);
    const isoWeek = useIsoWeek(props.isoWeek);

    const { t } = useLocale();

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
                case 'years':
                    return 'YYYY';
                case 'month':
                case 'months':
                    return 'YYYY-MM';
                case 'week':
                    return 'YYYY[w]ww';
                case 'quarter':
                case 'quarters':
                    return 'YYYY-[Q]Q';
                default:
                    return 'YYYY-MM-DD';
            }
        }
    }, [props.format, type]);

    const getFormattedDate = useCallback(
        (date: string | number | string[] | number[] | Date | Date[]) => {
            if (['years', 'months', 'dates', 'quarters'].includes(type)) {
                if (Array.isArray(date)) {
                    return date
                        .map(item => {
                            if (typeof item === 'string') {
                                return item;
                            } else if (typeof item === 'number') {
                                return dayjs(new Date(item)).format(format);
                            } else if (item instanceof Date) {
                                return dayjs(item).format(valueFormat ?? format);
                            }
                        })
                        .join(', ');
                }
            } else {
                if (typeof date === 'string') {
                    return date;
                } else if (typeof date === 'number') {
                    return dayjs(new Date(date)).format(format);
                } else if (date instanceof Date) {
                    return dayjs(date).format(valueFormat ?? format);
                }
            }
        },
        [format, type, valueFormat],
    );

    const formatValue = useMemo<string>(() => {
        return getFormattedDate(value);
    }, [getFormattedDate, value]);

    /** 根据日期类型设定占位符 */
    const placeholder = useMemo(() => {
        if (isNotEmpty(props.placeholder)) {
            return props.placeholder;
        } else {
            switch (type) {
                case 'year':
                    return t('el.datepicker.placeholder.year');
                case 'month':
                    return t('el.datepicker.placeholder.month');
                case 'week':
                    return t('el.datepicker.placeholder.week');
                case 'quarter':
                    return t('el.datepicker.placeholder.quarter');
                case 'quarters':
                    return t('el.datepicker.placeholder.quarters');
                case 'years':
                    return t('el.datepicker.placeholder.years');
                case 'months':
                    return t('el.datepicker.placeholder.months');
                case 'dates':
                    return t('el.datepicker.placeholder.dates');
                default:
                    return t('el.datepicker.placeholder.date');
            }
        }
    }, [props.placeholder, t, type]);

    const formatValueToDayjs = useCallback(
        (val: string | number | Date) => {
            if (val instanceof Date) {
                return dayjs(val);
            } else if (typeof val === 'number') {
                return dayjs(new Date(val));
            } else if (typeof val === 'string') {
                return toDayjs<Dayjs>(val, props.valueFormat ?? format);
            }
            return initDate();
        },
        [format, props.valueFormat],
    );

    /** 日期参数转成dayjs对象 */
    const dateProp = useMemo(() => {
        let result = initDate();
        if (isNotEmpty(value)) {
            if (type === 'week' || type === 'quarter') {
                if (currentDateRef.current) {
                    result = currentDateRef.current;
                } else if (value instanceof Date) {
                    result = currentDateRef.current = dayjs(value);
                } else if (typeof value === 'number') {
                    result = currentDateRef.current = dayjs(new Date(value));
                } else if (typeof value === 'string') {
                    result = currentDateRef.current = toDayjs<Dayjs>(value, props.valueFormat ?? format);
                }
            } else if (!['years', 'months', 'dates', 'quarters'].includes(type)) {
                if (value instanceof Date) {
                    result = dayjs(value);
                } else if (typeof value === 'number') {
                    result = dayjs(new Date(value));
                } else if (typeof value === 'string') {
                    result = toDayjs<Dayjs>(value, props.valueFormat ?? format);
                }
            }
            if (type === 'quarter' && !Array.isArray(result)) {
                const quarter = result.quarter();
                result = result.month((quarter - 1) * 3).date(1);
            }
        }
        return result;
    }, [format, props.valueFormat, type, value]);

    useEffect(() => {
        if (isNotEmpty(value) && !['years', 'months', 'dates'].includes(type)) {
            if (type === 'quarters' && Array.isArray(value)) {
                currentDatesRef.current = value.map(formatValueToDayjs).map(item => {
                    const quarter = item.quarter();
                    return item.month((quarter - 1) * 3).date(1);
                });
            } else {
                setValue(dateProp.format(format));
            }
            // inputRef.current.setValue(dateProp.format(format));
        }
    }, []);

    /** 日期参数转成dayjs对象 */
    const valueRange = useMemo(() => {
        return isNotEmpty(value)
            ? ([isoWeek ? dateProp.isoWeekday(1) : dateProp.isoWeekday(0), isoWeek ? dateProp.isoWeekday(7) : dateProp.isoWeekday(6)] as ValueRagne)
            : ([null, null] as ValueRagne);
    }, [dateProp, isoWeek, value]);

    const values = useCallback(() => {
        if (type === 'quarters') {
            return currentDatesRef.current;
        }
        if (Array.isArray(value)) {
            return value.map(formatValueToDayjs);
        }
        return [];
    }, [formatValueToDayjs, type, value]);

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
        (val: Dayjs, params?: ChangeParams) => {
            currentDateRef.current = val;
            if (['years', 'months', 'dates', 'quarters'].includes(type) && Array.isArray(params?.values)) {
                currentDatesRef.current = params.values;
                setValue(params.values.map(item => item.format(format)));

                if (valueFormat == 'x') {
                    onChange(
                        params.values.map(item => item.toDate().getTime()),
                        getFormattedDate(params.values.map(item => item.toDate())),
                    );
                } else if (isNotEmpty(props.valueFormat)) {
                    onChange?.(
                        params.values.map(item => item.format(valueFormat)),
                        getFormattedDate(params.values.map(item => item.toDate())),
                    );
                } else {
                    onChange?.(
                        params.values.map(item => item.toDate()),
                        getFormattedDate(params.values.map(item => item.toDate())),
                    );
                }
            } else {
                setValue(val ? val.format(format) : '');
                if (valueFormat == 'x') {
                    onChange(val ? val.toDate().getTime() : '', getFormattedDate(val?.toDate()));
                } else if (isNotEmpty(props.valueFormat)) {
                    onChange?.(val ? val.format(valueFormat) : '', getFormattedDate(val?.toDate()));
                } else {
                    onChange?.(val ? val.toDate() : '', getFormattedDate(val?.toDate()));
                }
                setVisible(false);
            }
        },
        [format, getFormattedDate, onChange, props.valueFormat, setValue, type, valueFormat],
    );

    const handleClear = useCallback(() => {
        setValue('');
        onChange?.(['years', 'months', 'dates', 'quarters'].includes(type) ? '' : '', formatValue);
        currentDatesRef.current = [];
        currentDateRef.current = null;
        setVisible(false);
    }, [setValue, onChange, type, formatValue]);

    useImperativeHandle(ref, () => ({
        input: inputRef,
        focus: () => inputRef.current.focus(),
        blur: () => inputRef.current.blur(),
        handleOpen: () => setVisible(true),
        handleClose: () => setVisible(false),
    }));

    return (
        <>
            <ElInput
                ref={inputRef}
                name={name}
                placeholder={placeholder}
                readOnly={readonly}
                disabled={disabled}
                required={required}
                clearable={clearable && !disabled}
                isSelect
                prefix={!plain && <ElIcon name="calendar-days" />}
                onClick={onActive}
                value={formatValue}
                onChange={noop}
                onClear={handleClear}
                className={classNames({ [`${namespace}-date`]: readonly, 'is-focus': visible })}
                style={props.style}
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

            <ElPopper
                visible={visible}
                referenceElement={() => inputRef?.current?.ref}
                popperInstRef={popperInstRef}
                onDestroy={() => setVisible(false)}
                popperClass="is-pure"
                transitionAppear
                {...animationInputProps}
                onEnter={() => {
                    props.onEnter?.();
                    popperInstRef.current?.update();
                }}
                {...popperProps}
            >
                <CalendarContext
                    value={{
                        value: ['years', 'months', 'dates', 'quarters'].includes(type) && values().length > 0 ? values()[0] : dateProp,
                        values: values(),
                        valueRange,
                        dateType: type,
                        isoWeek,
                        showToday: props.showToday,
                        showConfirm: ['years', 'months', 'dates', 'quarters'].includes(type),
                        popperInstRef,
                        onChange: handleChange,
                        disabledDate: props.disabledDate,
                        shortcuts,
                        formatter,
                        close: () => setVisible(false),
                    }}
                >
                    <Calendar />
                </CalendarContext>
            </ElPopper>
        </>
    );
});

DatePicker.displayName = 'ElDatePicker';

export default DatePicker;
