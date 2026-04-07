import { RefObject, useCallback, useEffect, useRef } from 'react';

import { cAF, rAF } from '@qsxy/element-plus-react/Util';
import { GridScrollOptions, GridStates } from '../types';

export const useGridTouch = (
    windowRef: RefObject<HTMLElement | null>,
    states: GridStates,
    scrollTo: (scrollOptions: GridScrollOptions) => void,
    estimatedTotalWidth: number,
    estimatedTotalHeight: number,
    parsedWidth: number,
    parsedHeight: number,
) => {
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);
    const frameHandle = useRef<number | undefined>(undefined);
    const deltaX = useRef(0);
    const deltaY = useRef(0);

    const handleTouchStart = useCallback((event: TouchEvent) => {
        cAF(frameHandle.current);
        touchStartX.current = event.touches[0].clientX;
        touchStartY.current = event.touches[0].clientY;
        deltaX.current = 0;
        deltaY.current = 0;
    }, []);

    const handleTouchMove = useCallback(
        (event: TouchEvent) => {
            event.preventDefault();
            cAF(frameHandle.current);

            deltaX.current += touchStartX.current - event.touches[0].clientX;
            deltaY.current += touchStartY.current - event.touches[0].clientY;
            touchStartX.current = event.touches[0].clientX;
            touchStartY.current = event.touches[0].clientY;

            frameHandle.current = rAF(() => {
                const maxScrollLeft = estimatedTotalWidth - parsedWidth;
                const maxScrollTop = estimatedTotalHeight - parsedHeight;

                const safeScrollLeft = Math.min(states.scrollLeft + deltaX.current, maxScrollLeft);
                const safeScrollTop = Math.min(states.scrollTop + deltaY.current, maxScrollTop);

                scrollTo({
                    scrollLeft: safeScrollLeft,
                    scrollTop: safeScrollTop,
                });

                deltaX.current = 0;
                deltaY.current = 0;
            });
        },
        [estimatedTotalWidth, estimatedTotalHeight, parsedWidth, parsedHeight, states, scrollTo],
    );

    useEffect(() => {
        const element = windowRef.current;
        if (!element) {
            return;
        }

        element.addEventListener('touchstart', handleTouchStart, { passive: true });
        element.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            element.removeEventListener('touchstart', handleTouchStart);
            element.removeEventListener('touchmove', handleTouchMove);
        };
    }, [windowRef, handleTouchStart, handleTouchMove]);

    return {
        touchStartX,
        touchStartY,
        handleTouchStart,
        handleTouchMove,
    };
};
