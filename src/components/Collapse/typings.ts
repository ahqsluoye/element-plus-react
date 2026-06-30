import React from 'react';
import { IconName } from '../Icon';
import { BaseProps, NativeProps } from '../types/common';

export type CollapseActiveName = string | number;

export type CollapseRef = {
    activeNames: CollapseActiveName | CollapseActiveName[];
    setActiveNames: (activeNames: CollapseActiveName[]) => void;
};

export type CollapseItemRef = {
    isActive: boolean;
};

export interface CollapseProps
    extends BaseProps,
        NativeProps<
            | '--el-collapse-border-color'
            | '--el-collapse-header-height'
            | '--el-collapse-header-bg-color'
            | '--el-collapse-header-text-color'
            | '--el-collapse-header-font-size'
            | '--el-collapse-content-bg-color'
            | '--el-collapse-content-font-size'
            | '--el-collapse-content-text-color'
            | '--el-transition-duration'
            | '--el-collapse-item-margin'
        > {
    /** 当前激活的面板(如果是手风琴模式，绑定值类型需要为string，否则为array) */
    defaultActiveName?: CollapseActiveName | CollapseActiveName[];
    /** 当前激活的面板(可控模式：如果是手风琴模式，绑定值类型需要为string，否则为array) */
    activeName?: CollapseActiveName | CollapseActiveName[];
    /** 是否手风琴模式 */
    accordion?: boolean;
    /** 展开图标位置 */
    expandIconPosition?: 'left' | 'right';
    /** 折叠状态更改之前的折叠钩子。 返回 false 或者返回 Promise 且被 reject 则停止切换 */
    beforeCollapse?: (name: CollapseActiveName) => Promise<boolean> | boolean;
    /** 当前激活面板改变时触发(如果是手风琴模式，参数 activeNames 类型为string，否则为array) */
    onChange?: (activeNames: CollapseActiveName | CollapseActiveName[]) => void;
}

export interface CollapseItemProps extends BaseProps, NativeProps {
    /** 唯一标志符 */
    name: CollapseActiveName;
    /** 面板标题 */
    title?: string | React.ReactElement | ((isActive: boolean) => React.ReactNode);
    /** 自定义图标 */
    icon?: IconName | React.ReactElement | ((isActive: boolean) => React.ReactNode);
    /** 是否禁用 */
    disabled?: boolean;
}
