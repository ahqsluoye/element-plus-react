import classNames from 'classnames';
import noop from 'lodash/noop';
import React, { FC, useContext } from 'react';
import { Scrollbar } from '../Scrollbar';
import { TooltipContext } from '../Tooltip';
import { useClassNames } from '../hooks';
import { DropdownMenuProps } from './typings';

const DropdownMenu: FC<DropdownMenuProps> = props => {
    const { classPrefix = 'dropdown' } = props;
    const { b, e } = useClassNames(classPrefix);
    const { onMouseEnter, onMouseLeave, trigger } = useContext(TooltipContext);

    return (
        <Scrollbar viewClass={e`list`}>
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

DropdownMenu.displayName = 'DropdownMenu';

export default DropdownMenu;
