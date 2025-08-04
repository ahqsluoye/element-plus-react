import { addStyle } from 'dom-lib';
import React, { useCallback, useEffect, useState } from 'react';

export interface CssTransitonProps {
    nodeRef: React.RefObject<HTMLElement>;
    visible: boolean;
    disabled?: boolean;
    duration?: number;
    beforeLeave?: (el: HTMLElement) => void;
    onLeave?: (el: HTMLElement) => void;
    afterLeave?: (el: HTMLElement) => void;
    beforeEnter?: (el: HTMLElement) => void;
    onEnter?: (el: HTMLElement) => void;
    afterEnter?: (el: HTMLElement) => void;
}

export enum STATUS {
    UNMOUNTED = 0,
    BEFORE_LEAVE = 1,
    LEAVE = 2,
    AFTER_LEAVE = 3,
    BEFORE_ENTER = 4,
    ENTER = 5,
    AFTER_ENTER = 6,
}
const useCssTransiton = (props: CssTransitonProps) => {
    const { nodeRef, visible, disabled, duration = 250, beforeLeave, onLeave, afterLeave, beforeEnter, onEnter, afterEnter } = props;
    const [status, setStatus] = useState(STATUS.UNMOUNTED);

    const [mounted, setMounted] = useState(false);

    const startCssTransition = useCallback(() => {
        setStatus(STATUS.BEFORE_LEAVE);
    }, []);

    useEffect(() => {
        if (!disabled) {
            if (mounted) {
                startCssTransition();
            } else {
                setMounted(true);
            }
        }
    }, [visible]);

    useEffect(() => {
        if (status === STATUS.BEFORE_LEAVE) {
            beforeLeave?.(nodeRef.current);
            setStatus(STATUS.LEAVE);
        } else if (status === STATUS.LEAVE) {
            onLeave?.(nodeRef.current);
            setStatus(STATUS.AFTER_LEAVE);
        } else if (status === STATUS.AFTER_LEAVE) {
            setTimeout(() => {
                afterLeave?.(nodeRef.current);
                setStatus(STATUS.BEFORE_ENTER);
                addStyle(nodeRef.current, { display: 'none' });
            }, duration);
        } else if (status === STATUS.BEFORE_ENTER) {
            beforeEnter?.(nodeRef.current);
            setStatus(STATUS.ENTER);
        } else if (status === STATUS.ENTER) {
            addStyle(nodeRef.current, { display: '' });
            onEnter?.(nodeRef.current);
            setStatus(STATUS.AFTER_ENTER);
        } else if (status === STATUS.AFTER_ENTER) {
            afterEnter?.(nodeRef.current);
        }
    }, [status]);

    return { mounted };
};

export default useCssTransiton;
