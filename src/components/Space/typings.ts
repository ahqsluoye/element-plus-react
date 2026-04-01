import React, { CSSProperties } from 'react';
import { BaseProps, NativeProps } from '../types/common';

export interface SpaceProps extends BaseProps, NativeProps {
    /** 排列的方向 */
    direction?: 'horizontal' | 'vertical';
    /** 纵轴对齐方式 */
    alignment?: CSSProperties['alignItems'];
    /** 横轴对齐方式 */
    justify?: CSSProperties['justifyContent'];
    /** 间隔大小 */
    size?: 'small' | 'medium' | 'large' | number | [number, number];
    /** 是否自动折行 */
    wrap?: boolean;
    /** 子元素是否填充父容器 */
    fill?: boolean;
    /** 填充父容器的比例 */
    fillRatio?: number;
    /** 间隔符 */
    spacer?: string | number | React.ReactNode;
    /** 给 space-items 的类名前缀 */
    prefixCls?: string;
}

export interface SpaceItemProps extends BaseProps, NativeProps {
    /** 给 space-item 的类名前缀 */
    prefixCls?: string;
}
