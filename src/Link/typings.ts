/* eslint-disable lines-around-comment */
import React from 'react';
import { IconName } from '../Icon';
import { BaseProps, NativeProps, TypeAttributes } from '../types/common';

export type LinkType = TypeAttributes.Appearance;

export interface LinkProps extends BaseProps, NativeProps, Omit<React.AllHTMLAttributes<HTMLAnchorElement>, 'type' | 'style' | 'children'> {
    /** 链接地址 */
    href?: string;
    /** 链接类型 */
    type?: LinkType;
    /** 是否下划线  */
    underline?: boolean;
    /** 是否禁用状态  */
    disabled?: boolean;
    /** 图标组件 */
    icon?: IconName;
}
