import { VirtualElement } from '@popperjs/core';
import { PopperOptionRef, PopperOptions } from '@qsxy/element-plus-react/Popper/typings';
import { TransitionProps } from '@qsxy/element-plus-react/Transition/Transition';
import { AnimationEventProps, BaseProps, ComponentChildren, NativeProps } from '@qsxy/element-plus-react/types/common';
import React from 'react';

export type TooltipRef = {
    popperRef: React.MutableRefObject<PopperOptionRef>;
    updatePopper: () => void;
    onOpen: () => void;
    onClose: () => void;
    hide: () => void;
    // visible: boolean;
    // setVisible: (value: boolean) => void;
};
export interface TooltipProps extends BaseProps<React.ReactNode>, NativeProps, PopperOptions, AnimationEventProps, Omit<TransitionProps, 'children'> {
    /** class 前缀 */
    classPrefix?: string;
    /** 指示 Tooltip 的内容将附加在哪一个网页元素上 */
    appendTo?: HTMLElement;
    /** 默认提供的主题 */
    effect?: 'light' | 'dark' | string;
    /** 显示的内容 */
    content?: string | React.ReactNode;
    /** 触发下拉的行为 */
    trigger?: 'hover' | 'click' | 'contextmenu';
    /** 状态是否可见 */
    visible?: boolean;
    /** 初始值 */
    defaultVisible?: boolean;
    /** Tooltip 是否可用 */
    disabled?: boolean;
    /** 鼠标是否可进入到 tooltip 中 */
    enterable?: boolean;
    /** 是否在点击菜单项后隐藏菜单 */
    hideOnClick?: boolean;
    /** 延迟出现，单位毫秒 */
    showAfter?: number;
    /** Tooltip 出现后自动隐藏延时，单位毫秒，为 0 则不会自动隐藏 */
    hideAfter?: number;
    onMouseEnter?: (e?: React.MouseEvent<any>) => void;
    onMouseLeave?: (e?: React.MouseEvent<any>) => void;
    triggerRef?: React.ReactElement;
    /** 用来标识虚拟触发是否被启用 */
    virtualTriggering?: boolean;
    /** 标识虚拟触发时的触发元素 */
    virtualRef?: VirtualElement;
    contentSlot?: ComponentChildren;
    /** 是否禁用过渡动画 */
    disableTransition?: boolean;
}
