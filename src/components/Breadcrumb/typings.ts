import { BaseProps, NativeProps } from '@qsxy/element-plus-react/types/common';
import React from 'react';
import type { NavigateFunction, RouteProps } from 'react-router-dom';

export interface BreadcrumbProps extends BaseProps, NativeProps {
    /** 分隔符 */
    separator?: string | React.ReactElement<any>;
    /** 路由跳转函数 */
    navigate?: NavigateFunction;
}

export interface BreadcrumbContextProps {
    /** 分隔符 */
    separator: string | React.ReactElement<any>;
    /** 路由跳转函数 */
    navigate?: NavigateFunction;
}

export interface BreadcrumbItemProps extends BaseProps, NativeProps {
    /** 路由跳转目标	 */
    to?: string | RouteProps;
    /** 如果设置该属性为 true, 导航将不会留下历史记录	 */
    // replace?: boolean;
    onClick?: (to?: string | RouteProps) => void;
}
