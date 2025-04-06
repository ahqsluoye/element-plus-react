import classNames from 'classnames';
import React, { forwardRef, memo, RefObject, useCallback, useContext, useImperativeHandle, useMemo, useRef } from 'react';
import { partitionHTMLProps, useClassNames, useControlled, useDisabled, useSize } from '../hooks';
import { RadioContext } from '../RadioGroup/RadioGroup';
import Tooltip from '../Tooltip/Tooltip';
import RadioButton from './RadioButton';
import { RadioProps, RadioRef } from './typings';

const InternalRadio = (props: RadioProps, ref: RefObject<RadioRef>) => {
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
        title,
        className,
        children,
        checked: checkedProp,
        defaultChecked,
        classPrefix = 'radio',
        readOnly = readOnlyContext,
        plaintext = plaintextContext,
        name = nameContext,
        value,
        onChange,
        onClick,
        ...rest
    } = props;

    const [checked, setChecked] = useControlled<boolean>(typeof groupValue !== 'undefined' ? groupValue === value : checkedProp, defaultChecked || false);
    const disabled = useDisabled(disabledContext ?? props.disabled);
    const size = useSize(sizeContext ?? props.size);

    const { b, wb, e, m, is } = useClassNames(classPrefix);
    const classes = classNames(className, wb({ disabled, checked }));
    const [htmlInputProps, restProps] = partitionHTMLProps(rest);

    const containerRef = useRef<HTMLDivElement>(null);
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
        get input() {
            return inputRef.current;
        },
        isChcked: () => checked,
        setChecked,
    }));

    // const input = (
    //     <span className={prefix('wrapper')}>
    //         <input
    //             {...htmlInputProps}
    //             {...inputProps}
    //             ref={inputRef}
    //             type="radio"
    //             name={name}
    //             value={value}
    //             disabled={disabled}
    //             onChange={handleChange}
    //             onClick={useCallback(event => event.stopPropagation(), [])}
    //         />
    //         <span className={prefix('inner')} aria-hidden />
    //     </span>
    // );

    const main = useMemo(
        () => (
            <label className={classNames(b(), is({ checked, disabled }), m({ [size]: size }), className)} onClick={onClick} ref={containerRef} {...restProps}>
                <span className={classNames(e`input`, is({ checked, disabled }))}>
                    <input
                        key={name}
                        {...htmlInputProps}
                        name={name}
                        value={value}
                        type="radio"
                        ref={inputRef}
                        className={e`hidden`}
                        checked={checked}
                        data-checked={checked}
                        readOnly={readOnly}
                        disabled={disabled}
                        onClick={event => event.stopPropagation()}
                        onChange={handleChange}
                    />
                    <span className={e`inner`} />
                </span>
                <span className={e`label`}>{children}</span>
            </label>
        ),
        [b, checked, children, className, disabled, e, handleChange, htmlInputProps, is, m, name, onClick, readOnly, restProps, size, value],
    );

    if (plaintext) {
        return checked ? (
            <div {...restProps} ref={containerRef} className={classes}>
                {children}
            </div>
        ) : null;
    }

    return title ? <Tooltip content={title}>{main}</Tooltip> : main;
};

const Comp = memo(forwardRef(InternalRadio)) as (props: RadioProps & { ref?: RefObject<RadioRef> }) => React.ReactElement;

type InternalType = typeof Comp;

interface CompInterface extends InternalType {
    displayName?: string;
    defaultProps?: RadioProps;
    Button: typeof RadioButton;
}

const Radio = Comp as CompInterface;

Radio.Button = RadioButton;
Radio.displayName = 'ElRadio';

export default Radio;
