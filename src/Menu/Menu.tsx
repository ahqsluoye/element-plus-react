import classNames from 'classnames';
import { pick } from 'lodash';
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { mergeDefaultProps } from '../Util';
import { useClassNames, useControlled } from '../hooks';
import useCssTransiton from '../hooks/useCssTransiton';
import { afterEnter, afterLeave, beforeEnter, beforeLeave, onEnter, onLeave } from './MenuCollapseTransition';
import { MenuContext } from './MenuContext';
import { MenuItemClicked, MenuItemRegistered, MenuProps, SubMenuProvider } from './typings';

const Menu = (props: MenuProps) => {
    props = mergeDefaultProps(
        {
            mode: 'vertical',
            showTimeout: 300,
            hideTimeout: 300,
            uniqueOpened: false,
            collapseTransition: false,
            defaultOpeneds: [],
        },
        props,
    );
    const { classPrefix = 'menu', mode, collapse, defaultActive, showTimeout, hideTimeout, uniqueOpened, defaultOpeneds, collapseTransition, onSelect, onClose } = props;
    const { b, m } = useClassNames(classPrefix);

    const [active, setActive] = useControlled(undefined, [defaultActive]);
    const [subMenu, setSubMenu] = useState<SubMenuProvider[]>([]);
    const [items, setItems] = useState<MenuItemRegistered[]>([]);

    const ulRef = useRef<HTMLUListElement>(null);

    useCssTransiton({
        nodeRef: ulRef,
        visible: collapse,
        disabled: mode === 'horizontal' || !collapseTransition,
        duration: 300,
        beforeLeave,
        onLeave,
        afterLeave,
        beforeEnter,
        onEnter,
        afterEnter,
    });

    const onOpen = useCallback(
        (index: string, indexPath: string[], item: MenuItemClicked) => {
            if (mode === 'vertical' && uniqueOpened) {
                subMenu.forEach(sub => {
                    if (sub.index === index) {
                        sub.openMenu(index, indexPath);
                    }
                    if (sub.index !== index && !indexPath.includes(sub.index)) {
                        sub.closeMenu(index, indexPath);
                    }
                });
            }
            props.onOpen?.(index, indexPath, item);
        },
        [mode, props, subMenu, uniqueOpened],
    );

    const addItems = useCallback((menu: MenuItemRegistered) => {
        setItems(prev => [...prev, menu]);
    }, []);

    const addSubMenu = useCallback((sub: SubMenuProvider) => {
        setSubMenu(prev => [...prev, sub]);
    }, []);

    useLayoutEffect(() => {
        if (defaultActive) {
            const menu = items.find(item => item.index === defaultActive);
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
                const sub = subMenu.find(item => item.index === keys);
                if (sub) {
                    sub.openMenu(sub.index, sub.indexPath);
                }
            });
        }
    }, [items, subMenu]);

    return (
        <ul ref={ulRef} className={classNames(b(), m(mode), /* { [m('collapse')]: mounted },  */ props.className)} style={{ '--el-menu-level': 0, ...props.style }}>
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
                {props.children}
            </MenuContext.Provider>
        </ul>
    );
};

export default Menu;
