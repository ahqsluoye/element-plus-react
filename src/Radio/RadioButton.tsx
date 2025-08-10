import classNames from 'classnames';
import React, { forwardRef, useCallback, useContext, useImperativeHandle, useRef } from 'react';
import { RadioContext } from '../RadioGroup/RadioGroup';
import { partitionHTMLProps, useClassNames, useControlled, useDisabled, useSize } from '../hooks';
import { RadioProps, RadioRef } from './typings';

const RadioButton = forwardRef<RadioRef, RadioProps>((props, ref) => {
    const {
        value: groupValue,
        name: nameContext,
        disabled: disabledContext,
        size: sizeContext,
        readOnly: readOnlyContext,
        plaintext: plaintextContext,
        onChange: onGroupChange,
    } = useContext(RadioContext);

    const {
        className,
        children,
        checked: checkedProp,
        defaultChecked,
        classPrefix = 'radio-button',
        readOnly = readOnlyContext,
        plaintext = plaintextContext,
        name = nameContext,
        value,
        onChange,
        ...rest
    } = props;

    const [checked, setChecked] = useControlled(typeof groupValue !== 'undefined' ? groupValue === value : checkedProp, defaultChecked || false);

    const { wb, b, e, m, is } = useClassNames(classPrefix);
    const [htmlInputProps, restProps] = partitionHTMLProps(rest);
    const [tooltipEvents] = partitionHTMLProps(props, { htmlProps: ['onMouseEnter', 'onMouseLeave', 'onClick', 'onContextMenu'] });
    const disabled = useDisabled(disabledContext ?? props.disabled);
    const size = useSize(sizeContext ?? props.size);

    const containerRef = useRef(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (disabled || readOnly) {
                return;
            }

            setChecked(true);
            onGroupChange?.(value, event);
            onChange?.(true, value, event);
        },
        [disabled, onChange, onGroupChange, readOnly, setChecked, value],
    );

    // if (typeof controlled !== 'undefined') {
    //     // In uncontrolled situations, use defaultChecked instead of checked
    //     htmlInputProps[controlled ? 'checked' : 'defaultChecked'] = checked;
    // }

    useImperativeHandle(ref, () => ({
        ref: containerRef,
        get input() {
            return inputRef.current;
        },
        isChcked: () => checked,
        setChecked,
    }));

    if (plaintext) {
        return checked ? (
            <div {...restProps} ref={containerRef} className={classNames(wb({ disabled, checked }), m({ [size]: size }), className)}>
                {children}
            </div>
        ) : null;
    }

    return (
        <div
            className={classNames(b(), m({ [size]: size }), className, is({ active: checked, disabled }))}
            ref={containerRef}
            {...tooltipEvents}
            onClick={() => {
                inputRef.current.checked = true;
                // @ts-ignore
                props.onClick?.();
            }}
        >
            <input
                key={name}
                {...htmlInputProps}
                name={name}
                // value={value}
                type="radio"
                ref={inputRef}
                className={e`original-radio`}
                checked={checked}
                data-checked={checked}
                readOnly={readOnly}
                disabled={disabled}
                onChange={handleChange}
            />
            <span
                className={classNames(e`inner`, is({ checked, disabled }))}
                onClick={event => {
                    event.stopPropagation();
                    event.preventDefault();
                    handleChange?.(event as unknown as React.ChangeEvent<HTMLInputElement>);
                }}
            >
                {children}
            </span>
        </div>
    );
});

RadioButton.displayName = 'ElRadio.Button';
export default RadioButton;
