import { Calendar, CalendarContext, ValueRagne, initDate, toDayjs } from '@qsxy/element-plus-react/Calendar';
import { partitionAnimationProps } from '@qsxy/element-plus-react/hooks/animationPropsUtils';
import { partitionHTMLProps } from '@qsxy/element-plus-react/hooks/htmlPropsUtils';
import { partitionPopperPropsUtils } from '@qsxy/element-plus-react/hooks/popperPropsUtils';
import { namespace } from '@qsxy/element-plus-react/hooks/prefix';
import { useDisabled, useSize } from '@qsxy/element-plus-react/hooks/useCommonProps';
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
    props = mergeDefaultProps({ readonly: true, clearable: true, type: 'date', isoWeek: true }, props);
    const { name, readonly, clearable, required, valueFormat, plain, onClick, prepend, append, shortcuts, onChange, formatter, type, isoWeek, ...rest } = props;
    const [value, setValue] = useControlled(props.value, props.defaultValue);
    const [visible, setVisible] = useState(false);
    const popperInstRef = useRef<PopperOptionRef>(null);
    const inputRef = useRef<InputRef>(null);
    const currentDate = useRef<Dayjs>(null);

    const disabled = useDisabled(props.disabled);
    const size = useSize(props.size);

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
                    return t('el.datepicker.placeholder.year');
                case 'month':
                    return t('el.datepicker.placeholder.month');
                case 'week':
                    return t('el.datepicker.placeholder.week');
                case 'quarter':
                    return t('el.datepicker.placeholder.quarter');
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
            if (type === 'quarter' && !Array.isArray(result)) {
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
    }, []);

    /** 日期参数转成dayjs对象 */
    const valueRange = useMemo(() => {
        return isNotEmpty(value)
            ? ([isoWeek ? dateProp.isoWeekday(1) : dateProp.isoWeekday(0), isoWeek ? dateProp.isoWeekday(7) : dateProp.isoWeekday(6)] as ValueRagne)
            : ([null, null] as ValueRagne);
    }, [dateProp, isoWeek, value]);

    const values = useMemo(() => {
        if (Array.isArray(value)) {
            return value.map(formatValueToDayjs);
        }
        return [];
    }, [formatValueToDayjs, value]);

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
                onClear={() => handleChange?.(null)}
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
                unmountOnExit
                {...animationInputProps}
                onEnter={() => {
                    props.onEnter?.();
                    popperInstRef.current?.update();
                }}
                {...popperProps}
            >
                <CalendarContext
                    value={{
                        value: dateProp,
                        values,
                        valueRange,
                        dateType: type,
                        isoWeek: props.isoWeek,
                        showToday: props.showToday,
                        showConfirm: type === 'dates',
                        popperInstRef,
                        onChange: handleChange,
                        disabledDate: props.disabledDate,
                        shortcuts,
                        formatter,
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
