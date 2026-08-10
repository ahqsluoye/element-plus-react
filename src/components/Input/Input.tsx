import { partitionHTMLProps } from '@qsxy/element-plus-react/hooks/htmlPropsUtils';
import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import { useClearable, useDisabled, useSize, useStatusIcon } from '@qsxy/element-plus-react/hooks/useCommonProps';
import useControlled from '@qsxy/element-plus-react/hooks/useControlled';
import ElIcon from '@qsxy/element-plus-react/Icon/Icon';
import { IconProps } from '@qsxy/element-plus-react/Icon/typings';
import { isNotEmpty, mergeDefaultProps } from '@qsxy/element-plus-react/Util/base';
import { ValidateComponentsMap } from '@qsxy/element-plus-react/Util/icons';
import classNames from 'classnames';
import { addStyle } from 'dom-lib';
import isObject from 'lodash/isObject';
import React, { ComponentType, cloneElement, memo, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { InputProps, InputRef } from './typings';

const Input = memo(({ ref, ...props }: InputProps & { ref?: React.Ref<InputRef | null> }) => {
    props = mergeDefaultProps(
        {
            type: 'text',
            placeholder: '',
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
        debounceInput,
        debounceTime,
        placeholder,
        readOnly,
        plain,
        classPrefix = 'input',
        onInput,
        onChange,
        onClear,
        showPassword,
        onFocus,
        onBlur,
        maxLength,
        showWordLimit,
        hiddenValue,
        defaultValue,
        formatter,
        isSelect,
        ...rest
    } = props;
    const { b, e, m, be, bm, is } = useClassNames(classPrefix);
    const [htmlInputProps] = partitionHTMLProps(rest);

    const [value, setValue] = useControlled(props.value, defaultValue);
    const [type, setType] = useState(props.type || 'text');
    const [focused, setFocused] = useState(false);
    const [hovering, setHovering] = useState(false);
    const disabled = useDisabled(props.disabled);
    const size = useSize(props.size);
    const { statusIcon, validateState } = useStatusIcon();
    const clearable = useClearable(props.clearable);

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLInputElement>(null);
    const clearRef = useRef<HTMLInputElement>(null);
    const suffixRef = useRef<HTMLInputElement>(null);
    // 搜索框是否输入完毕
    const inputOver = useRef(true);

    const renderClear = useMemo(() => clearable && !disabled && (isSelect || !readOnly), [clearable, disabled, isSelect, readOnly]);
    const showClear = useMemo(() => renderClear && !!value && (focused || hovering), [renderClear, value, focused, hovering]);

    // const containerRef = useMemo(() => props.containerRef ?? rootRef, [props.containerRef]);

    /** 格式化的数据 */
    const formatValue = useMemo(() => {
        let val = value;
        if (formatter) {
            val = formatter(val);
        }
        return val;
    }, [formatter, value]);

    const validateIcon = useMemo(() => validateState && ValidateComponentsMap[validateState], [validateState]);

    const showPwdVisible = useMemo(() => showPassword && isNotEmpty(value) && !disabled, [showPassword, value, disabled]);

    const isWordLimitVisible = useMemo(
        () => showWordLimit && maxLength && type === 'text' && !disabled && !readOnly && !showPassword,
        [showWordLimit, maxLength, type, disabled, readOnly, showPassword],
    );

    const suffixVisible = useMemo(
        () => !!suffix || clearable || showPassword || isWordLimitVisible || (!!validateState && statusIcon),
        [suffix, clearable, showPassword, isWordLimitVisible, validateState, statusIcon],
    );

    /** 输入框尾部内容 */
    const suffixContent = useMemo(() => {
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
        return suffix ? <span className={e`icon`}>{suffix}</span> : null;
    }, [suffix, e]);

    /** 后缀是否可点击 */
    const suffixCanClick = useMemo(() => {
        if (showPassword) {
            return true;
        }
    }, [showPassword]);

    /** 在点击由 clearable 属性生成的清空按钮时触发 */
    const handelClear = useCallback(
        (event?: any) => {
            event?.stopPropagation();
            setValue('');
            if (clearRef.current) {
                addStyle(clearRef.current, 'display', 'none');
            }
            onClear?.(event);
            onChange?.('', event);
            if (requestAnimationFrame) {
                requestAnimationFrame(() => {
                    if (!readOnly && !disabled) {
                        inputRef.current?.focus();
                    }
                });
            }
        },
        [disabled, onChange, onClear, readOnly, setValue],
    );

    /** 后缀点击事件 */
    const handlePasswordVisible = useCallback(() => {
        setType(type === 'text' ? 'password' : 'text');
    }, [type]);

    /** 输入事件 */
    const handleInput = useCallback(
        event => {
            // console.log('handleInput', event.target.value);
            // if (inputOver.current) {
            // }
            // 让搜索变成异步的
            setValue(event.target.value);
            onChange?.(event.target.value, event);
        },
        [setValue, onChange],
    );

    const handleChange = useCallback(
        event => {
            // console.log('handleChange', event.target.value);
            setValue(event.target.value);
            onChange?.(event.target.value, event);
        },
        [setValue, onChange],
    );

    // const { run: handleDebounceInput } = useDebounceFn(handleInput, { wait: debounceTime });

    // const handleComposition = useCallback(
    //     (event: any) => {
    //         const _type = event.type;
    //         // console.log(_type);
    //         if (_type === 'compositionstart') {
    //             inputOver.current = false;
    //         } else if (_type === 'compositionend') {
    //             inputOver.current = true;
    //             handleInput(event);
    //         }
    //     },
    //     [handleInput],
    // );

    // useEffect(() => {
    //     const input = inputRef.current;
    //     if (input) {
    //         input.addEventListener('compositionstart', handleComposition);
    //         input.addEventListener('compositionupdate', handleComposition);
    //         input.addEventListener('compositionend', handleComposition);
    //     }
    // }, [handleComposition]);

    // useEffect(() => {
    //     requestAnimationFrame(() => {
    //         if (inputRef.current) {
    //             inputRef.current.value = formatValue as string;
    //         }
    //     });
    // }, []);

    useImperativeHandle(ref, () => ({
        ref: containerRef,
        input: inputRef,
        getValue: () => value,
        setValue,
        onClear: handelClear,
        clear: handelClear,
        focus: () => inputRef.current?.focus(),
        blur: () => inputRef.current?.blur(),
    }));

    /** 输入框头部内容 */
    const preffixSlot = useMemo(() => {
        if (['text', 'password'].includes(type) && prefix) {
            if (isObject(prefix)) {
                let nodeType = prefix?.type;
                nodeType = (nodeType as ComponentType)?.displayName || nodeType;

                if (nodeType.toString().startsWith('ElIcon')) {
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

    const inputValue = useMemo(() => {
        if (hiddenValue) {
            return '';
        }
        return focused ? value : formatValue;
    }, [focused, formatValue, hiddenValue, value]);

    return (
        <div
            ref={containerRef}
            className={classNames(
                b(),
                {
                    [bm('group', 'prepend')]: prepend,
                    [bm('group', 'append')]: append,
                    [m`prefix`]: preffixSlot,
                    [m`suffix`]: suffixContent || clearable,
                    [m(size)]: size,
                    [b`hidden`]: type === 'hidden',
                },
                is({ disabled, plain }),
                props.className,
            )}
            style={props.style}
            onClick={event => event.stopPropagation()}
        >
            {prepend ? <div className={be('group', 'prepend')}>{prepend}</div> : null}
            <div ref={wrapperRef} className={classNames(e`wrapper`, is({ focus: focused }))} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
                {/* 前缀 */}
                {['text', 'password'].includes(type) && preffixSlot && (
                    <span className={e`prefix`}>
                        <span className={e`prefix-inner`}>{preffixSlot}</span>
                    </span>
                )}

                <input
                    ref={inputRef}
                    type={type}
                    name={name}
                    title={title}
                    value={inputValue}
                    className={e`inner`}
                    style={props.innerStyle}
                    placeholder={placeholder}
                    autoComplete="off"
                    readOnly={readOnly}
                    disabled={disabled}
                    maxLength={maxLength}
                    onInput={handleInput}
                    // onChange={handleChange}
                    // onCompositionStart={handleComposition}
                    // onCompositionUpdate={handleComposition}
                    // onCompositionEnd={handleComposition}
                    onClick={props.onClick}
                    onFocus={event => {
                        // inputRef.current.value = value as string;
                        // if (wrapperRef.current) {
                        //     addClass(wrapperRef.current, is('focus'));
                        // }
                        setFocused(true);
                        onFocus?.call(this, event);
                    }}
                    onBlur={event => {
                        // inputRef.current.value = formatValue as string;
                        // if (wrapperRef.current) {
                        //     removeClass(wrapperRef.current, is('focus'));
                        // }
                        setFocused(false);
                        onBlur?.call(this, event);
                        // handleChange(event);
                    }}
                    {...htmlInputProps}
                />

                {/* <span className={e`suffix`}>
                        <span className={e`suffix-inner`}>
                            <ElIcon
                                ref={clearRef}
                                style={{ display: 'none' }}
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
                    </span> */}

                {suffixVisible && (
                    <span className={classNames(e`suffix`, { [b('click', false)]: suffixCanClick })}>
                        <span className={e`suffix-inner`}>
                            {showClear && (
                                <ElIcon
                                    ref={clearRef}
                                    prefix="fal"
                                    name="circle-xmark"
                                    className={classNames(e`icon`, e`clear`)}
                                    onClick={handelClear}
                                    onMouseDown={event => {
                                        event.preventDefault();
                                        event.stopPropagation();
                                    }}
                                />
                            )}
                            {/* 选择框仅当不显示清除图标时才显示 */}
                            {(isSelect && !showClear) || (!isSelect && (!showPwdVisible || !isWordLimitVisible)) ? suffixContent : null}
                            {showPwdVisible && <ElIcon name={type === 'text' ? 'eye' : 'eye-slash'} className={classNames(e`icon`, e`password`)} onClick={handlePasswordVisible} />}
                            {isWordLimitVisible && (
                                <span className={e`count`}>
                                    <span className={e`count-inner`}>
                                        {typeof value === 'string' ? value.length : 0} / {maxLength}
                                    </span>
                                </span>
                            )}
                            {validateState && validateIcon && statusIcon && (
                                <ElIcon {...ValidateComponentsMap[validateState]} className={classNames(e`icon`, e`validateIcon`, is('loading', validateState === 'validating'))} />
                            )}
                        </span>
                    </span>
                )}
            </div>
            {append ? <div className={be('group', 'append')}>{append}</div> : null}
        </div>
    );
});

Input.displayName = 'ElInput';

export default Input;
