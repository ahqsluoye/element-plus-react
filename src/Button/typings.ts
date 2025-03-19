/* eslint-disable lines-around-comment */
import React from 'react';
import { IconName } from '../Icon';
import { BaseProps, NativeProps, TypeAttributes } from '../types/common';

export interface ButtonProps extends Omit<React.AllHTMLAttributes<HTMLElement>, 'loading' | 'size' | 'icon' | 'style' | 'children'>, BaseProps, NativeProps {
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
    /** 自定义图标 */
    icon?: IconName | boolean;
    /** 自定义颜色 */
    color?: TypeAttributes.Color;
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
