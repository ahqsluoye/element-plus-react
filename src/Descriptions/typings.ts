import React from 'react';
import { BaseProps, NativeProps, TypeAttributes } from '../types/common';

export interface DescriptionsProps
    extends BaseProps<React.ReactElement<DescriptionsItemProps> | React.ReactElement<DescriptionsItemProps>[]>,
        NativeProps<'--el-descriptions-table-border' | '--el-descriptions-item-bordered-label-background'> {
    /** 是否带有边框 */
    border?: boolean;
    /** 一行 Descriptions Item 的数量 */
    column?: number;
    /** 排列的方向 */
    direction?: 'vertical' | 'horizontal';
    /** 列表的尺寸 */
    size?: TypeAttributes.Size;
    /** 标题文本，显示在左上方 */
    title?: string | React.ReactElement<any>;
    /** 操作区文本，显示在右上方 */
    extra?: string | React.ReactElement<any>;
}

export interface DescriptionsItemProps extends BaseProps, NativeProps {
    /** 标签文本 */
    label?: string | React.ReactElement<any>;
    /** 列的数量 */
    span?: number;
    /** 列的宽度，不同行相同列的宽度按最大值设定（如无 border ，宽度包含标签与内容） */
    width?: number | string;
    /** 列的最小宽度，与 width 的区别是 width 是固定的，minWidth 会把剩余宽度按比例分配给设置了 minWidth 的列（如无 border，宽度包含标签与内容） */
    minWidth?: number | string;
    /** 列的内容对齐方式（如无 border，对标签和内容均生效） */
    align?: 'left' | 'center' | 'right';
    /** 列的标签对齐方式，若不设置该项，则使用内容的对齐方式（如无 border，请使用 align 参数） */
    labelAlign?: 'left' | 'center' | 'right';
    /** 列标题自定义类名 */
    labelClassName?: string;
}
