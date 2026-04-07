export const isClient = typeof window !== 'undefined' && typeof document !== 'undefined';

export const rAF = (fn: () => void) => (isClient ? window.requestAnimationFrame(fn) : (setTimeout(fn, 16) as unknown as number));

export const cAF = (handle: number) => (isClient ? window.cancelAnimationFrame(handle) : clearTimeout(handle));

export const isFirefox = (): boolean => isClient && /firefox/i.test(window.navigator.userAgent);
