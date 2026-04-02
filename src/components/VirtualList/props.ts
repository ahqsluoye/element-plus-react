import { VERTICAL } from './defaults';

import type { CSSProperties } from 'react';
import type { GridItemKeyGetter, ItemSize } from './types';

export interface VirtualizedProps {
    className?: string;
    containerElement?: string | React.ComponentType<any>;
    data?: any[];
    /**
     * @description controls the horizontal direction.
     */
    direction?: 'ltr' | 'rtl';
    height: number | string;
    innerElement?: string | React.ComponentType<any>;
    innerProps?: Record<string, unknown>;
    style?: CSSProperties;
    useIsScrolling?: boolean;
    width?: number | string;
    perfMode?: boolean;
    scrollbarAlwaysOn?: boolean;
}

export interface VirtualizedListProps extends VirtualizedProps {
    /**
     * @description describes how many items should be pre rendered to the head
     * and the tail of the window
     */
    cache?: number;
    estimatedItemSize?: number;
    /**
     * @description controls the list's orientation
     */
    layout?: 'horizontal' | 'vertical';
    initScrollOffset?: number;
    /**
     * @description describes the total number of the list.
     */
    total: number;
    itemSize: number | ItemSize;
}

export interface VirtualizedGridProps extends VirtualizedProps {
    columnCache?: number;
    columnWidth: number | ItemSize;
    estimatedColumnWidth?: number;
    estimatedRowHeight?: number;
    initScrollLeft?: number;
    initScrollTop?: number;
    itemKey?: GridItemKeyGetter;
    rowCache?: number;
    rowHeight: number | ItemSize;
    totalColumn: number;
    totalRow: number;
    hScrollbarSize?: number;
    vScrollbarSize?: number;
    scrollbarStartGap?: number;
    scrollbarEndGap?: number;
    role?: string;
}

export interface VirtualizedScrollbarProps {
    alwaysOn?: boolean;
    class?: string;
    layout: 'horizontal' | 'vertical';
    total: number;
    ratio: number;
    clientSize: number;
    scrollFrom: number;
    scrollbarSize?: number;
    startGap?: number;
    endGap?: number;
    visible?: boolean;
    onScroll?: (distance: number, totalSteps: number) => void;
    onStartMove?: () => void;
    onStopMove?: () => void;
}

const mutable = <T extends readonly any[]>(data: T): T => data;

export const defaultVirtualizedProps: Partial<VirtualizedProps> = {
    className: '',
    containerElement: 'div',
    data: mutable([] as const),
    direction: 'ltr',
    innerElement: 'div',
    innerProps: mutable({}),
    perfMode: true,
};

export const defaultVirtualizedListProps: Partial<VirtualizedListProps> = {
    cache: 2,
    layout: VERTICAL,
    initScrollOffset: 0,
    ...defaultVirtualizedProps,
};

export const defaultVirtualizedGridProps: Partial<VirtualizedGridProps> = {
    columnCache: 2,
    itemKey: ({ columnIndex, rowIndex }: { columnIndex: number; rowIndex: number }) => `${rowIndex}:${columnIndex}`,
    rowCache: 2,
    hScrollbarSize: 6,
    vScrollbarSize: 6,
    scrollbarStartGap: 0,
    scrollbarEndGap: 2,
    ...defaultVirtualizedProps,
};

export const defaultVirtualizedScrollbarProps: Partial<VirtualizedScrollbarProps> = {
    scrollbarSize: 6,
    startGap: 0,
    endGap: 2,
};
