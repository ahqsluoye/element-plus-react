import { useMount } from 'ahooks';
import classNames from 'classnames';
import React, { useCallback, useContext, useMemo, useRef } from 'react';
import { SelectContext } from '../Select/SelectContext';
import { useClassNames } from '../hooks';

const TreeSelectOption = props => {
    const { e, is } = useClassNames('select-dropdown');
    const { value: selectedValue, hover: hoverValue, setHover, multiple, cachedOptions } = useContext(SelectContext);
    const { value, label, disabled } = props;

    const elRef = useRef(null);

    useMount(() => {
        cachedOptions.current.set(value, { value, label, disabled });
    });

    /** 选中回调 */
    const handleOnClick = useCallback(event => {
        event.stopPropagation();
        elRef.current.parentElement.click();
    }, []);

    /** 是否已选中 */
    const selected = useMemo(() => {
        if (multiple && selectedValue instanceof Array) {
            return selectedValue.includes(value);
        }
        return value === selectedValue;
    }, [multiple, value, selectedValue]);

    return (
        <li
            className={classNames(e`item`, is({ disabled, selected, hovering: value === hoverValue }), props.className)}
            style={props.style}
            title={label + ''}
            onClick={handleOnClick}
            onMouseEnter={() => setHover(value)}
            onMouseLeave={() => setHover(selectedValue)}
            ref={elRef}
        >
            {props.children || <span>{label}</span>}
        </li>
    );
};

TreeSelectOption.displayName = 'ElOption';
export default TreeSelectOption;
