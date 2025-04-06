import omit from 'lodash/omit';
import { useCallback, useEffect, useId, useImperativeHandle, useReducer, useRef } from 'react';
import { useCarouselContext } from '../CarouselContext';
import { CarouselItemAction, CarouselItemProps, CarouselItemRef, CarouselItemStates } from '../typings';

export const useCarouselItem = (props: CarouselItemProps) => {
    const { isCardType, loop, isVertical, cardScale, root, items, addItem, removeItem, setActiveItem, setContainerHeight } = useCarouselContext();

    const id = useId();

    const carouselItemRef = useRef<HTMLDivElement>(null);
    const ref = useRef<CarouselItemRef>(null);

    const reducer = (state: CarouselItemStates, action: CarouselItemAction) => {
        switch (action.type) {
            case 'setState':
                return { ...state, ...action.payload };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, { ready: false, hover: false, translate: 0, scale: 1, animating: false, active: false, inStage: false });
    const setState = (_state: Partial<CarouselItemStates>) =>
        dispatch({
            type: 'setState',
            payload: _state,
        });

    const calcCardTranslate = useCallback(
        (index: number, activeIndex: number, inStage: boolean) => {
            const parentWidth = isVertical ? root.current?.offsetHeight || 0 : root.current?.offsetWidth || 0;

            if (inStage) {
                return (parentWidth * ((2 - cardScale) * (index - activeIndex) + 1)) / 4;
            } else if (index < activeIndex) {
                return (-(1 + cardScale) * parentWidth) / 4;
            } else {
                return ((3 + cardScale) * parentWidth) / 4;
            }
        },
        [cardScale, isVertical, root],
    );

    const calcTranslate = useCallback(
        (index: number, activeIndex: number) => {
            const rootEl = root.current;
            if (!rootEl) {
                return 0;
            }

            const distance = (isVertical ? rootEl.offsetHeight : rootEl.offsetWidth) || 0;
            return distance * (index - activeIndex);
        },
        [isVertical, root],
    );

    const translateItem = useCallback(
        (index: number, activeIndex: number, oldIndex?: number) => {
            const carouselItemLength = items.length ?? Number.NaN;

            const isActive = index === activeIndex;
            if (!isCardType && oldIndex != undefined) {
                setState({ animating: isActive || index === oldIndex });
            }

            if (!isActive && carouselItemLength > 2 && loop) {
                index = processIndex(index, activeIndex, carouselItemLength);
            }

            setState({ active: isActive });

            if (isCardType) {
                const inStage = Math.round(Math.abs(index - activeIndex)) <= 1;
                setState({
                    inStage,
                    translate: calcCardTranslate(index, activeIndex, inStage),
                    scale: isActive ? 1 : cardScale,
                });
            } else {
                setState({
                    translate: calcTranslate(index, activeIndex),
                });
            }

            setState({
                ready: true,
            });

            if (isActive && carouselItemRef.current) {
                setContainerHeight(carouselItemRef.current.offsetHeight);
            }
        },
        [calcCardTranslate, calcTranslate, cardScale, isCardType, items, loop, setContainerHeight],
    );

    const handleItemClick = useCallback(() => {
        if (isCardType) {
            const index = items.findIndex(({ uid }) => uid === id);
            setActiveItem(index);
        }
    }, [id, isCardType, items, setActiveItem]);

    useImperativeHandle(ref, () => ({
        translateItem,
    }));

    useEffect(() => {
        addItem({
            props: omit(props, 'children'),
            states: state,
            setState,
            uid: id,
            translateItem: (...args) => ref?.current?.translateItem(...args),
        });

        return () => removeItem(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        carouselItemRef,
        state,
        setState,
        handleItemClick,
    };
};

const processIndex = (index: number, activeIndex: number, length: number) => {
    const lastItemIndex = length - 1;
    const prevItemIndex = activeIndex - 1;
    const nextItemIndex = activeIndex + 1;
    const halfItemIndex = length / 2;

    if (activeIndex === 0 && index === lastItemIndex) {
        return -1;
    } else if (activeIndex === lastItemIndex && index === 0) {
        return length;
    } else if (index < prevItemIndex && activeIndex - index >= halfItemIndex) {
        return length + 1;
    } else if (index > nextItemIndex && index - activeIndex >= halfItemIndex) {
        return -2;
    }
    return index;
};
