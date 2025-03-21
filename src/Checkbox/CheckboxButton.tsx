import classNames from 'classnames';
import React, { FC, forwardRef, memo, useCallback, useContext, useImperativeHandle, useMemo, useRef } from 'react';
import { CheckboxGroupContext } from '../CheckboxGroup';
import Tooltip from '../Tooltip/Tooltip';
import { partitionHTMLProps, useClassNames, useControlled, useDisabled, useSize } from '../hooks';
import { CheckboxProps, CheckboxRef } from './typings';

const CheckboxButton = forwardRef<CheckboxRef, CheckboxProps>((props, ref) => {
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
        onMouseEnter,
        onMouseLeave,
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
    const { b, m, e, is } = useClassNames('checkbox-button');
    const [htmlInputProps, restProps] = partitionHTMLProps(rest);

    const inputRef = useRef<HTMLInputElement>();

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
        get input() {
            return inputRef.current;
        },
        isChcked: () => checked,
        setChecked,
    }));

    const main = useMemo(
        () => (
            <label
                className={classNames(b(), is({ checked, disabled }), m({ [size]: size }), className)}
                ref={ref}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                {...restProps}
            >
                <input
                    key={name}
                    {...htmlInputProps}
                    name={name}
                    value={value}
                    type="checkbox"
                    ref={inputRef}
                    className={classNames(e`original`, is({ indeterminate }))}
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
                <span className={classNames(e`inner`, is({ checked, disabled }))}>{children}</span>
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
            onMouseEnter,
            onMouseLeave,
            prevent,
            readOnly,
            ref,
            restProps,
            size,
            value,
        ],
    );

    return title ? <Tooltip content={title}>{main}</Tooltip> : main;
});

const Comp: FC<CheckboxProps> = memo(CheckboxButton);

Comp.displayName = 'ElCheckboxButton';

export default Comp;
