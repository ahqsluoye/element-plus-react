import React from 'react';
import { BaseProps, NativeProps } from '../../types/common';
import { PaginationType } from '../interface';
import { FieldNames, RenderResult, SelectAllLabel, TransferDirection, TransferLocale } from './index';
import { TransferListBodyProps } from './listBody';

export interface RenderedItem<RecordType> {
    renderedText: string;
    renderedEl: React.ReactElement;
    item: RecordType;
}

export type RenderListFunction<T> = (props: TransferListBodyProps<T>) => React.ReactElement;

export interface TransferListProps<RecordType> extends TransferLocale, BaseProps, NativeProps {
    /** 标题 */
    titleText?: string | React.ReactElement;
    /** 数据源 */
    data: RecordType[];
    /**  */
    filterOption?: (filterText: string, item: RecordType) => boolean;
    /**  */
    checkedKeys: (string | number)[];
    /**  */
    handleFilter: (e) => void;
    /**  */
    onItemSelect: (key: string | number, check: boolean) => void;
    /**  */
    onItemSelectAll: (data: (string | number)[], checkAll: boolean, overWrite?: boolean) => void;
    /**  */
    onItemRemove?: (keys: (string | number)[]) => void;
    /**  */
    handleClear: () => void;
    /**  */
    render?: (item: RecordType) => RenderResult;
    /**  */
    showSearch?: boolean;
    /**  */
    searchPlaceholder?: string;
    /**  */
    itemUnit?: string;
    /**  */
    itemsUnit?: string;
    /**  */
    renderList?: RenderListFunction<RecordType>;
    /**  */
    footer?: (props: TransferListProps<RecordType>, info?: { direction: TransferDirection }) => React.ReactElement;
    /**  */
    onScroll: (e) => void;
    /**  */
    disabled?: boolean;
    /**  */
    direction: TransferDirection;
    /** 是否展示全选勾选框 */
    showSelectAll?: boolean;
    /**  */
    /** 自定义顶部多选框标题 */
    selectAllLabel?: SelectAllLabel;
    /**  */
    showRemove?: boolean;
    /** 分页 */
    pagination?: PaginationType;
    /** 数据源的字段别名 */
    fieldNames: FieldNames;
}
