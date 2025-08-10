import classNames from 'classnames';
import { addClass, removeClass } from 'dom-lib';
import { pick } from 'lodash';
import React, { Children, forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
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
            showTimeout: 300,
            hideTimeout: 300,
            uniqueOpened: false,
            collapseTransition: false,
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
        onClose,
        menuTrigger,
        popperOffset,
        router,
        ellipsisIcon,
    } = props;
    const { b, m } = useClassNames(classPrefix);

    const [active, setActive] = useControlled(undefined, [defaultActive]);
    // const [subMenu, setSubMenu] = useState<SubMenuProvider[]>([]);
    // const [, setItems] = useState<MenuItemRegistered[]>([]);

    const menuRef = useRef<HTMLUListElement>(null);
    const menuItemsRef = useRef<MenuItemRegistered[]>([]);
    const subMenuRef = useRef<SubMenuProvider[]>([]);

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
            if (collapse) {
                subMenuRef.current.forEach(sub => {
                    sub.closeMenu(sub.index, sub.indexPath);
                });
                addClass(menuRef.current, m`collapse`);
            } else {
                removeClass(menuRef.current, m`collapse`);
            }
        },
    });

    const { sliceIndex } = useEllipsis(menuRef, props);

    const onOpen = useCallback(
        (index: string, indexPath: string[], item: MenuItemClicked) => {
            if (mode === 'vertical') {
                subMenuRef.current.forEach(sub => {
                    if (sub.index === index) {
                        sub.openMenu(index, indexPath);
                    }
                    if (uniqueOpened) {
                        if (sub.index !== index && !indexPath.includes(sub.index)) {
                            sub.closeMenu(index, indexPath);
                        }
                    }
                });
            }
            props.onOpen?.(index, indexPath, item);
        },
        [mode, props, uniqueOpened],
    );

    const activeMenus = useCallback(() => {
        if (defaultActive) {
            const menu = menuItemsRef.current.find(item => item.index === defaultActive);
            if (menu && menu.indexPath.length > 1) {
                setActive(menu.indexPath);
                menu.indexPath.reduce((prev, item) => {
                    onOpen(item, [...prev, item], { index: item, indexPath: [...prev, item] });
                    return [...prev, item];
                }, []);
            }
        }
        if (defaultOpeneds.length > 0) {
            defaultOpeneds.forEach(keys => {
                const sub = subMenuRef.current.find(item => item.index === keys);
                if (sub) {
                    sub.openMenu(sub.index, sub.indexPath);
                }
            });
        }
    }, [defaultActive, defaultOpeneds, onOpen, setActive]);

    const addItems = useCallback(
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

    const open = useCallback(
        (index: string) => {
            const menu = subMenuRef.current.find(item => item.index === index);
            if (menu && menu.indexPath.length > 1) {
                // setActive(menu.indexPath);
                menu.indexPath.reduce((prev, item) => {
                    onOpen(item, [...prev, item], { index: item, indexPath: [...prev, item] });
                    return [...prev, item];
                }, []);
            }

            // const sub = subMenuRef.current.find(item => item.index === index);
            // if (sub) {
            //     sub.openMenu(sub.index, sub.indexPath);
            // }
        },
        [onOpen],
    );

    const close = useCallback((index: string) => {
        const sub = subMenuRef.current.find(item => item.index === index);
        if (sub) {
            sub.closeMenu(sub.index, sub.indexPath);
        }
    }, []);

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
                    onOpen,
                    onClose,
                    addItems,
                    addSubMenu,
                    menuTrigger,
                    popperOffset,
                    router,
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

export default Menu;
