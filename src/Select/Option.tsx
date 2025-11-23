import classNames from 'classnames';
import React, { forwardRef, useCallback, useContext, useMemo } from 'react';
import { useClassNames } from '../hooks';
import { SelectContext } from './SelectContext';
import { SelectOptionProps } from './typings';

const Option = forwardRef<HTMLLIElement, SelectOptionProps>((props, ref) => {
    const { e, is } = useClassNames('select-dropdown');
    const { value: selectedValue, onChoose, hover: hoverValue, setHover, multiple } = useContext(SelectContext);
    const { value, label, data, disabled, onClick } = props;

    /** 选中回调 */
    const handleOnClick = useCallback(
        event => {
            event.stopPropagation();
            if (!disabled) {
                onChoose(value, { value, label, data }, event);
                onClick?.(value, { value, label, data });
            }
        },
        [disabled, onChoose, value, label, data, onClick],
    );

    /** 是否已选中 */
    const selected = useMemo(() => {
        if (multiple && selectedValue instanceof Array) {
            return selectedValue.includes(value);
        }
        return value === selectedValue;
    }, [multiple, value, selectedValue]);

    // useEffect(() => {
    //     onOptionCreate?.(value, { value, label, data });
    //     return () => {
    //         onOptionDestroy?.(value);
    //     };
    // }, []);

    return (
        <li
            className={classNames(e`item`, is({ disabled, selected, hovering: value === hoverValue }), props.className)}
            style={props.style}
            title={label + ''}
            onClick={handleOnClick}
            onMouseEnter={() => setHover(value)}
            onMouseLeave={() => setHover(selectedValue)}
            ref={ref}
        >
            {props.children || <span>{label}</span>}
        </li>
    );
});

Option.displayName = 'ElOption';

export default Option;
