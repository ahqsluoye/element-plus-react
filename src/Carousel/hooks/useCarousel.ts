import { usePrevious } from 'ahooks';
import throttle from 'lodash/throttle';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { isString, warning } from '../../Util/base';
import { CarouselItemContext, CarouselProps } from '../typings';

const THROTTLE_TIME = 300;

export const useCarousel = (props: CarouselProps) => {
    const { direction, arrow, height, type, autoplay, loop, interval, pauseOnHover, trigger, initialIndex, onChange } = props;
    const [items, setItem] = useState<CarouselItemContext[]>([]);

    const addItem = (item: CarouselItemContext) => setItem(pre => [...pre, item]);

    const removeItem = (uid: string) => setItem(pre => pre.filter(children => children.uid !== uid));

    const [activeIndex, setActiveIndex] = useState(-1);
    const [hover, setHover] = useState(false);
    const [containerHeight, setHeight] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const preActiveIndex = usePrevious(activeIndex);

    const timer = useRef<ReturnType<typeof setInterval> | null>(null);
    const root = useRef<HTMLDivElement>();
    const isItemsTwoLength = useRef(true);
    const isTransition = useRef(false);
    const resizeObserver = useRef<ResizeObserver>();
    const isFirstCall = useRef(true);
    const itemLen = useRef(0);
    const activeIndexRef = useRef(-1);

    const isVertical = useMemo(() => direction === 'vertical', [direction]);
    const arrowDisplay = useMemo(() => arrow !== 'never' && !isVertical, [arrow, isVertical]);

    const hasLabel = useMemo(() => {
        return items.some(item => item.props?.label?.toString()?.length > 0);
    }, [items]);

    const isCardType = useMemo(() => type === 'card', [type]);

    const containerStyle = useMemo(() => {
        if (height !== 'auto') {
            return {
                height: height,
            };
        }
        return {
            height: containerHeight,
            overflow: 'hidden',
        };
    }, [containerHeight, height]);

    const resetItemPosition = useCallback(
        (oldIndex?: number) => {
            items.forEach((item, index) => {
                item.translateItem(index, activeIndex, oldIndex);
            });
        },
        [activeIndex, items],
    );

    const playSlides = useCallback(() => {
        if (!isFirstCall.current && !isTransition.current) {
            isTransition.current = true;
            setIsTransitioning(true);
        }
        isFirstCall.current = false;

        if (activeIndexRef.current < itemLen.current - 1) {
            setActiveIndex(pre => pre + 1);
        } else if (loop) {
            setActiveIndex(0);
        } else {
            isTransition.current = false;
            setIsTransitioning(false);
        }
    }, [loop]);

    const startTimer = useCallback(() => {
        if (interval <= 0 || !autoplay || timer.current) {
            return;
        }
        timer.current = setInterval(() => playSlides(), interval);
    }, [autoplay, interval, playSlides]);

    const pauseTimer = useCallback(() => {
        if (timer.current) {
            clearInterval(timer.current);
            timer.current = null;
        }
    }, []);

    const resetTimer = useCallback(() => {
        pauseTimer();
        if (!pauseOnHover) {
            startTimer();
        }
    }, [pauseOnHover, pauseTimer, startTimer]);

    const setActiveItem = useCallback(
        (index: number | string) => {
            if (!isFirstCall.current) {
                isTransition.current = true;
                setIsTransitioning(true);
            }
            isFirstCall.current = false;

            if (isString(index)) {
                const filteredItems = items.filter(item => item.props.name === index);
                if (filteredItems.length > 0) {
                    index = items.indexOf(filteredItems[0]);
                }
            }
            index = Number(index);
            if (Number.isNaN(index) || index !== Math.floor(index)) {
                warning(false, 'component ElCarouselItem: index must be integer.');
                return;
            }
            const itemCount = items.length;
            const oldIndex = activeIndex;
            if (index < 0) {
                setActiveIndex(loop ? itemCount - 1 : 0);
            } else if (index >= itemCount) {
                setActiveIndex(loop ? 0 : itemCount - 1);
            } else {
                setActiveIndex(index);
            }
            if (oldIndex === activeIndex) {
                resetItemPosition(oldIndex);
            }
            resetTimer();
        },
        [activeIndex, isFirstCall, items, loop, resetItemPosition, resetTimer],
    );

    const throttledArrowClick = useCallback(
        (index: number) => {
            setActiveItem(index);
        },
        [setActiveItem],
    );

    const handleIndicatorHover = useCallback(
        (index: number) => {
            if (trigger === 'hover' && index !== activeIndex) {
                setActiveIndex(index);
                if (!isFirstCall.current) {
                    isTransition.current = true;
                    setIsTransitioning(true);
                }
            }
        },
        [activeIndex, isFirstCall, trigger],
    );

    const throttledIndicatorHover = useCallback(
        (index: number) => {
            handleIndicatorHover(index);
        },
        [handleIndicatorHover],
    );

    const isTwoLengthShow = useCallback(
        (index: number) => {
            if (!isItemsTwoLength.current) {
                return true;
            }
            return activeIndex <= 1 ? index <= 1 : index > 1;
        },
        [activeIndex],
    );

    const itemInStage = useCallback(
        (item: CarouselItemContext, index: number) => {
            const itemCount = items.length;
            if (itemCount === 0 || !item.states.inStage) {
                return false;
            }
            const nextItemIndex = index + 1;
            const prevItemIndex = index - 1;
            const lastItemIndex = itemCount - 1;
            const isLastItemActive = items[lastItemIndex].states.active;
            const isFirstItemActive = items[0].states.active;
            const isNextItemActive = items[nextItemIndex]?.states?.active;
            const isPrevItemActive = items[prevItemIndex]?.states?.active;

            if ((index === lastItemIndex && isFirstItemActive) || isNextItemActive) {
                return 'left';
            } else if ((index === 0 && isLastItemActive) || isPrevItemActive) {
                return 'right';
            }
            return false;
        },
        [items],
    );

    const handleMouseEnter = useCallback(() => {
        setHover(true);
        if (pauseOnHover) {
            pauseTimer();
        }
    }, [pauseOnHover, pauseTimer]);

    const handleMouseLeave = useCallback(() => {
        setHover(false);
        startTimer();
    }, [startTimer]);

    const handleTransitionEnd = useCallback(() => {
        isTransition.current = false;
        setIsTransitioning(false);
    }, []);

    const handleButtonEnter = useCallback(
        (_arrow: 'left' | 'right') => {
            if (isVertical) {
                return;
            }
            items.forEach((item, index) => {
                // @ts-ignore
                if (_arrow === itemInStage(item, index)) {
                    item.setState({ hover: true });
                }
            });
        },
        [isVertical, itemInStage, items],
    );

    const handleButtonLeave = useCallback(() => {
        if (isVertical) {
            return;
        }
        items.forEach(item => {
            item.setState({ hover: false });
        });
    }, [isVertical, items]);

    const handleIndicatorClick = (index: number) => {
        if (index !== activeIndex) {
            if (!isFirstCall.current) {
                isTransition.current = true;
                setIsTransitioning(true);
            }
        }
        setActiveIndex(index);
    };

    const prev = useCallback(() => {
        setActiveItem(activeIndex - 1);
    }, [activeIndex, setActiveItem]);

    const next = useCallback(() => {
        setActiveItem(activeIndex + 1);
    }, [activeIndex, setActiveItem]);

    const setContainerHeight = useCallback(
        (_height: string | number) => {
            if (height !== 'auto') {
                return;
            }
            setHeight(_height as unknown as number);
        },
        [height],
    );

    // const PlaceholderItem=() =>{
    //     // fix: https://github.com/element-plus/element-plus/issues/12139
    //     const defaultSlots = slots.default?.();
    //     if (!defaultSlots) return null;

    //     const flatSlots = flattedChildren(defaultSlots);

    //     const normalizeSlots = flatSlots.filter(slot => {
    //         return isVNode(slot) && (slot.type as any).name === CAROUSEL_ITEM_NAME;
    //     });

    //     if (normalizeSlots?.length === 2 && loop && !isCardType) {
    //         isItemsTwoLength = true;
    //         return normalizeSlots;
    //     }
    //     isItemsTwoLength = false;
    //     return null;
    // }

    useEffect(() => {
        activeIndexRef.current = activeIndex;
        resetItemPosition(preActiveIndex);
        let current, _prev;
        if (isItemsTwoLength.current) {
            current = activeIndex % 2;
            _prev = preActiveIndex % 2;
        }
        if (preActiveIndex > -1) {
            onChange?.(current, _prev);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIndex]);

    useEffect(() => {
        setActiveItem(activeIndex);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loop]);

    useEffect(() => {
        resetTimer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [interval]);

    useEffect(() => {
        if (items.length > 0) {
            setActiveItem(initialIndex);
        }
        itemLen.current = items.length;
        isItemsTwoLength.current = items?.length === 2 && props.loop && !isCardType;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items]);

    useEffect(() => {
        if (autoplay) {
            startTimer();
        } else {
            pauseTimer();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoplay, items.length]);

    useEffect(() => {
        if (root.current) {
            resizeObserver.current = new ResizeObserver(() => {
                resetItemPosition();
            });
            resizeObserver.current.observe(root.current);
            startTimer();
        }

        return () => {
            pauseTimer();
            if (resizeObserver.current) {
                resizeObserver.current.disconnect();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        items,
        addItem,
        removeItem,
        setContainerHeight,
        root,
        activeIndex,
        arrowDisplay,
        hasLabel,
        hover,
        isCardType,
        isTransitioning,
        isVertical,
        containerStyle,
        isItemsTwoLength,
        handleButtonEnter,
        handleTransitionEnd,
        handleButtonLeave,
        handleIndicatorClick,
        handleMouseEnter,
        handleMouseLeave,
        setActiveItem,
        prev,
        next,
        // PlaceholderItem,
        isTwoLengthShow,
        throttledArrowClick: throttle(throttledArrowClick, THROTTLE_TIME, { trailing: true }),
        throttledIndicatorHover: throttle(throttledIndicatorHover, THROTTLE_TIME),
    };
};
