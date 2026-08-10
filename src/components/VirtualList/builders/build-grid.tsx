import { namespace } from '@qsxy/element-plus-react/hooks/prefix';
import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import { useForceUpdate } from '@qsxy/element-plus-react/hooks/useForceUpdate';
import { isNumber, isUndefined, nextTick } from '@qsxy/element-plus-react/Util/base';
import { getScrollBarWidth } from '@qsxy/element-plus-react/Util/scroll';
import React, { CSSProperties, useCallback, useEffect, useMemo, useRef } from 'react';
import Scrollbar from '../components/scrollbar';
import { AUTO_ALIGNMENT, BACKWARD, FORWARD, RTL, RTL_OFFSET_NAG, RTL_OFFSET_POS_ASC, RTL_OFFSET_POS_DESC } from '../defaults';
import { useCache } from '../hooks/use-cache';
import { useGridTouch } from '../hooks/use-grid-touch';
import { useGridWheel } from '../hooks/use-grid-wheel';
import { VirtualizedGridProps } from '../props';
import { Alignment, GridConstructorProps, GridExposes, GridStates, Indices, ScrollbarExpose } from '../types';
import { getRTLOffsetType, getScrollDir, isRTL } from '../utils';

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
    validateProps,
}: GridConstructorProps<VirtualizedGridProps>) => {
    const GridComponent = ({ ref, ...props }: VirtualizedGridProps & { ref?: React.Ref<GridExposes | null> }) => {
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
            itemRendered,
            onScroll,
            children,
        } = props;

        validateProps(props);

        const ns = useClassNames('vl');
        const { forceUpdate: $forceUpdate } = useForceUpdate();

        const cache = useRef(initCache(props));
        // if (injectToInstance) {
        //     injectToInstance(cache);
        // }

        // refs
        const windowRef = useRef<HTMLElement | null>(null);
        const hScrollbarRef = useRef<ScrollbarExpose>(null);
        const vScrollbarRef = useRef<ScrollbarExpose>(null);
        const innerRef = useRef<HTMLElement | null>(null);

        // const [states, setStates] = useState<GridStates>({
        //     isScrolling: false,
        //     scrollLeft: isNumber(initScrollLeft) ? initScrollLeft : 0,
        //     scrollTop: isNumber(initScrollTop) ? initScrollTop : 0,
        //     updateRequested: false,
        //     xAxisScrollDir: FORWARD,
        //     yAxisScrollDir: FORWARD,
        // });
        const nextState = useRef<GridStates>({
            isScrolling: false,
            scrollLeft: isNumber(initScrollLeft) ? initScrollLeft : 0,
            scrollTop: isNumber(initScrollTop) ? initScrollTop : 0,
            updateRequested: false,
            xAxisScrollDir: FORWARD,
            yAxisScrollDir: FORWARD,
        });
        if (innerRef.current) {
            innerRef.current.style.pointerEvents = '';
        }
        const states = nextState.current;

        const getItemStyleCache = useCache();

        const parsedHeight = useMemo(() => Number.parseInt(`${height}`, 10), [height]);
        const parsedWidth = useMemo(() => Number.parseInt(`${width}`, 10), [width]);

        const columnsToRender = useCallback(() => {
            if (totalColumn === 0 || totalRow === 0) {
                return [0, 0, 0, 0];
            }

            const startIndex = getColumnStartIndexForOffset(props, nextState.current.scrollLeft, cache.current);
            const stopIndex = getColumnStopIndexForStartIndex(props, startIndex, nextState.current.scrollLeft, cache.current);

            const cacheBackward = !nextState.current.isScrolling || nextState.current.xAxisScrollDir === BACKWARD ? Math.max(1, columnCache) : 1;
            const cacheForward = !nextState.current.isScrolling || nextState.current.xAxisScrollDir === FORWARD ? Math.max(1, columnCache) : 1;

            return [Math.max(0, startIndex - cacheBackward), Math.max(0, Math.min(totalColumn - 1, stopIndex + cacheForward)), startIndex, stopIndex];
        }, [totalColumn, totalRow, props, columnCache]);

        const rowsToRender = useCallback(() => {
            if (totalColumn === 0 || totalRow === 0) {
                return [0, 0, 0, 0];
            }

            const startIndex = getRowStartIndexForOffset(props, nextState.current.scrollTop, cache.current);
            const stopIndex = getRowStopIndexForStartIndex(props, startIndex, nextState.current.scrollTop, cache.current);

            const cacheBackward = !nextState.current.isScrolling || nextState.current.yAxisScrollDir === BACKWARD ? Math.max(1, rowCache) : 1;
            const cacheForward = !nextState.current.isScrolling || nextState.current.yAxisScrollDir === FORWARD ? Math.max(1, rowCache) : 1;

            return [Math.max(0, startIndex - cacheBackward), Math.max(0, Math.min(totalRow - 1, stopIndex + cacheForward)), startIndex, stopIndex];
        }, [totalColumn, totalRow, props, rowCache]);

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

        const innerStyle = useCallback(() => {
            return {
                height: `${estimatedTotalHeight}px`,
                // pointerEvents: nextState.current.isScrolling ? 'none' : undefined,
                width: `${estimatedTotalWidth}px`,
                margin: 0,
                boxSizing: 'border-box',
            };
        }, [estimatedTotalWidth, estimatedTotalHeight]);

        const emitEvents = useCallback(() => {
            if (totalColumn > 0 && totalRow > 0) {
                const [columnCacheStart, columnCacheEnd, columnVisibleStart, columnVisibleEnd] = columnsToRender();
                const [rowCacheStart, rowCacheEnd, rowVisibleStart, rowVisibleEnd] = rowsToRender();
                // emit the render item event with
                // [xAxisInvisibleStart, xAxisInvisibleEnd, xAxisVisibleStart, xAxisVisibleEnd]
                // [yAxisInvisibleStart, yAxisInvisibleEnd, yAxisVisibleStart, yAxisVisibleEnd]
                itemRendered?.({
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

            const { scrollLeft, scrollTop, updateRequested, xAxisScrollDir, yAxisScrollDir } = nextState.current;
            onScroll?.({
                xAxisScrollDir,
                scrollLeft,
                yAxisScrollDir,
                scrollTop,
                updateRequested,
            });
        }, [columnsToRender, itemRendered, onScroll, rowsToRender, totalColumn, totalRow]);

        const resetIsScrolling = useCallback(() => {
            // setStates(prev => ({ ...prev, isScrolling: false }));
            nextState.current.isScrolling = false;
            if (innerRef.current) {
                innerRef.current.style.pointerEvents = '';
            }
            nextTick(() => {
                getItemStyleCache(-1, null, null);
            }, 0);
        }, [getItemStyleCache]);

        const onUpdated = useCallback(() => {
            const windowElement = windowRef.current;
            if (nextState.current?.updateRequested && windowElement) {
                if (direction === RTL) {
                    switch (getRTLOffsetType()) {
                        case RTL_OFFSET_NAG: {
                            windowElement.scrollLeft = -nextState.current.scrollLeft;
                            break;
                        }
                        case RTL_OFFSET_POS_ASC: {
                            windowElement.scrollLeft = nextState.current.scrollLeft;
                            break;
                        }
                        default: {
                            const { clientWidth, scrollWidth } = windowElement;
                            windowElement.scrollLeft = scrollWidth - clientWidth - nextState.current.scrollLeft;
                            break;
                        }
                    }
                } else {
                    windowElement.scrollLeft = Math.max(0, nextState.current.scrollLeft);
                }

                windowElement.scrollTop = Math.max(0, nextState.current.scrollTop);
            }
        }, [direction]);

        const scrollTo = useCallback(
            ({ scrollLeft = nextState.current.scrollLeft, scrollTop = nextState.current.scrollTop }: { scrollLeft?: number; scrollTop?: number }) => {
                scrollLeft = Math.max(scrollLeft, 0);
                scrollTop = Math.max(scrollTop, 0);

                if (scrollTop === nextState.current.scrollTop && scrollLeft === nextState.current.scrollLeft) {
                    return;
                }

                nextState.current = {
                    ...nextState.current,
                    xAxisScrollDir: getScrollDir(nextState.current.scrollLeft, scrollLeft),
                    yAxisScrollDir: getScrollDir(nextState.current.scrollTop, scrollTop),
                    scrollLeft,
                    scrollTop,
                    updateRequested: true,
                };
                // setStates(nextState.current);

                // nextTick(() => resetIsScrolling());
                resetIsScrolling();
                onUpdated();
                emitEvents();
            },
            [onUpdated, emitEvents, resetIsScrolling],
        );

        const handleScroll = useCallback(
            (e: React.UIEvent<HTMLDivElement>) => {
                const { clientHeight, clientWidth, scrollHeight, scrollLeft, scrollTop, scrollWidth } = e.currentTarget;

                if (nextState.current.scrollTop === scrollTop && nextState.current.scrollLeft === scrollLeft) {
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

                nextState.current = {
                    ...nextState.current,
                    isScrolling: true,
                    scrollLeft: _scrollLeft,
                    scrollTop: Math.max(0, Math.min(scrollTop, scrollHeight - clientHeight)),
                    updateRequested: true,
                    xAxisScrollDir: getScrollDir(nextState.current.scrollLeft, _scrollLeft),
                    yAxisScrollDir: getScrollDir(nextState.current.scrollTop, scrollTop),
                };
                if (innerRef.current) {
                    innerRef.current.style.pointerEvents = 'none';
                }
                // setStates(nextState.current);

                nextTick(() => resetIsScrolling());
                // resetIsScrolling();
                onUpdated();
                emitEvents();
            },
            [direction, onUpdated, emitEvents, resetIsScrolling],
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
                    scrollLeft: getColumnOffset(
                        props,
                        columnIdx,
                        alignment,
                        nextState.current.scrollLeft,
                        cache.current,
                        estimatedTotalWidth > (width as number) ? scrollBarWidth : 0,
                    ),
                    scrollTop: getRowOffset(props, rowIndex, alignment, nextState.current.scrollTop, cache.current, estimatedTotalHeight > (height as number) ? scrollBarWidth : 0),
                });
            },
            [totalColumn, totalRow, scrollTo, props, estimatedTotalWidth, width, estimatedTotalHeight, height],
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
                    const [_height, top] = getRowPosition(props, rowIndex, cache.current);
                    const [_width] = getColumnPosition(props, columnIndex, cache.current);

                    itemStyleCache[key] = {
                        position: 'absolute',
                        left: rtl ? undefined : `${left}px`,
                        right: rtl ? `${left}px` : undefined,
                        top: `${top}px`,
                        height: `${_height}px`,
                        width: `${_width}px`,
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

        const resetAfter = useCallback(
            ({ columnIndex, rowIndex }: Indices, forceUpdate?: boolean) => {
                forceUpdate = isUndefined(forceUpdate) ? true : forceUpdate;

                if (isNumber(columnIndex)) {
                    cache.current.lastVisitedColumnIndex = Math.min(cache.current.lastVisitedColumnIndex, columnIndex - 1);
                }

                if (isNumber(rowIndex)) {
                    cache.current.lastVisitedRowIndex = Math.min(cache.current.lastVisitedRowIndex, rowIndex - 1);
                }

                getItemStyleCache(-1, null, null);

                if (forceUpdate) {
                    $forceUpdate();
                }
            },
            [$forceUpdate, getItemStyleCache],
        );

        const resetAfterColumnIndex = useCallback(
            (columnIndex: number, forceUpdate: boolean) => {
                resetAfter(
                    {
                        columnIndex,
                    },
                    forceUpdate,
                );
            },
            [resetAfter],
        );

        const resetAfterRowIndex = useCallback(
            (rowIndex: number, forceUpdate: boolean) => {
                resetAfter(
                    {
                        rowIndex,
                    },
                    forceUpdate,
                );
            },
            [resetAfter],
        );

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
                resetAfter,
                resetAfterColumnIndex,
                resetAfterRowIndex,
                forceUpdate: $forceUpdate,
            }),
            [
                getItemStyleCache,
                touchStartX,
                touchStartY,
                handleTouchStart,
                handleTouchMove,
                scrollTo,
                scrollToItem,
                states,
                resetAfter,
                resetAfterColumnIndex,
                resetAfterRowIndex,
                $forceUpdate,
            ],
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
                scrollFrom: nextState.current.scrollLeft / (estimatedTotalWidth - parsedWidth),
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
                scrollFrom: nextState.current.scrollTop / (estimatedTotalHeight - parsedHeight),
                total: totalColumn,
                visible: true,
            });

            return { horizontalScrollbar, verticalScrollbar };
        };

        const renderItems = useCallback(() => {
            const [columnStart, columnEnd] = columnsToRender();
            const [rowStart, rowEnd] = rowsToRender();
            const nodes: React.ReactNode[] = [];

            if (totalRow > 0 && totalColumn > 0) {
                for (let row = rowStart; row <= rowEnd; row++) {
                    for (let column = columnStart; column <= columnEnd; column++) {
                        const key = itemKey({ columnIndex: column, data, rowIndex: row });
                        nodes.push(
                            React.createElement(
                                React.Fragment,
                                { key },
                                children
                                    ? children({
                                          columnIndex: column,
                                          data,
                                          isScrolling: useIsScrolling ? nextState.current.isScrolling : undefined,
                                          style: getItemStyle(row, column),
                                          rowIndex: row,
                                      })
                                    : null,
                            ),
                        );
                    }
                }
            }
            return nodes;
        }, [children, columnsToRender, data, getItemStyle, itemKey, rowsToRender, totalColumn, totalRow, useIsScrolling]);

        const { horizontalScrollbar, verticalScrollbar } = renderScrollbars();

        const renderInner = useCallback(() => {
            const childrenNodes = renderItems();
            return React.createElement(
                Inner as any,
                {
                    ...innerProps,
                    style: innerStyle(),
                    ref: innerRef,
                },
                childrenNodes,
            );
        }, [renderItems, Inner, innerProps, innerStyle]);

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
                    renderInner(),
                ),
                horizontalScrollbar,
                verticalScrollbar,
            ],
        );
    };

    GridComponent.displayName = name ?? 'ElVirtualGrid';

    return GridComponent;
};

export default createGrid;
