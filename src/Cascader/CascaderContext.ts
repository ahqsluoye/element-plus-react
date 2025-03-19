import noop from 'lodash/noop';
import { createContext } from 'react';
import { DataNode, DirectoryTreeProps, Key } from '../Tree';
import { CascaderMenuProps, TreeMenuProps } from './typings';

interface CascaderContextProps<T = DataNode> {
    menuProps: CascaderMenuProps;

    treeMenuProps?: TreeMenuProps;

    treeProps?: DirectoryTreeProps<T>;

    loading?: string;

    searchText?: string;

    getExpandedKeys?: (level: number) => Key[];

    setExpandedKeys?: (level: number, keys: Key[]) => void;

    onSelect: (level: number, node: object) => void;

    onCheckedChange: (_level: number, node: object, checked: boolean) => void;

    getDataType: (level: number) => boolean;

    getTreeData: (level: number) => DataNode[];
}

export const CascaderContext = createContext<CascaderContextProps>({
    onSelect: noop,
    onCheckedChange: noop,
    loading: null,
    searchText: null,
    menuProps: {},
    treeMenuProps: {},
    getExpandedKeys: () => [],
    setExpandedKeys: noop,
    getDataType: () => false,
    getTreeData: () => [],
});
