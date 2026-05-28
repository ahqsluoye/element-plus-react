import { arrow, autoUpdate, computePosition, ComputePositionReturn, detectOverflow, flip, Middleware, offset as offsetMiddleware, shift, Strategy } from '@floating-ui/dom';
import { Placement, VirtualElement } from '@popperjs/core';
import { useMount, useUnmount } from 'ahooks';
import { CSSProperties, useEffect, useMemo, useState } from 'react';
import { isClient } from '../Util';

export function isInViewPort(element: HTMLElement): boolean {
    const viewWidth = window.innerWidth || document.documentElement.clientWidth;
    const viewHeight = window.innerHeight || document.documentElement.clientHeight;
    const { top, right, bottom, left } = element.getBoundingClientRect();

    return top >= 0 && left >= 0 && right <= viewWidth && bottom <= viewHeight;
}

export function resolveTarget(target: string | HTMLElement | (() => HTMLElement | null) | null | undefined): HTMLElement | null | undefined {
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
    pos: { left: number; top: number; width: number; height: number; radius: number } | null;
    triggerTarget: HTMLElement | { getBoundingClientRect(): DOMRect } | undefined;
} {
    const targetEl = resolveTarget(target);
    if (!targetEl || !open) {
        return { pos: null, triggerTarget: undefined };
    }
    if (!isInViewPort(targetEl)) {
        targetEl.scrollIntoView(scrollIntoViewOptions);
    }
    const { left, top, width, height } = targetEl.getBoundingClientRect();

    const gapOffsetX = getGapOffset(gap, 0);
    const gapOffsetY = getGapOffset(gap, 1);
    const gapRadius = gap.radius || 2;

    const pos = {
        left: left - gapOffsetX,
        top: top - gapOffsetY,
        width: width + gapOffsetX * 2,
        height: height + gapOffsetY * 2,
        radius: gapRadius,
    };

    const hasMask = !!mergedMask;
    if (!hasMask || !window.DOMRect) {
        return { pos, triggerTarget: targetEl };
    }

    const triggerTarget = {
        getBoundingClientRect() {
            return window.DOMRect.fromRect({
                width: pos.width,
                height: pos.height,
                x: pos.left,
                y: pos.top,
            });
        },
    };

    return { pos, triggerTarget };
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
        x: 0,
        y: 0,
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

    let cleanup: any;
    useMount(() => {
        const referenceEl = referenceRef;
        const contentEl = contentRef;
        if (referenceEl && contentEl) {
            cleanup = autoUpdate(referenceEl, contentEl, update);
        }

        setTimeout(() => {
            update();
        }, 100);
    });

    useUnmount(() => {
        cleanup && cleanup();
    });

    useEffect(() => {
        update();
    }, [referenceRef]);

    return {
        update,
        contentStyle,
        arrowStyle,
    };
};

const overflowMiddleware = (): Middleware => {
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
