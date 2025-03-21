import { useDebounceFn } from 'ahooks';
import classNames from 'classnames';
import { addClass, addStyle, hasClass, removeClass } from 'dom-lib';
import isObject from 'lodash/isObject';
import React, { ComponentType, RefObject, cloneElement, forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Icon, IconProps } from '../Icon';
import { isNotEmpty, mergeDefaultProps } from '../Util';
import { partitionHTMLProps, useClassNames, useControlled, useDisabled, useSize } from '../hooks';
import InputGroup from './InputGroup';
import InputRange from './InputRange';
import TextArea from './TextArea';
import { InputProps, InputRef, ValueType } from './typings';

function InternalInput(props: InputProps, ref: RefObject<InputRef>) {
    props = mergeDefaultProps(
        {
            type: 'text',
            placeholder: '请输入',
            clearable: true,
            debounceTime: 200,
            defaultValue: '',
        },
        props,
    );
    const {
        name,
        title,
        prefix,
        suffix,
        prepend,
        append,
        error,
        warning,
        debounceInput,
        debounceTime,
        placeholder,
        readOnly,
        plain,
        classPrefix = 'input',
        onChange,
        onClear,
        showPassword,
        onFocus,
        onBlur,
        maxLength,
        showWordLimit,
        hiddenValue,
        defaultValue,
        ...rest
    } = props;
    const { b, e, m, is } = useClassNames(classPrefix);
    const [htmlInputProps] = partitionHTMLProps(rest);

    const [value, setValue] = useControlled(props.value, defaultValue);
    const [type, setType] = useState(props.type || 'text');
    const disabled = useDisabled(props.disabled);
    const size = useSize(props.size);

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLInputElement>(null);
    const clearRef = useRef<HTMLInputElement>(null);
    const suffixRef = useRef<HTMLInputElement>(null);
    // 搜索框是否输入完毕
    const inputOver = useRef(true);

    // const containerRef = useMemo(() => props.containerRef ?? rootRef, [props.containerRef]);

    /** 是否可清空 */
    const clearable = useMemo<boolean>(() => {
        // 只读不显示清除按钮只有input组件适用，加上了那些引用input组件就无法显示清空按钮了，这里添加说明，下次别再添加了
        return Boolean(showPassword ? false : props.clearable /*  && !readOnly */);
    }, [props.clearable, showPassword]);

    /** 输入框尾部内容 */
    const suffixSlot = useMemo(() => {
        if (type === 'text' && maxLength && showWordLimit) {
            return (
                <span className={e`count`}>
                    <span className={e`count-inner`}>
                        {typeof value === 'string' ? value.length : 0} / {maxLength}
                    </span>
                </span>
            );
        } else if (['text', 'password'].includes(type) && suffix) {
            if (isObject(suffix)) {
                let nodeType = suffix?.type;
                nodeType = (nodeType as ComponentType)?.displayName || nodeType;

                if (nodeType.toString().startsWith('Icon')) {
                    return cloneElement(suffix as React.ReactElement<IconProps>, {
                        ...suffix.props,
                        className: classNames(suffix.props?.className, e`icon`),
                    });
                }
            }
            return suffix;
        } else if (showPassword && isNotEmpty(value)) {
            return <Icon name={type === 'text' ? 'eye' : 'eye-slash'} className={classNames(e`icon`, e`clear`)} />;
        }
        return null;
    }, [type, maxLength, showWordLimit, suffix, showPassword, value, e]);

    /** 后缀是否可点击 */
    const suffixCanClick = useMemo(() => {
        if (showPassword) {
            return true;
        }
    }, [showPassword]);

    const showClear = useCallback(
        (_value: ValueType) => {
            if (clearable && isNotEmpty(_value) && !disabled && clearRef.current) {
                addStyle(clearRef.current, 'display', '');
                if (suffixRef.current) {
                    if (type === 'text' && maxLength && showWordLimit) {
                        return;
                    }
                    addStyle(suffixRef.current, 'display', 'none');
                }
            } else {
                if (suffixRef.current) {
                    addStyle(suffixRef.current, 'display', '');
                }
            }
            // addClass((ref ?? contentRef).current, m`suffix`);
        },
        [clearable, disabled, maxLength, showWordLimit, type],
    );

    const hideClear = useCallback(() => {
        if (clearRef.current) {
            addStyle(clearRef.current, 'display', 'none');
        }
        if (suffixRef.current) {
            addStyle(suffixRef.current, 'display', '');
        }
        // if (!suffixSlot) {
        //     removeClass((ref ?? contentRef).current, m`suffix`);
        // }
    }, []);

    /** 在点击由 clearable 属性生成的清空按钮时触发 */
    const handelClear = useCallback(
        event => {
            setValue('');
            if (clearRef.current) {
                addStyle(clearRef.current, 'display', 'none');
            }
            hideClear();
            if (!readOnly && !disabled) {
                inputRef.current?.focus();
            }
            onClear?.(event);
            onChange?.('', event);
        },
        [disabled, hideClear, onChange, onClear, readOnly, setValue],
    );

    /** 后缀点击事件 */
    const onClickSuffix = useCallback(() => {
        if (showPassword) {
            setType(type === 'text' ? 'password' : 'text');
        }
    }, [type, showPassword]);

    /** 输入事件 */
    const handleInput = useCallback(
        event => {
            if (inputOver.current) {
                // 让搜索变成异步的
                setValue(event.target.value);
                if (clearRef.current && clearable && isNotEmpty(event.target.value)) {
                    showClear(event.target.value);
                } else {
                    hideClear();
                }
                onChange?.(event.target.value, event);
            }
        },
        [setValue, clearable, onChange, showClear, hideClear],
    );

    const { run: handleDebounceInput } = useDebounceFn(handleInput, { wait: debounceTime });

    const handleComposition = useCallback(
        (event: any) => {
            const _type = event.type;
            if (_type === 'compositionstart') {
                inputOver.current = false;
            } else if (_type === 'compositionend') {
                inputOver.current = true;
                handleInput(event);
            }
        },
        [handleInput],
    );

    useEffect(() => {
        const input = inputRef.current;
        if (input && debounceInput) {
            input.addEventListener('compositionstart', handleComposition);
            input.addEventListener('compositionupdate', handleComposition);
            input.addEventListener('compositionend', handleComposition);
        }
    }, [debounceInput, handleComposition]);

    useImperativeHandle(ref, () => ({
        ref: containerRef,
        input: inputRef,
        getValue: () => value,
        setValue,
        onClear: handelClear,
        clear: handelClear,
        focus: () => inputRef.current?.focus(),
        blur: () => inputRef.current?.blur(),
        showClear,
        hideClear,
    }));

    /** 输入框头部内容 */
    const preffixSlot = useMemo(() => {
        if (['text', 'password'].includes(type) && prefix) {
            if (isObject(prefix)) {
                let nodeType = prefix?.type;
                nodeType = (nodeType as ComponentType)?.displayName || nodeType;

                if (nodeType.toString().startsWith('Icon')) {
                    return cloneElement(prefix as React.ReactElement<IconProps>, {
                        ...prefix.props,
                        className: classNames(prefix.props?.className, e`icon`),
                    });
                }
            }
            return prefix;
        }
        return null;
    }, [type, prefix, e]);

    const content = useMemo(() => {
        return type === 'hidden' ? (
            <input
                ref={inputRef}
                type="hidden"
                name={name}
                value={value}
                disabled={disabled}
                onChange={debounceInput ? handleDebounceInput : handleInput}
                onClick={props.onClick}
                className={props.className}
                style={props.innerStyle}
                {...htmlInputProps}
            />
        ) : (
            <div
                className={classNames(e`wrapper`, is({ error, warning }))}
                ref={contentRef}
                onMouseEnter={() => showClear(value)}
                onMouseLeave={() => {
                    if (!hasClass(contentRef.current, is('focus'))) {
                        hideClear();
                    }
                }}
            >
                {/* 前缀 */}
                {['text', 'password'].includes(type) && preffixSlot && (
                    <span className={e`prefix`}>
                        <span className={e`prefix-inner`}>{preffixSlot} </span>
                    </span>
                )}

                <input
                    ref={inputRef}
                    type={type}
                    name={name}
                    title={title}
                    value={hiddenValue ? '' : value}
                    className={e`inner`}
                    style={props.innerStyle}
                    placeholder={placeholder}
                    autoComplete="off"
                    readOnly={readOnly}
                    disabled={disabled}
                    maxLength={maxLength}
                    onInput={handleInput}
                    onClick={props.onClick}
                    onFocus={event => {
                        if (contentRef.current) {
                            addClass(contentRef.current, is('focus'));
                        }
                        showClear(value);
                        onFocus?.call(this, event);
                    }}
                    onBlur={event => {
                        if (contentRef.current) {
                            removeClass(contentRef.current, is('focus'));
                        }
                        hideClear();
                        onBlur?.call(this, event);
                    }}
                    {...htmlInputProps}
                />

                <span ref={clearRef} key="clearIcon" className={e`suffix`} style={{ display: 'none' }}>
                    <span className={e`suffix-inner`}>
                        <Icon
                            prefix="fal"
                            name="circle-xmark"
                            className={classNames(e`icon`, e`clear`)}
                            onClick={handelClear}
                            onMouseDown={event => {
                                event.preventDefault();
                                event.stopPropagation();
                            }}
                        />
                    </span>
                </span>

                {suffixSlot && (
                    <span ref={suffixRef} key="suffixSlot" className={classNames(e`suffix`, { 'r-click': suffixCanClick })} onClick={onClickSuffix}>
                        <span className={e`suffix-inner`}>{suffixSlot}</span>
                    </span>
                )}
            </div>
        );
    }, [
        type,
        name,
        value,
        disabled,
        debounceInput,
        handleDebounceInput,
        handleInput,
        props.onClick,
        props.className,
        props.innerStyle,
        htmlInputProps,
        e,
        is,
        error,
        warning,
        preffixSlot,
        title,
        hiddenValue,
        placeholder,
        readOnly,
        maxLength,
        handelClear,
        suffixSlot,
        suffixCanClick,
        onClickSuffix,
        showClear,
        hideClear,
        onFocus,
        onBlur,
    ]);

    if (append || prepend) {
        return (
            <InputGroup
                prepend={prepend}
                append={append}
                ref={containerRef}
                className={classNames(
                    {
                        [m(size)]: size,
                    },
                    is({ disabled, plain }),
                    b(),
                    props.className,
                )}
                style={props.style}
            >
                {content}
            </InputGroup>
        );
    } else {
        return (
            <div
                ref={containerRef}
                className={classNames(
                    b(),
                    {
                        [m`prefix`]: preffixSlot,
                        [m`suffix`]: suffixSlot || clearable,
                        [m(size)]: size,
                    },
                    is({ disabled, plain }),

                    props.className,
                )}
                style={append || prepend ? {} : props.style}
                onClick={event => event.stopPropagation()}
            >
                {content}
            </div>
        );
    }
}

const ForwardInput = forwardRef(InternalInput) as (props: InputProps & { ref?: RefObject<InputRef> | React.ForwardedRef<InputRef> }) => React.ReactElement;

type InternalInputType = typeof ForwardInput;

interface InputInterface extends InternalInputType {
    displayName?: string;
    defaultProps?: Partial<InputProps>;
    TextArea: typeof TextArea;
    Range: typeof InputRange;
}

const Input = ForwardInput as InputInterface;

Input.TextArea = TextArea;
Input.Range = InputRange;

Input.displayName = 'ElInput';

export default Input;
