import { createContext } from 'react';
import { UseNamespaceReturn } from '../../hooks/useClassNames';

export type TableV2Context = {
    isScrolling: boolean;
    isResetting: boolean;
    ns: UseNamespaceReturn;
};

export const TableV2Context = createContext<TableV2Context | null>(null);

export const TABLE_V2_GRID_INJECTION_KEY = 'tableV2GridScrollLeft';
