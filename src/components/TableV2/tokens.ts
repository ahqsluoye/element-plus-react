import { UseNamespaceReturn } from '@qsxy/element-plus-react/hooks/useClassNames';
import { createContext, RefObject } from 'react';

export type TableV2Context = {
    isScrolling: boolean;
    isResetting: RefObject<boolean>;
    ns: UseNamespaceReturn;
    scrollLeft?: number;
};

export const TableV2Context = createContext<TableV2Context | null>(null);

// Context for grid scroll left position
export const TableV2GridScrollLeftContext = createContext<number | undefined>(undefined);
export const TABLE_V2_GRID_INJECTION_KEY = TableV2Context;
