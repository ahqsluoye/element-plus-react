// import type { Component, ComponentInternalInstance, Ref, SetupContext, VNode, h } from 'vue';
import { IconName } from '../Icon';
import type Node from './model/node';
import type TreeStore from './model/tree-store';
// import type { treeEmits } from './tree';

export interface RootTreeType {
    // ctx: SetupContext<typeof treeEmits>;
    props: TreeComponentProps;
    store: Ref<TreeStore>;
    root: Ref<Node>;
    currentNode: Ref<Node>;
    instance: ComponentInternalInstance;
}

export type hType = typeof h;
export type TreeData = TreeNodeData[];
export type TreeKey = string | number;
export interface FakeNode {
    data: TreeNodeData;
}
export type TreeNodeData = Record<string, any>;
export interface TreeNodeLoadedDefaultProps {
    checked?: boolean;
}
export interface TreeNodeChildState {
    all: boolean;
    none: boolean;
    allWithoutDisable: boolean;
    half: boolean;
    isEffectivelyChecked: boolean;
}
export interface TreeNodeOptions {
    data: TreeNodeData;
    store: TreeStore;
    parent?: Node;
}
export interface TreeStoreNodesMap {
    [key: string]: Node;
}
export interface TreeStoreOptions {
    key?: TreeKey;
    data: TreeData;
    lazy: boolean;
    props: TreeOptionProps;
    load?: LoadFunction;
    currentNodeKey?: TreeKey;
    checkStrictly: boolean;
    checkDescendants: boolean;
    defaultCheckedKeys?: TreeKey[];
    defaultExpandedKeys?: TreeKey[];
    autoExpandParent: boolean;
    defaultExpandAll: boolean;
    filterNodeMethod?: FilterNodeMethodFunction;
}
export interface TreeOptionProps {
    children?: string;
    label?: string | ((data: TreeNodeData, node: Node) => string);
    disabled?: string | ((data: TreeNodeData, node: Node) => boolean);
    isLeaf?: string | ((data: TreeNodeData, node: Node) => boolean);
    class?: (data: TreeNodeData, node: Node) => string | { [key: string]: boolean };
}
export type RenderContentFunction = (h: hType, context: RenderContentContext) => VNode | VNode[];
export interface RenderContentContext {
    _self: ComponentInternalInstance;
    node: Node;
    data: TreeNodeData;
    store: TreeStore;
}
export type AllowDragFunction = (node: Node) => boolean;
export type AllowDropType = 'inner' | 'prev' | 'next';
export type AllowDropFunction = (draggingNode: Node, dropNode: Node, type: AllowDropType) => boolean;
export type LoadFunction = (rootNode: Node, loadedCallback: (data: TreeData) => void, stopLoading: () => void) => void;
export type FilterValue = any;
export type FilterNodeMethodFunction = (value: FilterValue, data: TreeNodeData, child: Node) => boolean;
export interface TreeComponentProps {
    /** 展示数据 */
    data: TreeData;
    /** 内容为空的时候展示的文本 */
    emptyText: string;
    /** 是否在第一次展开某个树节点后才渲染其子节点 */
    renderAfterExpand: boolean;
    /** 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的 */
    nodeKey: string;
    /** 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法 */
    checkStrictly: boolean;
    /** 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。 */
    expandOnClickNode: boolean;
    /** 是否默认展开所有节点 */
    defaultExpandAll: boolean;
    /** 是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点 */
    checkOnClickNode: boolean;
    /** 点击叶节点(最后一个子节点)时是否选中或取消选中节点 */
    checkOnClickLeaf: boolean;
    /**  */
    checkDescendants: boolean;
    /** 展开子节点的时候是否自动展开父节点 */
    autoExpandParent: boolean;
    /** 默认勾选的节点的 key 的数组 */
    defaultCheckedKeys: TreeKey[];
    /** 默认展开的节点的 key 的数组 */
    defaultExpandedKeys: TreeKey[];
    /** 当前选中的节点 */
    currentNodeKey: TreeKey;
    /** 树节点的内容区的渲染 Function */
    renderContent: RenderContentFunction;
    /** 节点是否可被选择 */
    showCheckbox: boolean;
    /** 是否开启拖拽节点功能 */
    draggable: boolean;
    /** 判断节点能否被拖拽 如果返回 false ，节点不能被拖动 */
    allowDrag: AllowDragFunction;
    /** 拖拽时判定目标节点能否成为拖动目标位置。 如果返回 false ，拖动节点不能被拖放到目标节点。 type 参数有三种情况：'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后 */
    allowDrop: AllowDropFunction;
    /** 配置选项 */
    props: TreeOptionProps;
    /** 是否懒加载子节点，需与 load 方法结合使用 */
    lazy: boolean;
    /** 是否高亮当前选中节点 */
    highlightCurrent: boolean;
    /** 加载子树数据的方法，仅当 lazy 属性为true 时生效 */
    load: LoadFunction;
    /** 对树节点进行筛选时执行的方法， 返回 false 则表示这个节点会被隐藏 */
    filterNodeMethod: FilterNodeMethodFunction;
    /** 是否每次只打开一个同级树节点展开 */
    accordion: boolean;
    /** 相邻级节点间的水平缩进，单位为像素 */
    indent: number;
    /** 自定义树节点图标组件 */
    icon: IconName;
}

export type NodeDropType = 'before' | 'after' | 'inner' | 'none';

export type { DragEvents } from './model/useDragNode';

export interface CheckedInfo {
    checkedKeys: TreeKey[];
    checkedNodes: TreeData;
    halfCheckedKeys: TreeKey[];
    halfCheckedNodes: TreeData;
}
