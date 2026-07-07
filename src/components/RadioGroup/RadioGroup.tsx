import classNames from 'classnames';
import React, { Children, createContext, forwardRef, useCallback, useMemo } from 'react';
import { Radio, ValueType } from '../Radio';
import { isNotEmpty, mergeDefaultProps, randomCode } from '../Util';
import { useClassNames, useControlled, useDisabled, useSize } from '../hooks';
import { RadioContextProps, RadioGroupProps } from './typings';

export const RadioContext = createContext<RadioContextProps>({});

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>((props, ref) => {
    props = mergeDefaultProps(
        {
            appearance: 'default',
            props: {},
            options: [],
        },
        props,
    );
    const { className, children, classPrefix = 'radio-group', value: valueProp, defaultValue, appearance, name, readOnly, options, onChange, ...rest } = props;
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

    const optionChilds = useMemo(() => {
        if (Children.count(children) > 0) {
            return children;
        }
        if (options.length > 0) {
            const radios = options.map(item => (
                <Radio key={item[props.props.value]} value={item[props.props.value]} disabled={item[props.props.disabled]}>
                    {item[props.props.label]}
                </Radio>
            ));
            return radios;
        }
        return children;
    }, [children, options, props.props.disabled, props.props.label, props.props.value]);

    return (
        <RadioContext.Provider value={contextValue}>
            <div
                /* {...omit(rest, ['disabled', 'size', 'error', 'warning'])} */ ref={ref}
                className={classNames(className, wb(appearance), m({ [size]: size }))}
                style={props.style}
            >
                {optionChilds}
            </div>
        </RadioContext.Provider>
    );
});

RadioGroup.displayName = 'ElRadioGroup';

export default RadioGroup;
