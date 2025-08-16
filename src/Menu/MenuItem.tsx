import { useMount } from 'ahooks';
import classNames from 'classnames';
import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClassNames } from '../hooks';
import { useMenuContext } from './MenuContext';
import { MenuItemProps } from './typings';

const MenuItem = (props: MenuItemProps) => {
    const { classPrefix = 'menu-item', index, route, disabled, onClick } = props;
    const { b, is } = useClassNames(classPrefix);

    const { handleSubMenuClick, activeIndex, setActiveIndex, parentIndex, addMenuItem, onOpen, onSelect, router } = useMenuContext();

    const navigate = useNavigate();

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
            onOpen?.(index, indexPath, { index, indexPath });
            onSelect?.(index, indexPath, { index, indexPath });
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
        <li className={classNames(b(), is({ disabled, active: activeIndex.includes(index) }), props.className)} style={props.style} role="menuitem" onClick={handleMenuItemClick}>
            {props.children}
        </li>
    );
};

MenuItem.displayName = 'ElMenuItem';

export default MenuItem;
