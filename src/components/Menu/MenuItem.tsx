import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import ElTooltip from '@qsxy/element-plus-react/Tooltip/Tooltip';
import { useMount } from 'ahooks';
import classNames from 'classnames';
import React, { useCallback, useMemo } from 'react';
import { useMenuContext } from './MenuContext';
import { MenuItemProps } from './typings';

const MenuItem = (props: MenuItemProps) => {
    const { classPrefix = 'menu-item', index, children, title, route, disabled, onClick } = props;
    const { b, is } = useClassNames(classPrefix);

    const { handleSubMenuClick, activeIndex, setActiveIndex, parentIndex, addMenuItem, onOpen, onSelect, router, navigate, collapse } = useMenuContext();

    const indexPath = useMemo(() => [...parentIndex, index], [index, parentIndex]);

    const handleMenuItemClick = useCallback(
        (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
            evt.stopPropagation();
            if (disabled) {
                return;
            }
            setActiveIndex(indexPath);
            handleSubMenuClick?.();
            onClick?.({
                index,
                indexPath,
                active: activeIndex.includes(index),
            });
            onOpen?.(index, indexPath, { index, indexPath, route });
            onSelect?.(index, indexPath, { index, indexPath, route });
            if (router) {
                navigate?.(route ?? index);
            }
        },
        [activeIndex, disabled, handleSubMenuClick, index, indexPath, navigate, onClick, onOpen, onSelect, route, router, setActiveIndex],
    );

    useMount(() => {
        addMenuItem({ index, indexPath });
    });

    return (
        <ElTooltip disabled={!title || !collapse} content={title} placement="right">
            <li
                className={classNames(b(), is({ disabled, active: activeIndex.includes(index) }), props.className)}
                style={props.style}
                role="menuitem"
                onClick={handleMenuItemClick}
            >
                {children}
            </li>
        </ElTooltip>
    );
};

MenuItem.displayName = 'ElMenuItem';

export default MenuItem;
