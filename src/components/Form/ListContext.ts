import { createContext, Key } from 'react';
import type { InternalNamePath } from './typings';

export interface ListContextProps {
    getKey: (namePath: InternalNamePath) => [Key, InternalNamePath];
}

const ListContext = createContext<ListContextProps | null>(null);

export default ListContext;
