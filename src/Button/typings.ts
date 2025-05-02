import React from 'react';
import { IconName, IconProps } from '../Icon';
import { BaseProps, NativeProps, TypeAttributes } from '../types/common';

export interface ButtonProps
    extends Omit<React.AllHTMLAttributes<HTMLElement>, 'loading' | 'size' | 'icon' | 'style' | 'children'>,
        BaseProps,
        NativeProps<
            | '--el-button-bg-color'
            | '--el-button-border-style'
            | '--el-button-text-color'
            | '--el-button-border-color'
            | '--el-button-hover-bg-color'
            | '--el-button-active-border-color'
            | '--el-button-active-bg-color'
            | '--el-button-active-color'
            | '--el-button-hover-text-color'
            | '--el-button-hover-border-color'
            | '--el-button-hover-link-text-color'
            | '--el-button-active-text-color'
            | '--el-button-disabled-text-color'
            | '--el-button-disabled-bg-color'
            | '--el-button-disabled-border-color'
            | '--el-button-divide-border-color'
            | '--el-button-outline-color'
            | '--el-button-border-radius-round'
        > {
    /** 尺寸 */
    size?: TypeAttributes.Size;
    /** 类型 */
    type?: TypeAttributes.Appearance;
    /** 是否为朴素按钮 */
    plain?: boolean;
    /** 是否为圆角按钮 */
    round?: boolean;
    /** 是否为圆形按钮 */
    circle?: boolean;
    /** 是否为文字按钮 */
    text?: boolean;
    /** 是否显示文字按钮背景颜色	 */
    bg?: boolean;
    /** 是否为链接按钮 */
    link?: boolean;
    /** 是否为虚线按钮 */
    dashed?: boolean;
    /** 是否为加载中状态 */
    loading?: boolean;
    /** 自定义加载中图标 */
    loadingIcon?: IconName;
    /** 自定义加载中图标 */
    loadingSlot?: React.ReactElement;
    /** 是否为激活状态 */
    active?: boolean;
    /** 是否为禁用状态 */
    disabled?: boolean;
    /** dark 模式, 意味着自动设置 color 为 dark 模式的颜色 */
    dark?: boolean;
    /** 自定义图标 */
    icon?: IconName | boolean;
    /** 自定义图标设置 */
    iconProps?: Omit<IconProps, 'name'>;
    /** 自定义颜色 */
    color?: string;
    /** Format button to appear inside a content bloc */
    block?: boolean;
    /** 自动在两个中文字符之间插入空格 */
    autoInsertSpace?: boolean;
    /** Providing a `href` will render an `<a>` element, _styled_ as a button */
    href?: string;
    /** Where to display the linked URL */
    target?: string;
    /** Defines HTML button type attribute */
    nativeType?: 'button' | 'reset' | 'submit';
}

export type ButtonRef = {
    /** 按钮 html 元素	 */
    ref: React.MutableRefObject<HTMLButtonElement>;
    /** 按钮尺寸 */
    size: TypeAttributes.Size;
    /** 类型 */
    type?: TypeAttributes.Appearance;
    /** 是否为禁用状态 */
    disabled?: boolean;
    /** 是否在两个字符之间插入空格 */
    shouldAddSpace?: boolean;
};

export type ButtonGroupProps = BaseProps &
    NativeProps &
    Pick<ButtonProps, 'disabled' | 'size' | 'type'> & {
        /** 背景色 */
        bgColor?: string;
        /** 边框颜色 */
        borderColor?: string;
    };
