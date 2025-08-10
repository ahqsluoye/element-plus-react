import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Icon from '../Icon/Icon';
import Tooltip from '../Tooltip/Tooltip';
import { TooltipRef } from '../Tooltip/typings';
import Transition from '../Transition/Transition';
import { mergeDefaultProps } from '../Util';
import { useClassNames } from '../hooks';
import { MenuContext, useMenuContext } from './MenuContext';
import { afterEnter, afterLeave, beforeEnter, beforeLeave, onEnter, onLeave } from './SubMenuCollapseTransition';
import { SubMenuProps } from './typings';

const SubMenu = (props: SubMenuProps) => {
    props = mergeDefaultProps({ popperOffset: 5 }, props);
    const { classPrefix = 'sub-menu', title, index, popperClass, disabled } = props;
    const { b: mb, m: mm } = useClassNames('menu');
    const { b, e, is } = useClassNames(classPrefix);
    const { activeIndex, parentIndex, mode, menuTrigger, onOpen, onClose, addItems, addSubMenu, handleSubMenuClick, showTimeout, hideTimeout, themeStyle, popperOffset, ...ohter } =
        useMenuContext();

    const [open, setOpen] = useState(false);

    const indexPath = useMemo(() => [...parentIndex, index], [index, parentIndex]);
    const level = useMemo(() => indexPath.length, [indexPath.length]);

    const tooltipRef = useRef<TooltipRef>();
    const ulRef = useRef<HTMLUListElement>(null);
    const inited = useRef(false);

    const handleMouseEnter = useCallback(() => {
        setOpen(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setOpen(false);
    }, []);

    /**
     * 隐藏子菜单的回调函数
     * 该函数用于处理子菜单的隐藏逻辑，包括触发子菜单点击处理和隐藏工具提示
     *
     * @remarks
     * 依赖项: handleSubMenuClick - 子菜单点击处理函数
     *
     * @returns {void}
     */
    const hideSubMenu = useCallback(() => {
        tooltipRef.current?.hide();
        handleSubMenuClick?.();
    }, [handleSubMenuClick]);

    const handleSubMenuItemClick = useCallback(
        (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
            evt.stopPropagation();
            if (disabled) {
                return;
            }
            if (mode === 'vertical') {
                setOpen(!open);
                if (!open) {
                    onOpen?.(index, indexPath, { index, indexPath });
                } else {
                    onClose?.(index, indexPath, { index, indexPath });
                }
            }
        },
        [disabled, index, indexPath, mode, onClose, onOpen, open],
    );

    useEffect(() => {
        if (!inited.current) {
            inited.current = true;
            addItems({ index, indexPath });
            addSubMenu({
                index,
                indexPath,
                openMenu(index, indexPath) {
                    // if (mode === 'horizontal') {
                    //     tooltipRef.current?.onOpen();
                    // }
                    setOpen(true);
                },
                closeMenu(index, indexPath) {
                    // if (mode === 'horizontal') {
                    //     tooltipRef.current?.hide();
                    // }
                    setOpen(false);
                },
            });
        }
    });

    return (
        <li
            className={classNames(b(), is({ disabled, opened: open, active: activeIndex.includes(index) }), { [e`hide-arrow`]: index === '__el__more' }, props.className)}
            onClick={handleSubMenuItemClick}
            style={props.style}
            role="menuitem"
        >
            {mode === 'horizontal' ? (
                <Tooltip
                    ref={tooltipRef}
                    disabled={disabled}
                    className={e`title`}
                    trigger={level > 1 ? 'hover' : menuTrigger}
                    popperClass={classNames(is('pure'), popperClass)}
                    popperStyle={themeStyle}
                    offset={popperOffset ?? props.popperOffset}
                    showAfter={level > 1 ? 0 : showTimeout ?? props.showTimeout}
                    hideAfter={hideTimeout ?? props.hideTimeout}
                    unmountOnExit={false}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    content={
                        <MenuContext.Provider
                            value={{
                                activeIndex,
                                parentIndex: [...parentIndex, index],
                                mode,
                                menuTrigger,
                                handleSubMenuClick: hideSubMenu,
                                addItems,
                                addSubMenu,
                                showTimeout,
                                hideTimeout,
                                themeStyle,
                                popperOffset,
                                ...ohter,
                            }}
                        >
                            <div className={classNames(mm`horizontal`, mm`popup-container`)}>
                                {/* @ts-ignore */}
                                <ul className="el-menu el-menu--popup el-menu--popup-bottom-start" style={{ '--el-menu-level': level }}>
                                    {props.children}
                                </ul>
                            </div>
                        </MenuContext.Provider>
                    }
                    showArrow={false}
                    placement={level > 1 ? 'right-start' : 'bottom-start'}
                    effect="light"
                >
                    <div>
                        {title}
                        <Icon className={e`icon-arrow`} name={level > 1 ? 'angle-right' : 'angle-down'} prefix="fal" style={{ transform: open ? 'rotateZ(180deg)' : 'none' }} />
                    </div>
                </Tooltip>
            ) : (
                <>
                    <div className={classNames(e`title`)}>
                        {title}
                        <Icon className={e`icon-arrow`} name="angle-down" prefix="fal" style={{ transform: open ? 'rotateZ(180deg)' : 'none' }} />
                    </div>
                    <Transition
                        name="el-menu-collapse"
                        nodeRef={ulRef}
                        disabled={disabled}
                        duration={300}
                        visible={open}
                        beforeEnter={beforeEnter}
                        onEnter={onEnter}
                        afterEnter={afterEnter}
                        beforeLeave={beforeLeave}
                        onLeave={onLeave}
                        afterLeave={afterLeave}
                    >
                        {/* @ts-ignore */}
                        <ul ref={ulRef} className={classNames(mb(), mm`inline`)} style={{ '--el-menu-level': level }}>
                            <MenuContext.Provider
                                value={{
                                    activeIndex,
                                    parentIndex: [...parentIndex, index],
                                    mode,
                                    menuTrigger,
                                    onOpen,
                                    onClose,
                                    addItems,
                                    addSubMenu,
                                    handleSubMenuClick: hideSubMenu,
                                    showTimeout,
                                    hideTimeout,
                                    themeStyle,
                                    popperOffset,
                                    ...ohter,
                                }}
                            >
                                {props.children}
                            </MenuContext.Provider>
                        </ul>
                    </Transition>
                </>
            )}
        </li>
    );
};

export default SubMenu;
