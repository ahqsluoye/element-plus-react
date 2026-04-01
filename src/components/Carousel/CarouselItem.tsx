import classNames from 'classnames';
import React, { FC, memo, useMemo } from 'react';
import { useClassNames } from '../hooks';
import { useCarouselContext } from './CarouselContext';
import { useCarouselItem } from './hooks/useCarouselItem';
import { CarouselItemProps } from './typings';

const CarouselItem: FC<CarouselItemProps> = memo((props: CarouselItemProps) => {
    const { classPrefix = 'carousel', children } = props;
    const { e, em, is } = useClassNames(classPrefix);

    const { isCardType, isVertical } = useCarouselContext();
    const { carouselItemRef, state, handleItemClick } = useCarouselItem(props);

    const itemStyle = useMemo<React.CSSProperties>(() => {
        const translateType = `translate${isVertical ? 'Y' : 'X'}`;
        const _translate = `${translateType}(${state.translate}px)`;
        const _scale = `scale(${state.scale})`;
        const transform = [_translate, _scale].join(' ');

        return {
            transform,
        };
    }, [isVertical, state.scale, state.translate]);

    return (
        <div
            ref={carouselItemRef}
            className={classNames(
                e`item`,
                is({ active: state.active, 'in-stage': state.inStage, hover: state.hover, animating: state.animating }),
                {
                    [em('item', 'card')]: isCardType,
                    [em('item', 'card-vertical')]: isCardType && isVertical,
                },
                props.className,
            )}
            style={{ ...itemStyle, display: state.ready ? '' : 'none', ...(props.style ?? {}) }}
            onClick={handleItemClick}
        >
            {isCardType && <div className={e`mask`} style={{ display: !state.active ? '' : 'none' }} />}
            {children}
        </div>
    );
});

CarouselItem.displayName = 'ElCarouselItem';

export default CarouselItem;
