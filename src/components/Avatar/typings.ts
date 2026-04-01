import React from 'react';
import { IconName } from '../Icon';
import { BaseProps, NativeProps } from '../types/common';

export interface AvatarProps
    extends BaseProps,
        NativeProps<
            | '--el-avatar-text-color'
            | '--el-avatar-bg-color'
            | '--el-avatar-text-size'
            | '--el-avatar-icon-size'
            | '--el-avatar-border-radius'
            | '--el-avatar-size-large'
            | '--el-avatar-size-small'
            | '--el-avatar-size'
        > {
    /** 设置 Avatar 的图标类型，具体参考 Icon 组件	 */
    icon?: IconName;
    /** Avatar 大小	*/
    size?: number | 'large' | 'default' | 'small' | '';
    /** Avatar 形状	 */
    shape?: 'circle' | 'square';
    /** Avatar 图片的源地址 */
    src?: string;
    /** 图片 Avatar 的原生 srcset 属性 */
    srcSet?: string;
    /** 图片 Avatar 的原生 alt 属性 */
    alt?: string;
    /** 当展示类型为图片的时候，设置图片如何适应容器 */
    fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
    /** 图片加载失败时触发 */
    onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}
