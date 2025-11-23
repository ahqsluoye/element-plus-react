import isFunction from 'lodash/isFunction';
import { RefObject, useRef, useState } from 'react';
import { isFocusable } from '../Util/aria';

interface UseFocusControllerOptions {
    disabled?: boolean;
    /**
     * return true to cancel focus
     * @param event FocusEvent
     */
    beforeFocus?: (event: FocusEvent) => boolean | undefined;
    afterFocus?: () => void;
    /**
     * return true to cancel blur
     * @param event FocusEvent
     */
    beforeBlur?: (event: FocusEvent) => boolean | undefined;
    afterBlur?: () => void;
}

export function useFocusController<T extends { focus: () => void }>(
    target: RefObject<HTMLElement | undefined>,
    { disabled, beforeFocus, afterFocus, beforeBlur, afterBlur }: UseFocusControllerOptions = {},
) {
    const [isFocused, setIsFocused] = useState(false);
    const wrapperRef = useRef<HTMLInputElement>(null);

    const handleFocus = (event: FocusEvent) => {
        const cancelFocus = isFunction(beforeFocus) ? beforeFocus(event) : false;
        if (disabled || isFocused || cancelFocus) {
            return;
        }

        setIsFocused(true);
        // emit('focus', event);
        afterFocus?.();
    };

    const handleBlur = (event: FocusEvent) => {
        const cancelBlur = isFunction(beforeBlur) ? beforeBlur(event) : false;
        if (disabled || (event.relatedTarget && wrapperRef.current?.contains(event.relatedTarget as Node)) || cancelBlur) {
            return;
        }

        setIsFocused(false);

        // emit('blur', event);
        afterBlur?.();
    };

    const handleClick = (event: Event) => {
        if (disabled || isFocusable(event.target as HTMLElement) || (wrapperRef.current?.contains(document.activeElement) && wrapperRef.current !== document.activeElement)) {
            return;
        }

        target.current?.focus();
    };

    // useMount(() => {
    //     if (!wrapperRef.current) {
    //         return;
    //     }
    //     wrapperRef.current.addEventListener('focus', handleFocus, true);
    //     wrapperRef.current.addEventListener('blur', handleBlur, true);
    //     wrapperRef.current.addEventListener('click', handleClick, true);
    //     return () => {
    //         wrapperRef.current?.removeEventListener('focus', handleFocus, true);
    //         wrapperRef.current?.removeEventListener('blur', handleBlur, true);
    //         wrapperRef.current?.removeEventListener('click', handleClick, true);
    //     };
    // });

    return {
        isFocused,
        /** Avoid using wrapperRef and handleFocus/handleBlur together */
        wrapperRef,
        handleFocus,
        handleBlur,
        handleClick,
    };
}
