import memoize from 'memoize-one';
import { useCallback, useRef } from 'react';

export const useCache = <T>() => {
    const cacheRef = useRef<ReturnType<typeof memoize>>(null);

    if (!cacheRef.current) {
        const getItemStyleCache = (_: any, __: any, ___: any) => ({}) as Record<string, T>;
        cacheRef.current = memoize(getItemStyleCache);
    }

    const getCachedStyle = useCallback((arg1: any, arg2: any, arg3: any) => {
        return cacheRef.current?.(arg1, arg2, arg3);
    }, []);

    return getCachedStyle;
};
