import { RefObject } from 'react';
import { BaseProps, NativeProps } from '../types/common';

/* eslint-disable lines-around-comment */
export interface CarouselProps extends BaseProps, NativeProps {
    /** carousel 的高度	 */
    height?: string | number;
    /** 初始状态激活的幻灯片的索引，从 0 开始	 */
    initialIndex?: number;
    /** 指示器的触发方式 */
    trigger?: 'hover' | 'click';
    /** 是否自动切换 */
    autoplay?: boolean;
    /** 自动切换的时间间隔，单位为毫秒 */
    interval?: number;
    /** 指示器的位置 */
    indicatorPosition?: '' | 'none' | 'outside';
    /** 切换箭头的显示时机 */
    arrow?: 'always' | 'hover' | 'never';
    /** carousel 的类型 */
    type?: '' | 'card';
    /** 当 type 为 card时，二级卡的缩放大小 */
    cardScale?: number;
    /** 是否循环显示 */
    loop?: boolean;
    /** 展示的方向 */
    direction?: 'horizontal' | 'vertical';
    /** 鼠标悬浮时暂停自动切换 */
    pauseOnHover?: boolean;
    /** 添加动态模糊以给走马灯注入活力和流畅性。 */
    motionBlur?: boolean;
    /** 当前展示的幻灯片切换时触发，它有两个参数， 一个是新幻灯片的索引，另一个是旧幻灯片的索引 */
    onChange?: (current: number, prev: number) => boolean;
}

export interface CarouselItemProps
    extends BaseProps,
        NativeProps<
            | '--el-carousel-arrow-font-size'
            | '--el-carousel-arrow-size'
            | '--el-carousel-arrow-background'
            | '--el-carousel-arrow-hover-background'
            | '--el-carousel-indicator-width'
            | '--el-carousel-indicator-height'
            | '--el-carousel-indicator-padding-horizontal'
            | '--el-carousel-indicator-padding-vertical'
            | '--el-carousel-indicator-out-color'
        > {
    /** 幻灯片的名字，可用作 setActiveItem 的参数 */
    name?: string;
    /** 该幻灯片所对应指示器的文本 */
    label?: string;
}

export type CarouselRef = {
    /** 当前幻灯片的索引 */
    activeIndex?: number;
    /** 手动切换幻灯片，传入需要切换的幻灯片的索引，从 0 开始；或相应 elCarouselItem 的 name 属性值 */
    setActiveItem?: (index: string | number) => void;
    /** 切换至上一张幻灯片 */
    prev?: () => void;
    /** 切换至下一张幻灯片 */
    next?: () => void;
};

export type CarouselItemStates = {
    hover: boolean;
    translate: number;
    scale: number;
    active: boolean;
    ready: boolean;
    inStage: boolean;
    animating: boolean;
};

export type CarouselItemContext = {
    props: CarouselItemProps;
    states: CarouselItemStates;
    setState: (_state: Partial<CarouselItemStates>) => void;
    uid: string;
    translateItem: (index: number, activeIndex: number, oldIndex?: number) => void;
};

export type CarouselContextProps = {
    root: RefObject<HTMLDivElement>;
    isCardType: boolean;
    isVertical: boolean;
    items: CarouselItemContext[];
    loop: boolean;
    cardScale: number;
    addItem: (child: CarouselItemContext) => void;
    removeItem: (uid: string) => void;
    setActiveItem: (index: number | string) => void;
    setContainerHeight: (height: number) => void;
};

export interface CarouselItemAction {
    type: 'setState';
    payload: Partial<CarouselItemStates>;
}

export type CarouselItemRef = {
    translateItem: (index: number, activeIndex: number, oldIndex?: number) => void;
};
