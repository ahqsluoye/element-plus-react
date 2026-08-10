import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import ElScrollbar from '@qsxy/element-plus-react/Scrollbar/Scrollbar';
import { TooltipContext } from '@qsxy/element-plus-react/Tooltip/TooltipContext';
import { addUnit } from '@qsxy/element-plus-react/Util/base';
import classNames from 'classnames';
import noop from 'lodash/noop';
import React, { use } from 'react';
import { DropdownContext } from './DropdownContext';
import { DropdownMenuProps } from './typings';

const DropdownMenu = (props: DropdownMenuProps) => {
    const { classPrefix = 'dropdown' } = props;
    const { b, e } = useClassNames(classPrefix);
    const { onMouseEnter, onMouseLeave, trigger } = use(TooltipContext);
    const { maxHeight, size } = use(DropdownContext);

    return (
        <ElScrollbar viewClass={e`list`} height={addUnit(maxHeight)}>
            <ul
                onMouseEnter={trigger === 'hover' ? onMouseEnter : noop}
                onMouseLeave={trigger === 'hover' ? onMouseLeave : noop}
                className={classNames(b`menu`, size ? b(`menu--${size}`) : '', props.className)}
                style={props.style}
            >
                {props.children}
            </ul>
        </ElScrollbar>
    );
};

DropdownMenu.displayName = 'ElDropdownMenu';

export default DropdownMenu;
