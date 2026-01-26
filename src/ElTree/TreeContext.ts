import { createContext, useContext } from 'react';
import { TreeContextProps } from './typings';

export const TreeContext = createContext<TreeContextProps>({} as TreeContextProps);

export const useTreeContext = () => {
    return useContext(TreeContext);
};

export default useTreeContext;
