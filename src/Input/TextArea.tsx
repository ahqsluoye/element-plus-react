import classNames from 'classnames';
import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { mergeDefaultProps } from '../Util';
import { partitionHTMLProps, useClassNames, useControlled, useDisabled } from '../hooks';
import { TextareaProps, TextareaRef } from './typings';

const TextArea = forwardRef<TextareaRef, TextareaProps>((props, ref) => {
    props = mergeDefaultProps(
        {
            placeholder: '请输入',
            style: { width: '100%' },
        },
        props,
    );
    const { name, title, error, placeholder, readOnly, plain, rows, classPrefix = 'textarea', onFocus, onBlur, onChange, warning, maxLength, showWordLimit, ...rest } = props;
    const { b, m, e, is } = useClassNames(classPrefix);

    const [value, setValue] = useControlled(props.value, props.defaultValue);
    const [focus, setFocus] = useState(false);
    const disabled = useDisabled(props.disabled);

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const [htmlInputProps] = partitionHTMLProps(rest);

    const handleInput = useCallback(
        event => {
            setValue(event.target.value);
            onChange?.(event.target.value);
        },
        [onChange, setValue],
    );

    useImperativeHandle(ref, () => ({
        get input() {
            return inputRef.current;
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
        focus: () => inputRef.current?.focus(),
        blur: () => inputRef.current?.blur(),
    }));

    return (
        <div className={classNames(b(), m`suffix`, is({ focus, disabled, plain }), props.className)} style={props.style} ref={containerRef}>
            <textarea
                rows={rows}
                name={name}
                title={title}
                value={value}
                className={classNames(e`inner`, props.className, is({ error, warning }))}
                style={props.innerStyle}
                placeholder={placeholder}
                readOnly={readOnly}
                disabled={disabled}
                maxLength={maxLength}
                onChange={handleInput}
                ref={inputRef}
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
                <span className={e`count`}>
                    {typeof value === 'string' ? value.length : 0} / {maxLength}
                </span>
            ) : null}
        </div>
    );
});

TextArea.displayName = 'TextArea';

export default TextArea;
