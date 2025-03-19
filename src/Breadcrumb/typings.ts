/* eslint-disable lines-around-comment */
import React from 'react';
import { RouteProps } from 'react-router-dom';
import { BaseProps, NativeProps } from '../types/common';

export interface BreadcrumbProps extends BaseProps, NativeProps {
    /** 分隔符 */
    separator?: string | React.ReactElement<any>;
}

export interface BreadcrumbContextProps {
    /** 分隔符 */
    separator: string | React.ReactElement<any>;
}

export interface BreadcrumbItemProps extends BaseProps, NativeProps {
    /** 路由跳转目标，同 vue-router 的 to 属性	 */
    to?: string | RouteProps;
    /** 如果设置该属性为 true, 导航将不会留下历史记录	 */
    // replace?: boolean;
    onClick?: (to?: string | RouteProps) => void;
}
