import { useLayoutEffect as effect, useEffect } from 'react';

function canUseDom() {
    return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

/**
 * Wrap `useLayoutEffect` which will not throw warning message in test env
 */
const useLayoutEffect = canUseDom() ? effect : useEffect;

export default useLayoutEffect;
