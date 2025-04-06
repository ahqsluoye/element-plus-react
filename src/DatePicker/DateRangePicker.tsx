import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import { addClass, removeClass } from 'dom-lib';
import head from 'lodash/head';
import last from 'lodash/last';
import noop from 'lodash/noop';
import React, { forwardRef, memo, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Calendar, CalendarContext, ValueRagne, initDateRange, toDayjs } from '../Calendar';
import Icon from '../Icon/Icon';
import { InputGroup } from '../Input';
import Popper from '../Popper/Popper';
import { PopperOptionRef } from '../Popper/typings';
import { isNotEmpty } from '../Util';
import { useClassNames, useControlled, useDisabled, useSize } from '../hooks';
import { DatePickerRangeProps, DatePickerRef } from './typings';

const DateRangePicker = memo(
    forwardRef<DatePickerRef, DatePickerRangeProps>((props, ref) => {
        props = {
            name: ['', ''],
            type: 'daterange',
            readOnly: false,
            isoWeek: true,
            clearable: true,
            disabled: false,
            unlinkPanels: false,
            rangeSeparator: '-',
            ...props,
        };
        const { name, clearable, valueFormat, type, classPrefix = 'range', prepend, append, onChange, error, warning, formatter } = props;
        const [value, setValue] = useControlled(props.value, props.defaultValue);
        const { b, e, be, bm, ebm, is } = useClassNames(classPrefix);
        const [visible, setVisible] = useState(false);
        const referenceElement = useRef<HTMLInputElement>(null);
        const groupRef = useRef<HTMLDivElement>(null);
        const popperInstRef = useRef<PopperOptionRef>(null);
        const closeRef = useRef(null);
        const startInputRef = useRef<HTMLInputElement>(null);
        const endInputRef = useRef<HTMLInputElement>(null);

        const disabled = useDisabled(props.disabled);
        const size = useSize(props.size);

        /** 没有指定格式时，根据日期类型初始格式 */
        const format = useMemo(() => {
            if (isNotEmpty(props.format)) {
                return props.format;
            } else {
                switch (props.type) {
                    case 'yearrange':
                        return 'YYYY';
                    case 'monthrange':
                        return 'YYYY-MM';
                    default:
                        return 'YYYY-MM-DD';
                }
            }
        }, [props.format, props.type]);

        const formatValue = useMemo<[string, string]>(() => {
            if (value instanceof Array && value.length === 2) {
                return value.map(item => {
                    if (typeof item === 'string') {
                        return item;
                    } else if (typeof item === 'number') {
                        return dayjs(new Date(item)).format(format);
                    } else if (item instanceof Date) {
                        return dayjs(item).format(valueFormat ?? format);
                    }
                }) as [string, string];
            }
            return null;
        }, [format, value, valueFormat]);

        /** 根据日期类型设定占位符 */
        const startPlaceholder = useMemo(() => {
            if (isNotEmpty(props.startPlaceholder)) {
                return props.startPlaceholder;
            } else {
                switch (props.type) {
                    case 'monthrange':
                        return '开始月份';
                    case 'yearrange':
                        return '开始年份';
                    default:
                        return '开始日期';
                }
            }
        }, [props.startPlaceholder, props.type]);

        /** 根据日期类型设定占位符 */
        const endPlaceholder = useMemo(() => {
            if (isNotEmpty(props.endPlaceholder)) {
                return props.endPlaceholder;
            } else {
                switch (props.type) {
                    case 'monthrange':
                        return '结束月份';
                    case 'yearrange':
                        return '结束年份';
                    default:
                        return '结束日期';
                }
            }
        }, [props.endPlaceholder, props.type]);

        /** 日期参数转成dayjs对象 */
        const dateProp = useMemo(() => {
            return isNotEmpty(formatValue)
                ? toDayjs<ValueRagne>(formatValue, valueFormat || format, type === 'monthrange' ? 'y' : 'M')
                : initDateRange(valueFormat || format, type === 'monthrange' ? 'y' : 'M');
        }, [format, formatValue, type, valueFormat]);

        const onActive = useCallback(() => {
            if (!disabled) {
                setVisible(true);
            }
        }, [disabled]);

        /** 鼠标悬浮进入事件 */
        const onMouseEnter = useCallback(() => {
            if (clearable && isNotEmpty(value)) {
                if (value instanceof Array) {
                    if (closeRef.current && value.some(item => isNotEmpty(item))) {
                        removeClass(closeRef.current, ebm('close', 'icon', 'hidden'));
                    }
                }
            } else {
                if (closeRef.current) {
                    addClass(closeRef.current, ebm('close', 'icon', 'hidden'));
                }
            }
        }, [clearable, ebm, value]);

        /** 鼠标悬浮退出事件 */
        const onMouseLeave = useCallback(() => {
            if (closeRef.current) {
                addClass(closeRef.current, ebm('close', 'icon', 'hidden'));
            }
        }, [ebm]);

        const onChangeRange = useCallback(
            (val: [value: Dayjs, value: Dayjs], finish?: boolean) => {
                const _formatValue: [string, string] = isNotEmpty(val) && val.length === 2 ? [val[0].format(format), val[1].format(format)] : ['', ''];
                setValue(_formatValue);
                if (isNotEmpty(val) && val.length === 2) {
                    if (valueFormat == 'x') {
                        onChange?.([val[0].toDate().getTime(), val[1].toDate().getTime()]);
                    } else if (isNotEmpty(props.valueFormat)) {
                        onChange?.([val[0].format(valueFormat), val[1].format(valueFormat)]);
                    } else {
                        onChange?.([val[0].toDate(), val[1].toDate()]);
                    }
                } else {
                    onChange?.(['', '']);
                }
                setVisible(!finish);
            },
            [format, onChange, props.valueFormat, setValue, valueFormat],
        );

        const onClear = useCallback(
            (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                event.stopPropagation();
                setValue(null);
                if (closeRef.current) {
                    addClass(closeRef.current, ebm('close', 'icon', 'hidden'));
                }
                setVisible(false);
                onChange?.(null);
            },
            [ebm, onChange, setValue],
        );

        useImperativeHandle(ref, () => ({
            focus: () => startInputRef.current.focus(),
            blur: () => {
                startInputRef.current.blur();
                endInputRef.current.blur();
            },
            handleOpen: () => setVisible(true),
            handleClose: () => setVisible(false),
        }));

        const content = useMemo(
            () => (
                <div
                    className={classNames(
                        b('date-editor', 'date-editor--daterange', false),
                        b`editor`,
                        be('input', 'wrapper', false),
                        be('tooltip', 'trigger', false),
                        { [bm('editor', size)]: size },
                        is({ active: visible, disabled, error, warning }),
                    )}
                    ref={referenceElement}
                    onClick={onActive}
                    style={append || prepend ? null : props.style}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                >
                    <Icon name="calendar-days" className={e`icon`} />
                    <input
                        ref={startInputRef}
                        name={name instanceof Array ? head(name) : ''}
                        readOnly={props.readOnly}
                        placeholder={startPlaceholder}
                        disabled={disabled}
                        className={b`input`}
                        value={formatValue instanceof Array ? head(formatValue) : ''}
                        onChange={noop}
                    />
                    <span className={b`separator`}>{props.rangeSeparator}</span>
                    <input
                        ref={endInputRef}
                        name={name instanceof Array ? last(name) : ''}
                        readOnly={props.readOnly}
                        placeholder={endPlaceholder}
                        disabled={disabled}
                        className={b`input`}
                        value={formatValue instanceof Array ? last(formatValue) : ''}
                        onChange={noop}
                    />
                    {clearable && (
                        <Icon
                            ref={closeRef}
                            prefix="fal"
                            name="circle-xmark"
                            className={classNames(be('input', 'icon', false), e`close-icon`, ebm('close', 'icon', 'hidden'))}
                            onClick={onClear}
                            onMouseDown={event => {
                                event.preventDefault();
                                event.stopPropagation();
                            }}
                        />
                    )}
                </div>
            ),
            [
                b,
                be,
                bm,
                size,
                is,
                visible,
                disabled,
                error,
                warning,
                onActive,
                append,
                prepend,
                props.style,
                props.readOnly,
                props.rangeSeparator,
                onMouseEnter,
                onMouseLeave,
                e,
                name,
                startPlaceholder,
                formatValue,
                endPlaceholder,
                clearable,
                ebm,
                onClear,
            ],
        );

        return (
            <>
                {append || prepend ? (
                    <InputGroup prepend={prepend} append={append} className={props.className} style={props.style} ref={groupRef}>
                        {content}
                    </InputGroup>
                ) : (
                    content
                )}

                <Popper
                    visible={visible}
                    referenceElement={append || prepend ? groupRef : referenceElement}
                    popperInstRef={popperInstRef}
                    onDestroy={() => setVisible(false)}
                    transitionAppear
                    unmountOnExit
                >
                    <CalendarContext.Provider
                        value={{
                            initialValue: formatValue,
                            valueRange: dateProp,
                            dateType: props.type,
                            isoWeek: props.isoWeek,
                            unlinkPanels: props.unlinkPanels,
                            popperInstRef,
                            onChangeRange,
                            disabledDate: props.disabledDate,
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

DateRangePicker.displayName = 'ElDatePicker';

export default DateRangePicker;
