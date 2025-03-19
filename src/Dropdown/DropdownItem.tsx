import classNames from 'classnames';
import React, { FC, useContext } from 'react';
import { TooltipContext } from '../Tooltip';
import { useClassNames } from '../hooks';
import { DropdownContext } from './DropdownContext';
import { DropdownItemProps } from './typings';

const DropdownItem: FC<DropdownItemProps> = props => {
    const { classPrefix = 'dropdown-menu', disabled, command, divided, active } = props;
    const { e, em, is } = useClassNames(classPrefix);
    const { hideOnClick, onClick } = useContext(DropdownContext);
    const { onMouseLeave } = useContext(TooltipContext);

    return (
        <>
            {divided && <li className={em('item', 'divided')} />}
            <li
                className={classNames(e`item`, is({ active, disabled }), props.className)}
                style={props.style}
                onClick={event => {
                    event.stopPropagation();
                    if (!disabled) {
                        onClick?.(command);
                        hideOnClick && onMouseLeave(event);
                    }
                }}
            >
                {props.children}
            </li>
        </>
    );
};

DropdownItem.displayName = 'DropdownItem';

export default DropdownItem;
