import React from 'react';
import { IconName } from '../Icon';
import { BaseProps, NativeProps, TypeAttributes } from '../types/common';

export type LinkType = TypeAttributes.Appearance;

export interface LinkProps
    extends BaseProps,
        NativeProps<'--el-link-font-size' | '--el-link-font-weight' | '--el-link-text-color' | '--el-link-hover-text-color' | '--el-link-disabled-text-color'>,
        Omit<React.AllHTMLAttributes<HTMLAnchorElement>, 'type' | 'style' | 'children'> {
    /** 链接地址 */
    href?: string;
    /** 链接类型 */
    type?: LinkType;
    /** 是否下划线  */
    underline?: 'always' | 'hover' | 'never';
    /** 同原生 target 属性 */
    target?: '_blank' | '_self' | '_parent' | '_top';
    /** 是否禁用状态  */
    disabled?: boolean;
    /** 图标组件 */
    icon?: IconName;
}
