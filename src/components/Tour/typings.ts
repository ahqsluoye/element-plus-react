import { Strategy } from '@floating-ui/dom';
import type { Placement, VirtualElement } from '@popperjs/core';
import type { CSSProperties, ReactNode } from 'react';
import type { ButtonProps } from '../Button';
import { IconName } from '../Icon';
import { BaseProps, FormControlBaseProps, NativeProps } from '../types/common';

/**
 * @description 遮罩和目标之间的透明间距配置
 */
export interface TourGap {
    /**
     * @description 偏移量，支持数字或 [水平偏移, 垂直偏移] 数组
     * @default 6
     */
    offset?: number | [number, number];
    /**
     * @description 圆角半径
     * @default 2
     */
    radius?: number;
}

/**
 * @description 遮罩配置类型
 * - `boolean`: 是否启用遮罩
 * - `{ style?, color? }`: 自定义遮罩样式和填充颜色
 */
export type TourMask =
    | boolean
    | {
          /** 遮罩自定义样式 */
          style?: CSSProperties;
          /** 遮罩填充颜色 */
          color?: string;
      };

/**
 * @description 步骤按钮属性类型
 */
export type TourBtnProps = {
    /** 按钮子内容 */
    children?: ReactNode;
    /** 点击事件处理函数 */
    onClick?: () => void;
} & Partial<ButtonProps> &
    Record<string, any>;

/**
 * @description 位置信息接口
 */
export interface PosInfo {
    /** 左侧距离 */
    left: number;
    /** 顶部距离 */
    top: number;
    /** 高度 */
    height: number;
    /** 宽度 */
    width: number;
    /** 圆角半径 */
    radius: number;
}

/**
 * @description 引导卡片位置枚举
 */
export const tourPlacements = [
    'top-start',
    'top-end',
    'top',
    'bottom-start',
    'bottom-end',
    'bottom',
    'left-start',
    'left-end',
    'left',
    'right-start',
    'right-end',
    'right',
] as const;

/**
 * @description 引导卡片内容属性接口
 */
export interface TourContentProps {
    /**
     * @description 引导卡片相对于目标元素的位置
     * @default 'bottom'
     */
    placement?: Placement;
    /**
     * @description 参考 DOM 元素
     */
    reference?: HTMLElement | VirtualElement | null;
    /**
     * @description 定位策略
     * @default 'absolute'
     */
    strategy?: Strategy;
    /**
     * @description 箭头偏移量
     * @default 10
     */
    offset?: number;
    /**
     * @description 是否显示箭头
     */
    showArrow?: boolean;
    /**
     * @description 内容的层级
     * @default 2001
     */
    zIndex?: number;
}

/**
 * @description TourStep 组件属性接口
 */
export interface TourStepProps {
    /**
     * @description 获取引导卡片指向的元素，为空时居中于屏幕
     * - 字符串类型：CSS 选择器（document.querySelector）
     * - HTMLElement：直接传入 DOM 元素
     * - 函数类型：返回 HTMLElement 或 null 的函数
     */
    target?: string | HTMLElement | (() => HTMLElement | null) | null;
    /**
     * @description 引导内容的标题
     */
    title?: string;
    /**
     * @description 引导内容的描述
     */
    description?: string;
    /**
     * @description 是否显示关闭按钮（优先级高于 Tour 组件的同名属性）
     */
    showClose?: boolean;
    /**
     * @description 自定义关闭图标，默认是 Close 图标（优先级高于 Tour 组件的同名属性）
     */
    closeIcon?: IconName;
    /**
     * @description 是否显示箭头（优先级高于 Tour 组件的同名属性）
     */
    showArrow?: boolean;
    /**
     * @description 引导卡片相对于目标元素的位置（优先级高于 Tour 组件的同名属性）
     * @default 'bottom'
     */
    placement?: TourContentProps['placement'];
    /**
     * @description 是否启用遮罩（优先级高于 Tour 组件的同名属性）
     * - `boolean`: 是否启用遮罩
     * - `{ style?, color? }`: 自定义遮罩样式和填充颜色
     */
    mask?: TourMask;
    /**
     * @description 为 content 自定义样式（优先级高于 Tour 组件的同名属性）
     */
    contentStyle?: CSSProperties;
    /**
     * @description "上一步"按钮的属性
     */
    prevButtonProps?: TourBtnProps;
    /**
     * @description "下一步"按钮的属性
     */
    nextButtonProps?: TourBtnProps;
    /**
     * @description 是否支持当前元素滚动到视窗内，也可传入配置指定滚动视窗的相关参数
     *（优先级高于 Tour 组件的同名属性）
     * @default { block: 'center' }
     */
    scrollIntoViewOptions?: boolean | ScrollIntoViewOptions;
    /**
     * @description 类型，影响底色与文字颜色（优先级高于 Tour 组件的同名属性）
     * @default 'default'
     */
    type?: 'default' | 'primary';
    /**
     * @description 自定义描述内容（替代 description 属性）
     */
    children?: ReactNode;
    /**
     * @description 自定义 header 内容（替代 title 属性）
     */
    header?: ReactNode;
    /**
     * @description 关闭引导时的回调函数
     */
    onClose?: () => void;
}

