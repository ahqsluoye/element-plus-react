import { useCallback, useRef } from 'react';
import { HORIZONTAL } from '../defaults';

import { cAF, isFirefox, rAF } from '@qsxy/element-plus-react/Util';
import type { LayoutDirection } from '../types';

interface ListWheelState {
    atStartEdge: boolean;
    atEndEdge: boolean;
    layout: LayoutDirection;
}

type ListWheelHandler = (offset: number) => void;

export const useWheel = ({ atEndEdge, atStartEdge, layout }: ListWheelState, onWheelDelta: ListWheelHandler) => {
    const frameHandle = useRef<number | null>(null);
    const offset = useRef(0);

    const hasReachedEdge = useCallback(
        (_offset: number) => {
            const edgeReached = (_offset < 0 && atStartEdge) || (_offset > 0 && atEndEdge);
            return edgeReached;
        },
        [atStartEdge, atEndEdge],
    );

    const onWheel = useCallback(
        (e: WheelEvent) => {
            cAF(frameHandle.current);

            let { deltaX, deltaY } = e;
            // Special case for windows machine with shift key + wheel scrolling
            if (e.shiftKey && deltaY !== 0) {
                deltaX = deltaY;
                deltaY = 0;
            }

            const newOffset = layout === HORIZONTAL ? deltaX : deltaY;

            if (hasReachedEdge(newOffset)) {
                return;
            }

            offset.current += newOffset;

            if (!isFirefox() && newOffset !== 0) {
                e.preventDefault();
            }

            frameHandle.current = rAF(() => {
                onWheelDelta(offset.current);
                offset.current = 0;
            });
        },
        [layout, hasReachedEdge, onWheelDelta],
    );

    return {
        hasReachedEdge,
        onWheel,
    };
};

export default useWheel;
