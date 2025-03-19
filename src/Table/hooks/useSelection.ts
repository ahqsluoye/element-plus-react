import isEqual from 'lodash/isEqual';
import some from 'lodash/some';
import uniqWith from 'lodash/uniqWith';
import { useCallback, useEffect, useReducer, useRef } from 'react';
import { isNotEmpty } from '../../Util';
import { TableProps } from '../typings';
import { getRowIdentity } from '../util';

/**
 * @author	Parker
 * @CreateTime	2022/9/17 19:39:22
 * @LastEditor	Parker
 * @ModifyTime	2022/11/7 19:38:04
 * @Description
 */
export const useSelection = <T>(props: TableProps<T>, data: T[]) => {
    const { rowKey, currentRowKey } = props;
    const _selection = useRef<T[]>([]);
    const disabledRows = useRef<T[]>([]);
    const oldActiveRow = useRef<T | null | undefined>(null);

    const reducer = useCallback((state: State<T>, action: Action) => {
        switch (action.type) {
            case 'onCheck':
                _selection.current = action.payload.selection || [];
                return { ...state, isIndeterminate: action.payload.isIndeterminate, selection: action.payload.selection };
            case 'activeRow':
                oldActiveRow.current = action.payload;
                return { ...state, currentRow: action.payload };
            default:
                return state;
        }
    }, []);

    const [state, dispatch] = useReducer(reducer, { isIndeterminate: false, selection: [], currentRow: undefined });

    /** 用于单选表格，设定某一行为选中行， 如果调用时不加参数，则会取消目前高亮行的选中状态。 */
    const setCurrentRow = useCallback((row?: T | null) => dispatch(activeRow(row)), []);

    /** 用于可扩展的表格或树表格，如果某行被扩展，则切换。 使用第二个参数，您可以直接设置该行应该被扩展或折叠。 */
    const toggleRowSelection = useCallback(
        (row: T, selected: boolean) => {
            if (isNotEmpty(row)) {
                const isSelected = some(_selection.current || [], item => isEqual(item, row));
                if (typeof selected === 'boolean') {
                    if (isSelected === selected) {
                        return;
                    }
                    _selection.current = selected
                        ? [..._selection.current, row]
                        : _selection.current.filter(item => (rowKey ? getRowIdentity<T>(item, rowKey) !== getRowIdentity<T>(row, rowKey) : !isEqual(item, row)));
                } else {
                    _selection.current = !isSelected
                        ? [..._selection.current, row]
                        : _selection.current.filter(item => (rowKey ? getRowIdentity<T>(item, rowKey) !== getRowIdentity<T>(row, rowKey) : !isEqual(item, row)));
                }
                dispatch(
                    onCheck({
                        selection: _selection.current,
                        isIndeterminate: _selection.current.length > 0 && _selection.current.length !== data.length,
                    }),
                );
            }
        },
        [data.length, rowKey],
    );

    /** 用于多选表格，切换全选和全不选 */
    const toggleAllSelection = useCallback(() => dispatch(onCheck({ selection: state.selection.length > 0 ? data : [], isIndeterminate: false })), [data, state.selection.length]);

    const getSelectionRows = useCallback(() => _selection.current, []);

    /** 用于多选表格，清空用户的选择 */
    const clearSelection = useCallback(() => {
        dispatch(onCheck({ isIndeterminate: false, selection: [] }));
    }, []);

    useEffect(() => {
        const selection = _selection.current.filter(item => data.some(row => (rowKey ? getRowIdentity<T>(item, rowKey) === getRowIdentity<T>(row, rowKey) : isEqual(item, row))));
        dispatch(onCheck({ selection, isIndeterminate: selection.length > 0 && selection.length < data.length }));

        // 禁止选择行数据内过滤掉不在表格数据范围内的数据
        disabledRows.current = disabledRows.current.filter(item1 =>
            data.some(item2 => (rowKey ? getRowIdentity<any>(item1, rowKey) === getRowIdentity<any>(item2, rowKey) : isEqual(item1, item2))),
        );
        // 去重
        disabledRows.current = uniqWith(disabledRows.current, rowKey ? (item1, item2) => getRowIdentity<any>(item1, rowKey) === getRowIdentity<any>(item2, rowKey) : isEqual);
    }, [data, rowKey]);

    useEffect(() => {
        if (rowKey) {
            const current = data.find(item => currentRowKey === getRowIdentity<T>(item, rowKey));
            dispatch(activeRow(current));
        }
    }, [currentRowKey, data, rowKey]);

    return {
        state,
        dispatch,
        oldActiveRow,
        setCurrentRow,
        disabledRows,
        toggleRowSelection,
        toggleAllSelection,
        getSelectionRows,
        clearSelection,
    };
};

export interface State<T> {
    isIndeterminate?: boolean;
    selection: T[];
    currentRow: T | null;
}

export interface Action {
    type: 'onCheck' | 'activeRow';
    payload: any;
}

/**
 * 用于单选表格，设定某一行为选中行
 * @param payload
 * @returns
 */
export const activeRow = <T>(payload: State<T>['currentRow']): Action => {
    return {
        type: 'activeRow',
        payload,
    };
};

/**
 * 多选模式下选中行
 * @param payload
 * @returns
 */
export const onCheck = <T>(payload: Pick<State<T>, 'isIndeterminate' | 'selection'>): Action => {
    return {
        type: 'onCheck',
        payload,
    };
};
