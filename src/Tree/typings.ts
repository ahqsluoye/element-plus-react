// import type { Component, ComponentInternalInstance, Ref, SetupContext, VNode, h } from 'vue';
import { RefObject } from 'preact';
import React from 'react';
import { IconName } from '../Icon';
import { BaseProps, NativeProps } from '../types/common';
import Node from './model/node';
import TreeStore from './model/tree-store';
import { DragOptions } from './model/useDragNode';
// import type { treeEmits } from './tree';

export interface RootTreeType {
    // ctx: SetupContext<typeof treeEmits>;
    props: TreeProps;
    store: TreeStore;
    root: Ref<Node>;
    currentNode: Ref<Node>;
    instance: ComponentInternalInstance;
}

export type TreeRef = {
    filter: (value: any) => void;
    getNodeKey: (node: any) => any;
    getNode: (data: TreeKey | TreeNodeData | Node) => Node;
    getCheckedNodes: (leafOnly?: boolean, includeHalfChecked?: boolean) => TreeNodeData[];
    getCheckedKeys: (leafOnly?: boolean) => TreeKey[];
    getHalfCheckedNodes: () => TreeNodeData[];
    getHalfCheckedKeys: () => TreeKey[];
    getCurrentNode: () => TreeNodeData;
    getCurrentKey: () => any;
    setCurrentNode: (node: Node, shouldAutoExpandParent?: boolean) => void;
    setCurrentKey: (key?: any, shouldAutoExpandParent?: boolean) => void;
    remove: (data: TreeNodeData | Node) => void;
    append: (data: TreeNodeData, parentNode: TreeNodeData | TreeKey | Node) => void;
    insertBefore: (data: TreeNodeData, refNode: TreeKey | TreeNodeData | Node) => void;
    insertAfter: (data: TreeNodeData, refNode: TreeKey | TreeNodeData | Node) => void;
    updateKeyChildren: (key: TreeKey, data: TreeData) => void;
    setCheckedNodes: (nodes: Node[], leafOnly?: boolean) => void;
    setCheckedKeys: (keys: TreeKey[], leafOnly?: boolean) => void;
    setChecked: (data: TreeKey | TreeNodeData, checked: boolean, deep: boolean) => void;
};
export type TreeNodeRef = {};

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
    forceUpdate?: () => void;
}
export interface TreeOptionProps {
    children?: string;
    label?: string | ((data: TreeNodeData, node: Node) => string);
    disabled?: string | ((data: TreeNodeData, node: Node) => boolean);
    isLeaf?: string | ((data: TreeNodeData, node: Node) => boolean);
    class?: (data: TreeNodeData, node: Node) => string | { [key: string]: boolean };
}
export type RenderContentFunction = (context: RenderContentContext) => React.ReactElement | React.ReactElement[];
export interface RenderContentContext {
    _self?: any;
    node?: Node;
    data?: TreeNodeData;
    store?: TreeStore;
}
export type AllowDragFunction = (node: Node) => boolean;
export type AllowDropType = 'inner' | 'prev' | 'next';
export type AllowDropFunction = (draggingNode: Node, dropNode: Node, type: AllowDropType) => boolean;
export type LoadFunction = (rootNode: Node, loadedCallback: (data: TreeData) => void, stopLoading: () => void) => void;
export type FilterValue = any;
export type FilterNodeMethodFunction = (value: FilterValue, data: TreeNodeData, child: Node) => boolean;

