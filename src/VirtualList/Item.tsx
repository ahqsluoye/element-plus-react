import React, { Children, cloneElement, useCallback } from 'react';
import { ComponentChildren } from '../types/common';

export interface ItemProps {
    children: ComponentChildren;
    setRef: (element: HTMLElement) => void;
}

export function Item({ children, setRef }: ItemProps): React.ReactElement {
    const refFunc = useCallback(node => {
        setRef(node);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // @ts-ignore
    return cloneElement(Children.only(children), {
        ref: refFunc,
    });
}
