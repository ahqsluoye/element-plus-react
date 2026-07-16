import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import React, { useEffect, useMemo, useState } from 'react';
import { useFloating } from './helper';
import type { TourContentProps } from './typings';

interface ContentProps extends TourContentProps {
    children?: React.ReactNode;
    onClose?: () => void;
    style?: React.CSSProperties;
}

function Content({
    placement: initialPlacement = 'bottom',
    reference,
    strategy = 'absolute',
    offset: offsetValue = 10,
    showArrow,
    style,
    zIndex = 2001,
    children,
    onClose,
}: ContentProps) {
    const ns = useClassNames('tour');
    const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
    const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null);

    const { update, contentStyle, arrowStyle, states } = useFloating(reference, popperElement, arrowElement, initialPlacement, strategy, offsetValue, zIndex, showArrow);

    useEffect(() => {
        if (popperElement && update) {
            update();
        }
    }, [popperElement]);

    const side = useMemo(() => {
        return states.placement.split('-')[0];
    }, [states]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose?.();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);
    const mergedContentStyle = useMemo(() => ({ ...contentStyle, ...style }), [contentStyle, style]);

    return (
        <div ref={setPopperElement} style={mergedContentStyle} className={ns.e('content')} data-side={side} tabIndex={-1} /* {...attributes.popper} */>
            {children}
            <span ref={setArrowElement} style={{ ...arrowStyle, display: showArrow ? 'block' : 'none' }} className={ns.e('arrow')} data-popper-arrow />
        </div>
    );
}

export default Content;
