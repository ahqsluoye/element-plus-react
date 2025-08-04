import classNames from 'classnames';
import React, { useCallback, useLayoutEffect, useMemo } from 'react';
import { useClassNames } from '../hooks';
import { useMenuContext } from './MenuContext';
import { MenuItemProps } from './typings';

const MenuItem = (props: MenuItemProps) => {
    const { classPrefix = 'menu-item', index, disabled, onClick } = props;
    const { b, is } = useClassNames(classPrefix);

    const { handleSubMenuClick, activeIndex, setActiveIndex, parentIndex, addItems, onOpen, onSelect } = useMenuContext();

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
        },
        [activeIndex, disabled, handleSubMenuClick, index, indexPath, onClick, onOpen, onSelect, setActiveIndex],
    );

    useLayoutEffect(() => {
        addItems({ index, indexPath });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <li className={classNames(b(), is({ disabled, active: activeIndex.includes(index) }), props.className)} style={props.style} role="menuitem" onClick={handleMenuItemClick}>
            {props.children}
        </li>
    );
};

export default MenuItem;
