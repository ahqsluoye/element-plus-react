import { SelectProps, SelectRef } from '@qsxy/element-plus-react/Select/typings';
import { TreeProps, TreeRef } from '@qsxy/element-plus-react/Tree/typings';

export interface TreeSelectProps extends Omit<TreeProps, 'children' | 'style'>, Omit<SelectProps, 'props' | 'options'> {
    /** 懒加载节点的缓存数据，结构与数据相同，用于获取未加载数据的标签 */
    cacheData?: any[];
}

export type CacheOption = {
    value: string | number | boolean | object;
    currentLabel: string | number;
    label: string | number;
    isDisabled: boolean;
};

export type TreeSelectRef = Pick<
    TreeRef,
    | 'filter'
    | 'updateKeyChildren'
    | 'getCheckedNodes'
    | 'setCheckedNodes'
    | 'getCheckedKeys'
    | 'setCheckedKeys'
    | 'setChecked'
    | 'getHalfCheckedNodes'
    | 'getHalfCheckedKeys'
    | 'getCurrentKey'
    | 'getCurrentNode'
    | 'setCurrentKey'
    | 'setCurrentNode'
    | 'getNode'
    | 'remove'
    | 'append'
    | 'insertBefore'
    | 'insertAfter'
> &
    Pick<SelectRef, 'getValue' | 'setVisible'>;
