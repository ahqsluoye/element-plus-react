import React from 'react';
import { Item } from '../Item';
import type { RenderFunc, SharedConfig } from '../interface';

export default function useChildren<T>(
    list: T[],
    startIndex: number,
    endIndex: number,
    setNodeRef: (item: T, element: HTMLElement) => void,
    renderFunc: RenderFunc<T>,
    { getKey }: SharedConfig<T>,
) {
    return list.slice(startIndex, endIndex + 1).map((item, index) => {
        const eleIndex = startIndex + index;
        const node = renderFunc(item, eleIndex, {
            // style: status === 'MEASURE_START' ? { visibility: 'hidden' } : {},
        }) as React.ReactElement;

        const key = getKey(item);
        return (
            <Item key={key} setRef={ele => setNodeRef(item, ele)}>
                {node}
            </Item>
        );
    });
}
