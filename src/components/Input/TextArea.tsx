import { partitionHTMLProps } from '@qsxy/element-plus-react/hooks/htmlPropsUtils';
import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import { useAutosize, useClearable, useDisabled } from '@qsxy/element-plus-react/hooks/useCommonProps';
import useControlled from '@qsxy/element-plus-react/hooks/useControlled';
import { useResizeObserver } from '@qsxy/element-plus-react/hooks/useResizeObserver';
import ElIcon from '@qsxy/element-plus-react/Icon/Icon';
import { mergeDefaultProps } from '@qsxy/element-plus-react/Util/base';
import { cAF, rAF } from '@qsxy/element-plus-react/Util/raf';
import classNames from 'classnames';
import { addStyle } from 'dom-lib';
import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { TextareaProps, TextareaRef } from './typings';
import { calcTextareaHeight } from './utils';

const TextArea = memo(
    forwardRef<TextareaRef, TextareaProps>((props, ref) => {
        const autosize = useAutosize(props.autosize);
        props = mergeDefaultProps({ autosize }, props);
        props = mergeDefaultProps(
            {
                placeholder: '',
                style: { width: '100%' },
                autosize: true,
                rows: 2,
                inputStyle: {},
            },
            props,
        );
        const {
            name,
            title,
            placeholder,
            readOnly,
            plain,
            rows,
            classPrefix = 'textarea',
            onFocus,
            onBlur,
            onChange,
            maxLength,
            showWordLimit,
            resize,
            inputStyle,
            ...rest
        } = props;
        const { b, m, e, is } = useClassNames(classPrefix);

        const [value, setValue] = useControlled(props.value, props.defaultValue);
        const [focus, setFocus] = useState(false);
        const [hovering, setHovering] = useState(false);
        const [textareaCalcStyle, setTextareaCalcStyle] = useState<React.CSSProperties>({});
        const disabled = useDisabled(props.disabled);
        const clearable = useClearable(props.clearable);

        const containerRef = useRef<HTMLDivElement>(null);
        const textareaRef = useRef<HTMLTextAreaElement>(null);
        const countRef = useRef<HTMLSpanElement>(null);
        const iconRef = useRef<HTMLDivElement>(null);
        let rAFId: number | undefined;

        const [htmlInputProps] = partitionHTMLProps(rest);

        const isWordLimitVisible = useMemo(() => showWordLimit && !!maxLength && !disabled && !readOnly, [showWordLimit, maxLength, disabled, readOnly]);

        const renderClear = useMemo(() => clearable && !disabled && !readOnly, [clearable, disabled, readOnly]);
        const showClear = useMemo(() => renderClear && !!value && (focus || hovering), [renderClear, value, focus, hovering]);

        const handleInput = useCallback(
            event => {
                setValue(event.target.value);
                onChange?.(event.target.value);
            },
            [onChange, setValue],
        );

        const resizeTextarea = useCallback(() => {
            if (!textareaRef.current) {
                return;
            }

            if (autosize) {
                const minRows = typeof autosize !== 'boolean' ? autosize.minRows : rows;
                const maxRows = typeof autosize !== 'boolean' ? autosize.maxRows : undefined;
                const textareaStyle = calcTextareaHeight(textareaRef.current, minRows, maxRows);
                setTextareaCalcStyle(prev => ({ ...prev, ...textareaStyle }));
            } else {
                setTextareaCalcStyle(prev => ({ ...prev, minHeight: calcTextareaHeight(textareaRef.current).minHeight }));
            }
        }, [autosize, rows]);

        const createOnceInitResize = useCallback(() => {
            let isInit = false;
            return () => {
                if (isInit || !autosize) {
                    return;
                }
                const isElHidden = textareaRef.current?.offsetParent === null;
                if (!isElHidden) {
                    setTimeout(resizeTextarea);
                    isInit = true;
                }
            };
        }, [autosize, resizeTextarea]);

        const onceInitSizeTextarea = createOnceInitResize();

        // useResizeObserver(textareaRef, entries => {
        //     onceInitSizeTextarea();
        //    if ((!isWordLimitVisible && !renderClear) || (props.resize !== 'both' && props.resize !== 'horizontal')) {
        //        return;
        //    }
        //     const entry = entries[0];
        //     const { width } = entry.contentRect;
        //     if (countRef.current) {
        //         countRef.current.style.right = `calc(100% - ${width + 15 + 6}px)`;
        //     }
        // });

        useEffect(() => {
            if (autosize) {
                resizeTextarea();
            }
        }, [value]);

        useResizeObserver(textareaRef, entries => {
            onceInitSizeTextarea();
            if ((!isWordLimitVisible && !renderClear) || (props.resize !== 'both' && props.resize !== 'horizontal')) {
                return;
            }
            const entry = entries[0];
            const { width } = entry.target.getBoundingClientRect();

            const updateStyle = () => {
                rAFId = undefined;
                addStyle(countRef.current, {
                    /** right: 100% - (width - right(10)) */
                    right: `calc(100% - ${width - 10}px)`,
                });
                addStyle(iconRef.current, {
                    /** right: 100% - (width - right(11)) */
                    right: `calc(100% - ${width - 11}px)`,
                });
            };

            rAFId && cAF(rAFId);
            rAFId = rAF(updateStyle);
        });

        useImperativeHandle(ref, () => ({
            get input() {
                return textareaRef.current;
            },
            getValue: () => value,
            setValue,
            onClear: () => {
                setValue('');
                onChange?.('');
            },
            clear: () => {
                setValue('');
                onChange?.('');
            },
            focus: () => textareaRef.current?.focus(),
            blur: () => textareaRef.current?.blur(),
        }));

        return (
            <div
                className={classNames(b(), m`suffix`, is({ focus, disabled, plain }), props.className)}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                style={props.style}
                ref={containerRef}
            >
                <textarea
                    ref={textareaRef}
                    rows={rows}
                    name={name}
                    title={title}
                    value={value}
                    className={classNames(e`inner`, is({ clearable }), props.className)}
                    style={{ minHeight: 31, resize: disabled ? 'none' : resize, ...textareaCalcStyle, ...inputStyle }}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    disabled={disabled}
                    maxLength={maxLength}
                    onChange={handleInput}
                    onFocus={useCallback(
                        event => {
                            setFocus(true);
                            onFocus?.call(this, event);
                        },
                        [onFocus],
                    )}
                    onBlur={useCallback(
                        event => {
                            setFocus(false);
                            onBlur?.call(this, event);
                        },
                        [onBlur],
                    )}
                    {...htmlInputProps}
                />
                {showClear && (
                    <ElIcon
                        ref={iconRef}
                        name="circle-xmark"
                        className={classNames(e`icon`, e`clear`)}
                        // style={{ right: `calc(100% - ${width - 11}px)` }}
                        onClick={() => {
                            setValue('');
                            onChange?.('');
                        }}
                    />
                )}
                {maxLength && showWordLimit ? (
                    <span ref={countRef} className={e`count`}>
                        {typeof value === 'string' ? value.length : 0} / {maxLength}
                    </span>
                ) : null}
            </div>
        );
    }),
);

TextArea.displayName = 'ElTextArea';

export default TextArea;
