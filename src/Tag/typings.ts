import React from 'react';
import { BaseProps, NativeProps, TooltipBaseProps, TypeAttributes } from '../types/common';

export interface TagProps extends Omit<TooltipBaseProps<HTMLSpanElement>, 'onClick'>, BaseProps, NativeProps {
    /** 类型 */
    type?: TypeAttributes.Appearance;
    /** 是否可关闭 */
    closable?: boolean;
    /** 是否禁用渐变动画 */
    disableTransitions?: boolean;
    /** 是否有边框描边 */
    hit?: boolean;
    /** Tag 是否为圆形 */
    round?: boolean;
    /** 背景色 */
    color?: string;
    /** 尺寸 */
    size?: TypeAttributes.Size;
    /** 主题 */
    theme?: 'dark' | 'light' | 'plain';
    /** 点击 Tag 时触发的事件 */
    onClick?: (e?: React.MouseEvent<HTMLSpanElement>) => void;
    /** 关闭 Tag 时触发的事件 */
    onClose?: (e?: React.MouseEvent<HTMLSpanElement>) => void;
}
