import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import { useDisabled, useSize } from '@qsxy/element-plus-react/hooks/useCommonProps';
import useControlled from '@qsxy/element-plus-react/hooks/useControlled';
import ElRadio from '@qsxy/element-plus-react/Radio/Radio';
import { ValueType } from '@qsxy/element-plus-react/Radio/typings';
import { isNotEmpty, mergeDefaultProps, randomCode } from '@qsxy/element-plus-react/Util/base';
import classNames from 'classnames';
import React, { Children, createContext, forwardRef, useCallback, useMemo } from 'react';
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
    const aliasProps = mergeDefaultProps({ value: 'value', label: 'label', disabled: 'disabled' }, props.props);

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
                <ElRadio key={item[aliasProps.value]} value={item[aliasProps.value]} disabled={item[aliasProps.disabled]}>
                    {item[aliasProps.label]}
                </ElRadio>
            ));
            return radios;
        }
        return children;
    }, [children, options, aliasProps.disabled, aliasProps.label, aliasProps.value]);

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
