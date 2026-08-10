import { createContext, use } from 'react';
import { DragEventsContextProps, TreeContextProps, TreeNodeExpandContextProps } from './typings';

export const TreeContext = createContext<TreeContextProps>({} as TreeContextProps);
export const TreeNodeExpandContext = createContext<TreeNodeExpandContextProps>({} as TreeNodeExpandContextProps);
export const DragEventsContext = createContext<DragEventsContextProps>({} as DragEventsContextProps);

export const useTreeContext = () => {
    return use(TreeContext);
};

export const useTreeNodeExpandContext = () => {
    return use(TreeNodeExpandContext);
};

export const useDragEventsContext = () => {
    return use(DragEventsContext);
};

export default useTreeContext;
