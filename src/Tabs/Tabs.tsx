import classNames from 'classnames';
import { addClass, addStyle, hasClass, removeClass } from 'dom-lib';
import forEach from 'lodash/forEach';
import omit from 'lodash/omit';
import React, { Children, FC, Ref, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '../Icon';
import { isEmpty } from '../Util';
import { useChildrenInstance, useClassNames, useControlled } from '../hooks';
import { TabsContext } from './TabsContext';
import { Navs, Scrollable, TabPaneProps, TabsProps } from './typings';

const Tabs: FC<TabsProps> = forwardRef((props: TabsProps, ref?: Ref<HTMLDivElement>) => {
    const { type, tabPosition = 'top', stretch, classPrefix = 'tabs', children, onTabClick, beforeLeave, center, editable, addable, closable, onTabRemove } = props;
    const [activeName, setActiveName] = useControlled(props.activeName, props.defaultActiveName);
    const { b, m, e, is } = useClassNames(classPrefix);

    /** 标签页标题栏组（内容自撑） */
    const navRef = useRef<HTMLDivElement>(null);

    /** 标签页标题栏容器 */
    const navScrollRef = useRef<HTMLDivElement>(null);
    const elRef = useRef<HTMLDivElement>(null);
    const activeBarRef = useRef<HTMLDivElement>(null);

    /** 是否可滚动 */
    const scrollable = useRef<false | Scrollable>(false);
    const scrollLeftRef = useRef<HTMLDivElement>(null);
    const scrollRightRef = useRef<HTMLDivElement>(null);
    const [isScroll, setIsScroll] = useState<boolean>(false);

    /** 激活标签页偏移位置 */
    const [navOffset, setNavOffset] = useState(0);
    const sizeName = useMemo(() => (tabPosition && ['top', 'bottom'].includes(tabPosition) ? 'offsetWidth' : 'offsetHeight'), [tabPosition]);

    /** 标签页标题栏组样式 */
    const navStyle = useMemo<React.CSSProperties>(() => {
        const dir = sizeName === 'offsetWidth' ? 'X' : 'Y';
        return {
            transform: `translate${dir}(-${navOffset}px)`,
        };
    }, [navOffset, sizeName]);

    /** 默认样式下，激活标签页下方状态条的样式 */
    // const [barStyle, setBarStyle] = useState<JSX.CSSProperties>({});

    /** 获取子组件 */
    const getTabPaneInstance = useChildrenInstance<TabPaneProps>('TabPane');

    /** 获取TabPane组件中的配置数据 */
    const navs: Navs[] = useMemo(() => {
        const componentChildren: React.ReactElement<TabPaneProps>[] = getTabPaneInstance(children);
        return componentChildren.map((node, i) => {
            return {
                title: node.props.title,
                name: node.props.name,
                index: i,
                active: isEmpty(activeName) ? i === 0 : activeName === node.props.name,
                disabled: node.props.disabled,
                closable: node.props.closable === false ? false : node.props.closable || closable || editable,
                props: omit(node.props, 'children'),
            };
        });
    }, [getTabPaneInstance, children, activeName, closable, editable]);

    /** 向前滚动 */
    const scrollPrev = useCallback(() => {
        if (!navScrollRef.current) {
            return;
        }

        const containerSize = navScrollRef.current[sizeName];
        const currentOffset = navOffset;

        if (!currentOffset) {
            return;
        }

        const newOffset = currentOffset > containerSize ? currentOffset - containerSize : 0;
        setNavOffset(newOffset);
    }, [sizeName, navOffset]);

    /** 向后滚动 */
    const scrollNext = useCallback(() => {
        if (!navScrollRef.current || !navRef.current) {
            return;
        }

        const navSize = navRef.current[sizeName];
        const containerSize = navScrollRef.current[sizeName];
        const currentOffset = navOffset;

        if (navSize - currentOffset <= containerSize) {
            return;
        }

        const newOffset = navSize - currentOffset > containerSize * 2 ? currentOffset + containerSize : navSize - containerSize;
        setNavOffset(newOffset);
    }, [sizeName, navOffset]);

    /** 滚动到激活标签页位置 */
    const scrollToActiveTab = useCallback(() => {
        const nav = navRef.current;
        if (!scrollable.current || !elRef.current || !navScrollRef.current || !nav) {
            return;
        }

        const activeTab = elRef.current.querySelector('.is-active');
        if (!activeTab) {
            return;
        }

        const navScroll = navScrollRef.current;
        const isHorizontal = tabPosition && ['top', 'bottom'].includes(tabPosition);
        const activeTabBounding = activeTab.getBoundingClientRect();
        const navScrollBounding = navScroll.getBoundingClientRect();
        const maxOffset = isHorizontal ? nav.offsetWidth - navScrollBounding.width : nav.offsetHeight - navScrollBounding.height;
        const currentOffset = navOffset;
        let newOffset = currentOffset;

        if (isHorizontal) {
            if (activeTabBounding.left < navScrollBounding.left) {
                newOffset = currentOffset - (navScrollBounding.left - activeTabBounding.left);
            }
            if (activeTabBounding.right > navScrollBounding.right) {
                newOffset = currentOffset + activeTabBounding.right - navScrollBounding.right;
            }
        } else {
            if (activeTabBounding.top < navScrollBounding.top) {
                newOffset = currentOffset - (navScrollBounding.top - activeTabBounding.top);
            }
            if (activeTabBounding.bottom > navScrollBounding.bottom) {
                newOffset = currentOffset + (activeTabBounding.bottom - navScrollBounding.bottom);
            }
        }
        newOffset = Math.max(newOffset, 0);
        setNavOffset(Math.min(newOffset, maxOffset));
    }, [tabPosition, scrollable, navOffset]);

    /**  */
    const update = useCallback(() => {
        if (!navRef.current || !navScrollRef.current) {
            return;
        }

        const navSize = navRef.current[sizeName];
        const containerSize = navScrollRef.current[sizeName];
        const currentOffset = navOffset;

        // 标签页标题栏容器宽/高度小于标签页标题栏组的宽/高度时，两侧显示`前进`和`后退`按钮
        if (containerSize < navSize) {
            const _currentOffset = navOffset;
            scrollable.current = {
                prev: _currentOffset,
                next: _currentOffset + containerSize < navSize,
            };
            if (scrollLeftRef.current) {
                (scrollable.current.prev === 0 ? addClass : removeClass)(scrollLeftRef.current, is('disabled'));
            }
            if (scrollRightRef.current) {
                (scrollable.current.next ? removeClass : addClass)(scrollRightRef.current, is('disabled'));
            }
            setIsScroll(true);
            if (navSize - _currentOffset < containerSize) {
                setNavOffset(navSize - containerSize);
            }
        } else {
            scrollable.current = false;
            setIsScroll(false);
            if (currentOffset > 0) {
                setNavOffset(0);
            }
        }
    }, [sizeName, navOffset, is]);

    /** 默认样式下，激活标签页下方状态条的位置 */
    const getBarStyle = useCallback(() => {
        let offset = 0;
        let tabSize = 0;
        const sizeDir = sizeName === 'offsetWidth' ? 'X' : 'Y';

        forEach(elRef.current?.querySelectorAll('.' + e`item`), el => {
            if (hasClass(el, 'is-active')) {
                tabSize = el[sizeName === 'offsetWidth' ? 'clientWidth' : 'clientHeight'];
                const position = sizeDir === 'X' ? 'left' : 'top';
                offset = el.getBoundingClientRect()[position] - (el.parentElement?.getBoundingClientRect()[position] ?? 0);
                const tabStyles = window.getComputedStyle(el);

                if (sizeName === 'offsetWidth') {
                    if (Children.count(children) > 1) {
                        tabSize -= parseFloat(tabStyles.paddingLeft) + parseFloat(tabStyles.paddingRight);
                    }
                    offset += parseFloat(tabStyles.paddingLeft);
                }
                return true;
            }
        });

        if (activeBarRef.current) {
            addStyle(activeBarRef.current, {
                [sizeName === 'offsetWidth' ? 'width' : 'height']: `${tabSize}px`,
                transform: `translate${sizeDir}(${offset}px)`,
            });
        }
        // setBarStyle({
        //     [sizeName === 'offsetWidth' ? 'width' : 'height']: `${tabSize}px`,
        //     transform: `translate${sizeDir}(${offset}px)`,
        // });
    }, [sizeName, children]);

    /** 激活标签页 */
    const changeCurrentName = useCallback(
        (item: Navs) => {
            setActiveName(item?.name);
            onTabClick?.({
                paneName: item?.name,
                active: item?.active,
                index: item?.index,
                isClosable: item?.closable ?? false,
                props: item.props,
            });
        },
        [onTabClick, setActiveName],
    );

    /**
     * 点击标签页方法
     * @param item
     * @returns
     */
    const handleTabClick = useCallback(
        (item: Navs) => {
            if (item?.disabled || item?.name === activeName) {
                return;
            }
            const canLeave = beforeLeave?.(item.name, activeName);
            if (canLeave instanceof Promise) {
                canLeave.then(() => {
                    changeCurrentName(item);
                });
            } else if (canLeave !== false) {
                changeCurrentName(item);
            }
        },
        [activeName, beforeLeave, changeCurrentName],
    );

    /**
     * 切换标签页后，滚动到
     */
    useEffect(() => {
        update();
        if (isEmpty(type)) {
            getBarStyle();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeName, tabPosition, type, navOffset, navs]);

    /**
     * 切换标签页后，滚动到
     */
    useEffect(() => {
        setTimeout(() => scrollToActiveTab(), 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeName, tabPosition, type]);

    /**
     * 默认第一个标签页激活
     */
    useEffect(() => {
        if (isEmpty(activeName) && navs.length > 0) {
            setActiveName(navs[0].name);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const header = (
        <div className={classNames(e`header`, is(tabPosition))}>
            <div className={classNames(e`nav-wrap`, is(tabPosition, { scrollable: isScroll }))} ref={elRef}>
                {isScroll && (
                    <span ref={scrollLeftRef} className={classNames(e`nav-prev`, is('disabled'))} onClick={scrollPrev}>
                        <Icon name="angle-left" />
                    </span>
                )}
                {isScroll && (
                    <span ref={scrollRightRef} className={classNames(e`nav-next`)} onClick={scrollNext}>
                        <Icon name="angle-right" />
                    </span>
                )}
                <div className={classNames(e`nav-scroll`, is({ center }))} style={props.headerStyle} ref={navScrollRef}>
                    <div
                        className={classNames(e`nav`, is(tabPosition, { stretch: stretch && tabPosition && ['top', 'bottom'].includes(tabPosition) }))}
                        style={navStyle}
                        ref={navRef}
                    >
                        {isEmpty(type) && <div ref={activeBarRef} className={classNames(e`active-bar`, is(tabPosition))} /* style={barStyle} */ />}
                        {navs.map(item => {
                            const { active, disabled } = item;
                            return (
                                <div
                                    key={item.name}
                                    className={classNames(e`item`, is(tabPosition, { active, disabled, closable: item.closable && !disabled }))}
                                    onClick={() => handleTabClick(item)}
                                >
                                    <div>
                                        {item?.title}
                                        {item.closable && !item.disabled && (
                                            <Icon
                                                name="close"
                                                className={is`icon-close`}
                                                onClick={event => {
                                                    event.stopPropagation();
                                                    onTabRemove?.(item.name);
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                        {(addable || editable) && (
                            <div className={classNames(e`item`, is(tabPosition))} style={{ padding: '0 10px' }} onClick={props.onTabAdd}>
                                <Icon name="plus" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    const content = (
        <div className={classNames(e`content`)} style={props.contentStyle}>
            {props.children}
        </div>
    );

    return (
        <TabsContext.Provider value={{ activeName }}>
            <div className={classNames(b(), m(tabPosition), { [m(type)]: type }, props.className)} style={props.style} ref={ref}>
                {tabPosition === 'bottom' ? content : header}
                {tabPosition === 'bottom' ? header : content}
            </div>
        </TabsContext.Provider>
    );
});

Tabs.displayName = 'Tabs';

export default Tabs;
