import classNames from 'classnames';
import React, { forwardRef, memo, useCallback, useContext, useImperativeHandle, useMemo, useRef } from 'react';
import { CheckboxGroupContext } from '../CheckboxGroup';
import Tooltip from '../Tooltip/Tooltip';
import { partitionHTMLProps, useClassNames, useControlled, useDisabled, useSize } from '../hooks';
import { CheckboxProps, CheckboxRef } from './typings';

const Checkbox = memo(
    forwardRef<CheckboxRef, CheckboxProps>((props, ref) => {
        const {
            name: nameContext,
            disabled: disabledContext,
            readOnly: readOnlyContext,
            value: groupValue,
            size: groupSize,
            onChange: onGroupChange,
        } = useContext(CheckboxGroupContext);

        const {
            checked: controlledChecked,
            className,
            children,
            defaultChecked = false,
            title,
            indeterminate,
            readOnly = readOnlyContext,
            name = nameContext,
            value,
            onClick,
            onCheckboxClick,
            onChange,
            prevent = false,
            ...rest
        } = props;
        const disabled = useDisabled(disabledContext || props.disabled);
        const size = useSize(groupSize ?? props.size);

        const isChecked = useCallback(() => {
            if (typeof groupValue !== 'undefined') {
                return groupValue instanceof Array ? groupValue.some(i => i === value) : groupValue;
            }
            return controlledChecked;
        }, [controlledChecked, groupValue, value]);

        const [checked, setChecked] = useControlled<boolean>(isChecked(), defaultChecked);
        const { b, m, e, is } = useClassNames('checkbox');
        const [htmlInputProps] = partitionHTMLProps(rest);
        const [tooltipEvents] = partitionHTMLProps(props, { htmlProps: ['onMouseEnter', 'onMouseLeave', 'onClick', 'onContextMenu'] });

        const inputRef = useRef<HTMLInputElement>(null);
        const containerRef = useRef(null);

        const handleChange = useCallback(
            event => {
                const nextChecked = !checked;

                if (disabled || readOnly) {
                    return;
                }

                setChecked(nextChecked);
                onChange?.(nextChecked, value, event);
                onGroupChange?.(value, nextChecked, event);
            },
            [checked, disabled, readOnly, setChecked, onChange, value, onGroupChange],
        );

        useImperativeHandle(ref, () => ({
            ref: containerRef,
            get input() {
                return inputRef.current;
            },
            isChcked: () => checked,
            setChecked,
        }));

        const main = useMemo(
            () => (
                <label className={classNames(b(), is({ checked, disabled }), m({ [size]: size }), className)} ref={containerRef} {...tooltipEvents} onClick={onClick}>
                    <input
                        key={name}
                        {...htmlInputProps}
                        name={name}
                        value={value}
                        type="checkbox"
                        ref={inputRef}
                        className={classNames(e`hidden`, is({ indeterminate }))}
                        checked={checked}
                        data-checked={checked}
                        readOnly={readOnly}
                        disabled={disabled}
                        onClick={event => {
                            event.stopPropagation();
                            prevent && event.preventDefault();
                            onCheckboxClick?.(event);
                        }}
                        onChange={handleChange}
                    />
                    <span className={classNames(e`inner`, is({ checked, disabled }))} />
                    <span className={e`label`}>{children}</span>
                </label>
            ),
            [
                b,
                checked,
                children,
                className,
                disabled,
                e,
                handleChange,
                htmlInputProps,
                indeterminate,
                is,
                m,
                name,
                onCheckboxClick,
                onClick,
                prevent,
                readOnly,
                size,
                tooltipEvents,
                value,
            ],
        );

        return title ? <Tooltip content={title}>{main}</Tooltip> : main;
    }),
);

Checkbox.displayName = 'ElCheckbox';

export default Checkbox;
