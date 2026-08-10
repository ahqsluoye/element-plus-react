import { useEffect, useRef } from 'react';

const useUpdateEffect: typeof useEffect = (effect, deps) => {
    const isMountingRef = useRef(true);

    useEffect(() => {
        if (isMountingRef.current) {
            isMountingRef.current = false;
            return;
        }
        effect();
    }, deps);
};

export default useUpdateEffect;