export interface TreeProps extends TreeEvents, BaseProps, NativeProps {
    /** 展示数据 */
    data?: TreeData;
    /** 内容为空的时候展示的文本 */
    emptyText?: string;
    /** 是否在第一次展开某个树节点后才渲染其子节点 */
    renderAfterExpand?: boolean;
    /** 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的 */
    nodeKey?: string;
    /** 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法 */
    checkStrictly?: boolean;
    /** 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。 */
    expandOnClickNode?: boolean;
    /** 是否默认展开所有节点 */
    defaultExpandAll?: boolean;
    /** 是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点 */
    checkOnClickNode?: boolean;
    /** 点击叶节点(最后一个子节点)时是否选中或取消选中节点 */
    checkOnClickLeaf?: boolean;
    /**  */
    checkDescendants?: boolean;
    /** 展开子节点的时候是否自动展开父节点 */
    autoExpandParent?: boolean;
    /** 默认勾选的节点的 key 的数组 */
    defaultCheckedKeys?: TreeKey[];
    /** 默认展开的节点的 key 的数组 */
    defaultExpandedKeys?: TreeKey[];
    /** 当前选中的节点 */
    currentNodeKey?: TreeKey;
    /** 树节点的内容区的渲染 Function */
    renderContent?: RenderContentFunction;
    /** 节点是否可被选择 */
    showCheckbox?: boolean;
    /** 是否开启拖拽节点功能 */
    draggable?: boolean;
    /** 判断节点能否被拖拽 如果返回 false ，节点不能被拖动 */
    allowDrag?: AllowDragFunction;
    /** 拖拽时判定目标节点能否成为拖动目标位置。 如果返回 false ，拖动节点不能被拖放到目标节点。 type 参数有三种情况：'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后 */
    allowDrop?: AllowDropFunction;
    /** 配置选项 */
    props?: TreeOptionProps;
    /** 是否懒加载子节点，需与 load 方法结合使用 */
    lazy?: boolean;
    /** 是否高亮当前选中节点 */
    highlightCurrent?: boolean;
    /** 加载子树数据的方法，仅当 lazy 属性为true 时生效 */
    load?: LoadFunction;
    /** 对树节点进行筛选时执行的方法， 返回 false 则表示这个节点会被隐藏 */
    filterNodeMethod?: FilterNodeMethodFunction;
    /** 是否每次只打开一个同级树节点展开 */
    accordion?: boolean;
    /** 相邻级节点间的水平缩进，单位为像素 */
    indent?: number;
    /** 自定义树节点图标组件 */
    icon?: IconName;
    /** 当数据为空时自定义的内容 */
    renderEmpty?: () => React.ReactNode;
}

