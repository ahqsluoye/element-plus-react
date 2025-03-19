import classNames from 'classnames';
import React, { createContext, forwardRef, useCallback, useMemo } from 'react';
import { ValueType } from '../Radio';
import { isNotEmpty, randomCode } from '../Util';
import { useClassNames, useControlled, useDisabled, useSize } from '../hooks';
import { RadioContextProps, RadioGroupProps } from './typings';

export const RadioContext = createContext<RadioContextProps>({});

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>((props, ref) => {
    const { className, children, classPrefix = 'radio-group', value: valueProp, defaultValue, appearance = 'default', name, readOnly, onChange, ...rest } = props;
    const { wb, m } = useClassNames(classPrefix);
    const [value, setValue, isControlled] = useControlled(valueProp, defaultValue);
    const disabled = useDisabled(props.disabled);
    const size = useSize(props.size);

    const handleChange = useCallback(
        (nextValue: ValueType, event: React.ChangeEvent<HTMLInputElement>) => {
            setValue(nextValue);
            onChange?.(nextValue, event);
        },
        [onChange, setValue],
    );

    const contextValue = useMemo(
        () => ({
            name: isNotEmpty(name) ? name : randomCode(11),
            value: typeof value === 'undefined' ? null : value,
            controlled: isControlled,
            disabled,
            readOnly,
            size,
            onChange: handleChange,
        }),
        [disabled, handleChange, isControlled, name, readOnly, size, value],
    );

    return (
        <RadioContext.Provider value={contextValue}>
            <div
                /* {...omit(rest, ['disabled', 'size', 'error', 'warning'])} */ ref={ref}
                className={classNames(className, wb(appearance), m({ [size]: size }))}
                style={props.style}
            >
                {children}
            </div>
        </RadioContext.Provider>
    );
});

RadioGroup.displayName = 'ElRadio.Group';

export default RadioGroup;
