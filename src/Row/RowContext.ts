import { createContext } from 'react';

export interface RowContext {
    /** 栅格间隔 */
    gutter?: number;
}

export const RowContext = createContext<RowContext>({
    gutter: 0,
});
