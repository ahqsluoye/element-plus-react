import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace TypeAttributes {
    type Size = 'large' | 'small' | 'default';
    type Color = 'red' | 'orange' | 'yellow' | 'green' | 'cyan' | 'blue' | 'violet';
    type Appearance = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'error' | 'info';
    type Placement4 = 'top' | 'bottom' | 'right' | 'left';
    type Placement8 = 'bottomStart' | 'bottomEnd' | 'topStart' | 'topEnd' | 'leftStart' | 'rightStart' | 'leftEnd' | 'rightEnd';
    type PlacementAuto = 'auto' | 'autoVertical' | 'autoVerticalStart' | 'autoVerticalEnd' | 'autoHorizontal' | 'autoHorizontalStart' | 'autoHorizontalEnd';
    type Placement = Placement4 | Placement8 | PlacementAuto;
    type CheckTrigger = 'change' | 'blur' | 'none';
}

export type ComponentChildren = React.ReactNode | React.ReactNode[];

export interface FormControlBaseProps<ValueType = React.AllHTMLAttributes<HTMLInputElement>['value']> {
    name?: string;
    /** 初始值 */
    defaultValue?: ValueType;
    /** 值（可控） */
    value?: ValueType;
    /** 选中值发生变化时触发 */
    onChange?: (value: ValueType | boolean, event?: React.ChangeEvent<any>) => void;
    /** 禁用 */
    disabled?: boolean;
    /** 尺寸 */
    size?: TypeAttributes.Size;
    /** Render the control as plain text */
    // plaintext?: boolean;
    /** 只读 */
    readOnly?: boolean;
    /** 样式前缀 */
    classPrefix?: string;
}

/** 基础参数 */
export interface BaseProps<S = ComponentChildren> {
    // eslint-disable-next-line lines-around-comment
    /** 组件 CSS 类的前缀 */
    classPrefix?: string;
    /** 下拉面板自定义内联样式 */
    popperStyle?: React.CSSProperties;
    /** 子组件 */
    children?: S;
}

export type NativeProps<S extends string = never> = {
    /** 自定义样式 */
    className?: string;
    /** 自定义内联样式 */
    style?: React.CSSProperties & Partial<Record<S, string>>;
};

export interface AnimationEventProps {
    /** 显示前动画过渡的回调函数 */
    beforeEnter?: (node?: null | HTMLElement | Text) => void;
    /** 显示中动画过渡的回调函数 */
    onEnter?: (node?: null | HTMLElement | Text) => void;
    /** 显示后动画过渡的回调函数 */
    afterEnter?: (node?: null | HTMLElement | Text) => void;
    /** 退出前动画过渡的回调函数 */
    beforeLeave?: (node?: null | HTMLElement | Text) => void;
    /** 退出中动画过渡的回调函数 */
    onLeave?: (node?: null | HTMLElement | Text) => void;
    /** 退出后动画过渡的回调函数 */
    afterLeave?: (node?: null | HTMLElement | Text) => void;
}

export interface TooltipBaseProps<T extends EventTarget> {
    onClick?: (event?: React.MouseEvent<T>) => void;
    onMouseEnter?: (event?: React.MouseEvent<T>) => void;
    onMouseLeave?: (event?: React.MouseEvent<T>) => void;
    onContextMenu?: (event?: React.MouseEvent<T>) => void;
}

export interface StandardProps extends React.HTMLAttributes<HTMLElement> {
    /** The prefix of the component CSS class */
    classPrefix?: string;
    /** 自定义样式 */
    className?: string;
    /** 自定义内联样式 */
    style?: React.CSSProperties;
    /** 子组件 */
    children?: ComponentChildren;
}
