import noop from 'lodash/noop';
import { createContext, MutableRefObject } from 'react';
import { Action, State } from './hooks/useSelection';
import { TableColumnCtx, TableProps, TableRefs, TreeNode } from './typings';

export interface TableContextProps<T> {
    tableId: string;

    /** 多级列 */
    columns: TableColumnCtx<T>[][];

    /** 最后一级列 */
    flattenColumns: TableColumnCtx<T>[];

    /** 左固定列 */
    fixedLeftColumns: TableColumnCtx<T>[];

    /** 右固定列 */
    fixedRightColumns: TableColumnCtx<T>[];
    tableRefs: TableRefs;
    props: Omit<TableProps<T>, 'children'>;
    data: T[];
    setData: (data: T[]) => void;
}

export interface TableHeaderContextProps {
    sortProp?: string;
    setSortProp: (sortProp?: string) => void;
    init: MutableRefObject<boolean | null>;
}

export interface TableBodyContextProps<T> {
    oldActiveRow: MutableRefObject<T | null | undefined>;
    state: State<T>;
    dispatch: (action: Action) => void;
    /** 原始表格数据 */
    initialData: MutableRefObject<T[]>;
    /** 排序后表格数据 */
    sortedData: MutableRefObject<T[]>;
    /** 禁止选中行 */
    disabledRows: MutableRefObject<T[]>;
    isTreeTable: () => boolean;
    isTreeExpandCell: (id: string) => boolean;
    treeProps: {
        hasChildren: string;
        children: string;
    };
    /** 树节点信息 */
    treeNodes: MutableRefObject<TreeNode[]>;
}

export const TableContext = createContext<TableContextProps<any>>({
    tableId: '',
    columns: [],
    flattenColumns: [],
    fixedLeftColumns: [],
    fixedRightColumns: [],
    // @ts-ignore
    props: {},
    data: [],
    setData: noop,
});

export const TableHeaderContext = createContext<TableHeaderContextProps>({
    sortProp: '',
    setSortProp: noop,
    init: { current: null },
});

export const TableBodyContext = createContext<TableBodyContextProps<any>>({
    oldActiveRow: { current: null },
    state: { isIndeterminate: false, selection: [], currentRow: null },
    dispatch: noop,
    initialData: { current: [] },
    sortedData: { current: [] },
    disabledRows: { current: [] },
    isTreeTable: () => false,
    isTreeExpandCell: () => false,
    treeProps: { hasChildren: 'hasChildren', children: 'children' },
    treeNodes: { current: [] },
});
