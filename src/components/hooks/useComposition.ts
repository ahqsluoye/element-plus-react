import { CompositionEvent, useRef } from 'react';

interface UseCompositionOptions {
    afterComposition: (event: CompositionEvent<HTMLInputElement>) => void;
    compositionstart?: (evt: CompositionEvent<HTMLInputElement>) => void;
    compositionupdate?: (evt: CompositionEvent<HTMLInputElement>) => void;
    compositionend?: (evt: CompositionEvent<HTMLInputElement>) => void;
}

export function useComposition({ afterComposition, compositionstart, compositionupdate, compositionend }: UseCompositionOptions) {
    const isComposing = useRef(false);

    const handleCompositionStart = (event: CompositionEvent<HTMLInputElement>) => {
        compositionstart?.(event);
        isComposing.current = true;
    };

    const handleCompositionUpdate = (event: CompositionEvent<HTMLInputElement>) => {
        compositionupdate?.(event);
        const text = (event.target as HTMLInputElement)?.value;
        const lastCharacter = text[text.length - 1] || '';
        isComposing.current = !isKorean(lastCharacter);
    };

    const handleCompositionEnd = (event: CompositionEvent<HTMLInputElement>) => {
        compositionend?.(event);
        if (isComposing.current) {
            isComposing.current = false;
            afterComposition(event);
        }
    };

    const handleComposition = (event: CompositionEvent<HTMLInputElement>) => {
        event.type === 'compositionend' ? handleCompositionEnd(event) : handleCompositionUpdate(event);
    };

    return {
        isComposing,
        handleComposition,
        handleCompositionStart,
        handleCompositionUpdate,
        handleCompositionEnd,
    };
}

export const isKorean = (text: string) => /([\uAC00-\uD7AF\u3130-\u318F])+/gi.test(text);
