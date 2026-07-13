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

export type TransferKey = string | number;

export interface TransferDataItem {
    key?: TransferKey;
    title?: string;
    description?: string;
    disabled?: boolean;
    [name: string]: any;
}

export type KeyWise<T> = T & { key: string };

export type KeyWiseTransferItem = KeyWise<TransferDataItem>;

export type TransferRender<RecordType> = (item: RecordType) => RenderResult;

export interface ListStyle {
    direction: TransferDirection;
}

/** 自定义顶部多选框标题的集合 */
export type TransferFormat = React.ReactElement<any> | ((info: { checked: number; total: number }) => React.ReactNode);

export type TransferPropsAlias = { key?: string; label?: string; disabled?: string };

export interface TransferLocale {
    // titles: React.ReactElement[];
    notFoundContent?: React.ReactNode;
    filterPlaceholder?: string;
    itemUnit?: string;
    itemsUnit?: string;
    remove?: string;
    // selectAll?: string;
    // selectCurrent?: string;
    // selectInvert?: string;
    removeAll?: string;
    removeCurrent?: string;
}

export interface TransferProps<RecordType extends TransferDataItem = TransferDataItem> extends Omit<BaseProps, 'children'>, NativeProps {
    /** 默认显示在右侧框数据的 key 集合 */
    defaultValue?: (string | number)[];
    /** 显示在右侧框数据的 key 集合（控制模式） */
    value?: (string | number)[];
    /** 数据源，其中的数据将会被渲染到左边一栏中，targetKeys 中指定的除外 */
    data: RecordType[];
    /** 是否显示搜索框 */
    filterable?: boolean;
    /** 接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false */
    filterMethod?: (inputValue: string, item: RecordType) => boolean;
    /** 搜索框占位符 */
    filterPlaceholder?: string;
    /** 自定义列表标题，顺序从左至右 */
    titles?: (React.ReactElement | string)[];
    /** 自定义按钮文案 */
    buttonTexts?: string[];
    /** 每行数据渲染函数，该函数的入参为 dataSource 中的项，返回值为 ReactElement。或者返回一个普通对象 */
    renderContent?: TransferRender<RecordType>;
    /** 列表顶部勾选状态文案 */
    format?: TransferFormat;
    /** 数据源的字段别名 */
    props?: TransferPropsAlias;
    /** 初始状态下左侧列表的已勾选项的 key 数组 */
    leftDefaultChecked?: (string | number)[];
    /** 初始状态下右侧列表的已勾选项的 key 数组 */
    rightDefaultChecked?: (string | number)[];
    /** 是否禁用 */
    disabled?: boolean;
    /** 选项在两栏之间转移时的回调函数 */
    onChange?: (targetKeys: (string | number)[], direction: TransferDirection, moveKeys: (string | number)[]) => void;
    /** 选中项发生改变时的回调函数 */
    onSelectChange?: (sourceSelectedKeys: (string | number)[], targetSelectedKeys: (string | number)[]) => void;
    /** 左侧列表元素被用户选中 / 取消选中时触发 */
    onLeftCheckChange?: (value: (string | number)[], movedKeys?: (string | number)[]) => void;
    /** 右侧列表元素被用户选中 / 取消选中时触发 */
    onRightCheckChange?: (value: (string | number)[], movedKeys?: (string | number)[]) => void;
    /** 两个穿梭框的自定义样式 */
    listStyle?: ((style: ListStyle) => React.CSSProperties) | React.CSSProperties;
    /** 操作栏的自定义样式 */
    operationStyle?: React.CSSProperties;
    /** 左侧列表底部的内容 */
    leftFooter?: (props: TransferListProps<RecordType>) => React.ReactElement;
    /** 右侧列表底部的内容 */
    rightFooter?: (props: TransferListProps<RecordType>) => React.ReactElement;
    /** 搜索框内容时改变时的回调函数 */
    onSearch?: (direction: TransferDirection, value: string) => void;
    /** 选项列表滚动时的回调函数 */
    onScroll?: (direction: TransferDirection, e) => void;
    /**  */
    children?: (props: TransferListBodyProps<RecordType>) => React.ReactElement;
    /** 左侧列表为空时的提示内容 */
    leftEmpty?: React.ReactNode;
    /** 右侧列表为空时的提示内容 */
    rightEmpty?: React.ReactNode;
    /** 是否展示全选勾选框 */
    showSelectAll?: boolean;
    /** 展示为单向样式 */
    oneWay?: boolean;
    /** 使用分页样式，自定义渲染列表下无效 */
    pagination?: PaginationType;
    /** 表单校验错误提示 */
    error?: boolean;
    /** 表单校验警告提示 */
    warning?: boolean;
}
