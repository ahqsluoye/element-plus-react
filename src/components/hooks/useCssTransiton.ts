import { nextTick } from '@qsxy/element-plus-react/Util/base';
import React, { useCallback, useEffect, useRef } from 'react';

export interface CssTransitonProps {
    nodeRef: React.RefObject<HTMLElement>;
    visible: boolean;
    disabled?: boolean;
    duration?: number;
    beforeLeave?: (el: HTMLElement) => void;
    onLeave?: (el: HTMLElement) => void;
    afterLeave?: (el: HTMLElement) => void;
    beforeEnter?: (el: HTMLElement) => void;
    onEnter?: (el: HTMLElement, done?: () => void) => void;
    afterEnter?: (el: HTMLElement) => void;
    done?: () => void;
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
    const { nodeRef, visible, disabled, duration = 250, beforeLeave, onLeave, afterLeave, beforeEnter, onEnter, afterEnter, done } = props;

    const mountedRef = useRef(false);
    const statusRef = useRef(STATUS.UNMOUNTED);

    const nextAnimFrame = useCallback(
        async (callback: () => void) => {
            await nextTick(callback);
            if (statusRef.current === STATUS.LEAVE) {
                onLeave?.(nodeRef.current);
                nextAnimFrame(() => {
                    statusRef.current = STATUS.AFTER_LEAVE;
                });
            } else if (statusRef.current === STATUS.AFTER_LEAVE) {
                setTimeout(() => {
                    afterLeave?.(nodeRef.current);
                    nextAnimFrame(() => {
                        statusRef.current = STATUS.BEFORE_ENTER;
                    });
                    // addStyle(nodeRef.current, { display: 'none' });
                }, duration);
            } else if (statusRef.current === STATUS.BEFORE_ENTER) {
                beforeEnter?.(nodeRef.current);
                nextAnimFrame(() => {
                    statusRef.current = STATUS.ENTER;
                });
            } else if (statusRef.current === STATUS.ENTER) {
                // addStyle(nodeRef.current, { display: '' });
                onEnter?.(nodeRef.current, done);
                nextAnimFrame(() => {
                    statusRef.current = STATUS.AFTER_ENTER;
                });
            } else if (statusRef.current === STATUS.AFTER_ENTER) {
                afterEnter?.(nodeRef.current);
            }
        },
        [afterEnter, afterLeave, beforeEnter, done, duration, nodeRef, onEnter, onLeave],
    );

    const startCssTransition = useCallback(() => {
        statusRef.current = STATUS.BEFORE_LEAVE;
        beforeLeave?.(nodeRef.current);
        nextAnimFrame(() => {
            statusRef.current = STATUS.LEAVE;
        });
    }, [beforeLeave, nextAnimFrame, nodeRef]);

    useEffect(() => {
        if (!disabled) {
            if (mountedRef.current) {
                startCssTransition();
            } else {
                mountedRef.current = true;
                done?.();
            }
        } else {
            done?.();
        }
    }, [visible]);
};

export default useCssTransiton;
