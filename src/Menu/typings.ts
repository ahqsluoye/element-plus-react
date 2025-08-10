import React from 'react';
import { IconName } from '../Icon';
import { BaseProps, NativeProps } from '../types/common';

export interface MenuRef {
    open: MenuOpenEvent;
    close: MenuCloseEvent;
}

export interface MenuProps
    extends BaseProps,
        NativeProps<
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
            | '--el-menu-icon-width'
        > {
    /** 菜单展示模式 */
    mode?: 'horizontal' | 'vertical';
    /** 页面加载时默认激活菜单的 index */
    defaultActive?: string;
    /** 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用） */
    collapse?: boolean;
    /** 是否省略多余的子项（仅在横向模式生效） */
    ellipsis?: boolean;
    /** 自定义省略图标 (仅在水平模式下可用)	 */
    ellipsisIcon?: string | React.ReactElement;
    /** 弹出层的偏移量(对所有子菜单有效) */
    popperOffset?: number;
    /** 默认打开的 subMenu 的 index 的数组 */
    defaultOpeneds?: string[];
    /** 是否只保持一个子菜单的展开 */
    uniqueOpened?: boolean;
    /** 子菜单打开的触发方式，只在 mode 为 horizontal 时有效 */
    menuTrigger?: 'hover' | 'click';
    /** 是否启用 vue-router 模式。 启用该模式会在激活导航时以 index 作为 path 进行路由跳转 使用 defaultActive 来设置加载时的激活项。 */
    router?: boolean;
    /** 是否开启折叠动画 */
    collapseTransition?: boolean;
    /** 是Tooltip 主题，内置了 dark / light 两种主题，当菜单折叠时生效。 */
    popperEffect?: 'dark' | 'light' | string;
    /** 可选，单击外部时是否折叠菜单 */
    closeOnClickOutside?: boolean;
    /** 为 popper 添加类名 */
    popperClass?: string;
    /** 菜单出现前的延迟 */
    showTimeout?: number;
    /** 菜单消失前的延迟 */
    hideTimeout?: number;
    /** 菜单激活回调 */
    onSelect?: MenuSelectEvent;
    /** sub-menu 展开的回调 */
    onOpen?: MenuSelectEvent;
    /** sub-menu 收起的回调 */
    onClose?: MenuSelectEvent;
}

export interface SubMenuProps extends BaseProps, NativeProps {
    /** 唯一标志 */
    index: string;
    title: string | React.ReactElement;
    /** 为 popper 添加类名 */
    popperClass?: string;
    /** 子菜单出现之前的延迟，(继承 menu 的 `showTimeout` 配置) */
    showTimeout?: number;
    /** 子菜单消失之前的延迟，(继承 menu 的 `hideTimeout` 配置) */
    hideTimeout?: number;
    /** 是否禁用 */
    disabled?: boolean;
    /** 是否将弹出菜单挂载到 body 上，第一级 SubMenu 默认值为 true，其他 SubMenus 的值为 false */
    appendToBody?: boolean;
    /** 弹出窗口的偏移量 (覆盖 `popper`的菜单) */
    popperOffset?: number;
    /** 父菜单展开且子菜单关闭时的图标， `expandCloseIcon` 和 `expandOpenIcon` 需要一起配置才能生效 */
    expandCloseIcon?: IconName | React.ReactElement;
    /** 父菜单展开且子菜单打开时的图标， `expandOpenIcon` 和 `expandCloseIcon` 需要一起配置才能生效 */
    expandOpenIcon?: IconName | React.ReactElement;
    /** 父菜单收起且子菜单关闭时的图标， `collapseCloseIcon` 和 `collapseOpenIcon` 需要一起配置才能生效 */
    collapseCloseIcon?: IconName | React.ReactElement;
    /** 父菜单收起且子菜单打开时的图标， `collapseOpenIcon` 和 `collapseCloseIcon` 需要一起配置才能生效 */
    collapseOpenIcon?: IconName | React.ReactElement;
}

export interface MenuItemProps extends BaseProps, NativeProps {
    /** 唯一标志 */
    index: string;
    /** 是否禁用 */
    disabled?: boolean;
    /** react-router-dom 路由位置参数 */
    route?: string;
    /** 点击菜单项时回调函数, 参数为菜单项实例 */
    onClick?: (item: MenuItemRegistered) => void;
}

export interface MenuItemGroupProps extends BaseProps, NativeProps {
    /** 组标题 */
    title: string;
}

/**
 * @param index index of activated menu
 * @param indexPath index path of activated menu
 * @param item the selected menu item
 * @param routerResult result returned by `vue-router` if `router` is enabled
 */
export type MenuSelectEvent = (index: string, indexPath: string[], item: MenuItemClicked) => void;

/**
 * @param index index of expanded sub-menu
 * @param indexPath index path of expanded sub-menu
 */
export type MenuOpenEvent = (index: string, indexPath: string[]) => void;

/**
 * @param index index of collapsed sub-menu
 * @param indexPath index path of collapsed sub-menu
 */
export type MenuCloseEvent = (index: string, indexPath: string[]) => void;

export interface MenuItemRegistered {
    index: string;
    indexPath: string[];
    active?: boolean;
}

export interface MenuItemClicked {
    index: string;
    indexPath: string[];
    route?: string;
}

export interface SubMenuProvider {
    index: string;
    indexPath: string[];
    /** 打开菜单 */
    openMenu: MenuOpenEvent;
    /** 关闭菜单 */
    closeMenu: MenuCloseEvent;
}
