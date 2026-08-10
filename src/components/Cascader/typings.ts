import { InputRef } from '@qsxy/element-plus-react/Input/typings';
import { PopperOptions } from '@qsxy/element-plus-react/Popper/typings';
import React from 'react';
// import { DataNode, DirectoryTreeProps, Key } from '@qsxy/element-plus-react/Tree';
import { AnimationEventProps, BaseProps, FormControlBaseProps, NativeProps } from '@qsxy/element-plus-react/types/common';

export type CascaderValue = string[] | string[][];

export interface CascaderProps<V = CascaderValue, S = any>
    extends Omit<FormControlBaseProps<V>, 'onChange' | 'value' | 'defaultValue'>, BaseProps, NativeProps, AnimationEventProps, PopperOptions {
    /** 初始值 */
    defaultValue?: CascaderValue;
    /** 值（可控） */
    value?: CascaderValue;
    /** 可选项数据源，键名可通过 Props 属性配置 */
    options?: any[];
    /** 配置选项 */
    props?: CascaderMenuProps;
    /** 是否禁用 */
    disabled?: boolean;
    /** 是否可以清空选项 */
    clearable?: boolean;
    /** 输入框中是否显示选中值的完整路径 */
    showAllLevels?: boolean;
    /** 用于分隔选项的字符 */
    separator?: string;
    /** 是否可搜索 */
    filterable?: boolean;
    /** 自定义搜索方法 */
    filterMethod?: (val: CascaderValue, searchText: string) => boolean;
    /** 占位符 */
    placeholder?: string;
    // /** 选项为空时显示的文字 */
    // noDataText?: string;
    // /** 搜索条件无匹配时显示的文字 */
    // noMatchText?: string;
    // /** 是否正在从远程获取数据 */
    // loading?: boolean;
    // /** 远程加载时显示的文字 */
    // loadingText?: string;
    /** 多选时是否将选中值按文字的形式展示 */
    collapseTags?: boolean;
    /** 需要显示的 Tag 的最大数量 只有当 collapseTags 设置为 true 时才会生效。 */
    maxCollapseTags?: number;
    /** 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此属性，collapseTags属性必须设定为 true */
    collapseTagsTooltip?: boolean;
    /** 鼠标悬停于折叠标签的文本格式化函数， 要使用此属性，collapseTags属性必须设定为 true */
    collapseTips?: (collapseNum: number, total: number) => string;
    /** 是否纯文本模式，即无边框 */
    plain?: boolean;
    /** 输入框头部内容，只对 type="text" 有效 */
    prefix?: React.ReactElement<any> | string | number;
    /** 输入框尾部内容，只对 type="text" 有效 */
    suffix?: React.ReactElement<any> | string | number;
    /** 输入框前置内容，只对 type="text" 有效 */
    prepend?: React.ReactElement<any> | string | number;
    /** 输入框后置内容，只对 type="text" 有效 */
    append?: React.ReactElement | string | number;
    lable?: string;
    /** 是否追加到body下 */
    // appendToBody?: boolean;
    /** 折叠标签的提示最大高度 */
    maxCollapseTagsTooltipHeight?: string | number;
    /** 是否显示成面板 */
    panel?: boolean;
    /** 选中值发生变化时触发 */
    onChange?: (value: CascaderValue, level?: number, label?: string | string[], node?: S[] | S[][]) => void;
    /** 清空选项时触发 */
    onClear?: () => void;
    /** 可见性改变时触发 */
    onVisibleChange?: (visible: boolean) => void;
    /** 展开状态改变时触发 */
    onExpandChange?: (node: CascaderNode) => void;
    /** 移除标签时触发 */
    onRemoveTag?: (node: CascaderNode) => void;
    /** 是否可以选择 */
    shouldSelect?: (node?: object, level?: number) => boolean;

    labelFormatter?: (level?: number, node?: object[]) => string;
    /** 自定义节点格式化函数 */
    nodeFormatter?: (params: { node?: CascaderNode; data?: any }) => React.ReactNode;
    /** 自定义建议项格式化函数 */
    suggestionItemFormatter?: (item: CascaderNode[]) => React.ReactNode;
}

export type CascaderPanelProps = Omit<CascaderProps, 'panel'>;

export interface CascaderMenuProps {
    /** 次级菜单的展开方式 */
    expandTrigger?: 'click' | 'hover';
    /** 是否多选 */
    multiple?: boolean;
    /** 是否严格的遵守父子节点不互相关联 */
    checkStrictly?: boolean;
    /** 在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值 */
    emitPath?: boolean;
    /** 是否动态加载子节点，需与 lazyLoad 方法结合使用 */
    lazy?: boolean;
    /** 加载动态数据的方法，仅在 lazy 为 true 时有效 */
    lazyLoad?: (node: object, resolve?: (value: object[]) => void, reject?: () => void) => void;
    /** 指定选项的值为选项对象的某个属性值 */
    value?: string;
    /** 指定选项标签为选项对象的某个属性值 */
    label?: string;
    /** 指定选项的子选项为选项对象的某个属性值 */
    children?: string;
    /** 指定选项的禁用为选项对象的某个属性值 */
    disabled?: string;
    /** 指定选项的叶子节点的标志位为选项对象的某个属性值 */
    leaf?: string;
}

export interface CascaderRef {
    ref?: React.Ref<HTMLDivElement>;
    input?: React.Ref<InputRef>;
    presentText?: string;
    setLabel: (label: string) => void;
    clear: () => void;
    /** 重置懒加载的节点，适用于动态懒加载配置 */
    resetNodes: () => void;
    /** 获取选中的节点 */
    getCheckedNodes: () => CascaderNode[][];
    togglePopperVisible: (visible: boolean) => void;
}

export interface CascaderNode extends Object {
    /**
     * 主键
     * @private
     */
    __id: string;
    /**
     * 父级节点ID
     * @private
     */
    __pId: string;
    /**
     * 层级
     * @private
     */
    __level?: number;
    /**
     * 是否叶子节点
     * @private
     */
    __leaf?: boolean;
    /**
     * 是否已勾选
     * @private
     */
    __checked?: boolean;
    /**
     * 是否半选
     * @private
     */
    __indeterminate?: boolean;
    /**
     * 节点数据
     * @private
     */
    data?: object;
    /**
     * 时子节点集合
     * @private
     */
    children?: CascaderNode[];
    /**
     * 树形组件时子节点集合
     * @private
     */
    treeChildren?: boolean;
}
