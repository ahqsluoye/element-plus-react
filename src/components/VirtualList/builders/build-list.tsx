import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import classNames from 'classnames';
import React, { CSSProperties, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Scrollbar from '../components/scrollbar';
import { AUTO_ALIGNMENT, BACKWARD, FORWARD, HORIZONTAL, RTL, RTL_OFFSET_NAG, RTL_OFFSET_POS_ASC, RTL_OFFSET_POS_DESC } from '../defaults';
import { useCache } from '../hooks/use-cache';
import { useWheel } from '../hooks/use-wheel';
import { getRTLOffsetType, getScrollDir, isHorizontal } from '../utils';

import { isNumber, isString } from '@qsxy/element-plus-react/Util/base';
import { isClient } from '@qsxy/element-plus-react/Util/raf';
import type { VirtualizedListProps } from '../props';
import type { Alignment, Dir, ListConstructorProps, ListExposes, ScrollbarExpose } from '../types';

const createList = ({
    name,
    getOffset,
    getItemSize,
    getItemOffset,
    getEstimatedTotalSize,
    getStartIndexForOffset,
    getStopIndexForStartIndex,
    initCache,
    clearCache,
    validateProps,
}: ListConstructorProps<VirtualizedListProps>) => {
    const ListComponent = React.forwardRef<ListExposes, VirtualizedListProps & { children: (props: any) => React.ReactNode }>((props, ref) => {
        const {
            total,
            cache = 2,
            data = [],
            layout = 'vertical',
            initScrollOffset = 0,
            itemSize,
            direction = 'ltr',
            height,
            width,
            style,
            className,
            containerElement: Container = 'div',
            innerElement: Inner = 'div',
            innerProps = {},
            useIsScrolling,
            perfMode = true,
            scrollbarAlwaysOn = false,
            children,
        } = props;

        validateProps(props);

        const ns = useClassNames('vl');

        const dynamicSizeCache = useRef(initCache(props));

        const getItemStyleCache = useCache<CSSProperties>();

        // refs
        const windowRef = useRef<HTMLElement | null>(null);
        const innerRef = useRef<HTMLElement | null>(null);
        const scrollbarRef = useRef<ScrollbarExpose>(null);

        const [states, setStates] = useState({
            isScrolling: false,
            scrollDir: 'forward' as Dir,
            scrollOffset: isNumber(initScrollOffset) ? initScrollOffset : 0,
            updateRequested: false,
            isScrollbarDragging: false,
            scrollbarAlwaysOn,
        });

        const itemsToRender = useMemo(() => {
            if (total === 0) {
                return [0, 0, 0, 0];
            }

            const startIndex = getStartIndexForOffset(props, states.scrollOffset, dynamicSizeCache.current);
            const stopIndex = getStopIndexForStartIndex(props, startIndex, states.scrollOffset, dynamicSizeCache.current);

            const cacheBackward = !states.isScrolling || states.scrollDir === BACKWARD ? Math.max(1, cache) : 1;
            const cacheForward = !states.isScrolling || states.scrollDir === FORWARD ? Math.max(1, cache) : 1;

            return [Math.max(0, startIndex - cacheBackward), Math.max(0, Math.min(total - 1, stopIndex + cacheForward)), startIndex, stopIndex];
        }, [total, cache, states.isScrolling, states.scrollDir, states.scrollOffset, props]);

        const estimatedTotalSize = useMemo(() => getEstimatedTotalSize(props, dynamicSizeCache.current), [props]);

        const _isHorizontal = useMemo(() => isHorizontal(layout), [layout]);

        const windowStyle = useMemo<CSSProperties[]>(
            () => [
                {
                    position: 'relative',
                    [`overflow-${_isHorizontal ? 'x' : 'y'}`]: 'scroll',
                    WebkitOverflowScrolling: 'touch',
                    willChange: 'transform',
                },
                {
                    direction: direction,
                    height: isNumber(height) ? `${height}px` : String(height),
                    width: isNumber(width) ? `${width}px` : String(width ?? ''),
                },
                style ?? {},
            ],
            [_isHorizontal, direction, height, width, style],
        );

        const innerStyle = useMemo<CSSProperties>(() => {
            const size = estimatedTotalSize;
            const horizontal = _isHorizontal;
            return {
                height: horizontal ? '100%' : `${size}px`,
                pointerEvents: states.isScrolling ? 'none' : undefined,
                width: horizontal ? `${size}px` : '100%',
                margin: 0,
                boxSizing: 'border-box',
            };
        }, [estimatedTotalSize, _isHorizontal, states.isScrolling]);

        const clientSize = useMemo(() => (_isHorizontal ? width : height) as number, [_isHorizontal, width, height]);

        const resetIsScrolling = useCallback(() => {
            setStates(prev => ({ ...prev, isScrolling: false }));
            setTimeout(() => {
                getItemStyleCache(-1, null, null);
            }, 0);
        }, [getItemStyleCache]);

        const scrollTo = useCallback(
            (offset: number) => {
                offset = Math.max(offset, 0);

                if (offset === states.scrollOffset) {
                    return;
                }

                setStates(prev => ({
                    ...prev,
                    scrollOffset: offset,
                    scrollDir: getScrollDir(prev.scrollOffset, offset),
                    updateRequested: true,
                }));

                requestAnimationFrame(() => resetIsScrolling());
            },
            [states.scrollOffset, resetIsScrolling],
        );

        const scrollToItem = useCallback(
            (idx: number, alignment: Alignment = AUTO_ALIGNMENT) => {
                idx = Math.max(0, Math.min(idx, total - 1));
                scrollTo(getOffset(props, idx, alignment, states.scrollOffset, dynamicSizeCache.current));
            },
            [total, props, states.scrollOffset],
        );

        const { onWheel } = useWheel(
            {
                atStartEdge: states.scrollOffset <= 0,
                atEndEdge: states.scrollOffset >= estimatedTotalSize - (clientSize as number),
                layout,
            },
            offset => {
                scrollbarRef.current?.onMouseUp?.();
                scrollTo(Math.min(states.scrollOffset + offset, estimatedTotalSize - (clientSize as number)));
            },
        );

        const handleWheel = useCallback(
            (e: WheelEvent) => {
                if (!windowRef.current) {
                    return;
                }
                onWheel(e);
            },
            [onWheel],
        );

        useEffect(() => {
            const element = windowRef.current;
            if (!element) {
                return;
            }

            element.addEventListener('wheel', handleWheel, { passive: false });
            return () => {
                element.removeEventListener('wheel', handleWheel);
            };
        }, [handleWheel]);

        const emitEvents = useCallback(() => {
            // In React, we don't have emits, but we can keep this for API compatibility
            if (total > 0) {
                const [cacheStart, cacheEnd, visibleStart, visibleEnd] = itemsToRender;
                // Could emit events here if needed
            }
        }, [total, itemsToRender]);

        const scrollVertically = useCallback(
            (e: React.UIEvent<HTMLDivElement>) => {
                const { clientHeight, scrollHeight, scrollTop } = e.currentTarget;
                if (states.scrollOffset === scrollTop) {
                    return;
                }

                const scrollOffset = Math.max(0, Math.min(scrollTop, scrollHeight - clientHeight));

                setStates(prev => ({
                    ...prev,
                    isScrolling: true,
                    scrollDir: getScrollDir(prev.scrollOffset, scrollOffset),
                    scrollOffset,
                    updateRequested: false,
                }));

                requestAnimationFrame(() => resetIsScrolling());
            },
            [states.scrollOffset, resetIsScrolling],
        );

        const scrollHorizontally = useCallback(
            (e: React.UIEvent<HTMLDivElement>) => {
                const { clientWidth, scrollLeft, scrollWidth } = e.currentTarget;

                if (states.scrollOffset === scrollLeft) {
                    return;
                }

                let scrollOffset = scrollLeft;

                if (direction === RTL) {
                    switch (getRTLOffsetType()) {
                        case RTL_OFFSET_NAG: {
                            scrollOffset = -scrollLeft;
                            break;
                        }
                        case RTL_OFFSET_POS_DESC: {
                            scrollOffset = scrollWidth - clientWidth - scrollLeft;
                            break;
                        }
                    }
                }

                scrollOffset = Math.max(0, Math.min(scrollOffset, scrollWidth - clientWidth));

                setStates(prev => ({
                    ...prev,
                    isScrolling: true,
                    scrollDir: getScrollDir(prev.scrollOffset, scrollOffset),
                    scrollOffset,
                    updateRequested: false,
                }));

                requestAnimationFrame(() => resetIsScrolling());
            },
            [direction, resetIsScrolling],
        );

        const onScroll = useCallback(
            (e: React.UIEvent<HTMLDivElement>) => {
                if (_isHorizontal) {
                    scrollHorizontally(e);
                } else {
                    scrollVertically(e);
                }
                emitEvents();
            },
            [_isHorizontal, scrollHorizontally, scrollVertically, emitEvents],
        );

        const onScrollbarScroll = useCallback(
            (distanceToGo: number, totalSteps: number) => {
                const offset = ((estimatedTotalSize - (clientSize as number)) / totalSteps) * distanceToGo;
                scrollTo(Math.min(estimatedTotalSize - (clientSize as number), offset));
            },
            [estimatedTotalSize, clientSize, scrollTo],
        );

        const getItemStyle = useCallback(
            (idx: number) => {
                const itemStyleCache = getItemStyleCache(clearCache && itemSize, clearCache && layout, clearCache && direction);

                let style: CSSProperties;
                if (Object.prototype.hasOwnProperty.call(itemStyleCache, String(idx))) {
                    style = itemStyleCache[idx];
                } else {
                    const offset = getItemOffset(props, idx, dynamicSizeCache.current);
                    const size = getItemSize(props, idx, dynamicSizeCache.current);
                    const horizontal = _isHorizontal;

                    const isRtl = direction === RTL;
                    const offsetHorizontal = horizontal ? offset : 0;
                    itemStyleCache[idx] = style = {
                        position: 'absolute',
                        left: isRtl ? undefined : `${offsetHorizontal}px`,
                        right: isRtl ? `${offsetHorizontal}px` : undefined,
                        top: !horizontal ? `${offset}px` : 0,
                        height: !horizontal ? `${size}px` : '100%',
                        width: horizontal ? `${size}px` : '100%',
                    };
                }

                return style;
            },
            [getItemStyleCache, clearCache, itemSize, layout, direction, getItemOffset, getItemSize, props, _isHorizontal],
        );

        const resetScrollTop = useCallback(() => {
            const window = windowRef.current;
            if (window) {
                window.scrollTop = 0;
            }
        }, []);

        // Mount effect
        useEffect(() => {
            if (!isClient) {
                return;
            }
            const windowElement = windowRef.current;
            if (isNumber(initScrollOffset) && windowElement) {
                if (_isHorizontal) {
                    windowElement.scrollLeft = initScrollOffset;
                } else {
                    windowElement.scrollTop = initScrollOffset;
                }
            }

            emitEvents();
        }, []);

        // Update effect for scroll position sync
        useLayoutEffect(() => {
            const windowElement = windowRef.current;

            if (states.updateRequested && windowElement) {
                if (layout === HORIZONTAL) {
                    if (direction === RTL) {
                        switch (getRTLOffsetType()) {
                            case RTL_OFFSET_NAG: {
                                windowElement.scrollLeft = -states.scrollOffset;
                                break;
                            }
                            case RTL_OFFSET_POS_ASC: {
                                windowElement.scrollLeft = states.scrollOffset;
                                break;
                            }
                            default: {
                                const { clientWidth, scrollWidth } = windowElement;
                                windowElement.scrollLeft = scrollWidth - clientWidth - states.scrollOffset;
                                break;
                            }
                        }
                    } else {
                        windowElement.scrollLeft = states.scrollOffset;
                    }
                } else {
                    windowElement.scrollTop = states.scrollOffset;
                }
            }
        }, [states.updateRequested, states.scrollOffset, layout, direction]);

        // Expose methods via ref
        React.useImperativeHandle(
            ref,
            () => ({
                windowRef,
                innerRef,
                getItemStyleCache,
                scrollTo,
                scrollToItem,
                resetScrollTop,
                states,
            }),
            [scrollTo, scrollToItem, resetScrollTop, states, getItemStyleCache],
        );

        const [start, end] = itemsToRender;

        const childrenNodes = useMemo(() => {
            const nodes: React.ReactNode[] = [];

            if (total > 0) {
                for (let i = start; i <= end; i++) {
                    nodes.push(
                        React.createElement(
                            React.Fragment,
                            { key: i },
                            children?.({
                                data,
                                index: i,
                                isScrolling: useIsScrolling ? states.isScrolling : undefined,
                                style: getItemStyle(i),
                            }),
                        ),
                    );
                }
            }
            return nodes;
        }, [start, end, total, data, useIsScrolling, states.isScrolling, getItemStyle, children]);

        const InnerNode = React.createElement(
            Inner as any,
            {
                ...innerProps,
                style: innerStyle,
                ref: innerRef,
            },
            childrenNodes,
        );

        const listContainer = React.createElement(Container as any, {
            className: classNames(ns.e('window'), className),
            style: Object.assign({}, ...windowStyle),
            onScroll,
            ref: windowRef,
            key: 0,
            children: !isString(Container) ? { default: () => [InnerNode] } : [InnerNode],
        });

        const scrollbar = React.createElement(Scrollbar, {
            ref: scrollbarRef,
            clientSize: clientSize as number,
            layout,
            onScroll: onScrollbarScroll,
            ratio: ((clientSize as number) * 100) / estimatedTotalSize,
            scrollFrom: states.scrollOffset / (estimatedTotalSize - (clientSize as number)),
            total,
            alwaysOn: states.scrollbarAlwaysOn,
        });

        return React.createElement(
            'div',
            {
                key: 0,
                className: classNames(ns.e('wrapper'), states.scrollbarAlwaysOn ? 'always-on' : ''),
            },
            [listContainer, scrollbar],
        );
    });

    ListComponent.displayName = name ?? 'ElVirtualList';

    return ListComponent;
};

export default createList;
