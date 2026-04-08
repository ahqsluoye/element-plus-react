import { addUnit, isFunction } from '@qsxy/element-plus-react/Util';
import isArray from 'lodash/isArray';
import React, { ReactElement, type CSSProperties, type ReactNode } from 'react';

const sumReducer = (sum: number, num: number) => sum + num;

export const sum = (listLike: number | number[]) => {
    return isArray(listLike) ? listLike.reduce(sumReducer, 0) : listLike;
};

export const tryCall = <T>(fLike: T, params: T extends (...args: infer K) => unknown ? K : any, defaultRet = {}) => {
    return isFunction(fLike) ? fLike(params) : fLike ?? defaultRet;
};

export const enforceUnit = (style: CSSProperties) => {
    const keys = ['width', 'maxWidth', 'minWidth', 'height'] as const;
    const _style = keys.reduce(
        (acc, key) => ({
            ...acc,
            [key]: addUnit(style[key]),
        }),
        style,
    );

    return _style;
};

// React version of componentToSlot
// In React, we don't need to convert components to slots like in Vue
// This function is kept for compatibility but simplified
export const componentToSlot = <T extends object>(ComponentLike: ReactNode | ((props: T) => ReactNode) | undefined) => {
    // In React, if it's a function, use it directly as a render prop
    // If it's a React element, return a function that renders it
    if (isFunction(ComponentLike)) {
        return (props: T) => ComponentLike(props);
    }
    if (React.isValidElement(ComponentLike)) {
        return (props: T) => React.cloneElement(ComponentLike as ReactElement<T>, props);
    }
    // For React elements or undefined, return undefined
    // The caller should handle rendering directly
    return null;
};
