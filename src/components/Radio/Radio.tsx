import { partitionHTMLProps } from '@qsxy/element-plus-react/hooks/htmlPropsUtils';
import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import { useDisabled, useSize } from '@qsxy/element-plus-react/hooks/useCommonProps';
import useControlled from '@qsxy/element-plus-react/hooks/useControlled';
import { RadioContext } from '@qsxy/element-plus-react/RadioGroup/RadioGroup';
import Tooltip from '@qsxy/element-plus-react/Tooltip/Tooltip';
import classNames from 'classnames';
import React, { forwardRef, memo, useCallback, useContext, useImperativeHandle, useMemo, useRef } from 'react';
import { RadioProps, RadioRef } from './typings';

const Radio = memo(
    forwardRef<RadioRef, RadioProps>((props, ref) => {
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
            ...rest
        } = props;

        const [checked, setChecked] = useControlled<boolean>(typeof groupValue !== 'undefined' ? groupValue === value : checkedProp, defaultChecked || false);
        const disabled = useDisabled(disabledContext ?? props.disabled);
        const size = useSize(sizeContext ?? props.size);

        const { b, wb, e, m, is } = useClassNames(classPrefix);
        const classes = classNames(className, wb({ disabled, checked }));
        const [htmlInputProps] = partitionHTMLProps(rest);
        const [tooltipEvents] = partitionHTMLProps(props, { htmlProps: ['onMouseEnter', 'onMouseLeave', 'onClick', 'onContextMenu'] });

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
                <label className={classNames(b(), is({ checked, disabled }), m({ [size]: size }), className)} {...tooltipEvents} ref={containerRef}>
                    <span className={classNames(e`input`, is({ checked, disabled }))}>
                        <input
                            key={name}
                            {...htmlInputProps}
                            name={name}
                            // value={value}
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
            [b, checked, children, className, disabled, e, handleChange, htmlInputProps, is, m, name, readOnly, size, tooltipEvents],
        );

        if (plaintext) {
            return checked ? (
                <div {...tooltipEvents} ref={containerRef} className={classes}>
                    {children}
                </div>
            ) : null;
        }

        return title ? <Tooltip content={title}>{main}</Tooltip> : main;
    }),
);

Radio.displayName = 'ElRadio';

export default Radio;
