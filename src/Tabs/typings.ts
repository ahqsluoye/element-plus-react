import React from 'react';
import { BaseProps, NativeProps } from '../types/common';

export interface TabsProps extends BaseProps, NativeProps<'--el-tabs-header-height' | '--el-tabs-header-margin-bottom'> {
    /** 选中选项卡的 name */
    defaultActiveName?: TabPaneName;
    /** 选中选项卡的 name */
    activeName?: TabPaneName;
    /** 风格类型 */
    type?: 'card' | 'border-card' | null;
    /** 标签是否可关闭 */
    closable?: boolean;
    /** 标签是否可增加 */
    addable?: boolean;
    /** 标签是否同时可增加和关闭 */
    editable?: boolean;
    /** 选项卡所在位置 */
    tabPosition?: 'top' | 'right' | 'bottom' | 'left';
    /** 标签的宽度是否自撑开 */
    stretch?: boolean;
    /** 是否居中显示 */
    center?: boolean;
    /** 样式前缀 */
    classPrefix?: string;
    /** 标签页标题栏div样式 */
    headerStyle?: React.CSSProperties;
    /** 内容div样式 */
    contentStyle?: React.CSSProperties;
    /** 子组件 */
    children?: React.ReactElement<TabPaneProps> | React.ReactElement<TabPaneProps>[];
    /** 切换标签之前的钩子函数， 若返回 false  或者返回被 reject 的 Promise，则阻止切换。 */
    beforeLeave?: (newTabName: TabPaneName, oldTabName: TabPaneName) => void | boolean | Promise<void | boolean>;
    /** tab 被选中时触发 */
    onTabClick?: (context: TabsPaneContext) => void;
    /** 点击 tabs 的新增按钮后触发 */
    onTabAdd?: () => void;
    /** 点击 tab 移除按钮时触发 */
    onTabRemove?: (name: TabPaneName | undefined) => void;
    /** `activeName` 改变时触发 */
    onTabChange?: (name: TabPaneName | undefined) => void;
    /** 鼠标右键点击 tab 时触发 */
    formatter?: (name: TabPaneName | undefined) => void;
}

export interface Navs {
    /** 选项卡标题 */
    title: string | React.ReactElement;
    /** 与选项卡绑定值 value 对应的标识符，表示选项卡别名 */
    name: string;
    /** tab顺序 */
    index: number;
    /** 是否是激活标签页 */
    active: boolean;
    /** 是否禁用 */
    disabled: boolean;
    /** 标签是否可关闭 */
    closable: boolean;
    props: TabPaneProps;
}

export interface TabPaneProps extends BaseProps, NativeProps {
    /** 选项卡标题 */
    title: string | React.ReactElement;
    /** 与选项卡绑定值 value 对应的标识符，表示选项卡别名 */
    name: string;
    /** 标签是否可关闭 */
    closable?: boolean;
    /** 是否禁用 */
    disabled?: boolean;
    /** 标签是否延迟渲染 */
    lazy?: boolean;
    /** 样式前缀 */
    classPrefix?: string;
    /** 激活标签时触发 */
    onTabShow?: () => void;
    /** 关闭标签页时触发 */
    onTabClose?: () => void;
    /** 传递给点击事件的额外参数 */
    data?: Record<TabPaneName, any>;
}

export interface Scrollable {
    /** 是否可向后滚动 */
    next?: boolean;
    /** 是否可向前滚动 */
    prev?: number;
}

export interface TabsPaneContext {
    props: TabPaneProps;
    //   uid: number
    paneName: TabPaneName | undefined;
    /** 是否是激活标签页 */
    active: boolean;
    /** tab顺序 */
    index: number;
    /** 标签是否可关闭 */
    isClosable: boolean;
}

export type TabPaneName = string | number;
