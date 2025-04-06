import classNames from 'classnames';
import React, { forwardRef, memo, useImperativeHandle, useMemo, useRef } from 'react';
import Icon from '../Icon/Icon';
import Transition from '../Transition/Transition';
import { mergeDefaultProps } from '../Util';
import { useClassNames } from '../hooks';
import { namespace } from '../hooks/prefix';
import { CarouselContext } from './CarouselContext';
import { useCarousel } from './hooks/useCarousel';
import { CarouselProps, CarouselRef } from './typings';

const Carousel: React.ForwardRefExoticComponent<CarouselProps & React.RefAttributes<CarouselRef>> = memo(
    forwardRef<CarouselRef, CarouselProps>((props, ref) => {
        props = mergeDefaultProps(
            {
                trigger: 'hover',
                autoplay: true,
                interval: 3000,
                initialIndex: 0,
                arrow: 'hover',
                cardScale: 0.83,
                loop: true,
                direction: 'horizontal',
                pauseOnHover: true,
                motionBlur: false,
                classPrefix: 'carousel',
            },
            props,
        );
        const { indicatorPosition, arrow = 'hover', cardScale = 0.83, loop = true, direction = 'horizontal', motionBlur = false, classPrefix = 'carousel', children } = props;
        const { b, e, m, em, is } = useClassNames(classPrefix);

        const {
            items,
            addItem,
            removeItem,
            setContainerHeight,
            root,
            activeIndex,
            hasLabel,
            hover,
            isCardType,
            isTransitioning,
            isVertical,
            containerStyle,
            handleButtonEnter,
            handleButtonLeave,
            handleIndicatorClick,
            handleMouseEnter,
            handleMouseLeave,
            handleTransitionEnd,
            setActiveItem,
            isTwoLengthShow,
            throttledArrowClick,
            throttledIndicatorHover,
            prev,
            next,
        } = useCarousel(props);

        const buttonLeft = useRef(null);
        const buttonRight = useRef(null);

        const carouselContainer = useMemo(() => {
            const classes = [e`container`];
            if (motionBlur && isTransitioning && items.length > 1) {
                classes.push(isVertical ? `${namespace}-transitioning-vertical` : `${namespace}-transitioning`);
            }
            return classNames(classes);
        }, [e, isTransitioning, isVertical, items.length, motionBlur]);

        const indicatorsClasses = useMemo(() => {
            const classes = [e('indicators'), em('indicators', direction)];
            if (hasLabel) {
                classes.push(em('indicators', 'labels'));
            }
            if (indicatorPosition === 'outside') {
                classes.push(em('indicators', 'outside'));
            }
            if (isVertical) {
                classes.push(em('indicators', 'right'));
            }
            return classNames(classes);
        }, [direction, e, em, hasLabel, indicatorPosition, isVertical]);

        useImperativeHandle(ref, () => ({
            activeIndex,
            setActiveItem,
            prev,
            next,
        }));

        return (
            <CarouselContext.Provider value={{ root, isCardType, isVertical, items, addItem, removeItem, loop, cardScale, setActiveItem, setContainerHeight }}>
                <div
                    ref={root}
                    className={classNames(b(), m(direction), { [m`card`]: isCardType }, props.className)}
                    style={props.style}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <Transition nodeRef={buttonLeft} visible={(arrow === 'always' || hover) && (loop || activeIndex > 0)} name="carousel-arrow-left">
                        <button
                            ref={buttonLeft}
                            type="button"
                            className={classNames(e`arrow`, em('arrow', 'left'))}
                            onMouseEnter={() => handleButtonEnter('left')}
                            onMouseLeave={handleButtonLeave}
                            onClick={() => throttledArrowClick(activeIndex - 1)}
                        >
                            <Icon name="angle-left" prefix="far" />
                        </button>
                    </Transition>

                    <Transition nodeRef={buttonRight} visible={(arrow === 'always' || hover) && (loop || activeIndex < items.length - 1)} name="carousel-arrow-right">
                        <button
                            ref={buttonRight}
                            type="button"
                            className={classNames(e`arrow`, em('arrow', 'right'))}
                            onMouseEnter={() => handleButtonEnter('right')}
                            onMouseLeave={handleButtonLeave}
                            onClick={() => throttledArrowClick(activeIndex + 1)}
                        >
                            <Icon name="angle-right" prefix="far" />
                        </button>
                    </Transition>

                    <div className={carouselContainer} style={containerStyle} onTransitionEnd={handleTransitionEnd}>
                        {children}
                    </div>

                    {indicatorPosition !== 'none' && (
                        <ul className={indicatorsClasses}>
                            {items.map((item, index) => (
                                <li
                                    key={index}
                                    className={classNames(e`indicator`, em('indicator', direction), is({ active: index === activeIndex }))}
                                    style={{ display: isTwoLengthShow(index) ? '' : 'none' }}
                                    onMouseEnter={() => throttledIndicatorHover(index)}
                                    onClick={() => handleIndicatorClick(index)}
                                >
                                    <button className={e`button`}>{hasLabel && <span>{item.props.label}</span>}</button>
                                </li>
                            ))}
                        </ul>
                    )}

                    {motionBlur && (
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ display: 'none' }}>
                            <defs>
                                <filter id="elCarouselHorizontal">
                                    <feGaussianBlur in="SourceGraphic" stdDeviation="12,0" />
                                </filter>
                                <filter id="elCarouselVertical">
                                    <feGaussianBlur in="SourceGraphic" stdDeviation="0,10" />
                                </filter>
                            </defs>
                        </svg>
                    )}
                </div>
            </CarouselContext.Provider>
        );
    }),
);

Carousel.displayName = 'ElCarousel';

export default Carousel;
