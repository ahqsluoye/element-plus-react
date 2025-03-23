/* eslint-disable lines-around-comment */
import React from 'react';
import { PopperOptions } from '../Popper';
import { TransitionProps } from '../Transition';
import { AnimationEventProps, BaseProps, NativeProps } from '../types/common';

/** Dropdown 属性 */
export interface DropdownProps extends BaseProps<React.ReactElement>, NativeProps, PopperOptions, AnimationEventProps, Omit<TransitionProps, 'children'> {
    menu: React.ReactElement<DropdownMenuProps>;
    /** 触发下拉的行为 */
    trigger?: 'hover' | 'click' | 'contextmenu';
    /** 是否在点击菜单项后隐藏菜单 */
    hideOnClick?: boolean;
    /** 展开下拉菜单的延时，仅在 trigger 为 hover 时有效 */
    showTimeout?: number;
    /** 收起下拉菜单的延时（仅在 trigger 为 hover 时有效） */
    hideTimeout?: number;
    /** 状态是否可见 */
    visible?: boolean;
    /** 初始值 */
    defaultVisible?: boolean;
    /** 是否禁用 */
    disabled?: boolean;
    onMouseEnter?: (e?: React.MouseEvent<any>) => void;
    onMouseLeave?: (e?: React.MouseEvent<any>) => void;
    /** 点击菜单项触发的事件回调 */
    onClick?: (command: string | number | object) => void;

    /** 下拉框出现/隐藏时触发: 出现则为 true，隐藏则为 false */
    visiblechange?: (visible: boolean) => void;
}

export interface DropdownMenuProps extends BaseProps, NativeProps {
    classPrefix?: string;
}

/** Dropdown-Item 属性 */
export interface DropdownItemProps extends BaseProps, NativeProps {
    /** 派发到command回调函数的指令参数 */
    command?: string | number | object;

    /** 是否禁用*/
    disabled?: boolean;

    /** 是否显示分隔符 */
    divided?: boolean;

    /** 是否为激活状态 */
    active?: boolean;
}
