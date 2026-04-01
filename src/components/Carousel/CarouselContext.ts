import { createContext, useContext } from 'react';
import { CarouselContextProps } from './typings';

export const CarouselContext = createContext<CarouselContextProps>({
    root: undefined,
    isCardType: false,
    isVertical: false,
    items: [],
    loop: false,
    cardScale: 0,
    addItem: function (): void {
        throw new Error('Function not implemented.');
    },
    removeItem: function (): void {
        throw new Error('Function not implemented.');
    },
    setActiveItem: function (): void {
        throw new Error('Function not implemented.');
    },
    setContainerHeight: function (): void {
        throw new Error('Function not implemented.');
    },
});

export const useCarouselContext = () => useContext(CarouselContext);
