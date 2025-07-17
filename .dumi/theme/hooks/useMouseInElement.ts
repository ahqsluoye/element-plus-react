import { useMount } from 'ahooks';
import { RefObject, useCallback, useEffect, useMemo, useState } from 'react';
import { UseMouseOptions, useMouse } from './useMouse';
import { useMutationObserver } from './useMutationObserver';
import { useResizeObserver } from './useResizeObserver';

export interface MouseInElementOptions extends UseMouseOptions {
    /**
     * Whether to handle mouse events when the cursor is outside the target element.
     * When enabled, mouse position will continue to be tracked even when outside the element bounds.
     *
     * @default true
     */
    handleOutside?: boolean;

    /**
     * Listen to window resize event
     *
     * @default true
     */
    windowScroll?: boolean;

    /**
     * Listen to window scroll event
     *
     * @default true
     */
    windowResize?: boolean;
}

/**
 * Reactive mouse position related to an element.
 *
 * @param target
 * @param options
 */
export function useMouseInElement(target: RefObject<HTMLElement>, options: MouseInElementOptions = {}) {
    const { windowResize = true, windowScroll = true, handleOutside = true, window } = options;
    const type = options.type || 'page';

    const { x, y, sourceType } = useMouse(options);

    const [elementX, setElementX] = useState(0);
    const [elementY, setElementY] = useState(0);
    const [elementPositionX, setElementPositionX] = useState(0);
    const [elementPositionY, setElementPositionY] = useState(0);
    const [elementHeight, setElementHeight] = useState(0);
    const [elementWidth, setElementWidth] = useState(0);
    const [isOutside, setIsOutside] = useState(true);

    const el = useMemo(() => target.current ?? window?.document.body, [target, window?.document.body]);

    const update = useCallback(() => {
        if (!window) {
            return;
        }

        if (!el || !(el instanceof Element)) {
            return;
        }

        const { left, top, width, height } = el.getBoundingClientRect();

        setElementPositionX(left + (type === 'page' ? window.pageXOffset : 0));
        setElementPositionY(top + (type === 'page' ? window.pageYOffset : 0));
        setElementHeight(height);
        setElementWidth(width);

        const elX = x - elementPositionX;
        const elY = y - elementPositionY;
        setIsOutside(width === 0 || height === 0 || elX < 0 || elY < 0 || elX > width || elY > height);

        if (handleOutside) {
            setElementX(elX);
            setElementY(elY);
        }
    }, [el, elementPositionX, elementPositionY, handleOutside, type, window, x, y]);

    const stopFnList: Array<() => void> = [];
    function stop() {
        stopFnList.forEach(fn => fn());
        stopFnList.length = 0;
    }

    useMount(() => {
        update();
    });

    const { stop: stopResizeObserver } = useResizeObserver(target, update);
    const { stop: stopMutationObserver } = useMutationObserver(target, update, {
        attributeFilter: ['style', 'class'],
    });

    useEffect(() => {
        update();
    }, [x, y]);

    stopFnList.push(stopResizeObserver, stopMutationObserver);

    document.addEventListener('mouseleave', () => setIsOutside(true), { passive: true });

    if (windowScroll) {
        window.addEventListener('scroll', update, { capture: true, passive: true });
        stopFnList.push(() => {
            window.removeEventListener('scroll', update, { capture: true });
        });
    }
    if (windowResize) {
        window.addEventListener('resize', update, { passive: true });
        stopFnList.push(() => {
            window.removeEventListener('resize', update);
        });
    }

    return {
        x,
        y,
        sourceType,
        elementX,
        elementY,
        elementPositionX,
        elementPositionY,
        elementHeight,
        elementWidth,
        isOutside,
        stop,
    };
}

export type UseMouseInElementReturn = ReturnType<typeof useMouseInElement>;
