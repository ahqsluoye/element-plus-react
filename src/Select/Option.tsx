import classNames from 'classnames';
import React, { forwardRef, useCallback, useContext, useMemo } from 'react';
import { useClassNames } from '../hooks';
import { SelectContext } from './SelectContext';
import { SelectOptionProps } from './typings';

const Option = forwardRef<HTMLLIElement, SelectOptionProps>((props, ref) => {
    const { e, is } = useClassNames('select-dropdown');
    const { value: selectedValue, onChoose, hover: hoverValue, setHover, multiple } = useContext(SelectContext);
    const { label, disabled, onClick } = props;

    /** 选中回调 */
    const handleOnClick = useCallback(
        event => {
            event.stopPropagation();
            if (!disabled) {
                onChoose(props.value, label || props.value + '', event);
                onClick?.(props.value, label || props.value.toString(), event);
            }
        },
        [disabled, onChoose, props.value, label, onClick],
    );

    /** 是否已选中 */
    const selected = useMemo(() => {
        if (multiple && selectedValue instanceof Array) {
            return selectedValue.includes(props.value);
        }
        return props.value === selectedValue;
    }, [multiple, props.value, selectedValue]);

    return (
        <li
            className={classNames(
                e`item`,
                is({ disabled }),
                {
                    selected,
                    hover: props.value === hoverValue,
                },
                props.className,
            )}
            style={props.style}
            title={label}
            key={props.value}
            onClick={handleOnClick}
            onMouseEnter={() => setHover(props.value)}
            onMouseLeave={() => setHover(selectedValue)}
            ref={ref}
        >
            {props.children || <span>{label}</span>}
        </li>
    );
});

Option.displayName = 'ElOption';

export default Option;
