import classNames from 'classnames';
import noop from 'lodash/noop';
import React, { useContext } from 'react';
import Scrollbar from '../Scrollbar/Scrollbar';
import { TooltipContext } from '../Tooltip/TooltipContext';
import { useClassNames } from '../hooks';
import { DropdownMenuProps } from './typings';

const DropdownMenu = (props: DropdownMenuProps) => {
    const { classPrefix = 'dropdown', maxHeight } = props;
    const { b, e } = useClassNames(classPrefix);
    const { onMouseEnter, onMouseLeave, trigger } = useContext(TooltipContext);

    return (
        <Scrollbar viewClass={e`list`} height={maxHeight}>
            <ul
                onMouseEnter={trigger === 'hover' ? onMouseEnter : noop}
                onMouseLeave={trigger === 'hover' ? onMouseLeave : noop}
                className={classNames(b`menu`, props.className)}
                style={props.style}
            >
                {props.children}
            </ul>
        </Scrollbar>
    );
};

DropdownMenu.displayName = 'ElDropdownMenu';

export default DropdownMenu;
