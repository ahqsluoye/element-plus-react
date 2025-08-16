import classNames from 'classnames';
import { addClass, removeClass } from 'dom-lib';
import { pick } from 'lodash';
import React, { Children, forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { More } from '../Icon/IconList/More';
import { mergeDefaultProps } from '../Util';
import { useClassNames, useControlled } from '../hooks';
import useCssTransiton from '../hooks/useCssTransiton';
import { afterEnter, afterLeave, beforeEnter, beforeLeave, onEnter, onLeave } from './MenuCollapseTransition';
import { MenuContext } from './MenuContext';
import SubMenu from './SubMenu';
import { MenuItemClicked, MenuItemRegistered, MenuProps, MenuRef, SubMenuProvider } from './typings';
import useEllipsis from './useEllipsis';

const Menu = forwardRef<MenuRef, MenuProps>((props, ref) => {
    props = mergeDefaultProps(
        {
            mode: 'vertical',
            showTimeout: 150,
            hideTimeout: 300,
            uniqueOpened: false,
            collapseTransition: true,
            defaultOpeneds: [],
            ellipsis: false,
            router: false,
        },
        props,
    );
    const {
        classPrefix = 'menu',
        mode,
        collapse,
        defaultActive,
        showTimeout,
        hideTimeout,
        uniqueOpened,
        defaultOpeneds,
        collapseTransition,
        onSelect,
        onOpen,
        onClose,
        menuTrigger,
        popperOffset,
        router,
        ellipsisIcon,
    } = props;
    const { b, m } = useClassNames(classPrefix);

    const [active, setActive] = useControlled(undefined, [defaultActive]);
    const [_collapse, setCollapse] = useState(collapse);
    // const [, setItems] = useState<MenuItemRegistered[]>([]);

    const menuRef = useRef<HTMLUListElement>(null);
    const menuItemsRef = useRef<MenuItemRegistered[]>([]);
    const subMenuRef = useRef<SubMenuProvider[]>([]);
    const openedMenus = useRef<Record<string, SubMenuProvider>>({});

    useCssTransiton({
        nodeRef: menuRef,
        visible: collapse,
        disabled: mode === 'horizontal' || !collapseTransition,
        duration: 300,
        beforeLeave,
        onLeave,
        afterLeave,
        beforeEnter,
        onEnter,
        afterEnter,
        done: () => {
            setCollapse(collapse);
            if (collapse) {
                addClass(menuRef.current, m`collapse`);
            } else {
                removeClass(menuRef.current, m`collapse`);
                subMenuRef.current.forEach(sub => {
                    sub.closeMenu(sub.index, sub.indexPath);
                });
                for (const key in openedMenus.current) {
                    if (Object.prototype.hasOwnProperty.call(openedMenus.current, key)) {
                        const item = openedMenus.current[key];
                        item.openMenu(item.index, item.indexPath);
                    }
                }
            }
        },
    });

    const { sliceIndex } = useEllipsis(menuRef, props);

    const addItem = useCallback((menu: SubMenuProvider) => {
        openedMenus.current = { ...openedMenus.current, [menu.index]: menu };
    }, []);

    const removeItem = useCallback((menu: SubMenuProvider) => {
        delete openedMenus.current[menu.index];
    }, []);

    const handleOpenMenu = useCallback(
        (index: string, indexPath: string[], item: MenuItemClicked) => {
            if (mode === 'vertical') {
                // 折叠模式下，index为子菜单，只能向上逐层打开父菜单
                if (collapse) {
                    if (uniqueOpened) {
                        subMenuRef.current.forEach(sub => {
                            sub.closeMenu(index, indexPath);
                            removeItem(sub);
                        });
                    }
                    indexPath.reduce((prev, e) => {
                        subMenuRef.current.forEach(sub => {
                            if (sub.index === e) {
                                sub.openMenu(e, [...prev, e]);
                                addItem(sub);
                            }
                        });
                        return [...prev, e];
                    }, []);
                } else {
                    // 正常模式，index为父菜单的index
                    subMenuRef.current.forEach(sub => {
                        if (sub.index === index) {
                            sub.openMenu(index, indexPath);
                            addItem(sub);
                        }
                        if (uniqueOpened) {
                            if (sub.index !== index && !indexPath.includes(sub.index)) {
                                sub.closeMenu(index, indexPath);
                                removeItem(sub);
                            }
                        }
                    });
                }
            }
            onOpen?.(index, indexPath, item);
        },
        [addItem, collapse, mode, onOpen, removeItem, uniqueOpened],
    );

    /** 激活菜单项 */
    const activeMenus = useCallback(() => {
        if (defaultActive) {
            const menu = menuItemsRef.current.find(item => item.index === defaultActive);
            if (menu && menu.indexPath.length > 1) {
                setActive(menu.indexPath);
                menu.indexPath.reduce((prev, item) => {
                    handleOpenMenu(item, [...prev, item], { index: item, indexPath: [...prev, item] });
                    return [...prev, item];
                }, []);
            }
        }
        if (defaultOpeneds.length > 0) {
            defaultOpeneds.forEach(keys => {
                const sub = subMenuRef.current.find(item => item.index === keys);
                if (sub) {
                    sub.openMenu(sub.index, sub.indexPath);
                    addItem(sub);
                }
            });
        }
    }, [addItem, defaultActive, defaultOpeneds, handleOpenMenu, setActive]);

    /** 添加子菜单 */
    const addMenuItem = useCallback(
        (menu: MenuItemRegistered) => {
            const prev = menuItemsRef.current;
            if (!prev.some(item => item.index === menu.index)) {
                menuItemsRef.current = [...prev, menu];
                activeMenus();
            } else {
                const idx = prev.findIndex(item => item.index === menu.index);
                menuItemsRef.current = prev.splice(idx, 1, menu);
            }
        },
        [activeMenus],
    );

    /** 添加父菜单 */
    const addSubMenu = useCallback(
        (sub: SubMenuProvider) => {
            const prev = subMenuRef.current;
            if (!prev.some(item => item.index === sub.index)) {
                subMenuRef.current = [...prev, sub];
                activeMenus();
            }
        },
        [activeMenus],
    );

    /** 展开菜单 */
    const open = useCallback(
        (index: string) => {
            const menu = subMenuRef.current.find(item => item.index === index);
            if (menu && menu.indexPath.length > 1) {
                // setActive(menu.indexPath);
                menu.indexPath.reduce((prev, item) => {
                    handleOpenMenu(item, [...prev, item], { index: item, indexPath: [...prev, item] });
                    return [...prev, item];
                }, []);
            }
        },
        [handleOpenMenu],
    );

    /** 折叠菜单 */
    const close = useCallback(
        (index: string) => {
            const sub = subMenuRef.current.find(item => item.index === index);
            if (sub) {
                sub.closeMenu(sub.index, sub.indexPath);
                removeItem(sub);
            }
        },
        [removeItem],
    );

    useImperativeHandle(ref, () => ({ open, close }));

    return (
        // @ts-ignore
        <ul ref={menuRef} className={classNames(b(), m(mode), /* { [m('collapse')]: mounted },  */ props.className)} style={{ '--el-menu-level': 0, ...props.style }}>
            <MenuContext.Provider
                value={{
                    activeIndex: active,
                    setActiveIndex: setActive,
                    parentIndex: [],
                    mode,
                    showTimeout,
                    hideTimeout,
                    onSelect,
                    onOpen: handleOpenMenu,
                    onClose,
                    addMenuItem,
                    addSubMenu,
                    addItem,
                    removeItem,
                    menuTrigger,
                    popperOffset,
                    router,
                    collapse: _collapse,
                    themeStyle: pick(props.style ?? {}, [
                        '--el-menu-active-color',
                        '--el-menu-text-color',
                        '--el-menu-hover-text-color',
                        '--el-menu-bg-color',
                        '--el-menu-hover-bg-color',
                        '--el-menu-item-height',
                        '--el-menu-sub-item-height',
                        '--el-menu-horizontal-height',
                        '--el-menu-horizontal-sub-item-height',
                        '--el-menu-item-font-size',
                        '--el-menu-item-hover-fill',
                        '--el-menu-border-color',
                        '--el-menu-base-level-padding',
                        '--el-menu-level-padding',
                        '--el-menu-icon-width',
                    ]),
                }}
            >
                {sliceIndex > 1 ? (
                    <>
                        {Children.toArray(props.children).slice(0, sliceIndex)}
                        <SubMenu key="__el__more" index="__el__more" title={ellipsisIcon ?? <More />}>
                            {Children.toArray(props.children).slice(sliceIndex)}
                        </SubMenu>
                    </>
                ) : (
                    props.children
                )}
            </MenuContext.Provider>
        </ul>
    );
});

Menu.displayName = 'ElMenu';

export default Menu;
