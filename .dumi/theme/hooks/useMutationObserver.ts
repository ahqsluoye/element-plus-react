import { RefObject, useEffect, useMemo } from 'react';
import { ConfigurableWindow } from './typings';

export interface UseMutationObserverOptions extends MutationObserverInit, ConfigurableWindow {}

/**
 * Watch for changes being made to the DOM tree.
 *
 * @param target
 * @param callback
 * @param options
 */
export function useMutationObserver(target: RefObject<HTMLElement>, callback: MutationCallback, options: UseMutationObserverOptions = {}) {
    const { window, ...mutationOptions } = options;
    let observer: MutationObserver | undefined;
    const isSupported = useMemo(() => window && 'MutationObserver' in window, [window]);

    const cleanup = () => {
        if (observer) {
            observer.disconnect();
            observer = undefined;
        }
    };

    const takeRecords = () => {
        return observer?.takeRecords();
    };

    const stop = () => {
        cleanup();
    };

    useEffect(() => {
        cleanup();
        if (isSupported && window) {
            observer = new MutationObserver(callback);
            if (target.current) {
                observer!.observe(target.current, mutationOptions);
            }
        }
        return () => {
            cleanup();
        };
    }, []);

    return {
        isSupported,
        stop,
        takeRecords,
    };
}

export type UseMutationObserverReturn = ReturnType<typeof useMutationObserver>;
