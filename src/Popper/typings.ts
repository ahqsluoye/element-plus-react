import type { Options, Placement, Instance as PopperInstance, PositioningStrategy, State, VirtualElement } from '@popperjs/core';
import React, { RefObject } from 'react';
import { TransitionProps } from '../Transition';
import { ComponentChildren } from '../types/common';

export interface PopperOptionRef {
    styles: { [key: string]: React.CSSProperties };
    attributes: { [key: string]: { [key: string]: string } | undefined };
    state: State | null;
    update: PopperInstance['update'] | null;
    forceUpdate: PopperInstance['forceUpdate'] | null;
}

export type PopperOptions = {
    popperInstRef?: React.MutableRefObject<PopperOptionRef>;
    /** 出现位置的偏移量 */
    offset?: number;
    /** 出现的位置 */
    placement?: Placement;
    /** 是否显示箭头 */
    arrowOffset?: number;
    /** 箭头距离边缘的位置 */
    showArrow?: boolean;
    /** 为 popper 添加自定义类名 */
    popperClass?: string;
    /** 为 popper 添加自定义内联样式 */
    popperStyle?: React.CSSProperties;
    effect?: 'light' | 'dark' | string;
    popperOptions?: Options;
};

export type PopperProps = {
    visible: boolean;
    referenceElement: RefObject<HTMLElement> | { current: VirtualElement } | (() => RefObject<HTMLElement> | { current: VirtualElement });
    onDestroy: () => void;
} & Partial<
    {
        id?: string;
        children: ComponentChildren;
        appendToBody?: boolean;
        appendTo?: HTMLElement;
        strategy: PositioningStrategy;
        gpuAcceleration: boolean;
        onMouseEnter: React.MouseEventHandler<any>;
        onMouseLeave: React.MouseEventHandler<any>;
    } & PopperOptions
> &
    TransitionProps;

export type { Options, Placement, PopperInstance, PositioningStrategy };
