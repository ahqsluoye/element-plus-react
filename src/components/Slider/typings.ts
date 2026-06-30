import { Placement } from '@popperjs/core';
import React, { CSSProperties } from 'react';
import { BaseProps, FormControlBaseProps, NativeProps, TypeAttributes } from '../types/common';

export type SliderValue = number | number[];

export interface SliderMarkerItem {
    style?: CSSProperties;
    label: any;
}

export type SliderMarks = Record<number, string | SliderMarkerItem>;

export interface Mark {
    point: number;
    position: number;
    mark: string | SliderMarkerItem;
}

export interface SliderProps
    extends BaseProps,
        NativeProps<
            | '--el-slider-main-bg-color'
            | '--el-slider-runway-bg-color'
            | '--el-slider-stop-bg-color'
            | '--el-slider-disabled-color'
            | '--el-slider-border-radius'
            | '--el-slider-height'
            | '--el-slider-button-size'
            | '--el-slider-button-wrapper-size'
            | '--el-slider-button-wrapper-offset'
        >,
        FormControlBaseProps<SliderValue> {
    /** 最小值 */
    min?: number;
    /** 最大值 */
    max?: number;
    /** 步长，可以是数字或 'mark' 用于将值限制为刻度。 当设置为 'mark' 时，必须设置 marks 属性。 */
    step?: number | 'mark';
    /** 是否显示输入框，仅在 range 为 false 且 step 不为 'mark' 时生效。 */
    showInput?: boolean;
    /** 在显示输入框的情况下，是否显示输入框的控制按钮 */
    showInputControls?: boolean;
    /** 输入框的大小，如果设置了 size 属性，默认值自动取 size */
    inputSize?: TypeAttributes.Size;
    /** 是否显示间断点 */
    showStops?: boolean;
    /** 是否显示提示信息 */
    showTooltip?: boolean;
    /** 格式化提示信息 */
    formatTooltip?: (val: number) => number | string;
    /** 是否开启选择范围 */
    range?: boolean;
    /** 是否垂直方向 */
    vertical?: boolean;
    /** 滑块高度，垂直模式必填 */
    height?: string;
    /** 原生 aria-label属性 */
    ariaLabel?: string;
    /** 当 range 为true时，屏幕阅读器标签开始的标记 */
    rangeStartLabel?: string;
    /** 当 range 为true时，屏幕阅读器标签结束的标记 */
    rangeEndLabel?: string;
    /** 显示屏幕阅读器的 aria-valuenow 属性的格式 */
    formatValueText?: (val: number) => string;
    /** tooltip 的自定义类名 */
    tooltipClass?: string;
    /** Tooltip 出现的位置 */
    placement?: Placement;
    /** 标记， key 的类型必须为 number 且取值在闭区间 [min, max] 内，每个标记可以单独设置样式 */
    marks?: SliderMarks;
    // validateEvent?: boolean;
    /** 当 slider 的 tooltip 处于非活动状态且 persistent 为 false 时，tooltip 将被销毁。 当 show-tooltip 为 false 时，persistent 将始终为 false。 */
    persistent?: boolean;
    /** 值改变时触发（使用鼠标拖曳时，只在松开鼠标后触发） */
    onChange?: (val: SliderValue) => void;
    /** 数据改变时触发（使用鼠标拖曳时，活动过程实时触发） */
    onInput?: (val: SliderValue) => void;
}

export interface SliderButtonProps {
    value: number;
    vertical: boolean;
    tooltipClass?: string;
    placement?: Placement;
    role?: string;
    id?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-valuemin'?: number;
    'aria-valuemax'?: number;
    'aria-valuenow'?: number;
    'aria-valuetext'?: string;
    'aria-orientation'?: 'horizontal' | 'vertical';
    'aria-disabled'?: boolean;
    tabindex?: number;
    onChange?: (val: number) => void;
}

export interface SliderMarkerProps {
    mark: string | SliderMarkerItem;
    style?: CSSProperties;
    onMousedown?: (e: React.MouseEvent) => void;
}

export interface SliderInitData {
    firstValue: number;
    secondValue: number;
    oldValue: SliderValue;
    dragging: boolean;
    sliderSize: number;
}

export interface SliderButtonInitData {
    hovering: boolean;
    dragging: boolean;
    isClick: boolean;
    startX: number;
    currentX: number;
    startY: number;
    currentY: number;
    startPosition: number;
    newPosition: number;
    oldValue: SliderValue;
}

export interface SliderContextValue extends SliderProps {
    disabled: boolean;
    precision: number;
    sliderSize: number;
    markList: Mark[];
    formatTooltip: SliderProps['formatTooltip'];
    emitChange: () => void;
    resetSize: () => void;
    updateDragging: (val: boolean) => void;
}

export type SliderRef = {
    onSliderClick: (event: React.MouseEvent | React.TouchEvent) => void;
};

export type SliderButtonRef = {
    onButtonDown: (event: React.MouseEvent | React.TouchEvent) => void;
    onKeyDown: (event: React.KeyboardEvent) => void;
    setPosition: (newPosition: number) => void;
    hovering: boolean;
    dragging: boolean;
};
