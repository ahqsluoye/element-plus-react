import { VirtualElement } from '@popperjs/core';
import useEventListener from 'ahooks/lib/useEventListener';
import { RefObject, useEffect, useLayoutEffect, useRef } from 'react';
import { isFunction } from '../Util/base';

const isBrowser = typeof window !== 'undefined';
export const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

type TargetValue<T> = T | undefined | null;

type TargetType = HTMLElement | Element | Window | Document | EventTarget;

export type BasicTarget<T extends TargetType = Element> = (() => TargetValue<T>) | TargetValue<T> | RefObject<TargetValue<T>> | { current: VirtualElement };

/**
 * @title useClickOutside
 */
export type UseClickOutside = (
    /**
     * @zh dom对象
     * @zh-Hant dom對象
     * @en dom element
     */
    target: BasicTarget<Element>,
    /**
     * @zh 监听函数
     * @zh-Hant 監聽函數
     * @en listener fucntion
     */
    handler: (evt: EventType) => void,
    /**
     * @zh 监听函数是否生效
     * @zh-Hant 監聽函數是否生效
     * @en whether the listener fucntion is enabled
     */
    options?: {
        enabled?: boolean;
        enabledListener?: boolean;
        shouldIgnore?: (event: EventType) => boolean;
    },
) => void;

export type EventType = MouseEvent | TouchEvent;

/**
 * @title useLatest
 * @returns ref 对象
 * @returns_en ref object
 * @returns_zh-Hant ref 對象
 */
export type UseLatest = <T>(
    /**
     * @zh 追踪值
     * @zh-Hant 追蹤值
     * @en tracked value
     */
    value: T,
) => RefObject<T>;

export const useLatest: UseLatest = <T>(value: T): RefObject<T> => {
    const ref = useRef(value);
    useIsomorphicLayoutEffect(() => {
        ref.current = value;
    }, [value]);
    return ref;
};

export function getTargetElement<T extends TargetType>(target: BasicTarget<T>, defaultElement?: T) {
    if (!isBrowser) {
        return undefined;
    }

    if (!target) {
        return defaultElement;
    }

    let targetElement: TargetValue<T>;

    if (isFunction(target)) {
        targetElement = target();
    } else if ('current' in target) {
        targetElement = target.current as T | undefined;
    } else {
        targetElement = target;
    }

    return targetElement;
}

const useClickOutside: UseClickOutside = (
    target: BasicTarget<Element>,
    handler: (evt: EventType, stopHandle: () => void) => void,
    { enabled = true, enabledListener = true, shouldIgnore = () => false } = {},
): void => {
    const savedHandler = useLatest(handler);
    const el = getTargetElement(target);
    const listerOptions = {
        passive: true,
        enabled: enabled && enabledListener && el,
    };

    const listener = (event: EventType) => {
        if (!enabled) {
            return;
        }

        if (shouldIgnore(event)) {
            return;
        }

        const element = getTargetElement(target);
        if (!element) {
            return;
        }

        const elements = event.composedPath();
        if (
            element === event.target ||
            elements.includes(element)
            // (!(element instanceof HTMLElement) &&
            //     element.getBoundingClientRect &&
            //     elements.some(el => {
            //         if (el instanceof HTMLElement) {
            //             const rect = el.getBoundingClientRect();
            //             const targetRect = element.getBoundingClientRect();
            //             console.log(
            //                 element,
            //                 rect.left <= targetRect.left && rect.left + rect.width >= targetRect.left && rect.top <= targetRect.top && rect.bottom + rect.height >= targetRect.top,
            //             );
            //             return (
            //                 rect.left <= targetRect.left && rect.left + rect.width >= targetRect.left && rect.top <= targetRect.top && rect.bottom + rect.height >= targetRect.top
            //             );
            //         }
            //     }))
        ) {
            return;
        }

        savedHandler.current(event, () => {
            // window.removeEventListener('mousedown', listener);
            // window.removeEventListener('touchstart', listener);
        });
    };

    useEventListener('mousedown', listener, listerOptions);
    useEventListener('touchstart', listener, listerOptions);
    // if (enabled && enabledListener && element) {
    //     window.addEventListener('mousedown', listener, listerOptions);
    //     window.addEventListener('touchstart', listener, listerOptions);
    // }
};

export default useClickOutside;
