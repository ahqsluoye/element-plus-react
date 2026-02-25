import { useDebounceFn } from 'ahooks';
import classNames from 'classnames';
import { addStyle, hasClass } from 'dom-lib';
import isObject from 'lodash/isObject';
import React, { ComponentType, RefObject, cloneElement, forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useConfigProvider } from '../ConfigProvider/ConfigProviderContext';
import Icon from '../Icon/Icon';
import { IconProps } from '../Icon/typings';
import { isNotEmpty, mergeDefaultProps } from '../Util';
import { partitionHTMLProps, useClassNames, useControlled, useDisabled, useSize } from '../hooks';
import InputRange from './InputRange';
import TextArea from './TextArea';
import { InputProps, InputRef, ValueType } from './typings';
import { looseToNumber } from './utils';

function InternalInput(props: InputProps, ref: RefObject<InputRef>) {
    const { locale } = useConfigProvider();
    const { t } = useTranslation();

    props = mergeDefaultProps(
        {
            type: 'text',
            placeholder: t('el.input.placeholder', { lng: locale }),
            clearable: true,
            debounceTime: 200,
            defaultValue: '',
            autocomplete: 'off',
            tabindex: 0,
            inputmode: 'text',
            wordLimitPosition: 'inside',
        },
        props,
    );

    const {
        id,
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
        onFocus,
        onBlur,
        onInput,
        onKeyDown,
        onMouseEnter,
        onMouseLeave,
        maxLength,
        minLength,
        showWordLimit,
        hiddenValue,
        defaultValue,
        formatter,
        parser,
        showPassword,
        clearable: clearableProp,
        autocomplete,
        tabindex,
        ariaLabel,
        form,
        autofocus,
        inputmode,
        containerRole,
        validateEvent = true,
        wordLimitPosition,
        modelModifiers = {},
        ...rest
    } = props;

    const { b, e, m, be, bm, is } = useClassNames(classPrefix);
    const [htmlInputProps] = partitionHTMLProps(rest);

    const [value, setValue] = useControlled(props.value, defaultValue);
    const [type, setType] = useState(props.type || 'text');
    const [focused, setFocused] = useState(false);
    const [hovering, setHovering] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const disabled = useDisabled(props.disabled);
    const size = useSize(props.size);

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLInputElement>(null);
    const clearRef = useRef<HTMLInputElement>(null);
    const suffixRef = useRef<HTMLInputElement>(null);
    const inputOver = useRef(true);
    const isComposing = useRef(false);
    const valueRef = useRef<string>('');

    // Computed values equivalent to Vue's computed properties
    const nativeInputValue = useMemo(() => {
        return value == null ? '' : String(value);
    }, [value]);

    // 是否显示清除按钮
    const showClear = useMemo(() => {
        return clearableProp && !disabled && !readOnly /* && !!nativeInputValue */ && (focused || hovering);
    }, [clearableProp, disabled, readOnly, focused, hovering]);

    // 是否显示密码可见按钮
    const showPwdVisible = useMemo(() => {
        return showPassword && !disabled && !!nativeInputValue;
    }, [showPassword, disabled, nativeInputValue]);

    // 是否显示输入长度限制
    const isWordLimitVisible = useMemo(() => {
        return showWordLimit && !!maxLength && (type === 'text' || type === 'textarea') && !disabled && !readOnly && !showPassword;
    }, [showWordLimit, maxLength, type, disabled, readOnly, showPassword]);

    // 输入长度
    const textLength = useMemo(() => nativeInputValue.length, [nativeInputValue]);

    // 输入长度限制判断
    const inputExceed = useMemo(() => {
        return !!isWordLimitVisible && textLength > Number(maxLength);
    }, [isWordLimitVisible, textLength, maxLength]);

    // const suffixVisible = useMemo(() => {
    //     return !!suffix || showClear || showPassword || isWordLimitVisible;
    // }, [suffix, showClear, showPassword, isWordLimitVisible]);

    const wrapperKls = useMemo(() => [e`wrapper`, is({ focus: focused })], [focused, e, is]);

    // Format and parse functions
    const formatValue = useCallback(
        (val: string): string => {
            const { trim, number } = modelModifiers;
            if (trim) {
                val = val.trim();
            }
            if (number) {
                val = `${looseToNumber(val)}`;
            }
            if (formatter) {
                val = formatter(val);
            }
            return val;
        },
        [formatter, modelModifiers],
    );

    // Native input value management
    const setNativeInputValue = useCallback(() => {
        const input = inputRef.current;
        const formatterValue = formatter ? formatter(nativeInputValue) : nativeInputValue;
        if (!input || input.value === formatterValue || type === 'file') {
            return;
        }
        input.value = formatterValue as string;
    }, [formatter, nativeInputValue, type]);

    // Clear functionality
    const showClearHandler = useCallback(
        (_value: ValueType) => {
            if (clearableProp && isNotEmpty(_value) && !disabled && clearRef.current) {
                addStyle(clearRef.current, 'display', '');
                if (suffixRef.current) {
                    if (type === 'text' && maxLength && showWordLimit) {
                        return;
                    }
                    addStyle(suffixRef.current, 'display', 'none');
                }
            }
        },
        [clearableProp, disabled, maxLength, showWordLimit, type],
    );

    const hideClearHandler = useCallback(() => {
        if (clearRef.current) {
            addStyle(clearRef.current, 'display', 'none');
        }
        if (suffixRef.current) {
            addStyle(suffixRef.current, 'display', '');
        }
    }, []);

    const handleInput = useCallback(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            if (isComposing.current) {
                return;
            }

            const { lazy } = modelModifiers;
            const { value: inputValue } = event.target;

            if (lazy) {
                onInput?.(inputValue);
                return;
            }

            // inputValue = formatValue(inputValue);

            // // Ensure native input value is controlled
            // if (String(inputValue) === nativeInputValue) {
            //     if (formatter) {
            //         setNativeInputValue();
            //     }
            //     return;
            // }

            if (clearRef.current && showClear && isNotEmpty(event.target.value)) {
                showClearHandler(event.target.value);
            } else {
                hideClearHandler();
            }
            setValue(inputValue);
            onInput?.(inputValue);
            onChange?.(inputValue, event);

            // await nextTick();
            // // Update native input value
            // setNativeInputValue();
        },
        [modelModifiers, showClear, setValue, onInput, onChange, showClearHandler, hideClearHandler],
    );

    // Event handlers
    const handleCompositionStart = useCallback((event: React.CompositionEvent) => {
        isComposing.current = true;
    }, []);

    const handleCompositionUpdate = useCallback((event: React.CompositionEvent) => {
        // Handle composition update if needed
    }, []);

    const handleCompositionEnd = useCallback(
        (event: React.CompositionEvent) => {
            isComposing.current = false;
            handleInput(event as any);
        },
        [handleInput],
    );

    const handleChange = useCallback(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            let { value: inputValue } = event.target;

            inputValue = formatValue(inputValue);

            if (modelModifiers.lazy) {
                setValue(inputValue);
            }

            onChange?.(inputValue, event);
            // await nextTick();
            // setNativeInputValue();
        },
        [formatValue, modelModifiers.lazy, onChange, setValue],
    );

    const handleKeydown = useCallback(
        (event: React.KeyboardEvent) => {
            onKeyDown?.(event);
        },
        [onKeyDown],
    );

    const handleFocus = useCallback(
        (event: React.FocusEvent) => {
            setFocused(true);
            if (showClear) {
                showClearHandler(nativeInputValue);
            }
            onFocus?.(event);
        },
        [showClear, onFocus, showClearHandler, nativeInputValue],
    );

    const handleBlur = useCallback(
        (event: React.FocusEvent) => {
            setFocused(false);
            hideClearHandler();
            onBlur?.(event);
            // Form validation would go here if needed
        },
        [hideClearHandler, onBlur],
    );

    const handleMouseEnter = useCallback(
        (event: React.MouseEvent) => {
            setHovering(true);
            if (showClear) {
                showClearHandler(nativeInputValue);
            }
            onMouseEnter?.(event);
        },
        [showClear, onMouseEnter, showClearHandler, nativeInputValue],
    );

    const handleMouseLeave = useCallback(
        (event: React.MouseEvent) => {
            setHovering(false);
            if (!hasClass(wrapperRef.current, is('focus'))) {
                hideClearHandler();
            }
            onMouseLeave?.(event);
        },
        [hideClearHandler, is, onMouseLeave],
    );

    const handleClear = useCallback(
        (event: React.MouseEvent) => {
            event.stopPropagation();
            setValue('');
            hideClearHandler();
            onClear?.(event);
            onChange?.('', event as any);
            onInput?.('');

            requestAnimationFrame(() => {
                if (!readOnly && !disabled) {
                    inputRef.current?.focus();
                }
            });
        },
        [setValue, hideClearHandler, onClear, onChange, onInput, readOnly, disabled],
    );

    // Password visibility toggle
    const handlePasswordVisible = useCallback(() => {
        setPasswordVisible(!passwordVisible);
    }, [passwordVisible]);

    const inputValue = useMemo(() => {
        if (hiddenValue) {
            return '';
        }
        return focused ? value : formatValue(value);
    }, [focused, formatValue, hiddenValue, value]);

    const { run: handleDebounceInput } = useDebounceFn(handleInput, { wait: debounceTime });

    // Input type for password visibility
    const inputType = useMemo(() => {
        if (showPassword) {
            return passwordVisible ? 'text' : 'password';
        }
        return type;
    }, [showPassword, passwordVisible, type]);

    // Slots
    const preffixSlot = useMemo(() => {
        if (['text', 'password'].includes(type) && prefix) {
            if (isObject(prefix)) {
                let nodeType = prefix?.type;
                nodeType = (nodeType as ComponentType)?.displayName || nodeType;
                if (nodeType.toString().startsWith('ElIcon')) {
                    return cloneElement(prefix as React.ReactElement<IconProps>, {
                        ...prefix.props,
                        className: classNames(prefix.props?.className, e('icon')),
                    });
                }
            }
            return prefix;
        }
        return null;
    }, [type, prefix, e]);

    const suffixSlot = useMemo(() => {
        if (type === 'text' && maxLength && showWordLimit) {
            return (
                <span className={e('count')}>
                    <span className={e('count-inner')}>
                        {textLength} / {maxLength}
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
                        className: classNames(suffix.props?.className, e('icon')),
                    });
                }
            }
            return suffix;
        } else if (showPwdVisible) {
            return <Icon name={passwordVisible ? 'eye' : 'eye-slash'} className={classNames(e('icon'), e('password'))} />;
        }
        return null;
    }, [type, maxLength, showWordLimit, textLength, suffix, showPwdVisible, passwordVisible, e]);

    const suffixCanClick = useMemo(() => {
        return showPassword;
    }, [showPassword]);

    const onClickSuffix = useCallback(() => {
        if (showPassword) {
            handlePasswordVisible();
        }
    }, [showPassword, handlePasswordVisible]);

    // Ref methods
    useImperativeHandle(ref, () => ({
        ref: containerRef,
        input: inputRef,
        getValue: () => value,
        setValue,
        onClear: handleClear,
        clear: handleClear,
        focus: () => inputRef.current?.focus(),
        blur: () => inputRef.current?.blur(),
        showClear: showClearHandler,
        hideClear: hideClearHandler,
        select: () => inputRef.current?.select(),
        isComposing: isComposing.current,
    }));

    const containerKls = useMemo(
        () => [
            type === 'textarea' ? 'el-textarea' : b(),
            m(size),
            is({ disabled, exceed: inputExceed }),
            {
                [b('group')]: prepend || append,
                [bm('group', 'prepend')]: prepend,
                [bm('group', 'append')]: append,
                [m('prefix')]: preffixSlot,
                [m('suffix')]: suffixSlot || showClear,
                [bm('suffix', 'password-clear')]: showClear && showPwdVisible,
                [b('hidden')]: type === 'hidden',
            },
        ],
        [type, b, m, size, is, disabled, inputExceed, prepend, append, bm, preffixSlot, suffixSlot, showClear, showPwdVisible],
    );

    return (
        <div ref={containerRef} className={classNames(containerKls, props.className)} style={props.style} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {prepend && <div className={be('group', 'prepend')}>{prepend}</div>}

            <div
                ref={wrapperRef}
                className={classNames(wrapperKls)}
                onMouseEnter={() => showClearHandler(value)}
                onMouseLeave={() => {
                    if (!hasClass(wrapperRef.current, is('focus'))) {
                        hideClearHandler();
                    }
                }}
            >
                {/* Prefix slot */}
                {prefix || preffixSlot ? (
                    <span className={e`prefix`}>
                        <span className={e`prefix-inner`}>{preffixSlot}</span>
                    </span>
                ) : null}

                <input
                    id={id}
                    ref={inputRef}
                    className={e`inner`}
                    type={inputType}
                    name={name}
                    title={title}
                    value={inputValue}
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={readOnly}
                    autoComplete={autocomplete}
                    tabIndex={tabindex}
                    aria-label={ariaLabel}
                    form={form}
                    autoFocus={autofocus}
                    role={containerRole}
                    inputMode={inputmode}
                    maxLength={maxLength}
                    minLength={minLength}
                    style={props.innerStyle}
                    onCompositionStart={handleCompositionStart}
                    onCompositionUpdate={handleCompositionUpdate}
                    onCompositionEnd={handleCompositionEnd}
                    onInput={debounceInput ? handleDebounceInput : handleInput}
                    onChange={handleChange}
                    onKeyDown={handleKeydown}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onClick={props.onClick}
                    {...htmlInputProps}
                />

                {/* Suffix slot */}
                {/* {suffixSlot && (
                )} */}
                <span className={e`suffix`}>
                    <span className={e`suffix-inner`}>
                        {!showClear && !showPwdVisible && !isWordLimitVisible && <>{suffixSlot}</>}

                        <span
                            ref={clearRef}
                            className={classNames(e`icon`, e`clear`)}
                            onMouseDown={event => event.preventDefault()}
                            onClick={handleClear}
                            style={{ display: 'none' }}
                        >
                            <Icon prefix="fal" name="circle-xmark" />
                        </span>

                        {showPwdVisible && (
                            <span
                                className={classNames(e`icon`, e`password`)}
                                onClick={handlePasswordVisible}
                                onMouseDown={event => event.preventDefault()}
                                onMouseUp={event => event.preventDefault()}
                            >
                                <Icon name={passwordVisible ? 'eye' : 'eye-slash'} />
                            </span>
                        )}

                        {isWordLimitVisible && (
                            <span className={classNames(e`count`, { outside: wordLimitPosition === 'outside' })}>
                                <span className={e`count-inner`}>
                                    {textLength} / {maxLength}
                                </span>
                            </span>
                        )}
                    </span>
                </span>
            </div>

            {append && <div className={be('group', 'append')}>{append}</div>}
        </div>
    );
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
