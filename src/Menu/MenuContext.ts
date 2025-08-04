import React, { createContext, useContext } from 'react';
import { MenuItemRegistered, MenuProps, SubMenuProvider } from './typings';

interface MenuContextProps extends Pick<MenuProps, 'menuTrigger' | 'onSelect' | 'onOpen' | 'onClose' | 'showTimeout' | 'hideTimeout'> {
    activeIndex?: string[];
    setActiveIndex?: (value: string[]) => void;
    handleSubMenuClick?: () => void;
    parentIndex?: string[];
    addItems?: (menu: MenuItemRegistered) => void;
    addSubMenu?: (sub: SubMenuProvider) => void;
    /** 菜单展示模式 */
    mode?: 'horizontal' | 'vertical';
    themeStyle?: React.CSSProperties &
        Partial<
            Record<
                | '--el-menu-active-color'
                | '--el-menu-text-color'
                | '--el-menu-hover-text-color'
                | '--el-menu-bg-color'
                | '--el-menu-hover-bg-color'
                | '--el-menu-item-height'
                | '--el-menu-sub-item-height'
                | '--el-menu-horizontal-height'
                | '--el-menu-horizontal-sub-item-height'
                | '--el-menu-item-font-size'
                | '--el-menu-item-hover-fill'
                | '--el-menu-border-color'
                | '--el-menu-base-level-padding'
                | '--el-menu-level-padding'
                | '--el-menu-icon-width',
                string
            >
        >;
}

export const MenuContext = createContext<MenuContextProps>({
    activeIndex: [],
    parentIndex: [],
    mode: null,
    handleSubMenuClick: null,
    setActiveIndex: null,
    onSelect: null,
    onOpen: null,
    onClose: null,
    addSubMenu: null,
    showTimeout: 300,
    hideTimeout: 300,
    themeStyle: {},
});

export const useMenuContext = () => useContext(MenuContext);
