import React, { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useClassNames } from '../../hooks';
import { namespace } from '../../hooks/prefix';
import { getScrollBarWidth, isNumber, nextTick } from '../../Util';
import Scrollbar from '../components/scrollbar';
import { AUTO_ALIGNMENT, BACKWARD, FORWARD, RTL, RTL_OFFSET_NAG, RTL_OFFSET_POS_ASC, RTL_OFFSET_POS_DESC } from '../defaults';
import { useCache } from '../hooks/use-cache';
import { useGridTouch } from '../hooks/use-grid-touch';
import { useGridWheel } from '../hooks/use-grid-wheel';
import { getRTLOffsetType, getScrollDir, isRTL } from '../utils';

import { VirtualizedGridProps } from '../props';
import { Alignment, GridConstructorProps, GridExposes, GridStates, ScrollbarExpose } from '../types';

const createGrid = ({
    name,
    clearCache,
    getColumnPosition,
    getColumnStartIndexForOffset,
    getColumnStopIndexForStartIndex,
    getEstimatedTotalHeight,
    getEstimatedTotalWidth,
    getColumnOffset,
    getRowOffset,
    getRowPosition,
    getRowStartIndexForOffset,
    getRowStopIndexForStartIndex,
    initCache,
    injectToInstance,
    validateProps,
    itemRendered,
    onScroll,
}: GridConstructorProps<VirtualizedGridProps>) => {
    const GridComponent = React.forwardRef<GridExposes, VirtualizedGridProps>((props, ref) => {
        const {
            totalColumn,
            totalRow,
            columnCache = 2,
            rowCache = 2,
            data = [],
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
            scrollbarStartGap = 0,
            scrollbarEndGap = 2,
            itemKey = ({ columnIndex, rowIndex }: { columnIndex: number; rowIndex: number }) => `${rowIndex}:${columnIndex}`,
            initScrollLeft = 0,
            initScrollTop = 0,
            children,
        } = props;

        validateProps(props);

        const ns = useClassNames('vl');

        const cache = useRef(initCache(props));
        if (injectToInstance) {
            injectToInstance(cache);
        }

        // refs
        const windowRef = useRef<HTMLElement | null>(null);
        const hScrollbarRef = useRef<ScrollbarExpose>(null);
        const vScrollbarRef = useRef<ScrollbarExpose>(null);
        const innerRef = useRef<HTMLElement | null>(null);

        const [states, setStates] = useState<GridStates>({
            isScrolling: false,
            scrollLeft: isNumber(initScrollLeft) ? initScrollLeft : 0,
            scrollTop: isNumber(initScrollTop) ? initScrollTop : 0,
            updateRequested: false,
            xAxisScrollDir: FORWARD,
            yAxisScrollDir: FORWARD,
        });

        const getItemStyleCache = useCache();

        const parsedHeight = useMemo(() => Number.parseInt(`${height}`, 10), [height]);
        const parsedWidth = useMemo(() => Number.parseInt(`${width}`, 10), [width]);

        const columnsToRender = useMemo(() => {
            if (totalColumn === 0 || totalRow === 0) {
                return [0, 0, 0, 0];
            }

            const startIndex = getColumnStartIndexForOffset(props, states.scrollLeft, cache.current);
            const stopIndex = getColumnStopIndexForStartIndex(props, startIndex, states.scrollLeft, cache.current);

            const cacheBackward = !states.isScrolling || states.xAxisScrollDir === BACKWARD ? Math.max(1, columnCache) : 1;
            const cacheForward = !states.isScrolling || states.xAxisScrollDir === FORWARD ? Math.max(1, columnCache) : 1;

            return [Math.max(0, startIndex - cacheBackward), Math.max(0, Math.min(totalColumn - 1, stopIndex + cacheForward)), startIndex, stopIndex];
        }, [totalColumn, totalRow, props, states.scrollLeft, states.isScrolling, states.xAxisScrollDir, columnCache]);

        const rowsToRender = useMemo(() => {
            if (totalColumn === 0 || totalRow === 0) {
                return [0, 0, 0, 0];
            }

            const startIndex = getRowStartIndexForOffset(props, states.scrollTop, cache.current);
            const stopIndex = getRowStopIndexForStartIndex(props, startIndex, states.scrollTop, cache.current);

            const cacheBackward = !states.isScrolling || states.yAxisScrollDir === BACKWARD ? Math.max(1, rowCache) : 1;
            const cacheForward = !states.isScrolling || states.yAxisScrollDir === FORWARD ? Math.max(1, rowCache) : 1;

            return [Math.max(0, startIndex - cacheBackward), Math.max(0, Math.min(totalRow - 1, stopIndex + cacheForward)), startIndex, stopIndex];
        }, [totalColumn, totalRow, props, states.scrollTop, states.isScrolling, states.yAxisScrollDir, rowCache]);

        const estimatedTotalHeight = useMemo(() => getEstimatedTotalHeight(props, cache.current), [props]);
        const estimatedTotalWidth = useMemo(() => getEstimatedTotalWidth(props, cache.current), [props]);

        const windowStyle = useMemo<CSSProperties[]>(
            () => [
                {
                    position: 'relative',
                    overflow: 'hidden',
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
            [direction, height, width, style],
        );

        const innerStyle = useMemo<CSSProperties>(() => {
            const width = `${estimatedTotalWidth}px`;
            const height = `${estimatedTotalHeight}px`;

            return {
                height,
                pointerEvents: states.isScrolling ? 'none' : undefined,
                width,
                margin: 0,
                boxSizing: 'border-box',
            };
        }, [estimatedTotalWidth, estimatedTotalHeight, states.isScrolling]);

        const emitEvents = useCallback(() => {
            if (totalColumn > 0 && totalRow > 0) {
                const [columnCacheStart, columnCacheEnd, columnVisibleStart, columnVisibleEnd] = columnsToRender;
                const [rowCacheStart, rowCacheEnd, rowVisibleStart, rowVisibleEnd] = rowsToRender;
                // emit the render item event with
                // [xAxisInvisibleStart, xAxisInvisibleEnd, xAxisVisibleStart, xAxisVisibleEnd]
                // [yAxisInvisibleStart, yAxisInvisibleEnd, yAxisVisibleStart, yAxisVisibleEnd]
                itemRendered({
                    columnCacheStart,
                    columnCacheEnd,
                    rowCacheStart,
                    rowCacheEnd,
                    columnVisibleStart,
                    columnVisibleEnd,
                    rowVisibleStart,
                    rowVisibleEnd,
                });
            }

            const { scrollLeft, scrollTop, updateRequested, xAxisScrollDir, yAxisScrollDir } = states;
            onScroll?.({
                xAxisScrollDir,
                scrollLeft,
                yAxisScrollDir,
                scrollTop,
                updateRequested,
            });
        }, [columnsToRender, rowsToRender, states, totalColumn, totalRow]);

        const resetIsScrolling = useCallback(() => {
            setStates(prev => ({ ...prev, isScrolling: false }));
            nextTick(() => {
                getItemStyleCache(-1, null, null);
            }, 0);
        }, [getItemStyleCache]);

        const onUpdated = useCallback(() => {
            const windowElement = windowRef.current;
            if (states.updateRequested && windowElement) {
                if (direction === RTL) {
                    switch (getRTLOffsetType()) {
                        case RTL_OFFSET_NAG: {
                            windowElement.scrollLeft = -states.scrollLeft;
                            break;
                        }
                        case RTL_OFFSET_POS_ASC: {
                            windowElement.scrollLeft = states.scrollLeft;
                            break;
                        }
                        default: {
                            const { clientWidth, scrollWidth } = windowElement;
                            windowElement.scrollLeft = scrollWidth - clientWidth - states.scrollLeft;
                            break;
                        }
                    }
                } else {
                    windowElement.scrollLeft = Math.max(0, states.scrollLeft);
                }

                windowElement.scrollTop = Math.max(0, states.scrollTop);
            }
        }, [states.updateRequested, states.scrollLeft, states.scrollTop, direction]);

        const scrollTo = useCallback(
            ({ scrollLeft = states.scrollLeft, scrollTop = states.scrollTop }: { scrollLeft?: number; scrollTop?: number }) => {
                scrollLeft = Math.max(scrollLeft, 0);
                scrollTop = Math.max(scrollTop, 0);

                if (scrollTop === states.scrollTop && scrollLeft === states.scrollLeft) {
                    return;
                }

                setStates(prev => ({
                    ...prev,
                    xAxisScrollDir: getScrollDir(prev.scrollLeft, scrollLeft),
                    yAxisScrollDir: getScrollDir(prev.scrollTop, scrollTop),
                    scrollLeft,
                    scrollTop,
                    updateRequested: true,
                }));

                nextTick(() => resetIsScrolling());
                onUpdated();
                emitEvents();
            },
            [states.scrollLeft, states.scrollTop, onUpdated, emitEvents, resetIsScrolling],
        );

        const handleScroll = useCallback(
            (e: React.UIEvent<HTMLDivElement>) => {
                const { clientHeight, clientWidth, scrollHeight, scrollLeft, scrollTop, scrollWidth } = e.currentTarget;

                if (states.scrollTop === scrollTop && states.scrollLeft === scrollLeft) {
                    return;
                }

                let _scrollLeft = scrollLeft;

                if (isRTL(direction)) {
                    switch (getRTLOffsetType()) {
                        case RTL_OFFSET_NAG:
                            _scrollLeft = -scrollLeft;
                            break;
                        case RTL_OFFSET_POS_DESC:
                            _scrollLeft = scrollWidth - clientWidth - scrollLeft;
                            break;
                    }
                }

                setStates(prev => ({
                    ...prev,
                    isScrolling: true,
                    scrollLeft: _scrollLeft,
                    scrollTop: Math.max(0, Math.min(scrollTop, scrollHeight - clientHeight)),
                    updateRequested: true,
                    xAxisScrollDir: getScrollDir(prev.scrollLeft, _scrollLeft),
                    yAxisScrollDir: getScrollDir(prev.scrollTop, scrollTop),
                }));

                nextTick(() => resetIsScrolling());
                onUpdated();
                emitEvents();
            },
            [states.scrollTop, states.scrollLeft, direction, onUpdated, emitEvents, resetIsScrolling],
        );

        const onVerticalScroll = useCallback(
            (distance: number, totalSteps: number) => {
                const offset = ((estimatedTotalHeight - parsedHeight) / totalSteps) * distance;
                scrollTo({
                    scrollTop: Math.min(estimatedTotalHeight - parsedHeight, offset),
                });
            },
            [estimatedTotalHeight, parsedHeight, scrollTo],
        );

        const onHorizontalScroll = useCallback(
            (distance: number, totalSteps: number) => {
                const offset = ((estimatedTotalWidth - parsedWidth) / totalSteps) * distance;
                scrollTo({
                    scrollLeft: Math.min(estimatedTotalWidth - parsedWidth, offset),
                });
            },
            [estimatedTotalWidth, parsedWidth, scrollTo],
        );

        const { onWheel } = useGridWheel(
            {
                atXStartEdge: states.scrollLeft <= 0,
                atXEndEdge: states.scrollLeft >= estimatedTotalWidth - parsedWidth,
                atYStartEdge: states.scrollTop <= 0,
                atYEndEdge: states.scrollTop >= estimatedTotalHeight - parsedHeight,
            },
            (x: number, y: number) => {
                hScrollbarRef.current?.onMouseUp?.();
                vScrollbarRef.current?.onMouseUp?.();
                scrollTo({
                    scrollLeft: Math.min(states.scrollLeft + x, estimatedTotalWidth - parsedWidth),
                    scrollTop: Math.min(states.scrollTop + y, estimatedTotalHeight - parsedHeight),
                });
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

        const { touchStartX, touchStartY, handleTouchStart, handleTouchMove } = useGridTouch(
            windowRef,
            states,
            scrollTo,
            estimatedTotalWidth,
            estimatedTotalHeight,
            parsedWidth,
            parsedHeight,
        );

        const scrollToItem = useCallback(
            (rowIndex = 0, columnIdx = 0, alignment: Alignment = AUTO_ALIGNMENT) => {
                columnIdx = Math.max(0, Math.min(columnIdx, totalColumn - 1));
                rowIndex = Math.max(0, Math.min(rowIndex, totalRow - 1));
                const scrollBarWidth = getScrollBarWidth(namespace);

                scrollTo({
                    scrollLeft: getColumnOffset(props, columnIdx, alignment, states.scrollLeft, cache.current, estimatedTotalWidth > (width as number) ? scrollBarWidth : 0),
                    scrollTop: getRowOffset(props, rowIndex, alignment, states.scrollTop, cache.current, estimatedTotalHeight > (height as number) ? scrollBarWidth : 0),
                });
            },
            [totalColumn, totalRow, scrollTo, props, states.scrollLeft, states.scrollTop, estimatedTotalWidth, width, estimatedTotalHeight, height],
        );

        const getItemStyle = useCallback(
            (rowIndex: number, columnIndex: number) => {
                const itemStyleCache = getItemStyleCache(clearCache && props.columnWidth, clearCache && props.rowHeight, clearCache && direction);
                const key = `${rowIndex},${columnIndex}`;

                if (Object.prototype.hasOwnProperty.call(itemStyleCache, key)) {
                    return itemStyleCache[key] as CSSProperties;
                } else {
                    const [, left] = getColumnPosition(props, columnIndex, cache.current);
                    const rtl = isRTL(direction);
                    const [height, top] = getRowPosition(props, rowIndex, cache.current);
                    const [width] = getColumnPosition(props, columnIndex, cache.current);

                    itemStyleCache[key] = {
                        position: 'absolute',
                        left: rtl ? undefined : `${left}px`,
                        right: rtl ? `${left}px` : undefined,
                        top: `${top}px`,
                        height: `${height}px`,
                        width: `${width}px`,
                    };

                    return itemStyleCache[key] as CSSProperties;
                }
            },
            [getItemStyleCache, direction, props],
        );

        // Mount effect
        useEffect(() => {
            const windowElement = windowRef.current;
            if (windowElement) {
                if (isNumber(initScrollLeft)) {
                    windowElement.scrollLeft = initScrollLeft;
                }
                if (isNumber(initScrollTop)) {
                    windowElement.scrollTop = initScrollTop;
                }
            }
            emitEvents();
        }, []);

        // Expose methods via ref
        React.useImperativeHandle(
            ref,
            () => ({
                windowRef,
                innerRef,
                getItemStyleCache,
                touchStartX,
                touchStartY,
                handleTouchStart,
                handleTouchMove,
                scrollTo,
                scrollToItem,
                states,
            }),
            [scrollTo, scrollToItem, states, getItemStyleCache, touchStartX, touchStartY, handleTouchStart, handleTouchMove],
        );

        const renderScrollbars = () => {
            const horizontalScrollbar = React.createElement(Scrollbar, {
                ref: hScrollbarRef,
                alwaysOn: scrollbarAlwaysOn,
                startGap: scrollbarStartGap,
                endGap: scrollbarEndGap,
                class: ns.e('horizontal'),
                clientSize: parsedWidth,
                layout: 'horizontal',
                onScroll: onHorizontalScroll,
                ratio: (parsedWidth * 100) / estimatedTotalWidth,
                scrollFrom: states.scrollLeft / (estimatedTotalWidth - parsedWidth),
                total: totalRow,
                visible: true,
            });

            const verticalScrollbar = React.createElement(Scrollbar, {
                ref: vScrollbarRef,
                alwaysOn: scrollbarAlwaysOn,
                startGap: scrollbarStartGap,
                endGap: scrollbarEndGap,
                class: ns.e('vertical'),
                clientSize: parsedHeight,
                layout: 'vertical',
                onScroll: onVerticalScroll,
                ratio: (parsedHeight * 100) / estimatedTotalHeight,
                scrollFrom: states.scrollTop / (estimatedTotalHeight - parsedHeight),
                total: totalColumn,
                visible: true,
            });

            return { horizontalScrollbar, verticalScrollbar };
        };

        const renderItems = () => {
            const [columnStart, columnEnd] = columnsToRender;
            const [rowStart, rowEnd] = rowsToRender;
            const nodes: React.ReactNode[] = [];

            if (totalRow > 0 && totalColumn > 0) {
                for (let row = rowStart; row <= rowEnd; row++) {
                    for (let column = columnStart; column <= columnEnd; column++) {
                        const key = itemKey({ columnIndex: column, data, rowIndex: row });
                        nodes.push(
                            React.createElement(
                                React.Fragment,
                                { key },
                                React.cloneElement(children as React.ReactElement, {
                                    columnIndex: column,
                                    data,
                                    isScrolling: useIsScrolling ? states.isScrolling : undefined,
                                    style: getItemStyle(row, column),
                                    rowIndex: row,
                                }),
                            ),
                        );
                    }
                }
            }
            return nodes;
        };

        const { horizontalScrollbar, verticalScrollbar } = renderScrollbars();

        const renderInner = () => {
            const childrenNodes = renderItems();
            const InnerNode = React.createElement(
                Inner as any,
                {
                    ...innerProps,
                    style: innerStyle,
                    ref: innerRef,
                },
                childrenNodes,
            );

            return InnerNode;
        };

        const InnerNode = renderInner();

        return React.createElement(
            'div',
            {
                key: 0,
                className: ns.e('wrapper'),
                role: props.role,
            },
            [
                React.createElement(
                    Container as any,
                    {
                        className: className,
                        style: Object.assign({}, ...windowStyle),
                        onScroll: handleScroll,
                        ref: windowRef,
                    },
                    InnerNode,
                ),
                horizontalScrollbar,
                verticalScrollbar,
            ],
        );
    });

    GridComponent.displayName = name ?? 'ElVirtualGrid';

    return GridComponent;
};

export default createGrid;
