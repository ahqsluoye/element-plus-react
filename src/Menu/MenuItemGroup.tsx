import classNames from 'classnames';
import React from 'react';
import { useClassNames } from '../hooks';
import { MenuItemGroupProps } from './typings';

const MenuItemGroup = (props: MenuItemGroupProps) => {
    const { classPrefix = 'menu-item-group', title } = props;
    const { b, e } = useClassNames(classPrefix);

    // const { handleSubMenuClick, activeIndex, setActiveIndex, parentIndex, onSelect } = useMenuContext();

    // const indexPath = useMemo(() => [...parentIndex, index], [index, parentIndex]);

    // const handleMenuItemClick = useCallback(() => {
    //     if (disabled) {
    //         return;
    //     }
    //     setActiveIndex(indexPath);
    //     handleSubMenuClick?.();
    //     onClick?.({
    //         index,
    //         indexPath,
    //         active: activeIndex.includes(index),
    //     });
    //     onSelect?.(index, indexPath, { index, indexPath });
    // }, [activeIndex, disabled, handleSubMenuClick, index, indexPath, onClick, onSelect, setActiveIndex]);

    // useLayoutEffect(() => {
    //     // console.log(indexPath);
    // }, []);

    return (
        <li className={classNames(b(), props.className)} style={props.style} role="menuitem">
            <div className={e`title`}>{title}</div>
            <ul>{props.children}</ul>
        </li>
    );
};

export default MenuItemGroup;
