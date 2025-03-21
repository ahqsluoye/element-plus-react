import { Key, useEffect, useRef, useState } from 'react';
import type { GetKey } from '../interface';
import CacheMap from '../utils/CacheMap';
import findDOMNode from '../utils/findDOMNode';
import raf from '../utils/raf';

export default function useHeights<T>(
    getKey: GetKey<T>,
    onItemAdd?: (item: T) => void,
    onItemRemove?: (item: T) => void,
): [(item: T, instance: HTMLElement) => void, () => void, CacheMap, number] {
    const [updatedMark, setUpdatedMark] = useState(0);
    const instanceRef = useRef(new Map<Key, HTMLElement>());
    const heightsRef = useRef(new CacheMap());
    const collectRafRef = useRef<number>();

    function cancelRaf() {
        raf.cancel(collectRafRef.current);
    }

    function collectHeight() {
        cancelRaf();

        collectRafRef.current = raf(() => {
            instanceRef.current.forEach((element, key) => {
                if (element && element.offsetParent) {
                    const htmlElement = findDOMNode<HTMLElement>(element);
                    const { offsetHeight } = htmlElement;
                    // @ts-ignore
                    if (heightsRef.current.get(key) !== offsetHeight) {
                        // @ts-ignore
                        heightsRef.current.set(key, htmlElement.offsetHeight);
                    }
                }
            });

            // Always trigger update mark to tell parent that should re-calculate heights when resized
            setUpdatedMark(c => c + 1);
        });
    }

    function setInstanceRef(item: T, instance: HTMLElement) {
        const key = getKey(item);
        const origin = instanceRef.current.get(key);

        if (instance) {
            instanceRef.current.set(key, instance);
            collectHeight();
        } else {
            instanceRef.current.delete(key);
        }

        // Instance changed
        if (!origin !== !instance) {
            if (instance) {
                onItemAdd?.(item);
            } else {
                onItemRemove?.(item);
            }
        }
    }

    useEffect(() => {
        return cancelRaf;
    }, []);

    return [setInstanceRef, collectHeight, heightsRef.current, updatedMark];
}
