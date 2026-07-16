import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import { mergeDefaultProps } from '@qsxy/element-plus-react/Util/base';
import { getOffsetTopDistance } from '@qsxy/element-plus-react/Util/position';
import { animateScrollTo, getScrollElement, getScrollTop, isWindow } from '@qsxy/element-plus-react/Util/scroll';
import { throttleByRaf } from '@qsxy/element-plus-react/Util/throttleByRaf';
import { useMount } from 'ahooks';
import classNames from 'classnames';
import React, { createContext, forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { getElement } from './element';
import { AnchorContext as AnchorContextType, AnchorLinkState, AnchorProps, AnchorRef } from './typings';

/** 锚点 Context */
export const AnchorContext = createContext<AnchorContextType | null>(null);

const Anchor = memo(
    forwardRef<AnchorRef, AnchorProps>((props, ref) => {
        props = mergeDefaultProps(
            {
                classPrefix: 'anchor',
                offset: 0,
                bound: 15,
                duration: 300,
                marker: true,
                type: 'default',
                direction: 'vertical',
            },
            props,
        );
        const { classPrefix, offset, bound, duration, marker, type, direction, selectScrollTop, container, onChange, onClick, className, style, children } = props;

        const ns = useClassNames(classPrefix);

        const [currentAnchor, setCurrentAnchor] = useState('');

        const [markerStyle, setMarkerStyle] = useState<React.CSSProperties>({});

        const anchorRef = useRef<HTMLDivElement>(null);
        const markerRef = useRef<HTMLDivElement>(null);
        const containerElRef = useRef<HTMLElement | Window>();

        const linksRef = useRef<Record<string, HTMLElement>>({});
        const isScrollingRef = useRef(false);
        const currentScrollTopRef = useRef(0);

        const clearAnimateRef = useRef<(() => void) | null>(null);
        const currentTargetHrefRef = useRef('');

        const cls = useMemo(() => {
            return classNames(ns.b(), type === 'underline' ? ns.m('underline') : '', ns.m(direction));
        }, [ns, type, direction]);

        const addLink = useCallback((state: AnchorLinkState) => {
            linksRef.current[state.href] = state.el;
        }, []);

        const removeLink = useCallback((href: string) => {
            delete linksRef.current[href];
        }, []);

        const handleCurrentAnchorChange = useCallback(
            (href: string) => {
                if (currentAnchor !== href) {
                    setCurrentAnchor(href);
                    onChange?.(href);
                }
            },
            [currentAnchor, onChange],
        );

        const getCurrentHref = useCallback((): string | undefined => {
            const containerEl = containerElRef.current;
            if (!containerEl) {
                return;
            }

            const scrollTop = getScrollTop(containerEl);
            const anchorTopList: { top: number; href: string }[] = [];

            for (const href of Object.keys(linksRef.current)) {
                const target = getElement(href);
                if (!target) {
                    continue;
                }
                const scrollEle = getScrollElement(target, containerEl);
                const distance = getOffsetTopDistance(target, scrollEle);
                anchorTopList.push({
                    top: distance - offset - bound,
                    href,
                });
            }

            anchorTopList.sort((prev, next) => prev.top - next.top);

            for (let i = 0; i < anchorTopList.length; i++) {
                const item = anchorTopList[i];
                const next = anchorTopList[i + 1];

                if (i === 0 && scrollTop === 0) {
                    return selectScrollTop ? item.href : '';
                }
                if (item.top <= scrollTop && (!next || next.top > scrollTop)) {
                    return item.href;
                }
            }
        }, [offset, bound, selectScrollTop]);

        const scrollToAnchor = useCallback(
            (href: string) => {
                const containerEl = containerElRef.current;
                if (!containerEl) {
                    return;
                }

                const target = getElement(href);
                if (!target) {
                    return;
                }

                if (clearAnimateRef.current) {
                    if (currentTargetHrefRef.current === href) {
                        return;
                    }
                    clearAnimateRef.current();
                }

                currentTargetHrefRef.current = href;
                isScrollingRef.current = true;

                const scrollEle = getScrollElement(target, containerEl);
                const distance = getOffsetTopDistance(target, scrollEle);
                const max = scrollEle.scrollHeight - scrollEle.clientHeight;
                const to = Math.min(distance - offset, max);

                clearAnimateRef.current = animateScrollTo(containerEl, currentScrollTopRef.current, to, duration, () => {
                    setTimeout(() => {
                        isScrollingRef.current = false;
                        currentTargetHrefRef.current = '';
                    }, 20);
                });
            },
            [offset, duration],
        );

        const scrollTo = useCallback(
            (href?: string) => {
                if (href) {
                    handleCurrentAnchorChange(href);
                    scrollToAnchor(href);
                }
            },
            [handleCurrentAnchorChange, scrollToAnchor],
        );

        const handleClick = useCallback(
            (e: React.MouseEvent, href?: string) => {
                onClick?.(e, href);
                scrollTo(href);
            },
            [onClick, scrollTo],
        );

        const handleScroll = useMemo(() => {
            return throttleByRaf(() => {
                const containerEl = containerElRef.current;
                if (containerEl) {
                    currentScrollTopRef.current = getScrollTop(containerEl);
                }
                const currentHref = getCurrentHref();
                if (isScrollingRef.current || currentHref === undefined) {
                    return;
                }
                handleCurrentAnchorChange(currentHref);
            });
        }, [getCurrentHref, handleCurrentAnchorChange]);

        const getContainer = useCallback(() => {
            const el = getElement(container ?? null);
            if (!el || isWindow(el)) {
                containerElRef.current = window;
            } else {
                containerElRef.current = el;
            }
        }, [container]);

        const updateMarkerStyle = useCallback(() => {
            if (!anchorRef.current || !markerRef.current || !currentAnchor) {
                setMarkerStyle({});
                return;
            }
            const currentLinkEl = linksRef.current[currentAnchor];
            if (!currentLinkEl) {
                setMarkerStyle({});
                return;
            }
            const anchorRect = anchorRef.current.getBoundingClientRect();
            const markerRect = markerRef.current.getBoundingClientRect();
            const linkRect = currentLinkEl.getBoundingClientRect();

            if (direction === 'horizontal') {
                const left = linkRect.left - anchorRect.left;
                setMarkerStyle({
                    left: `${left}px`,
                    width: `${linkRect.width}px`,
                    opacity: 1,
                });
            } else {
                const top = linkRect.top - anchorRect.top + (linkRect.height - markerRect.height) / 2;
                setMarkerStyle({
                    top: `${top}px`,
                    opacity: 1,
                });
            }
        }, [currentAnchor, direction]);

        // 在挂载后更新 marker 样式
        useEffect(() => {
            updateMarkerStyle();
        }, [currentAnchor, children]);

        // 挂载时初始化
        useMount(() => {
            getContainer();
            const hash = decodeURIComponent(window.location.hash);
            const target = getElement(hash);
            if (target) {
                scrollTo(hash);
            } else {
                handleScroll();
            }
        });

        // 监听 container 变化
        useEffect(() => {
            getContainer();
        }, [container]);

        // 绑定滚动事件
        useEffect(() => {
            const containerEl = containerElRef.current;
            if (!containerEl) {
                return;
            }

            containerEl.addEventListener('scroll', handleScroll);
            return () => {
                containerEl.removeEventListener('scroll', handleScroll);
            };
        }, []);

        const contextValue: AnchorContextType = useMemo(
            () => ({
                ns,
                direction,
                currentAnchor,
                addLink,
                removeLink,
                handleClick,
            }),
            [ns, direction, currentAnchor, addLink, removeLink, handleClick],
        );

        useImperativeHandle(
            ref,
            () => ({
                scrollTo,
            }),
            [scrollTo],
        );

        return (
            <AnchorContext.Provider value={contextValue}>
                <div ref={anchorRef} className={classNames(cls, className)} style={style}>
                    {marker && <div ref={markerRef} className={ns.e('marker')} style={markerStyle} />}
                    <div className={ns.e('list')}>{children}</div>
                </div>
            </AnchorContext.Provider>
        );
    }),
);

Anchor.displayName = 'ElAnchor';

export default Anchor;
