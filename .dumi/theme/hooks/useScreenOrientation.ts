import { useMemo, useState } from 'react';

export type OrientationType = 'portrait-primary' | 'portrait-secondary' | 'landscape-primary' | 'landscape-secondary';
export type OrientationLockType = 'any' | 'natural' | 'landscape' | 'portrait' | 'portrait-primary' | 'portrait-secondary' | 'landscape-primary' | 'landscape-secondary';

export interface ScreenOrientation extends EventTarget {
    lock: (orientation: OrientationLockType) => Promise<void>;
    unlock: () => void;
    readonly type: OrientationType;
    readonly angle: number;
    addEventListener: (type: 'change', listener: (this: this, ev: Event) => any, useCapture?: boolean) => void;
}

export function useScreenOrientation(window?: Window) {
    const isSupported = useMemo(() => window && 'screen' in window && 'orientation' in window.screen, []);

    const screenOrientation = (isSupported ? window!.screen.orientation : {}) as ScreenOrientation;

    const [orientation, setOrientation] = useState<OrientationType | undefined>(screenOrientation.type);
    const [angle, setAngle] = useState(screenOrientation.angle || 0);

    if (isSupported) {
        window.addEventListener(
            'orientationchange',
            () => {
                setOrientation(screenOrientation.type);
                setAngle(screenOrientation.angle);
            },
            { passive: true },
        );
    }

    const lockOrientation = (type: OrientationLockType) => {
        if (isSupported && typeof screenOrientation.lock === 'function') {
            return screenOrientation.lock(type);
        }

        return Promise.reject(new Error('Not supported'));
    };

    const unlockOrientation = () => {
        if (isSupported && typeof screenOrientation.unlock === 'function') {
            screenOrientation.unlock();
        }
    };

    return {
        isSupported,
        orientation,
        angle,
        lockOrientation,
        unlockOrientation,
    };
}

export type UseScreenOrientationReturn = ReturnType<typeof useScreenOrientation>;
