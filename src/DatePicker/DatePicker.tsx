import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import noop from 'lodash/noop';
import omit from 'lodash/omit';
import React, { FC, forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Calendar, CalendarContext, ValueRagne, initDate, toDayjs } from '../Calendar';
import { Icon } from '../Icon';
import { Input, InputRef } from '../Input';
import { Popper, PopperOptionRef } from '../Popper';
import { isNotEmpty } from '../Util';
import { partitionAnimationProps, partitionHTMLProps, partitionPopperPropsUtils, useControlled, useDisabled, useSize } from '../hooks';
import { globalKey } from '../hooks/prefix';
import { DatePickerProps, DatePickerRef } from './typings';

dayjs.extend(advancedFormat);
dayjs.extend(weekOfYear);

const DatePicker: FC<DatePickerProps> = memo(
    forwardRef<DatePickerRef, DatePickerProps>((props, ref) => {
        const { name, readonly, clearable, required, valueFormat, plain, onClick, prepend, append, error, warning, shortcuts, onChange, formatter, type, isoWeek, ...rest } = props;
        const [value, setValue] = useControlled(props.value, props.defaultValue);
        const [visible, setVisible] = useState(false);
        const popperInstRef = useRef<PopperOptionRef>();
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
                switch (props.type) {
                    case 'year':
                        return 'YYYY';
                    case 'month':
                        return 'YYYY-MM';
                    case 'week':
                        return '';
                    default:
                        return 'YYYY-MM-DD';
                }
            }
        }, [props.format, props.type]);

        /** 根据日期类型设定占位符 */
        const placeholder = useMemo(() => {
            if (isNotEmpty(props.placeholder)) {
                return props.placeholder;
            } else {
                switch (props.type) {
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
        }, [props.placeholder, props.type]);

        /** 日期参数转成dayjs对象 */
        const dateProp = useMemo(() => {
            if (type === 'week') {
                return currentDate.current || (currentDate.current = typeof value === 'string' ? toDayjs<Dayjs>(value, props.valueFormat ?? format) : initDate());
            }
            return typeof value === 'string' ? toDayjs<Dayjs>(value, props.valueFormat ?? format) : initDate();
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
            popperInstRef: popperInstRef.current,
            inputInstance: inputRef.current,
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
                    required={required}
                    clearable={clearable && !disabled}
                    prefix={!plain && <Icon name="calendar-days" />}
                    onClick={onActive}
                    value={value}
                    onChange={noop}
                    onClear={() => handleChange?.(null)}
                    className={classNames({ [`${globalKey}-date`]: readonly, 'is-active': visible })}
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
                            dateType: props.type,
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

DatePicker.defaultProps = {
    type: 'date',
    readonly: true,
    isoWeek: true,
    clearable: true,
    disabled: false,
};
DatePicker.displayName = 'DatePicker';

export default DatePicker;
