import { BaseProps, NativeProps } from '@qsxy/element-plus-react/types/common';
import React from 'react';

/**
 * Backtop 组件 Props
 */
export interface BacktopProps extends BaseProps, NativeProps<'--el-backtop-bg-color' | '--el-backtop-text-color' | '--el-backtop-text-color:' | '--el-backtop-hover-bg-color'> {
    /**
     * 滚动高度达到此参数值才出现
     * @default 200
     */
    visibilityHeight?: number;
    /**
     * 触发滚动的对象
     * @default ''
     */
    target?: string;
    /**
     * 控制其显示位置，距离页面右边距
     * @default 40
     */
    right?: number;
    /**
     * 控制其显示位置，距离页面底部距离
     * @default 40
     */
    bottom?: number;
    /**
     * 点击按钮触发的事件
     */
    onClick?: (evt: React.MouseEvent) => void;
}
