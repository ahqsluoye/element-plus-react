import classNames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import head from 'lodash/head';
import isObject from 'lodash/isObject';
import last from 'lodash/last';
import noop from 'lodash/noop';
import toFinite from 'lodash/toFinite';
import React, { ComponentType, cloneElement, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Icon from '../Icon/Icon';
import { IconProps } from '../Icon/typings';
import { formatNumber, isEmpty, isNotEmpty, mergeDefaultProps } from '../Util';
import { useClassNames, useControlled, useDisabled, useSize } from '../hooks';
import { namespace } from '../hooks/prefix';
import InputGroup from './InputGroup';
import { InputRangeProps, InputRangeValueType } from './typings';

const InputRange = forwardRef<HTMLInputElement, InputRangeProps>((props, ref) => {
    props = mergeDefaultProps(
        {
            name: ['', ''],
            startPlaceholder: '请输入',
            endPlaceholder: '请输入',
            type: 'text',
            clearable: true,
            rangeSeparator: '到',
        },
        props,
    );
    const {
        name,
        clearable,
        startPlaceholder,
        endPlaceholder,
        type,
        classPrefix = 'range',
        active,
        prefix,
        suffix,
        onChange,
        append,
        prepend,
        precision = 0,
        error,
        warning,
    } = props;
    const [value, setValue] = useControlled(props.value, props.defaultValue);
    const { b, e, be, bm, ebm, is } = useClassNames(classPrefix);
    const [canClear, setCanClear] = useState(false);
    const [focus, setFocus] = useState(false);
    const disabled = useDisabled(props.disabled);
    const size = useSize(props.size);

    // eslint-disable-next-line no-undef
    const timeRef = useRef<NodeJS.Timeout | null>(null);

    // 是否ctrl按键
    const isCtrlKey = useRef(false);
    const valueRef = useRef(value);
    const startInputRef = useRef<HTMLInputElement | null>(null);
    const endInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        valueRef.current = value;
    }, [value]);

    /** 鼠标悬浮进入事件 */
    const onMouseEnter = useCallback(() => {
        setCanClear(clearable && isNotEmpty(value));
    }, [clearable, value]);

    /** 鼠标悬浮退出事件 */
    const onMouseLeave = useCallback(() => {
        setCanClear(false);
    }, []);

    const onInput = useCallback(
        (inputVal: string, pos: 'start' | 'end') => {
            if (type === 'number') {
                inputVal = inputVal
                    .split('')
                    .filter((item, index) => {
                        if (item === '-' && index > 0) {
                            return false;
                        }
                        return true;
                    })
                    .join('');
                // inputVal = inputVal.replace(/[^\d-\\.]/g, '').replace(/(?<=.)-/g, '');
            }

            let res = pos === 'start' ? ([inputVal, value?.[value.length - 1]] as InputRangeValueType) : ([value?.[0], inputVal] as InputRangeValueType);
            setValue(cloneDeep(res));
            setCanClear(clearable && isNotEmpty(inputVal));

            // 输入小数点后，如果转为数字会丢失小数点，所以此时不提交数据
            if (type === 'number' && !inputVal.endsWith('.')) {
                res =
                    pos === 'start'
                        ? ([isEmpty(inputVal) ? null : toFinite(inputVal), toFinite(value?.[value.length - 1])] as InputRangeValueType)
                        : ([toFinite(value?.[0]), isEmpty(inputVal) ? null : toFinite(inputVal)] as InputRangeValueType);
                if (pos === 'start' && startInputRef.current) {
                    startInputRef.current.value = isEmpty(inputVal) ? '' : inputVal;
                } else if (pos === 'end' && endInputRef.current) {
                    endInputRef.current.value = isEmpty(inputVal) ? '' : inputVal;
                }
                if (isNotEmpty(res[0]) && isNotEmpty(res[1])) {
                    onChange?.(res as InputRangeValueType);
                }
            } else {
                if (isNotEmpty(res[0]) && isNotEmpty(res[1])) {
                    onChange?.(res as InputRangeValueType);
                }
            }
        },
        [clearable, onChange, setValue, type, value],
    );

    const onFocus = useCallback(() => {
        timeRef.current && clearTimeout(timeRef.current);
        timeRef.current = setTimeout(() => {
            setFocus(true);
        }, 250);
    }, []);

    /** 输入 */
    const onBlur = useCallback(
        (pos: 'start' | 'end') => {
            timeRef.current && clearTimeout(timeRef.current);
            timeRef.current = setTimeout(() => {
                setFocus(false);
            }, 250);

            let res, formatVal;
            // 删除值
            if (isEmpty(value?.[0])) {
                res = [null, value?.[value.length - 1]] as InputRangeValueType;
                setValue(res);
                onChange?.(res);
                if (startInputRef.current) {
                    startInputRef.current.value = '';
                }
            }
            if (isEmpty(value?.[value.length - 1])) {
                res = [value?.[0], null] as InputRangeValueType;
                setValue(res);
                onChange?.(res);
                if (endInputRef.current) {
                    endInputRef.current.value = '';
                }
            }
            if (type === 'number' && valueRef.current) {
                const val = pos === 'start' ? toFinite(valueRef.current?.[0]) : toFinite(valueRef.current?.[value.length - 1]);
                // const minProp = value?.[0] ? toFinite(value?.[0]) : -Infinity;
                // const maxProp = value?.[1] ? toFinite(value?.[value.length - 1]) : Infinity;
                formatVal = formatNumber(val, precision);

                // // 限制最大最小
                // if (pos === 'start' && val > maxProp) {
                //     formatVal = formatNumber(maxProp, precision);
                //     setValue([formatVal, formatVal]);
                //     onChange?.([formatVal, formatVal]);
                //     if (startInputRef.current) {
                //         startInputRef.current.value = formatVal;
                //     }
                //     return;
                // } else if (pos === 'end' && val < minProp) {
                //     formatVal = formatNumber(minProp, precision);
                //     setValue([formatVal, formatVal]);
                //     onChange?.([formatVal, formatVal]);
                //     if (endInputRef.current) {
                //         endInputRef.current.value = formatVal;
                //     }
                //     return;
                // }

                res = pos === 'start' ? ([formatVal, value?.[value.length - 1]] as InputRangeValueType) : ([value?.[0], formatVal] as InputRangeValueType);
                setValue(res);
                if (isNotEmpty(res[0]) && isNotEmpty(res[1])) {
                    onChange?.(res);
                }
                if (pos === 'start' && startInputRef.current) {
                    startInputRef.current.value = isEmpty(formatVal) ? '' : formatVal;
                } else if (pos === 'end' && endInputRef.current) {
                    endInputRef.current.value = isEmpty(formatVal) ? '' : formatVal;
                }
            }
        },
        [onChange, precision, setValue, type, value],
    );

    const onClear = useCallback(
        (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
            event.stopPropagation();
            setValue(['', '']);
            setCanClear(false);
            onChange?.(['', '']);
        },
        [onChange, setValue],
    );

    const onKeyDown = useCallback((event: any, pos: 'start' | 'end') => {
        if (event.ctrlKey) {
            isCtrlKey.current = true;
        }
        // 复制、粘贴和剪切可以执行
        if (isCtrlKey.current) {
            if (!['c', 'v', 'x'].includes(event.key)) {
                event.preventDefault();
            }
        } else if (!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '.', 'ArrowLeft', 'ArrowRight', 'Backspace', 'Delete'].includes(event.key)) {
            event.preventDefault();
        }
        const val = valueRef.current?.[pos === 'start' ? 0 : 1];
        if (isNotEmpty(val)) {
            // 如果已经有小数点了，阻止输入小数点
            if ((val + '').indexOf('.') > -1 && event.key === '.') {
                event.preventDefault();
            }
            // 如果已经是负数了，阻止输入负号
            if ((val + '').indexOf('-') > -1 && event.key === '-') {
                event.preventDefault();
            }
        }
    }, []);

    const onKeyUp = useCallback(() => {
        isCtrlKey.current = false;
    }, []);

    /** 输入框头部内容 */
    const preffixSlot = useMemo(() => {
        if (prefix && isObject(prefix)) {
            let nodeType = prefix?.type;
            nodeType = (nodeType as ComponentType)?.displayName || nodeType;

            if (nodeType === 'ElIcon') {
                return cloneElement(prefix as React.ReactElement<IconProps>, {
                    ...prefix.props,
                    className: classNames(prefix.props?.className, `${namespace}-range__icon`),
                });
            }
        }
        return prefix;
    }, [prefix]);

    /** 输入框尾部内容 */
    const suffixSlot = useMemo(() => {
        if (suffix) {
            if (isObject(suffix)) {
                let nodeType = suffix?.type;
                nodeType = (nodeType as ComponentType)?.displayName || nodeType;

                if (nodeType === 'ElIcon') {
                    return cloneElement(suffix as React.ReactElement<IconProps>, {
                        ...suffix.props,
                        className: classNames(suffix.props?.className, `${namespace}-input__icon ${namespace}-range__close-icon`),
                    });
                }
            } else {
                return <span className={`${namespace}-range__end-icon`}>{suffix}</span>;
            }
        }
        return null;
    }, [suffix]);

    const content = useMemo(
        () => (
            <div
                className={classNames(
                    b`range-editor`,
                    b('input-range', false),
                    be('input', 'wrapper', false),
                    be('tooltip', 'trigger', false),
                    is({ active: active || focus, disabled, warning, error }),
                    { [bm('input-range', size, false)]: size },
                    append || prepend ? null : props.className,
                )}
                ref={ref}
                onClick={props.onClick}
                style={append || prepend ? {} : props.style}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                {preffixSlot}
                <input
                    ref={startInputRef}
                    name={name instanceof Array ? head(name) : ''}
                    readOnly={props.readOnly}
                    placeholder={startPlaceholder}
                    disabled={disabled}
                    className={b`input`}
                    value={value instanceof Array ? value?.[0] : ''}
                    onInput={(event: any) => onInput(event.target.value, 'start')}
                    onFocus={onFocus}
                    onBlur={() => {
                        onBlur('start');
                    }}
                    onKeyDown={type === 'number' ? event => onKeyDown(event, 'start') : noop}
                    onKeyUp={type === 'number' ? onKeyUp : noop}
                />
                <span className={b`separator`}>{props.rangeSeparator}</span>
                <input
                    ref={endInputRef}
                    name={name instanceof Array ? last(name) : ''}
                    readOnly={props.readOnly}
                    placeholder={endPlaceholder}
                    disabled={disabled}
                    className={b`input`}
                    value={value instanceof Array ? value?.[value.length - 1] : ''}
                    onInput={(event: any) => onInput(event.target.value, 'end')}
                    onFocus={onFocus}
                    onBlur={() => {
                        onBlur('end');
                    }}
                    onKeyDown={type === 'number' ? event => onKeyDown(event, 'end') : noop}
                    onKeyUp={type === 'number' ? onKeyUp : noop}
                />
                {(canClear ? null : suffixSlot) ?? (
                    <Icon
                        prefix="fal"
                        name="circle-xmark"
                        className={classNames(be('input', 'icon', false), e`close-icon`, { [ebm('close', 'icon', 'hidden')]: !canClear })}
                        onClick={onClear}
                    />
                )}
            </div>
        ),
        [
            b,
            be,
            is,
            active,
            focus,
            warning,
            error,
            bm,
            size,
            append,
            prepend,
            props.className,
            props.onClick,
            props.style,
            props.readOnly,
            props.rangeSeparator,
            ref,
            onMouseEnter,
            onMouseLeave,
            preffixSlot,
            name,
            startPlaceholder,
            disabled,
            value,
            onFocus,
            type,
            onKeyUp,
            endPlaceholder,
            canClear,
            suffixSlot,
            e,
            ebm,
            onClear,
            onInput,
            onBlur,
            onKeyDown,
        ],
    );

    if (append || prepend) {
        return (
            <InputGroup prepend={prepend} append={append} className={props.className} style={props.style}>
                {content}
            </InputGroup>
        );
    } else {
        return content;
    }
});

InputRange.displayName = 'InputRange';

export default InputRange;
