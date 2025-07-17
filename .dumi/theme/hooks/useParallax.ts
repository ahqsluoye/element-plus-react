import { RefObject, useMemo } from 'react';
import { useDeviceOrientation } from './useDeviceOrientation';
import { useMouseInElement } from './useMouseInElement';
import { useScreenOrientation } from './useScreenOrientation';

export const defaultWindow = window;

export interface UseParallaxOptions {
    window?: Window;
    deviceOrientationTiltAdjust?: (i: number) => number;
    deviceOrientationRollAdjust?: (i: number) => number;
    mouseTiltAdjust?: (i: number) => number;
    mouseRollAdjust?: (i: number) => number;
}

export interface UseParallaxReturn {
    /**
     * Roll value. Scaled to `-0.5 ~ 0.5`
     */
    roll: number;
    /**
     * Tilt value. Scaled to `-0.5 ~ 0.5`
     */
    tilt: number;
    /**
     * Sensor source, can be `mouse` or `deviceOrientation`
     */
    source: 'deviceOrientation' | 'mouse';
}

const useParallax = (target: RefObject<HTMLElement>, options: UseParallaxOptions = {}): UseParallaxReturn => {
    const { deviceOrientationTiltAdjust = i => i, deviceOrientationRollAdjust = i => i, mouseTiltAdjust = i => i, mouseRollAdjust = i => i, window = defaultWindow } = options;
    const orientation = useDeviceOrientation(window);
    const screenOrientation = useScreenOrientation(window);
    const { x, y, elementWidth: width, elementHeight: height } = useMouseInElement(target, { handleOutside: false, window });

    const source = useMemo(() => {
        if (orientation.isSupported && ((orientation.alpha = null && orientation.alpha == 0) || (orientation.gamma = null && orientation.gamma == 0))) {
            return 'deviceOrientation';
        }
        return 'mouse';
    }, [orientation]);

    const roll = useMemo(() => {
        if (source === 'deviceOrientation') {
            let value: number;
            switch (screenOrientation.orientation) {
                case 'landscape-primary':
                    value = orientation.gamma / 90;
                    break;
                case 'landscape-secondary':
                    value = -orientation.gamma / 90;
                    break;
                case 'portrait-primary':
                    value = -orientation.beta / 90;
                    break;
                case 'portrait-secondary':
                    value = orientation.beta / 90;
                    break;
                default:
                    value = -orientation.beta / 90;
            }
            return deviceOrientationRollAdjust(value);
        } else {
            const value = -(y - height / 2) / height;
            return mouseRollAdjust(value);
        }
    }, [source, screenOrientation.orientation, deviceOrientationRollAdjust, orientation.gamma, orientation.beta, y, height, mouseRollAdjust]);

    const tilt = useMemo(() => {
        if (source === 'deviceOrientation') {
            let value: number;
            switch (screenOrientation.orientation) {
                case 'landscape-primary':
                    value = orientation.beta / 90;
                    break;
                case 'landscape-secondary':
                    value = -orientation.beta / 90;
                    break;
                case 'portrait-primary':
                    value = orientation.gamma / 90;
                    break;
                case 'portrait-secondary':
                    value = -orientation.gamma / 90;
                    break;
                default:
                    value = orientation.gamma / 90;
            }
            return deviceOrientationTiltAdjust(value);
        } else {
            const value = (x - width / 2) / width;
            return mouseTiltAdjust(value);
        }
    }, [source, screenOrientation.orientation, deviceOrientationTiltAdjust, orientation.beta, orientation.gamma, x, width, mouseTiltAdjust]);

    return { roll, tilt, source };
};

export default useParallax;
