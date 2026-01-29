import { createContext, useContext } from 'react';
import { DragEventsContextProps, TreeContextProps, TreeNodeExpandContextProps } from './typings';

export const TreeContext = createContext<TreeContextProps>({} as TreeContextProps);
export const TreeNodeExpandContext = createContext<TreeNodeExpandContextProps>({} as TreeNodeExpandContextProps);
export const DragEventsContext = createContext<DragEventsContextProps>({} as DragEventsContextProps);

export const useTreeContext = () => {
    return useContext(TreeContext);
};

export const useTreeNodeExpandContext = () => {
    return useContext(TreeNodeExpandContext);
};

export const useDragEventsContext = () => {
    return useContext(DragEventsContext);
};

export default useTreeContext;