/**
 * @description Tour 组件属性接口
 */
export interface TourProps extends BaseProps, NativeProps, Omit<FormControlBaseProps<boolean>, 'onChange'> {
    /**
     * @description 控制引导的显示/隐藏（受控模式）
     * @default false
     */
    visible?: boolean;
    /**
     * @description 默认显示状态（非受控模式）
     * @default false
     */
    defaultVisible?: boolean;
    /**
     * @description 当前步骤索引（受控模式）
     * @default 0
     */
    current?: number;
    /**
     * @description 默认当前步骤索引（非受控模式）
     * @default 0
     */
    defaultCurrent?: number;
    /**
     * @description 是否显示箭头
     * @default true
     */
    showArrow?: boolean;
    /**
     * @description 是否显示关闭按钮
     * @default true
     */
    showClose?: boolean;
    /**
     * @description 自定义关闭图标，默认是 Close 图标
     */
    closeIcon?: IconName;
    /**
     * @description 引导卡片相对于目标元素的位置
     * @default 'bottom'
     */
    placement?: TourContentProps['placement'];
    /**
     * @description 为 content 自定义样式
     */
    contentStyle?: CSSProperties;
    /**
     * @description 是否启用遮罩，通过自定义属性改变遮罩样式以及填充的颜色
     * @default true
     */
    mask?: TourMask;
    /**
     * @description 遮罩和目标之间的透明间距
     * @default { offset: 6, radius: 2 }
     */
    gap?: TourGap;
    /**
     * @description Tour 的层级
     * @default 2001
     */
    zIndex?: number;
    /**
     * @description 是否支持当前元素滚动到视窗内，也可传入配置指定滚动视窗的相关参数
     * @default { block: 'center' }
     */
    scrollIntoViewOptions?: boolean | ScrollIntoViewOptions;
    /**
     * @description 类型，影响底色与文字颜色
     * @default 'default'
     */
    type?: 'default' | 'primary';
    /**
     * @description 挂载到哪个 DOM 元素
     * @default 'body'
     */
    appendTo?: string | HTMLElement;
    /**
     * @description 是否可以通过按下 ESC 关闭引导
     * @default true
     */
    closeOnPressEscape?: boolean;
    /**
     * @description 启用蒙层时，target 元素区域是否可以点击
     * @default true
     */
    targetAreaClickable?: boolean;
    /**
     * @description 步骤改变时的回调函数
     * @param current 当前步骤索引
     * @param visible 当前显示状态
     */
    onChange?: (current: number, visible: boolean) => void;
    /**
     * @description 引导完成时的回调函数
     * @param current 当前步骤索引
     */
    onClose?: (current: number) => void;
    /**
     * @description 引导完成时的回调函数
     */
    onFinish?: () => void;
    /**
     * @description TourStep 组件列表
     */
    children?: ReactNode;
    /**
     * @description 自定义指示器渲染函数
     * @param props 包含当前步骤索引和总步骤数的对象
     * @returns 自定义指示器 JSX
     */
    indicators?: (props: { current: number; total: number }) => ReactNode;
}

/**
 * @description Tour 组件内部上下文类型
 */
export interface TourContextType {
    /** 当前步骤的属性配置 */
    // currentStep: TourStepProps | undefined;
    /** 当前步骤索引 */
    current: number;
    /** 总步骤数 */
    total: number;
    /** 是否显示关闭按钮 */
    showClose: boolean;
    /** 关闭图标名称 */
    closeIcon: IconName;
    /** 合并后的类型（优先使用步骤级配置） */
    mergedType: 'default' | 'primary' | undefined;
    /** 命名空间实例 */
    ns: any;
    /** 自定义指示器渲染函数 */
    indicators?: (props: { current: number; total: number }) => ReactNode;
    /** 上一步的方法 */
    onPrev: () => void;
    /** 下一步的方法 */
    onNext: () => void;
    /** 关闭引导的方法 */
    onClose: () => void;
    /** 完成引导的方法 */
    onFinish: () => void;
    /** 步骤改变的方法 */
    // onChange: () => void;
}
