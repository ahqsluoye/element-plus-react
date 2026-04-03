import { useCallback, useEffect, useRef, useState } from 'react';
import { useResizeObserver } from '../../../hooks/useResizeObserver';

import type { AutoResizerProps } from '../auto-resizer';

export const useAutoResize = (props: AutoResizerProps) => {
    const sizerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const handleResize = useCallback(([entry]: any) => {
        const { width: width$, height: height$ } = entry.contentRect;
        const style = window.getComputedStyle(entry.target);

        const paddingLeft = Number.parseInt(style.paddingLeft) || 0;
        const paddingRight = Number.parseInt(style.paddingRight) || 0;
        const paddingTop = Number.parseInt(style.paddingTop) || 0;
        const paddingBottom = Number.parseInt(style.paddingBottom) || 0;

        const calculatedWidth = width$ - paddingLeft - paddingRight;
        const calculatedHeight = height$ - paddingTop - paddingBottom;

        setWidth(calculatedWidth);
        setHeight(calculatedHeight);
    }, []);

    const resizerStopper = useResizeObserver(sizerRef, handleResize);

    useEffect(() => {
        return () => resizerStopper.stop();
    }, []);

    // Call onResize when dimensions change
    useEffect(() => {
        props.onResize?.({ width, height });
    }, [width, height]);

    return {
        sizer: sizerRef,
        width: props.disableWidth ? undefined : width,
        height: props.disableHeight ? undefined : height,
    };
};
