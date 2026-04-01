import { createContext } from 'react';

export interface TabsContextProps {
    activeName: string | number;
}

export const TabsContext = createContext<TabsContextProps>({
    activeName: '',
});
