/* eslint-disable lines-around-comment */
import React from 'react';
import { BaseProps, NativeProps } from '../../types/common';
import { PaginationType } from '../interface';
import { TransferListProps } from './list';
import { TransferListBodyProps } from './listBody';

export type TransferDirection = 'left' | 'right';

// export interface RenderResultObject {
//     label: React.ReactElement;
//     value: string;
// }

export type RenderResult = React.ReactElement | string;

export interface TransferItem {
    key?: string | number;
    title?: string;
    description?: string;
    disabled?: boolean;
    [name: string]: any;
}

export type KeyWise<T> = T & { key: string };

export type KeyWiseTransferItem = KeyWise<TransferItem>;

export type TransferRender<RecordType> = (item: RecordType) => RenderResult;

export interface ListStyle {
    direction: TransferDirection;
}

/** 自定义顶部多选框标题的集合 */
export type SelectAllLabel = React.ReactElement<any> | ((info: { selectedCount: number; totalCount: number }) => React.ReactElement<any>);

export type FieldNames = { key?: string; title?: string; disabled?: string };

export interface TransferLocale {
    // titles: React.ReactElement[];
    notFoundContent?: React.ReactElement;
    searchPlaceholder?: string;
    itemUnit?: string;
    itemsUnit?: string;
    remove?: string;
    // selectAll?: string;
    // selectCurrent?: string;
    // selectInvert?: string;
    removeAll?: string;
    removeCurrent?: string;
}

export interface TransferProps<RecordType extends TransferItem = TransferItem> extends Omit<BaseProps, 'children'>, NativeProps {
    /** 是否禁用 */
    disabled?: boolean;
    /** 数据源，其中的数据将会被渲染到左边一栏中，targetKeys 中指定的除外 */
    data: RecordType[];
    /** 默认显示在右侧框数据的 key 集合 */
    defaultValue?: (string | number)[];
    /** 显示在右侧框数据的 key 集合（控制模式） */
    value?: (string | number)[];
    /** 设置哪些项应该被选中 */
    selectedKeys?: (string | number)[];
    /** 每行数据渲染函数，该函数的入参为 dataSource 中的项，返回值为 ReactElement。或者返回一个普通对象，其中 label 字段为 ReactElement，value 字段为 title */
    render?: TransferRender<RecordType>;
    /** 选项在两栏之间转移时的回调函数 */
    onChange?: (targetKeys: (string | number)[], direction: TransferDirection, moveKeys: (string | number)[]) => void;
    /** 选中项发生改变时的回调函数 */
    onSelectChange?: (sourceSelectedKeys: (string | number)[], targetSelectedKeys: (string | number)[]) => void;
    /** 两个穿梭框的自定义样式 */
    listStyle?: ((style: ListStyle) => React.CSSProperties) | React.CSSProperties;
    /** 操作栏的自定义样式 */
    operationStyle?: React.CSSProperties;
    /** 标题集合，顺序从左至右 */
    titles?: (React.ReactElement | string)[];
    /** 操作文案集合，顺序从上至下 */
    operations?: string[];
    /** 是否显示搜索框 */
    filterable?: boolean;
    /** 接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false */
    filterMethod?: (inputValue: string, item: RecordType) => boolean;
    /**  */
    locale?: Partial<TransferLocale>;
    /** 底部渲染函数 */
    footer?: (props: TransferListProps<RecordType>, extra: { direction: TransferDirection }) => React.ReactElement;
    /** 搜索框内容时改变时的回调函数 */
    onSearch?: (direction: TransferDirection, value: string) => void;
    /** 选项列表滚动时的回调函数 */
    onScroll?: (direction: TransferDirection, e) => void;
    /**  */
    children?: (props: TransferListBodyProps<RecordType>) => React.ReactElement;
    /** 是否展示全选勾选框 */
    showSelectAll?: boolean;
    /** 自定义顶部多选框标题的集合 */
    selectAllLabels?: SelectAllLabel[];
    /** 展示为单向样式 */
    oneWay?: boolean;
    /** 使用分页样式，自定义渲染列表下无效 */
    pagination?: PaginationType;
    /** 数据源的字段别名 */
    fieldNames?: FieldNames;
    /** 表单校验错误提示 */
    error?: boolean;
    /** 表单校验警告提示 */
    warning?: boolean;
}
