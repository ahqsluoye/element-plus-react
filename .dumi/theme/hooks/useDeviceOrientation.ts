import { useMemo, useState } from 'react';

export function useDeviceOrientation(window?: Window) {
    const isSupported = useMemo(() => window && 'DeviceOrientationEvent' in window, [window]);

    const [isAbsolute, setIsAbsolute] = useState(false);
    const [alpha, setAlpha] = useState<number | null>(null);
    const [beta, setBeta] = useState<number | null>(null);
    const [gamma, setGamma] = useState<number | null>(null);

    if (window && isSupported) {
        window.addEventListener(
            'deviceorientation',
            event => {
                setIsAbsolute(event.absolute);
                setAlpha(event.alpha);
                setBeta(event.beta);
                setGamma(event.gamma);
            },
            { passive: true },
        );
    }

    return {
        isSupported,
        isAbsolute,
        alpha,
        beta,
        gamma,
    };
}

export type UseDeviceOrientationReturn = ReturnType<typeof useDeviceOrientation>;
