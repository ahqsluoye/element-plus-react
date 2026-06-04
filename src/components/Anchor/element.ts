import { RefObject } from 'react';
import { isClient, isString } from '../Util';

type GetElement = <T extends string | HTMLElement | null | undefined>(
    target: string | RefObject<HTMLElement> | Window | null | undefined,
) => T extends string ? HTMLElement | null : T;

export const getElement = ((target: string | RefObject<HTMLElement> | Window | null | undefined) => {
    if (!isClient || target === '' || target === null) {
        return null;
    }
    if (isString(target)) {
        try {
            return document.querySelector<HTMLElement>(target);
        } catch {
            return null;
        }
    }
    if (!(target instanceof Window) && Object.prototype.hasOwnProperty.call(target, 'current')) {
        return target.current;
    }
    return target;
}) as GetElement;
