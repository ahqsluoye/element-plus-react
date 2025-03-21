import { RefObject, useRef } from 'react';
import type { ScrollTo } from '../VirtualList';
import type { GetKey } from '../interface';
import type CacheMap from '../utils/CacheMap';
import raf from '../utils/raf';

export default function useScrollTo<T>(
    containerRef: RefObject<HTMLDivElement>,
    data: T[],
    heights: CacheMap,
    itemHeight: number,
    getKey: GetKey<T>,
    collectHeight: () => void,
    syncScrollTop: (newTop: number) => void,
    triggerFlash: () => void,
): ScrollTo {
    const scrollRef = useRef<number>();

    return arg => {
        // When not argument provided, we think dev may want to show the scrollbar
        if (arg === null || arg === undefined) {
            triggerFlash();
            return;
        }

        // Normal scroll logic
        raf.cancel(scrollRef.current);

        if (typeof arg === 'number') {
            syncScrollTop(arg);
        } else if (arg && typeof arg === 'object') {
            let index: number;
            const { align } = arg;

            if ('index' in arg) {
                ({ index } = arg);
            } else {
                index = data.findIndex(item => getKey(item) === arg.key);
            }

            const { offset = 0 } = arg;

            // We will retry 3 times in case dynamic height shaking
            const syncScroll = (times: number, targetAlign?: 'top' | 'bottom') => {
                if (times < 0 || !containerRef.current) {
                    return;
                }

                const height = containerRef.current.clientHeight;
                let needCollectHeight = false;
                let newTargetAlign: 'top' | 'bottom' | null = targetAlign;

                // Go to next frame if height not exist
                if (height) {
                    const mergedAlign = targetAlign || align;

                    // Get top & bottom
                    let stackTop = 0;
                    let itemTop = 0;
                    let itemBottom = 0;

                    const maxLen = Math.min(data.length, index);

                    for (let i = 0; i <= maxLen; i += 1) {
                        const key = getKey(data[i]);
                        itemTop = stackTop;
                        // @ts-ignore
                        const cacheHeight = heights.get(key);
                        itemBottom = itemTop + (cacheHeight === undefined ? itemHeight : cacheHeight);

                        stackTop = itemBottom;

                        if (i === index && cacheHeight === undefined) {
                            needCollectHeight = true;
                        }
                    }

                    // Scroll to
                    let targetTop: number | null = null;

                    switch (mergedAlign) {
                        case 'top':
                            targetTop = itemTop - offset;
                            break;
                        case 'bottom':
                            targetTop = itemBottom - height + offset;
                            break;

                        default: {
                            const { scrollTop } = containerRef.current;
                            const scrollBottom = scrollTop + height;
                            if (itemTop < scrollTop) {
                                newTargetAlign = 'top';
                            } else if (itemBottom > scrollBottom) {
                                newTargetAlign = 'bottom';
                            }
                        }
                    }

                    if (targetTop !== null && targetTop !== containerRef.current.scrollTop) {
                        syncScrollTop(targetTop);
                    }
                }

                // We will retry since element may not sync height as it described
                scrollRef.current = raf(() => {
                    if (needCollectHeight) {
                        collectHeight();
                    }
                    syncScroll(times - 1, newTargetAlign);
                });
            };

            syncScroll(3);
        }
    };
}
