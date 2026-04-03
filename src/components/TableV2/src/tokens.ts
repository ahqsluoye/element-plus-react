import { createContext } from 'react';
import { UseNamespaceReturn } from '../../hooks/useClassNames';

export type TableV2Context = {
    isScrolling: boolean;
    isResetting: boolean;
    ns: UseNamespaceReturn;
    scrollLeft?: number;
};

export const TableV2Context = createContext<TableV2Context | null>(null);

// Context for grid scroll left position
export const TableV2GridScrollLeftContext = createContext<number | undefined>(undefined);
export const TABLE_V2_GRID_INJECTION_KEY = TableV2GridScrollLeftContext;
