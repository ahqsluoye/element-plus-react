/* eslint-disable no-console */
/* eslint-disable indent */
import { useMount } from 'ahooks';
import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import { addClass, removeClass } from 'dom-lib';
import head from 'lodash/head';
import isEqual from 'lodash/isEqual';
import last from 'lodash/last';
import React, { forwardRef, memo, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { ValueRagne } from '../Calendar';
import { Icon } from '../Icon';
import { Popper, PopperOptionRef } from '../Popper';
import { isEmpty, isNotEmpty, mergeDefaultProps } from '../Util';
import { partitionAnimationProps, useClassNames, useControlled, useDisabled, useSize } from '../hooks';
import TimeRangePanel from './TimeRangePanel';
import { RoleType, TimePanelRef, TimePickerRangeProps, TimeType } from './typings';
import { getAvailableArrs } from './useTimePicker';
import { makeRange } from './util';

const TimePickerRange = forwardRef<HTMLInputElement, TimePickerRangeProps>((props, ref) => {
    props = mergeDefaultProps(
        {
            format: 'HH:mm:ss',
            disabledHours: () => [],
            disabledMinutes: () => [],
            disabledSeconds: () => [],
            isoWeek: true,
            clearable: true,
            disabled: false,
            startPlaceholder: '开始时间',
            endPlaceholder: '结束时间',
            rangeSeparator: '到',
        },
        props,
    );
    const {
        name,
        clearable,
        valueFormat,
        format,
        startPlaceholder,
        endPlaceholder,
        onChange,
        prepend,
        append,
        warning,
        error,
        instance,
        disabledHours,
        disabledMinutes,
        disabledSeconds,
        afterEnter,
        afterLeave,
        classPrefix = 'range',
        ...rest
    } = props;
    const [value, setValue] = useControlled(props.value, props.defaultValue);
    const [visible, setVisible] = useState(false);

    const disabled = useDisabled(props.disabled);
    const size = useSize(props.size);
    const { b, e, be, bm, ebm, is } = useClassNames(classPrefix);

    const containerRef = useRef<HTMLInputElement>();
    const popperInstRef = useRef<PopperOptionRef>();
    const initialValue = useRef<[string, string]>(['', '']);
    const timePanelRef = useRef<TimePanelRef>();
    const closeRef = useRef();
    const isCancelRef = useRef(false);

    const [animationInputProps] = partitionAnimationProps(rest);

    const showSeconds = useMemo(() => {
        return (valueFormat || format).includes('s');
    }, [format, valueFormat]);

    const spinnerItems: TimeType[] = useMemo(() => {
        const arr: TimeType[] = ['hours', 'minutes', 'seconds'];
        return showSeconds ? arr : arr.slice(0, 2);
    }, [showSeconds]);

    const _disabledHours = useCallback(
        (role: RoleType, compare: Dayjs) => {
            const defaultDisable = disabledHours?.(role) ?? [];
            const isStart = role === 'start';
            const compareDate = compare;
            const compareHour = compareDate.hour();
            const nextDisable = isStart ? makeRange(compareHour + 1, 23) : makeRange(0, compareHour - 1);
            return [...defaultDisable, ...nextDisable];
        },
        [disabledHours],
    );

    const _disabledMinutes_ = useCallback(
        (hour: number, role: string, compare?: Dayjs) => {
            const defaultDisable = disabledMinutes ? disabledMinutes(hour, role) : [];
            const isStart = role === 'start';
            const compareDate = compare;
            const compareHour = compareDate.hour();
            if (hour !== compareHour) {
                return defaultDisable;
            }
            const compareMinute = compareDate.minute();
            const nextDisable = isStart ? makeRange(compareMinute + 1, 59) : makeRange(0, compareMinute - 1);
            return [...defaultDisable, ...nextDisable];
        },
        [disabledMinutes],
    );

    const _disabledSeconds_ = useCallback(
        (hour: number, minute: number, role: string, compare?: Dayjs) => {
            const defaultDisable = disabledSeconds ? disabledSeconds(hour, minute, role) : [];
            const isStart = role === 'start';
            const compareDate = compare;
            const compareHour = compareDate.hour();
            const compareMinute = compareDate.minute();
            if (hour !== compareHour || minute !== compareMinute) {
                return defaultDisable;
            }
            const compareSecond = compareDate.second();
            const nextDisable = isStart ? makeRange(compareSecond + 1, 59) : makeRange(0, compareSecond - 1);
            return [...defaultDisable, ...nextDisable];
        },
        [disabledSeconds],
    );

    const { getAvailableHours, getAvailableMinutes, getAvailableSeconds } = useMemo(() => {
        return getAvailableArrs(_disabledHours, _disabledMinutes_, _disabledSeconds_);
    }, [_disabledHours, _disabledMinutes_, _disabledSeconds_]);

    const adjustDateProp = useCallback(
        (date: Dayjs, role: RoleType, compare: Dayjs) => {
            if (date) {
                spinnerItems.forEach(item => {
                    let available: number[] = [];
                    switch (item) {
                        case 'hours':
                            available = getAvailableHours(role, compare);
                            if (!available.includes(date.hour())) {
                                date = date.hour(head(available));
                            }
                            break;
                        case 'minutes':
                            available = getAvailableMinutes(date.hour(), role, compare);
                            if (!available.includes(date.minute())) {
                                date = date.minute(head(available));
                            }
                            break;
                        case 'seconds':
                            available = getAvailableSeconds(date.hour(), date.minute(), role, compare);
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
    const dateProp = useMemo<ValueRagne>(() => {
        if (isNotEmpty(value)) {
            if (value instanceof Array && value.length === 2) {
                const start = isNotEmpty(value[0])
                    ? adjustDateProp(
                          dayjs(`${dayjs().format('YYYY-MM-DD')} ${value[0]}`, valueFormat ?? format),
                          'start',
                          dayjs(`${dayjs().format('YYYY-MM-DD')} ${value[1]}`, valueFormat ?? format),
                      )
                    : dayjs();
                const end = isNotEmpty(value[1])
                    ? adjustDateProp(
                          dayjs(`${dayjs().format('YYYY-MM-DD')} ${value[1]}`, valueFormat ?? format),
                          'end',
                          dayjs(`${dayjs().format('YYYY-MM-DD')} ${value[0]}`, valueFormat ?? format),
                      )
                    : start.add(1, 'h');
                return [start, end];
            }
        }
        const start = dayjs();
        return [start, start.add(1, 'h')];
    }, [adjustDateProp, format, value, valueFormat]);

    const onActive = useCallback(() => {
        if (!disabled) {
            setVisible(true);
        }
    }, [disabled]);

    const handleChange = useCallback(
        (val: ValueRagne) => {
            if (isEmpty(initialValue.current) && isCancelRef.current) {
                if (isNotEmpty(value) && !isEqual(value, ['', ''])) {
                    setValue(null);
                    onChange?.(null);
                }
            } else {
                const formatValue: [string, string] = isNotEmpty(val) && val.length === 2 ? [val[0].format(valueFormat || format), val[1].format(valueFormat || format)] : ['', ''];
                if (!isEqual(value, formatValue)) {
                    setValue(formatValue);
                    onChange?.(formatValue);
                }
            }
        },
        [format, onChange, setValue, value, valueFormat],
    );

    const onClear = useCallback(
        (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
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
        initialValue.current = value ?? ['', ''];
    });

    useImperativeHandle(instance, () => ({
        popperInstRef: popperInstRef.current,
        getValue: () => value,
        setValue,
        setVisible,
    }));

    return (
        <>
            <div
                className={classNames(
                    b('date-editor', 'date-editor--timerange', false),
                    b`editor`,
                    be('input', 'wrapper', false),
                    be('tooltip', 'trigger', false),
                    { [bm('editor', size)]: size },
                    is({ active: visible, disabled, error, warning }),
                )}
                ref={ref || containerRef}
                onClick={onActive}
                style={append || prepend ? null : props.style}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <Icon name="clock" className={e`icon`} />
                <input
                    name={name instanceof Array ? head(name) : ''}
                    readOnly={props.readOnly}
                    placeholder={startPlaceholder}
                    disabled={disabled}
                    className={b`input`}
                    value={value instanceof Array ? head(value) : ''}
                />
                <span className={b`separator`}>{props.rangeSeparator}</span>
                <input
                    name={name instanceof Array ? last(name) : ''}
                    readOnly={props.readOnly}
                    placeholder={endPlaceholder}
                    disabled={disabled}
                    className={b`input`}
                    value={value instanceof Array ? last(value) : ''}
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
            <Popper
                visible={visible}
                //@ts-ignore
                referenceElement={ref || containerRef}
                popperInstRef={popperInstRef}
                afterEnter={(node?: HTMLElement | Text) => {
                    initialValue.current = value;
                    afterEnter?.(node);
                }}
                afterLeave={(node?: HTMLElement | Text) => {
                    isCancelRef.current = false;
                    initialValue.current = null;
                    afterLeave?.(node);
                }}
                onDestroy={() => {
                    setVisible(false);
                    setValue(initialValue.current);
                    isCancelRef.current = true;
                }}
                {...animationInputProps}
                transitionAppear
                unmountOnExit
            >
                <TimeRangePanel
                    ref={timePanelRef}
                    value={dateProp}
                    onChange={handleChange}
                    visible={visible}
                    showSeconds={showSeconds}
                    disabledHours={disabledHours}
                    disabledMinutes={disabledMinutes}
                    disabledSeconds={disabledSeconds}
                    // setSelectionRange={setSelectionRange}
                    onOk={() => {
                        setVisible(false);
                        // initialValue.current = value ?? ['', ''];
                        isCancelRef.current = false;
                    }}
                    startPlaceholder={startPlaceholder}
                    endPlaceholder={endPlaceholder}
                />
            </Popper>
        </>
    );
});

TimePickerRange.displayName = 'TimePicker';

export default memo(TimePickerRange);
