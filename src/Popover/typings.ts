import React from 'react';
import { PopperOptions } from '../Popper';
import { TransitionProps } from '../Transition';
import { AnimationEventProps, BaseProps, NativeProps } from '../types/common';

/** Dropdown 属性 */
export interface PopoverProps extends BaseProps<React.ReactElement>, NativeProps, PopperOptions, AnimationEventProps, Omit<TransitionProps, 'children'> {
    /** 触发下拉的行为 */
    trigger?: 'hover' | 'click' | 'contextmenu';

    /** 标题 */
    title?: string;

    /** 显示的内容 */
    content?: string | React.ReactElement;

    /** 默认提供的主题 */
    theme?: 'light' | 'dark' | string;

    /** 宽度 */
    width?: number | string;

    /** Popover 是否可用 */
    disabled?: boolean;

    /** 展开下拉菜单的延时，仅在 trigger 为 hover 时有效 */
    showTimeout?: number;

    /** 收起下拉菜单的延时（仅在 trigger 为 hover 时有效） */
    hideTimeout?: number;

    /** 状态是否可见 */
    visible?: boolean;

    /** 初始值 */
    defaultVisible?: boolean;

    /** 是否纯文本 */
    plain?: boolean;

    onMouseEnter?: (e?: React.MouseEvent<any>) => void;

    onMouseLeave?: (e?: React.MouseEvent<any>) => void;
}
