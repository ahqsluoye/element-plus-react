import type { Modifier } from '@popperjs/core';
import React, { useEffect, useMemo, useState } from 'react';
import { useClassNames } from '../hooks';
import { useFloating } from './helper';
import type { TourContentProps } from './typings';

const maxSizeModifier: Modifier<'maxSize', any> = {
    name: 'maxSize',
    enabled: true,
    phase: 'main',
    fn({ state }) {
        const overflow = state.modifiersData.preventOverflow || {};
        let overWidth = 0;
        if (overflow.x > 0) {
            overWidth = overflow.x;
        }
        // The right overflow value is negative when overflowing
        if (overflow.x < 0) {
            overWidth = Math.abs(overflow.x);
        }
        const floatingWidth = state.rects.floating.width;
        Object.assign(state.styles.popper, {
            maxWidth: `${Math.max(floatingWidth - overWidth, 200)}px`,
        });
    },
};

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

    const { update, contentStyle, arrowStyle } = useFloating(reference, popperElement, arrowElement, initialPlacement, strategy, offsetValue, zIndex, showArrow);

    useEffect(() => {
        if (popperElement && update) {
            update();
        }
    }, [popperElement]);

    const side = useMemo(() => {
        return initialPlacement.split('-')[0];
    }, [initialPlacement]);

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
