import React from 'react';
import { BaseProps, NativeProps } from '../types/common';

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
    defaultActiveName?: string | string[];
    /** 当前激活的面板(可控模式：如果是手风琴模式，绑定值类型需要为string，否则为array) */
    activeName?: string | string[];
    /** 是否手风琴模式 */
    accordion?: boolean;
    /** 当前激活面板改变时触发(如果是手风琴模式，参数 activeNames 类型为string，否则为array) */
    onChange?: (activeNames: string | string[]) => void;
}

export interface CollapseItemProps extends BaseProps, NativeProps {
    /** 唯一标志符 */
    name: string;
    /** 面板标题 */
    title?: string | React.ReactElement;
    /** 是否禁用 */
    disabled?: boolean;
}