// node-click	当节点被点击的时候触发	四个参数：对应于节点点击的节点对象，TreeNode 的 node 属性, TreeNode和事件对象
// node-contextmenu	当某一节点被鼠标右键点击时会触发该事件	共四个参数，依次为：event、传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。
// check-change	当复选框被点击的时候触发	共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点
// check	点击节点复选框之后触发	共两个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、树目前的选中状态对象，包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性
// current-change	当前选中节点变化时触发的事件	共两个参数，依次为：当前节点的数据，当前节点的 Node 对象
// node-expand	节点被展开时触发的事件	共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身
// node-collapse	节点被关闭时触发的事件	共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身
// node-drag-start	节点开始拖拽时触发的事件	共两个参数，依次为：被拖拽节点对应的 Node、event
// node-drag-enter	拖拽进入其他节点时触发的事件	共三个参数，依次为：被拖拽节点对应的 Node、所进入节点对应的 Node、event
// node-drag-leave	拖拽离开某个节点时触发的事件	共三个参数，依次为：被拖拽节点对应的 Node、所离开节点对应的 Node、event
// node-drag-over	在拖拽节点时触发的事件（类似浏览器的 mouseover 事件）	共三个参数，依次为：被拖拽节点对应的 Node、当前进入节点对应的 Node、event
// node-drag-end	拖拽结束时（可能未成功）触发的事件	共四个参数，依次为：被拖拽节点对应的 Node、结束拖拽时最后进入的节点（可能为空）、被拖拽节点的放置位置（before、after、inner）、event
// node-drop	拖拽成功完成时触发的事件	共四个参数，依次为：被拖拽节点对应的 Node、结束拖拽时最后进入的节点、被拖拽节点的放置位置（before、after、inner）、event
export interface TreeEvents {
    /** 当节点被点击的时候触发	四个参数：对应于节点点击的节点对象，TreeNode 的 node 属性, TreeNode和事件对象 */
    onNodeClick?: (nodeData: TreeNodeData, node: Node, instance: TreeNodeRef, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    /** 当某一节点被鼠标右键点击时会触发该事件	共四个参数，依次为：event、传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。 */
    onNodeContextmenu?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, nodeData: TreeNodeData, node: Node, instance: TreeNodeRef) => void;
    /** 当复选框被点击的时候触发	共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点 */
    onCheckChange?: (nodeData: TreeNodeData, checked: boolean, indeterminate: boolean) => void;
    /** 点击节点复选框之后触发	共两个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、树目前的选中状态对象，包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性 */
    onCheck?: (nodeData: TreeNodeData, checkedInfo: CheckedInfo) => void;
    /** 当前选中节点变化时触发的事件	共两个参数，依次为：当前节点的数据，当前节点的 Node 对象 */
    onCurrentChange?: (nodeData: TreeNodeData, node: Node) => void;
    /** 节点被展开时触发的事件	共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身 */
    onNodeExpand?: (nodeData: TreeNodeData, node: Node, instance: TreeNodeRef) => void;
    /** 节点被关闭时触发的事件	共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身 */
    onNodeCollapse?: (nodeData: TreeNodeData, node: Node, instance: TreeNodeRef) => void;
    /** 节点开始拖拽时触发的事件	共两个参数，依次为：被拖拽节点对应的 Node、event */
    onNodeDragStart?: (draggingNode: Node, event: DragEvent) => void;
    /** 拖拽进入其他节点时触发的事件	共三个参数，依次为：被拖拽节点对应的 Node、所进入节点对应的 Node、event */
    onNodeDragEnter?: (draggingNode: Node, dropNode: Node, event: DragEvent) => void;
    /** 拖拽离开某个节点时触发的事件	共三个参数，依次为：被拖拽节点对应的 Node、所离开节点对应的 Node、event */
    onNodeDragLeave?: (draggingNode: Node, dropNode: Node, event: DragEvent) => void;
    /** 在拖拽节点时触发的事件（类似浏览器的 mouseover 事件）	共三个参数，依次为：被拖拽节点对应的 Node、当前进入节点对应的 Node、event */
    onNodeDragOver?: (draggingNode: Node, dropNode: Node, event: DragEvent) => void;
    /** 拖拽结束，即释放鼠标时触发的事件	共三个参数，依次为：被拖拽节点对应的 Node、当前进入节点对应的 Node、event */
    onNodeDragEnd?: (draggingNode: Node, dropNode: Node, dropType: NodeDropType, event: DragEvent) => void;
    /** 拖拽开始时触发的事件	共两个参数，依次为：被拖拽节点对应的 Node、event */
    onNodeDrop?: (draggingNode: Node, dropNode: Node, dropType: NodeDropType, event: DragEvent) => void;
}

export type NodeDropType = 'before' | 'after' | 'inner' | 'none';

export type { DragEvents } from './model/useDragNode';

export interface CheckedInfo {
    checkedKeys: TreeKey[];
    checkedNodes: TreeData;
    halfCheckedKeys: TreeKey[];
    halfCheckedNodes: TreeData;
}

export interface TreeNodeProps {
    node: Node;
    props: TreeOptionProps;
    accordion: boolean;
    renderContent: RenderContentFunction;
    renderAfterExpand: boolean;
    showCheckbox: boolean;
    onNodeExpand: (nodeData: TreeNodeData, node: Node, instance: TreeNodeRef) => void;
}

interface NodeMap {
    treeNodeExpand(node?: Node): void;
    children: Set<NodeMap>;
}

export type TreeContextProps = {
    // ctx: { emit: (event: string, ...args: any[]) => void };
    props: TreeProps;
    store: TreeStore;
    // actions: TreeActions;
    // storeRef: RefObject<TreeStore>;
    root: Node;
    // currentNode: Node;
    // setCurrentNode: (currentNode: Node) => void;
    forceUpdate: () => void;
};

export type TreeNodeExpandContextProps = {
    parentNodeMap: RefObject<NodeMap>;
};

export type DragEventsContextProps = {
    treeNodeDragStart: (options: DragOptions) => void;
    treeNodeDragOver: (options: DragOptions) => void;
    treeNodeDragEnd: (event: DragEvent) => void;
};
