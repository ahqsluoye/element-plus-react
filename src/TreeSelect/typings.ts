import React from 'react';
import { InputRef } from '../Input';
import { PopperOptionRef } from '../Popper';
import { DataNode, Key, TreeProps } from '../Tree';
import { AnimationEventProps, BaseProps, FormControlBaseProps, NativeProps } from '../types/common';

export type ValueType = React.AllHTMLAttributes<HTMLInputElement>['value'];
export type TreeSelectRef = {
    inputInstance?: InputRef;
    searchInstance?: InputRef;
    popperInstRef: PopperOptionRef;
    label: string | string[];
    setLabel: (label: string) => void;
    getValue: () => ValueType;
    setValue: (value: ValueType) => void;
    onClear: (event?: any) => void;
    setVisible: (value: boolean) => void;
};

export interface TreeSelectProps<T = DataNode, V = ValueType>
    extends Omit<FormControlBaseProps<V>, 'onChange'>,
        Omit<TreeProps<T>, 'children' | 'style'>,
        Omit<BaseProps, 'children'>,
        NativeProps,
        AnimationEventProps {
    // /** 节点数据中保存唯一标识的属性名称 */
    // idKey?: string;
    // /** 节点数据中保存其父节点唯一标识的属性名称 */
    // pIdKey?: string;
    // /** 节点数据保存节点名称的属性名称 */
    // nameKey?: string;
    /** 表单提交给后台表示节点名称的name */
    labelName?: string;
    /** 是否可以清空选项 */
    clearable?: boolean;
    /** 占位符 */
    placeholder?: string;
    filterable?: boolean;
    /** 选择任意级别 */
    checkStrictly?: boolean;
    /** 多选时是否将选中值按文字的形式展示 */
    collapseTags?: boolean;
    /** 是否纯文本模式，即无边框 */
    plain?: boolean;
    /**  */
    required?: boolean;
    /** 下拉项最大宽度 */
    maxWidth?: number;
    /** 表单校验错误提示 */
    error?: boolean;
    /** 表单校验警告提示 */
    warning?: boolean;
    /** 表是否加载中 */
    loading?: boolean;
    /** 输入框前置内容，只对 type="text" 有效 */
    prepend?: React.ReactElement<any> | string | number;
    /** 输入框后置内容，只对 type="text" 有效 */
    append?: React.ReactElement | string | number;
    /** 选项为空时显示的文字 */
    noDataText?: React.ReactElement | string;
    /** 远程加载时显示的文字 */
    loadingText?: React.ReactElement | string;
    /** 点击节点前的回调，返回true触发onClick事件和onSelect事件 */
    onBeforeClick?: (node: T, event: React.MouseEvent<any>) => boolean;
    /** 点击节点事件 */
    onClickNode?: (node: T, event: React.MouseEvent<any>) => boolean;
    /** 选中值发生变化时触发 */
    onChange?: (value: ValueType | Key[], label?: string | string[]) => void;
    /** 数据加载成功时调用 */
    onLoadSuccess?: (value: ValueType | Key[], label?: string[]) => void;
}

export type SelectInfo<T> = {
    event: 'select';
    selected: boolean;
    node: T;
    selectedNodes: T[];
    nativeEvent: React.MouseEvent<any>;
};
