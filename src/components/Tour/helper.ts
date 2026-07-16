import { arrow, autoUpdate, computePosition, ComputePositionReturn, detectOverflow, flip, Middleware, offset as offsetMiddleware, shift, Strategy } from '@floating-ui/dom';
import { Placement, VirtualElement } from '@popperjs/core';
import { isClient } from '@qsxy/element-plus-react/Util/raf';
import { useMount, useUnmount } from 'ahooks';
import { CSSProperties, useCallback, useEffect, useMemo, useState } from 'react';
import { PosInfo } from './typings';

export function isInViewPort(element: HTMLElement): boolean {
    const viewWidth = window.innerWidth || document.documentElement.clientWidth;
    const viewHeight = window.innerHeight || document.documentElement.clientHeight;
    const { top, right, bottom, left } = element.getBoundingClientRect();

    return top >= 0 && left >= 0 && right <= viewWidth && bottom <= viewHeight;
}

export function getTargetEl(target: string | HTMLElement | (() => HTMLElement | null) | null | undefined): HTMLElement | null | undefined {
    if (typeof target === 'string') {
        return document.querySelector<HTMLElement>(target);
    } else if (typeof target === 'function') {
        return target();
    }
    return target;
}

export function getGapOffset(gap: { offset?: number | [number, number] }, index: number): number {
    return (Array.isArray(gap.offset) ? gap.offset[index] : gap.offset) ?? 6;
}

export function useTarget(
    target: string | HTMLElement | (() => HTMLElement | null) | null | undefined,
    open: boolean,
    gap: { offset?: number | [number, number]; radius?: number },
    mergedMask: boolean | { style?: any; color?: string },
    scrollIntoViewOptions: boolean | ScrollIntoViewOptions,
): {
    mergedPosInfo: { left: number; top: number; width: number; height: number; radius: number } | null;
    triggerTarget: HTMLElement | { getBoundingClientRect(): DOMRect } | undefined;
} {
    const [posInfo, setPosInfo] = useState<PosInfo | null>(null);
    // const targetEl = useMemo(() => getTargetEl(target), [target]);

    const updatePosInfo = useCallback(() => {
        const targetEl = getTargetEl(target);
        if (!targetEl || !open) {
            setPosInfo(null);
            return;
        }
        if (!isInViewPort(targetEl)) {
            targetEl.scrollIntoView(scrollIntoViewOptions);
        }
        const { left, top, width, height } = targetEl.getBoundingClientRect();
        setPosInfo({
            left,
            top,
            width,
            height,
            radius: 0,
        });
    }, [open, target, scrollIntoViewOptions]);

    useEffect(() => {
        updatePosInfo();
    }, [open, target]);

    useMount(() => {
        window.addEventListener('resize', updatePosInfo);
    });
    useUnmount(() => {
        window.removeEventListener('resize', updatePosInfo);
    });

    const mergedPosInfo = useMemo(() => {
        if (!posInfo) {
            return posInfo;
        }
        const gapOffsetX = getGapOffset(gap, 0);
        const gapOffsetY = getGapOffset(gap, 1);
        const gapRadius = gap.radius || 2;

        return {
            left: posInfo?.left - gapOffsetX,
            top: posInfo?.top - gapOffsetY,
            width: posInfo?.width + gapOffsetX * 2,
            height: posInfo?.height + gapOffsetY * 2,
            radius: gapRadius,
        };
    }, [posInfo, gap]);

    const triggerTarget = useMemo(() => {
        const targetEl = getTargetEl(target);
        if (!mergedMask || !targetEl || !window.DOMRect) {
            return targetEl || undefined;
        }
        if (!mergedPosInfo) {
            return targetEl || undefined;
        }
        const { left, top, width, height } = mergedPosInfo || {};
        return {
            getBoundingClientRect() {
                return window.DOMRect.fromRect({
                    width,
                    height,
                    x: left,
                    y: top,
                });
            },
        };
    }, [mergedMask, mergedPosInfo, target]);

    return { mergedPosInfo, triggerTarget };
}

export const useFloating = (
    referenceRef: VirtualElement,
    contentRef: HTMLElement,
    arrowRef: HTMLElement,
    placement: Placement,
    strategy: Strategy,
    offset: number,
    zIndex: number,
    showArrow: boolean,
) => {
    const [states, setStates] = useState({
        x: null,
        y: null,
        placement,
        strategy,
        middlewareData: {} as ComputePositionReturn['middlewareData'],
    });

    const middleware = useMemo(() => {
        const _middleware: Middleware[] = [offsetMiddleware(offset), flip(), shift(), overflowMiddleware()];

        if (showArrow && arrowRef) {
            _middleware.push(
                arrow({
                    element: arrowRef,
                }),
            );
        }
        return _middleware;
    }, [offset, showArrow, arrowRef]);

    const update = async () => {
        if (!isClient) {
            return;
        }

        const referenceEl = referenceRef;
        const contentEl = contentRef;
        if (!referenceEl || !contentEl) {
            return;
        }

        const data = await computePosition(referenceEl, contentEl, {
            placement,
            strategy,
            middleware,
        } as any);

        setStates(prev => ({ ...prev, ...data }));
        // Object.keys(states).forEach(key => {
        //     setStates(prev => ({ ...prev, [key]: data[key] }));
        // });
    };

    const contentStyle = useMemo<CSSProperties>(() => {
        if (!referenceRef) {
            return {
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate3d(-50%, -50%, 0)',
                maxWidth: '100vw',
                zIndex,
            };
        }

        const { overflow } = states.middlewareData;

        return {
            position: strategy,
            zIndex,
            top: states.y != null ? `${states.y}px` : '',
            left: states.x != null ? `${states.x}px` : '',
            maxWidth: overflow?.maxWidth ? `${overflow?.maxWidth}px` : '',
        };
    }, [referenceRef, states.x, states.y, states.middlewareData, strategy, zIndex]);

    const arrowStyle = useMemo<CSSProperties>(() => {
        if (!showArrow) {
            return {};
        }

        const { arrow } = states.middlewareData;
        return {
            left: arrow?.x != null ? `${arrow?.x}px` : '',
            top: arrow?.y != null ? `${arrow?.y}px` : '',
        };
    }, [states.middlewareData, showArrow]);

    const resizeObserver = new ResizeObserver(entries => {
        entries.forEach(entry => {
            update();
        });
    });

    let cleanup: any;
    useMount(() => {
        const referenceEl = referenceRef;
        const contentEl = contentRef;
        if (referenceEl && contentEl) {
            cleanup = autoUpdate(referenceEl, contentEl, update);
        }

        update();
    });

    useUnmount(() => {
        cleanup && cleanup();
    });

    useEffect(() => {
        if (contentRef) {
            resizeObserver.observe(contentRef);
        } else {
            resizeObserver.disconnect();
        }
    }, [contentRef]);

    useEffect(() => {
        update();
    }, [referenceRef]);

    return {
        update,
        contentStyle,
        arrowStyle,
        states,
    };
};

export const overflowMiddleware = (): Middleware => {
    return {
        name: 'overflow',
        async fn(state) {
            const overflow = await detectOverflow(state);
            let overWidth = 0;
            if (overflow.left > 0) {
                overWidth = overflow.left;
            }
            if (overflow.right > 0) {
                overWidth = overflow.right;
            }
            const floatingWidth = state.rects.floating.width;
            return {
                data: {
                    maxWidth: floatingWidth - overWidth,
                },
            };
        },
    };
};
