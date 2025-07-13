import classNames from 'classnames';
import isBoolean from 'lodash/isBoolean';
import React, { forwardRef, isValidElement, useCallback, useMemo, useRef } from 'react';
import Icon from '../Icon/Icon';
import { mergeDefaultProps, warning } from '../Util';
import { partitionHTMLProps, useClassNames, useControlled, useDisabled, useSize } from '../hooks';
import { SwitchProps } from './typings';

const Switch = forwardRef<HTMLDivElement, SwitchProps>((props, ref) => {
    props = mergeDefaultProps(
        {
            disabled: false,
            activeText: '',
            inactiveText: '',
            activeColor: '',
            inactiveColor: '',
            activeValue: true,
            inactiveValue: false,
            loading: false,
        },
        props,
    );
    const {
        defaultValue,
        name,
        width,
        activeText,
        inactiveText,
        activeColor,
        inactiveColor,
        activeValue,
        inactiveValue,
        activeIcon,
        inactiveIcon,
        activeAction,
        inactiveAction,
        loading,
        className,
        style,
        inlinePrompt,
        classPrefix = 'switch',
        onClick,
        onMouseEnter,
        onMouseLeave,
        onContextMenu,
        beforeChange,
        onChange,
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);
    const { b, e, m, em, is } = useClassNames(classPrefix);
    const [tooltipEvents] = partitionHTMLProps(props, { htmlProps: ['onMouseEnter', 'onMouseLeave', 'onClick', 'onContextMenu'] });

    const [value, setValue] = useControlled(props.value, defaultValue);
    const disabled = useDisabled(props.disabled || loading);
    const size = useSize(props.size);
    const active = useMemo(() => {
        return value === activeValue;
    }, [value, activeValue]);

    // const disabled = useMemo(() => {
    //     return props.disabled || loading;
    // }, [props.disabled, loading]);

    const currentColor = useMemo(() => {
        return active ? activeColor : inactiveColor;
    }, [active, activeColor, inactiveColor]);

    const borderColor = useMemo(() => {
        return active ? props.borderColor || currentColor : currentColor;
    }, [active, props.borderColor, currentColor]);

    const handleChange = useCallback(
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
            const val = active ? inactiveValue : activeValue;
            setValue(val);
            onChange?.(val, !active, event);
        },
        [active, activeValue, inactiveValue, onChange, setValue],
    );

    const switchValue = useCallback(
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
            event.preventDefault();
            if (disabled) {
                return;
            }

            if (!beforeChange) {
                handleChange(event);
                onClick?.();
                return;
            }

            const shouldChange = beforeChange();
            const isExpectType = [shouldChange instanceof Promise, isBoolean(shouldChange)].some(i => i);
            if (!isExpectType) {
                return;
            }

            if (shouldChange instanceof Promise) {
                shouldChange
                    .then(result => {
                        if (result) {
                            handleChange(event);
                            onClick?.();
                        }
                    })
                    .catch(event1 => {
                        warning(false, event1);
                    });
            } else if (shouldChange) {
                handleChange(event);
                onClick?.();
            }
        },
        [beforeChange, disabled, handleChange, onClick],
    );

    const falseLabel = useMemo(() => {
        if (inactiveIcon || inactiveText) {
            return (
                <span className={classNames(e`label`, em('label', 'left'), is({ active: !active }))}>
                    {isValidElement(inactiveIcon) && inactiveIcon}
                    {typeof inactiveIcon === 'string' && <Icon name={inactiveIcon} />}
                    {!inactiveIcon && inactiveText ? <span>{inactiveText}</span> : null}
                </span>
            );
        }
    }, [active, e, em, inactiveIcon, inactiveText, is]);

    const trueLabel = useMemo(() => {
        if (activeIcon || activeText) {
            return (
                <span className={classNames(e`label`, em('label', 'right'), is({ active }))}>
                    {isValidElement(activeIcon) && activeIcon}
                    {typeof activeIcon === 'string' && <Icon name={activeIcon} />}
                    {!activeIcon && activeText ? <span>{activeText}</span> : null}
                </span>
            );
        }
        return null;
    }, [active, activeIcon, activeText, e, em, is]);

    const actions = useMemo(() => {
        if (active && activeAction) {
            return typeof activeIcon === 'string' ? <Icon name={activeIcon} /> : activeAction;
        } else if (!active && inactiveAction) {
            return typeof inactiveAction === 'string' ? <Icon name={inactiveAction} /> : inactiveAction;
        }
    }, [active, activeAction, activeIcon, inactiveAction]);

    return (
        <div
            className={classNames(b(), m({ [size]: size }), is({ disabled, checked: active }), className)}
            style={style}
            onClick={switchValue}
            ref={ref}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onContextMenu={onContextMenu}
            {...tooltipEvents}
        >
            <input
                ref={inputRef}
                className={e`input`}
                type="checkbox"
                name={name}
                // checked={active}
                disabled={disabled}
                // onChange={onChange}
                onKeyDown={event => {
                    (event.keyCode || event.which || event.charCode) === 13 ? switchValue : null;
                }}
            />
            {!inlinePrompt && falseLabel}
            <span className={e`core`} style={{ background: currentColor, borderColor, width }}>
                {inlinePrompt && (
                    <div className={e`inner`}>
                        {!active
                            ? (() => {
                                  if (activeText) {
                                      return <span className="is-text">{activeText}</span>;
                                  } else if (activeIcon) {
                                      if (typeof activeIcon === 'string') {
                                          <Icon className="is-icon" name={activeIcon} />;
                                      } else {
                                          return activeIcon;
                                      }
                                  }
                              })()
                            : null}
                        {active
                            ? (() => {
                                  if (inactiveText) {
                                      return <span className="is-text">{inactiveText}</span>;
                                  } else if (inactiveIcon) {
                                      if (typeof inactiveIcon === 'string') {
                                          <Icon className="is-icon" name={inactiveIcon} />;
                                      } else {
                                          return inactiveIcon;
                                      }
                                  }
                              })()
                            : null}
                    </div>
                )}

                <div className={e`action`} style={{ color: currentColor }}>
                    {loading ? <Icon name="spinner" spin /> : actions}
                </div>
            </span>
            {!inlinePrompt && trueLabel}
        </div>
    );
});

export default Switch;
