import { cAF, rAF } from '@qsxy/element-plus-react/Util';
import { useCallback, useRef } from 'react';

interface GridWheelState {
    atXStartEdge: boolean;
    atXEndEdge: boolean;
    atYStartEdge: boolean;
    atYEndEdge: boolean;
}

type GridWheelHandler = (x: number, y: number) => void;

export const useGridWheel = ({ atXEndEdge, atXStartEdge, atYEndEdge, atYStartEdge }: GridWheelState, onWheelDelta: GridWheelHandler) => {
    const frameHandle = useRef<number | null>(null);
    const xOffset = useRef(0);
    const yOffset = useRef(0);

    const hasReachedEdge = useCallback(
        (x: number, y: number) => {
            const xEdgeReached = (x < 0 && atXStartEdge) || (x > 0 && atXEndEdge);
            const yEdgeReached = (y < 0 && atYStartEdge) || (y > 0 && atYEndEdge);
            return xEdgeReached || yEdgeReached;
        },
        [atXStartEdge, atXEndEdge, atYStartEdge, atYEndEdge],
    );

    const onWheel = useCallback(
        (e: WheelEvent) => {
            cAF(frameHandle.current);

            let x = e.deltaX;
            let y = e.deltaY;
            // Simulate native behavior when using touch pad/track pad for wheeling.
            if (Math.abs(x) > Math.abs(y)) {
                y = 0;
            } else {
                x = 0;
            }

            // Special case for windows machine with shift key + wheel scrolling
            if (e.shiftKey && y !== 0) {
                x = y;
                y = 0;
            }

            if (hasReachedEdge(x, y)) {
                return;
            }

            xOffset.current += x;
            yOffset.current += y;

            e.preventDefault();

            frameHandle.current = rAF(() => {
                onWheelDelta(xOffset.current, yOffset.current);
                xOffset.current = 0;
                yOffset.current = 0;
            });
        },
        [hasReachedEdge, onWheelDelta],
    );

    return {
        hasReachedEdge,
        onWheel,
    };
};
