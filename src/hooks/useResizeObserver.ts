import { RefObject, useEffect, useMemo } from 'react';

export interface ResizeObserverSize {
    readonly inlineSize: number;
    readonly blockSize: number;
}

export interface ResizeObserverEntry {
    readonly target: Element;
    readonly contentRect: DOMRectReadOnly;
    readonly borderBoxSize: ReadonlyArray<ResizeObserverSize>;
    readonly contentBoxSize: ReadonlyArray<ResizeObserverSize>;
    readonly devicePixelContentBoxSize: ReadonlyArray<ResizeObserverSize>;
}

export type ResizeObserverCallback = (entries: ReadonlyArray<ResizeObserverEntry>, observer: ResizeObserver) => void;

export interface UseResizeObserverOptions {
    /**
     * Sets which box model the observer will observe changes to. Possible values
     * are `content-box` (the default), `border-box` and `device-pixel-content-box`.
     *
     * @default 'content-box'
     */
    box?: ResizeObserverBoxOptions;
    window?: Window;
}

declare class ResizeObserver {
    constructor(callback: ResizeObserverCallback);
    disconnect(): void;
    observe(target: Element, options?: UseResizeObserverOptions): void;
    unobserve(target: Element): void;
}

/**
 * Reports changes to the dimensions of an Element's content or the border-box
 *
 * @param target
 * @param callback
 * @param options
 */
export function useResizeObserver(target: RefObject<HTMLElement>, callback: ResizeObserverCallback, options: UseResizeObserverOptions = {}) {
    const { ...observerOptions } = options;
    let observer: ResizeObserver | undefined;
    const isSupported = useMemo(() => window && 'ResizeObserver' in window, []);

    const cleanup = () => {
        if (observer) {
            observer.disconnect();
            observer = undefined;
        }
    };

    const stop = () => {
        cleanup();
    };

    useEffect(() => {
        cleanup();
        if (isSupported && window) {
            observer = new ResizeObserver(callback);
            if (target.current) {
                observer.observe(target.current, observerOptions);
            }
        }
        return () => {
            cleanup();
        };
    }, []);

    return {
        isSupported,
        stop,
    };
}

export type UseResizeObserverReturn = ReturnType<typeof useResizeObserver>;
