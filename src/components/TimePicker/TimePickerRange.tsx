import { ValueRagne } from '@qsxy/element-plus-react/Calendar';
import { partitionAnimationProps } from '@qsxy/element-plus-react/hooks/animationPropsUtils';
import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import { useDisabled, useSize } from '@qsxy/element-plus-react/hooks/useCommonProps';
import useControlled from '@qsxy/element-plus-react/hooks/useControlled';
import { useLocale } from '@qsxy/element-plus-react/hooks/useLocale';
import ElIcon from '@qsxy/element-plus-react/Icon/Icon';
import ElPopper from '@qsxy/element-plus-react/Popper/Popper';
import { PopperOptionRef } from '@qsxy/element-plus-react/Popper/typings';
import { isEmpty, isNotEmpty, mergeDefaultProps } from '@qsxy/element-plus-react/Util/base';
import { useMount } from 'ahooks';
import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import { addClass, removeClass } from 'dom-lib';
import head from 'lodash/head';
import isEqual from 'lodash/isEqual';
import last from 'lodash/last';
import React, { memo, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import TimeRangePanel from './TimeRangePanel';
import { RoleType, TimePanelRef, TimePickerRangeProps, TimePickerRef, TimeType } from './typings';
import { getAvailableArrs } from './useTimePicker';
import { makeRange } from './util';

const TimePickerRange = memo(({ ref, ...props }: TimePickerRangeProps & { ref?: React.Ref<TimePickerRef | null> }) => {
    const { t } = useLocale();

    props = mergeDefaultProps(
        {
            format: 'HH:mm:ss',
            disabledHours: () => [],
            disabledMinutes: () => [],
            disabledSeconds: () => [],
            isoWeek: true,
            clearable: true,
            startPlaceholder: t('el.datepicker.startTime'),
            endPlaceholder: t('el.datepicker.endTime'),
            rangeSeparator: '-',
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
        disabledHours,
        disabledMinutes,
        disabledSeconds,
        afterEnter,
        afterLeave,
        classPrefix = 'range',
        prefixIcon,
        onClear,
        onVisibleChange,
        ...rest
    } = props;
    const [value, setValue] = useControlled(props.value, props.defaultValue);
    const [visible, setVisible] = useState(false);

    const disabled = useDisabled(props.disabled);
    const size = useSize(props.size);
    const { b, e, be, bm, ebm, is } = useClassNames(classPrefix);

    const containerRef = useRef<HTMLDivElement>(null);
    const popperInstRef = useRef<PopperOptionRef>(null);
    const initialValue = useRef<string[] | number[] | Date[]>(['', '']);
    const timePanelRef = useRef<TimePanelRef>(null);
    const closeRef = useRef(null);
    const isCancelRef = useRef(false);
    const startInputRef = useRef<HTMLInputElement>(null);
    const endInputRef = useRef<HTMLInputElement>(null);

    const [animationInputProps] = partitionAnimationProps(rest);

    const showSeconds = useMemo(() => {
        return (valueFormat || format).includes('s') || (valueFormat || format) === 'x';
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

    /** 日期参数转成dayjs对象 */
    const dateProp = useMemo<ValueRagne>(() => {
        if (isNotEmpty(formatValue)) {
            if (formatValue instanceof Array && formatValue.length === 2) {
                const start = isNotEmpty(formatValue[0])
                    ? adjustDateProp(
                          dayjs(`${dayjs().format('YYYY-MM-DD')} ${formatValue[0]}`, valueFormat ?? format),
                          'start',
                          dayjs(`${dayjs().format('YYYY-MM-DD')} ${formatValue[1]}`, valueFormat ?? format),
                      )
                    : dayjs();
                const end = isNotEmpty(formatValue[1])
                    ? adjustDateProp(
                          dayjs(`${dayjs().format('YYYY-MM-DD')} ${formatValue[1]}`, valueFormat ?? format),
                          'end',
                          dayjs(`${dayjs().format('YYYY-MM-DD')} ${formatValue[0]}`, valueFormat ?? format),
                      )
                    : start.add(1, 'h');
                return [start, end];
            }
        }
        const start = dayjs();
        return [start, start.add(1, 'h')];
    }, [adjustDateProp, format, formatValue, valueFormat]);

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
                let newVal = null;
                if (isNotEmpty(val) && val.length === 2) {
                    if (valueFormat == 'x') {
                        newVal = [val[0].toDate().getTime(), val[1].toDate().getTime()];
                    } else if (isNotEmpty(props.valueFormat)) {
                        newVal = [val[0].format(valueFormat), val[1].format(valueFormat)];
                    } else {
                        newVal = [val[0].toDate(), val[1].toDate()];
                    }
                } else {
                    newVal = ['', ''];
                }

                if (!isEqual(value, newVal)) {
                    setValue(newVal);
                    onChange?.(newVal);
                }
            }
        },
        [onChange, props.valueFormat, setValue, value, valueFormat],
    );

    const handleClear = useCallback(
        (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
            event.stopPropagation();
            if (closeRef.current) {
                addClass(closeRef.current, ebm('close', 'icon', 'hidden'));
            }
            onChange?.(null);
            onClear?.();
            if (visible) {
                setVisible(false);
                onVisibleChange?.(false);
            }
            setTimeout(() => {
                setValue(null);
            }, 100);
        },
        [ebm, onChange, onClear, onVisibleChange, setValue, visible],
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

    const setStartSelectionRange = useCallback((start, end) => {
        const _inputs = startInputRef.current;
        if (!_inputs.value) {
            return;
        }
        _inputs.setSelectionRange(start, end);
        _inputs.focus();
    }, []);

    const setEndSelectionRange = useCallback((start, end) => {
        const _inputs = endInputRef.current;
        if (!_inputs.value) {
            return;
        }
        _inputs.setSelectionRange(start, end);
        _inputs.focus();
    }, []);

    useMount(() => {
        initialValue.current = value ?? ['', ''];
    });

    useImperativeHandle(ref, () => ({
        focus: () => startInputRef.current.focus(),
        blur: () => {
            startInputRef.current.blur();
            endInputRef.current.blur();
        },
        handleOpen: () => setVisible(true),
        handleClose: () => setVisible(false),
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
                    is({ active: visible, disabled }),
                )}
                ref={containerRef}
                onClick={onActive}
                style={append || prepend ? null : props.style}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                {prefixIcon ? prefixIcon : <ElIcon name="clock" className={e`icon`} />}
                <input
                    ref={startInputRef}
                    name={name instanceof Array ? head(name) : ''}
                    readOnly={props.readOnly}
                    placeholder={startPlaceholder}
                    disabled={disabled}
                    className={b`input`}
                    defaultValue={formatValue instanceof Array ? head(formatValue) : ''}
                />
                <span className={b`separator`}>{props.rangeSeparator}</span>
                <input
                    ref={endInputRef}
                    name={name instanceof Array ? last(name) : ''}
                    readOnly={props.readOnly}
                    placeholder={endPlaceholder}
                    disabled={disabled}
                    className={b`input`}
                    defaultValue={formatValue instanceof Array ? last(formatValue) : ''}
                />
                {clearable && (
                    <ElIcon
                        ref={closeRef}
                        prefix="fal"
                        name="circle-xmark"
                        className={classNames(be('input', 'icon', false), e`close-icon`, ebm('close', 'icon', 'hidden'))}
                        onClick={handleClear}
                        onMouseDown={event => {
                            event.preventDefault();
                            event.stopPropagation();
                        }}
                    />
                )}
            </div>
            <ElPopper
                visible={visible}
                referenceElement={containerRef}
                popperInstRef={popperInstRef}
                onEnter={() => {
                    popperInstRef.current?.update();
                    props.onEnter?.();
                }}
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
                    setStartSelectionRange={setStartSelectionRange}
                    setEndSelectionRange={setEndSelectionRange}
                    onOk={() => {
                        setVisible(false);
                        // initialValue.current = value ?? ['', ''];
                        isCancelRef.current = false;
                    }}
                    startPlaceholder={startPlaceholder}
                    endPlaceholder={endPlaceholder}
                />
            </ElPopper>
        </>
    );
});

TimePickerRange.displayName = 'ElTimePicker';

export default TimePickerRange;
