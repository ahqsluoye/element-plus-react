import { VirtualElement } from '@popperjs/core';
import { ButtonProps } from '@qsxy/element-plus-react//Button/typings';
import { PopperOptions } from '@qsxy/element-plus-react/Popper/typings';
import { TransitionProps } from '@qsxy/element-plus-react/Transition/Transition';
import { AnimationEventProps, BaseProps, NativeProps } from '@qsxy/element-plus-react/types/common';
import React, { RefObject } from 'react';

/** Dropdown 属性 */
export interface DropdownProps
    extends
        BaseProps<React.ReactElement | string | number>,
        NativeProps<'--el-dropdown-menu-box-shadow-light' | '--el-dropdown-menuItem-hover-fill' | '--el-dropdown-menuItem-hover-color'>,
        PopperOptions,
        AnimationEventProps,
        Omit<TransitionProps, 'children'> {
    menu: React.ReactElement<DropdownMenuProps>;
    /** 触发下拉的行为 */
    trigger?: 'hover' | 'click' | 'contextmenu';
    /** 下拉触发元素呈现为按钮组 */
    splitButton?: boolean;
    /** 菜单按钮类型，同 Button 组件一样，仅在 split-button 为 true 的情况下有效。 */
    type?: ButtonProps['type'];
    /** 菜菜单尺寸，在 split-button 为 true 的情况下也对触发按钮生效。 */
    size?: ButtonProps['size'];
    /** 按钮组件的 props */
    buttonProps?: ButtonProps;
    /** 菜单最大高度 */
    maxHeight?: number | string;
    /** 默认提供的主题 */
    effect?: 'light' | 'dark' | string;
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
    /** 用来标识虚拟触发是否被启用 */
    virtualTriggering?: boolean;
    /** 标识虚拟触发时的触发元素 */
    virtualRef?: VirtualElement;
    /** 当dropdown未激活且 persistent 为 false 时，dropdown将被销毁。 */
    persistent?: boolean;
    /** [popper.js](https://popper.js.org/docs/v2/) 参数 */
    // popperOptions?: PopperOptions;
    onMouseEnter?: (e?: React.MouseEvent<any>) => void;
    onMouseLeave?: (e?: React.MouseEvent<any>) => void;
    /** splitButton 为 true 时，点击左侧按钮的回调 */
    onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    /** 点击菜单项触发的事件回调 */
    onCommand?: (command: string | number | object) => void;
    /** 下拉框出现/隐藏时触发: 出现则为 true，隐藏则为 false */
    onVisibleChange?: (visible: boolean) => void;
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

export type DropdownRef = {
    ref: RefObject<HTMLDivElement>;
    /** 打开下拉菜单 */
    handleOpen?: () => void;
    /** 关闭下拉菜单 */
    handleClose?: () => void;
};
