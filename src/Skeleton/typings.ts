import { ReactElement } from 'react';
import { BaseProps, NativeProps } from '../types/common';

export interface SkeletonProps extends BaseProps, NativeProps {
    /** 是否显示骨架屏（可控） */
    visible?: boolean;
    /** 默认是否显示骨架屏 */
    defaultVisible?: boolean;
    /** 骨架屏段落数量 */
    rows?: number;
    /** 是否使用动画 */
    animated?: boolean;
    /* height of rows */
    rowHeight?: number;
    /* margin of rows */
    rowMargin?: number;
    /** 当前渲染 skeleton 类型 */
    variant?: 'image' | 'circle' | 'rect';
    /** 渲染延迟（以毫秒为单位） 数字代表延迟显示, 也可以设置为延迟隐藏, 例如 { leading: 500, trailing: 500 } 当需要控制初始加载值时，您可以设置 { initVal: true } */
    throttle?: number | { leading?: number; trailing?: number };
    formatter?: ReactElement;
}

export interface SkeletonItemProps extends BaseProps, NativeProps {
    /** 当前渲染 skeleton 类型 */
    variant?: 'image' | 'circle' | 'rect';
    isFirst?: boolean;
    /* height of rows */
    rowHeight?: number;
    /* margin of rows */
    rowMargin?: number;
}
