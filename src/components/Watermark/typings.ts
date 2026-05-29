import React from 'react';
import { BaseProps, NativeProps } from '../types/common';

/**
 * @description 水印字体样式配置
 */
export interface WatermarkFontType {
    /**
     * @description 字体颜色
     * @default 'rgba(0,0,0,.15)'
     */
    color?: string;
    /**
     * @description 字体大小，支持数字或字符串
     * @default 16
     */
    fontSize?: number | string;
    /**
     * @description 字重
     * @default 'normal'
     */
    fontWeight?: 'normal' | 'bold' | 'lighter' | 'bolder' | number;
    /**
     * @description 字体样式
     * @default 'normal'
     */
    fontStyle?: 'none' | 'normal' | 'italic' | 'oblique';
    /**
     * @description 字体族
     * @default 'sans-serif'
     */
    fontFamily?: string;
    /**
     * @description 多行文本之间的间距
     * @default 3
     */
    fontGap?: number;
    /**
     * @description 文本对齐方式
     * @default 'center'
     */
    textAlign?: 'start' | 'end' | 'left' | 'right' | 'center';
    /**
     * @description 文本基线
     * @default 'hanging'
     */
    textBaseline?: 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom';
}

/**
 * @description Watermark 水印组件属性
 */
export interface WatermarkProps extends BaseProps, NativeProps {
    /**
     * @description 水印元素的 z-index 值
     * @default 9
     */
    zIndex?: number;
    /**
     * @description 水印的旋转角度，单位 °
     * @default -22
     */
    rotate?: number;
    /**
     * @description 水印的宽度，`content` 的默认值是它自己的宽度
     * @default 120
     */
    width?: number;
    /**
     * @description 水印的高度，`content` 的默认值是它自己的高度
     * @default 64
     */
    height?: number;
    /**
     * @description 水印图片，建议使用 2x 或 3x 图像，优先级高于文字内容（支持 base64 格式）
     */
    image?: string;
    /**
     * @description 水印文本内容，支持字符串或字符串数组（多行水印）
     * @default 'Element Plus'
     */
    content?: string | string[];
    /**
     * @description 文字样式配置
     */
    font?: WatermarkFontType;
    /**
     * @description 水印之间的间距，[水平间距, 垂直间距]
     * @default [100, 100]
     */
    gap?: [number, number];
    /**
     * @description 水印从容器左上角的偏移，默认值为 gap/2
     */
    offset?: [number, number];
}