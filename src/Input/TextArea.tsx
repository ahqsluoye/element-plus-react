import classNames from 'classnames';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { mergeDefaultProps } from '../Util';
import { partitionHTMLProps, useClassNames, useControlled, useDisabled } from '../hooks';
import { useResizeObserver } from '../hooks/useResizeObserver';
import { TextareaProps, TextareaRef } from './typings';
import { calcTextareaHeight } from './utils';

const TextArea = forwardRef<TextareaRef, TextareaProps>((props, ref) => {
    props = mergeDefaultProps(
        {
            placeholder: '请输入',
            style: { width: '100%' },
            autosize: true,
            inputStyle: {},
        },
        props,
    );
    const {
        name,
        title,
        error,
        placeholder,
        readOnly,
        plain,
        rows,
        classPrefix = 'textarea',
        onFocus,
        onBlur,
        onChange,
        warning,
        maxLength,
        showWordLimit,
        resize,
        autosize,
        inputStyle,
        ...rest
    } = props;
    const { b, m, e, is } = useClassNames(classPrefix);

    const [value, setValue] = useControlled(props.value, props.defaultValue);
    const [focus, setFocus] = useState(false);
    const [textareaCalcStyle, setTextareaCalcStyle] = useState<React.CSSProperties>({});
    const disabled = useDisabled(props.disabled);

    const containerRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const countRef = useRef<HTMLSpanElement>(null);

    const [htmlInputProps] = partitionHTMLProps(rest);

    const isWordLimitVisible = useMemo(() => showWordLimit && !!maxLength && !disabled && !readOnly, [showWordLimit, maxLength, disabled, readOnly]);

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
            const minRows = typeof autosize !== 'boolean' ? autosize.minRows : undefined;
            const maxRows = typeof autosize !== 'boolean' ? autosize.maxRows : undefined;
            const textareaStyle = calcTextareaHeight(textareaRef.current, minRows, maxRows);
            setTextareaCalcStyle(prev => ({ ...prev, ...textareaStyle }));
        } else {
            setTextareaCalcStyle(prev => ({ ...prev, minHeight: calcTextareaHeight(textareaRef.current).minHeight }));
        }
    }, [autosize]);

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

    useResizeObserver(textareaRef, entries => {
        onceInitSizeTextarea();
        if (!isWordLimitVisible || resize !== 'both') {
            return;
        }
        const entry = entries[0];
        const { width } = entry.contentRect;
        if (countRef.current) {
            countRef.current.style.right = `calc(100% - ${width + 15 + 6}px)`;
        }
    });

    useEffect(() => {
        if (autosize) {
            resizeTextarea();
        }
    }, [value]);

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
        <div className={classNames(b(), m`suffix`, is({ focus, disabled, plain }), props.className)} style={props.style} ref={containerRef}>
            <textarea
                ref={textareaRef}
                rows={rows}
                name={name}
                title={title}
                value={value}
                className={classNames(e`inner`, props.className, is({ error, warning }))}
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
            {maxLength && showWordLimit ? (
                <span ref={countRef} className={e`count`}>
                    {typeof value === 'string' ? value.length : 0} / {maxLength}
                </span>
            ) : null}
        </div>
    );
});

TextArea.displayName = 'ElTextArea';

export default TextArea;
