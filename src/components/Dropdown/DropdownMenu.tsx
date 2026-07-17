import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import ElScrollbar from '@qsxy/element-plus-react/Scrollbar/Scrollbar';
import { TooltipContext } from '@qsxy/element-plus-react/Tooltip/TooltipContext';
import classNames from 'classnames';
import noop from 'lodash/noop';
import React, { useContext } from 'react';
import { DropdownMenuProps } from './typings';

const DropdownMenu = (props: DropdownMenuProps) => {
    const { classPrefix = 'dropdown', maxHeight } = props;
    const { b, e } = useClassNames(classPrefix);
    const { onMouseEnter, onMouseLeave, trigger } = useContext(TooltipContext);

    return (
        <ElScrollbar viewClass={e`list`} height={maxHeight}>
            <ul
                onMouseEnter={trigger === 'hover' ? onMouseEnter : noop}
                onMouseLeave={trigger === 'hover' ? onMouseLeave : noop}
                className={classNames(b`menu`, props.className)}
                style={props.style}
            >
                {props.children}
            </ul>
        </ElScrollbar>
    );
};

DropdownMenu.displayName = 'ElDropdownMenu';

export default DropdownMenu;
