import classNames from 'classnames';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useClassNames } from '../../hooks';
import { BAR_MAP } from '../../Scrollbar/util';
import { cAF, rAF } from '../../Util';
import { HORIZONTAL, SCROLLBAR_MIN_SIZE, ScrollbarDirKey } from '../defaults';
import { VirtualizedScrollbarProps } from '../props';
import { ScrollbarExpose } from '../types';
import { renderThumbStyle } from '../utils';

interface ScrollState {
    isDragging: boolean;
    traveled: number;
    [key: string]: unknown;
}

const Scrollbar = forwardRef<ScrollbarExpose, VirtualizedScrollbarProps>((props, ref) => {
    const {
        alwaysOn,
        class: className,
        layout,
        ratio,
        clientSize,
        scrollFrom,
        scrollbarSize = 6,
        startGap = 0,
        endGap = 2,
        visible = true,
        onScroll,
        onStartMove,
        onStopMove,
    } = props;

    const GAP = useMemo(() => startGap + endGap, [endGap, startGap]); // top 2 + bottom 2 | left 2 + right 2

    const nsVirtualScrollbar = useClassNames('virtual-scrollbar');
    const nsScrollbar = useClassNames('scrollbar');

    // DOM refs
    const trackRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);

    // local variables
    const frameHandleRef = useRef<number | null>(null);
    const onselectstartStoreRef = useRef<typeof document.onselectstart | null>(null);

    // state
    const [state, setState] = useState<ScrollState>({
        isDragging: false,
        traveled: 0,
    });
    const stateRef = useRef<ScrollState>({
        isDragging: false,
        traveled: 0,
    });

    const bar = useMemo(() => BAR_MAP[layout], [layout]);

    const trackSize = useMemo(() => clientSize - GAP, [clientSize, GAP]);

    const trackStyle = useMemo<React.CSSProperties>(
        () => ({
            position: 'absolute',
            width: `${layout === HORIZONTAL ? trackSize : scrollbarSize}px`,
            height: `${layout === HORIZONTAL ? scrollbarSize : trackSize}px`,
            [ScrollbarDirKey[layout]]: '2px',
            right: '2px',
            bottom: '2px',
            borderRadius: '4px',
        }),
        [layout, trackSize, scrollbarSize],
    );

    const thumbSize = useMemo(() => {
        if (ratio >= 100) {
            return Number.POSITIVE_INFINITY;
        }

        if (ratio >= 50) {
            return (ratio * trackSize) / 100;
        }

        const SCROLLBAR_MAX_SIZE = trackSize / 3;
        return Math.floor(Math.min(Math.max((ratio * trackSize) / 100, SCROLLBAR_MIN_SIZE), SCROLLBAR_MAX_SIZE));
    }, [ratio, trackSize]);

    const thumbStyle = useMemo<React.CSSProperties>(() => {
        if (!Number.isFinite(thumbSize)) {
            return {
                display: 'none',
            };
        }

        const thumb = `${thumbSize}px`;

        const style = renderThumbStyle(
            {
                bar,
                size: thumb,
                move: state.traveled,
            },
            layout,
        );

        return style;
    }, [thumbSize, bar, state.traveled, layout]);

    const totalSteps = useMemo(() => Math.ceil(clientSize - thumbSize - GAP), [clientSize, thumbSize, GAP]);

    const onMouseUp = () => {
        setState(prev => ({
            ...prev,
            isDragging: false,
            [bar.axis]: 0,
        }));
        stateRef.current = {
            ...stateRef.current,
            isDragging: false,
            [bar.axis]: 0,
        };
        detachEvents();
        onStopMove?.();
    };

    const onMouseMove = (e: MouseEvent | TouchEvent) => {
        const { isDragging } = stateRef.current;
        if (!isDragging) {
            return;
        }
        if (!thumbRef.current || !trackRef.current) {
            return;
        }

        const prevPage = stateRef.current[bar.axis];
        if (!prevPage) {
            return;
        }

        cAF(frameHandleRef.current);
        // using the current track's offset top/left - the current pointer's clientY/clientX
        // to get the relative position of the pointer to the track.
        const offset = (trackRef.current.getBoundingClientRect()[bar.direction] - (e as MouseEvent)[bar.client]) * -1;

        // find where the thumb was clicked on.
        const thumbClickPosition = thumbRef.current[bar.offset as any] - (prevPage as number);

        /**
         *  +--------------+                                   +--------------+
         *  |              -  <--------- thumb.offsetTop       |              |
         *  |             |+|             <--+                 |              |
         *  |              -                 |                 |              |
         *  |   Content    |                 |                 |              |
         *  |              |                 |                 |              |
         *  |              |                 |                 |              |
         *  |              |                 |                 |              -
         *  |              |                 +-->              |             |+|
         *  |              |                                   |              -
         *  +--------------+                                   +--------------+
         */

        // using the current position - prev position to
        const distance = offset - thumbClickPosition;
        // get how many steps in total.
        // gap of 2 on top, 2 on bottom, in total 4.
        // using totalSteps ÷ totalSize getting each step's size * distance to get the new
        // scroll offset to scrollTo
        frameHandleRef.current = rAF(() => {
            setState(prev => ({
                ...prev,
                traveled: Math.max(0, Math.min(distance, totalSteps)),
            }));
            stateRef.current = {
                ...stateRef.current,
                traveled: Math.max(0, Math.min(distance, totalSteps)),
            };
            onScroll?.(distance, totalSteps);
        });
    };

    const attachEvents = () => {
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);

        const thumbEl = thumbRef.current;

        if (!thumbEl) {
            return;
        }

        onselectstartStoreRef.current = document.onselectstart;
        document.onselectstart = () => false;

        thumbEl.addEventListener('touchmove', onMouseMove, { passive: true });
        thumbEl.addEventListener('touchend', onMouseUp);
    };

    const detachEvents = () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);

        document.onselectstart = onselectstartStoreRef.current;
        onselectstartStoreRef.current = null;

        const thumbEl = thumbRef.current;
        if (!thumbEl) {
            return;
        }

        thumbEl.removeEventListener('touchmove', onMouseMove);
        thumbEl.removeEventListener('touchend', onMouseUp);
    };

    const onThumbMouseDown = (e: Event | React.MouseEvent | React.KeyboardEvent) => {
        e.stopPropagation();
        if ('ctrlKey' in e && (e as React.KeyboardEvent).ctrlKey) {
            return;
        }
        if ('button' in e && [1, 2].includes((e as React.MouseEvent).button)) {
            return;
        }

        stateRef.current = {
            ...stateRef.current,
            isDragging: true,
            [bar.axis]: (e.target as HTMLElement)[bar.offset as any] - ((e as MouseEvent)[bar.client] - (e.target as HTMLElement).getBoundingClientRect()[bar.direction]),
        };
        setState(stateRef.current);

        onStartMove?.();
        attachEvents();
    };

    const clickTrackHandler = useCallback(
        (e: React.MouseEvent) => {
            const offset = Math.abs((e.target as HTMLElement).getBoundingClientRect()[bar.direction] - e[bar.client]);
            const thumbHalf = thumbRef.current[bar.offset as any] / 2;
            const distance = offset - thumbHalf;

            setState(prev => ({
                ...prev,
                traveled: Math.max(0, Math.min(distance, totalSteps)),
            }));
            stateRef.current = {
                ...stateRef.current,
                traveled: Math.max(0, Math.min(distance, totalSteps)),
            };
            onScroll?.(distance, totalSteps);
        },
        [bar, totalSteps, onScroll],
    );

    // Watch for scrollFrom changes
    useEffect(() => {
        if (state.isDragging) {
            return;
        }
        /**
         *  this is simply mapping the current scrollbar offset
         *
         *  formula 1:
         *    v = scrollOffset / (estimatedTotalSize - clientSize)
         *    traveled = v * (clientSize - thumbSize - GAP) --> v * totalSteps
         *
         *  formula 2:
         *    traveled = (v * clientSize) / (clientSize / totalSteps) --> (v * clientSize) * (totalSteps / clientSize) --> v * totalSteps
         */
        setState(prev => ({
            ...prev,
            traveled: Math.ceil(scrollFrom * totalSteps),
        }));
        stateRef.current = {
            ...stateRef.current,
            traveled: Math.ceil(scrollFrom * totalSteps),
        };
    }, [scrollFrom]);

    useEffect(() => {
        return () => {
            detachEvents();
        };
    }, []);

    useImperativeHandle(ref, () => ({
        onMouseUp,
    }));

    return (
        <div
            role="presentation"
            ref={trackRef}
            className={classNames(nsVirtualScrollbar.b(), className, (alwaysOn || state.isDragging) && 'always-on')}
            style={trackStyle}
            onMouseDown={e => {
                e.stopPropagation();
                e.preventDefault();
                clickTrackHandler(e);
            }}
            onTouchStart={e => {
                e.preventDefault();
                onThumbMouseDown(e);
            }}
        >
            <div ref={thumbRef} className={nsScrollbar.e('thumb')} style={thumbStyle} onMouseDown={onThumbMouseDown} />
        </div>
    );
});

export default Scrollbar;
