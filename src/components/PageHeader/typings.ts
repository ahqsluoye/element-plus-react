import React from 'react';
import { IconName } from '../Icon';
import { BaseProps, NativeProps } from '../types/common';

/**
 * @description PageHeader 页面头部组件属性
 */
export interface PageHeaderProps extends BaseProps, NativeProps {
    /**
     * @description 页面头部的图标组件
     * @default Left 图标
     */
    icon?: IconName;
    /**
     * @description 页面头部的主标题
     */
    title?: string | React.ReactNode;
    /**
     * @description 页面头部的内容
     * @default ''
     */
    content?: string | React.ReactNode;
    /**
     * @description 点击返回图标时触发的回调函数
     */
    onBack?: () => void;
    /**
     * @description 面包屑插槽内容
     */
    breadcrumb?: React.ReactNode;
    /**
     * @description 额外内容插槽（右侧）
     */
    extra?: React.ReactNode;
}
