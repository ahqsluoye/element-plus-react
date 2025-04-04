import classNames from 'classnames';
import React, { Component, Ref, forwardRef, useMemo } from 'react';
import DirectoryTree from './DirectoryTree';
import RcTree, { TreeProps as RcTreeProps } from './RCTree';
import TreeNode from './TreeNode';
import { BasicDataNode, DataNode, Key } from './typings';
import DropIndicatorRender from './utils/dropIndicator';
import renderSwitcherIcon from './utils/iconUtil';
import collapseMotion from './utils/motion';

export interface AntdTreeNodeAttribute {
    eventKey: string;
    prefixCls: string;
    className: string;
    expanded: boolean;
    selected: boolean;
    checked: boolean;
    halfChecked: boolean;
    children: React.ReactElement;
    title: React.ReactElement;
    pos: string;
    dragOver: boolean;
    dragOverGapTop: boolean;
    dragOverGapBottom: boolean;
    isLeaf: boolean;
    selectable: boolean;
    disabled: boolean;
    disableCheckbox: boolean;
}

export interface AntTreeNodeProps {
    className?: string;
    checkable?: boolean;
    disabled?: boolean;
    disableCheckbox?: boolean;
    title?: string | React.ReactElement;
    key?: Key;
    eventKey?: string;
    isLeaf?: boolean;
    checked?: boolean;
    expanded?: boolean;
    loading?: boolean;
    selected?: boolean;
    selectable?: boolean;
    icon?: ((treeNode: AntdTreeNodeAttribute) => React.ReactElement) | React.ReactElement;
    children?: React.ReactElement;
    [customProp: string]: any;
}

export type AntTreeNode = Component<AntTreeNodeProps, {}>;

export interface AntTreeNodeBaseEvent {
    node: AntTreeNode;
    nativeEvent: MouseEvent;
}

export interface AntTreeNodeCheckedEvent extends AntTreeNodeBaseEvent {
    event: 'check';
    checked?: boolean;
    checkedNodes?: AntTreeNode[];
}

export interface AntTreeNodeSelectedEvent extends AntTreeNodeBaseEvent {
    event: 'select';
    selected?: boolean;
    selectedNodes?: DataNode[];
}

export interface AntTreeNodeExpandedEvent extends AntTreeNodeBaseEvent {
    expanded?: boolean;
}

export interface AntTreeNodeMouseEvent {
    node: AntTreeNode;
    event: any;
}

export interface AntTreeNodeDragEnterEvent extends AntTreeNodeMouseEvent {
    expandedKeys: Key[];
}

export interface AntTreeNodeDropEvent {
    node: AntTreeNode;
    dragNode: AntTreeNode;
    dragNodesKeys: Key[];
    dropPosition: number;
    dropToGap?: boolean;
    event: React.MouseEventHandler<HTMLElement>;
}

// [Legacy] Compatible for v3
export type TreeNodeNormal = DataNode;

type DraggableFn = (node: AntTreeNode) => boolean;
interface DraggableConfig {
    icon?: React.ReactElement | false;
    nodeDraggable?: DraggableFn;
}

export interface TreeProps<T extends BasicDataNode = DataNode> extends Omit<RcTreeProps<T>, 'prefixCls' | 'showLine' | 'direction' | 'draggable'> {
    showLine?: boolean | { showLeafIcon: boolean };
    className?: string;
    /** 是否支持多选 */
    multiple?: boolean;
    /** 是否自动展开父节点 */
    autoExpandParent?: boolean;
    /** Checkable状态下节点选择完全受控（父子节点选中状态不再关联） */
    checkStrictly?: boolean;
    /** 是否支持选中 */
    checkable?: boolean;
    /** 是否禁用树 */
    disabled?: boolean;
    /** 默认展开所有树节点 */
    defaultExpandAll?: boolean;
    /** 默认展开对应树节点 */
    defaultExpandParent?: boolean;
    /** 默认展开指定的树节点 */
    defaultExpandedKeys?: Key[];
    /** （受控）展开指定的树节点 */
    expandedKeys?: Key[];
    /** （受控）选中复选框的树节点 */
    checkedKeys?: Key[] | { checked: Key[]; halfChecked: Key[] };
    /** 默认选中复选框的树节点 */
    defaultCheckedKeys?: Key[];
    /** （受控）设置选中的树节点 */
    selectedKeys?: Key[];
    /** 默认选中的树节点 */
    defaultSelectedKeys?: Key[];
    selectable?: boolean;
    /** 点击树节点触发 */
    filterAntTreeNode?: (node: AntTreeNode) => boolean;
    loadedKeys?: Key[];
    /** 设置节点可拖拽（IE>8） */
    draggable?: DraggableFn | boolean | DraggableConfig;
    style?: React.CSSProperties;
    showIcon?: boolean;
    icon?: React.ReactNode | ((props: AntdTreeNodeAttribute) => React.ReactNode);
    switcherIcon?: React.ReactElement<any>;
    prefixCls?: string;
    children?: React.ReactElement;
    blockNode?: boolean;
}

function InternalTree<RecordType extends object = DataNode>(props: TreeProps<RecordType>, ref: Ref<RcTree>) {
    const { prefixCls = 'el-tree', className, showIcon, showLine, switcherIcon, blockNode, children, checkable, selectable, draggable } = props;
    const newProps = {
        ...props,
        showLine: Boolean(showLine),
        dropIndicatorRender: DropIndicatorRender,
    };

    const draggableConfig = useMemo(() => {
        if (!draggable) {
            return false;
        }

        let mergedDraggable: DraggableConfig = {};
        switch (typeof draggable) {
            case 'function':
                mergedDraggable.nodeDraggable = draggable;
                break;

            case 'object':
                mergedDraggable = { ...draggable };
                break;

            default:
            // Do nothing
        }

        // if (mergedDraggable.icon !== false) {
        //     mergedDraggable.icon = mergedDraggable.icon || <HolderOutlined />;
        // }

        return mergedDraggable;
    }, [draggable]);

    return (
        // @ts-ignore
        <RcTree
            itemHeight={props.itemHeight}
            ref={ref}
            virtual={props.virtual}
            {...newProps}
            prefixCls={prefixCls}
            className={classNames(
                {
                    [`${prefixCls}-icon-hide`]: !showIcon,
                    [`${prefixCls}-block-node`]: blockNode,
                    [`${prefixCls}-unselectable`]: !selectable,
                },
                className,
            )}
            // direction={props.direction}
            checkable={checkable ? <span className={`${prefixCls}-checkbox-inner`} /> : checkable}
            selectable={selectable}
            switcherIcon={(nodeProps: AntTreeNodeProps) => renderSwitcherIcon(prefixCls, switcherIcon, showLine, nodeProps)}
            draggable={draggableConfig as any}
        >
            {children}
        </RcTree>
    );
}

const ForwardTree = forwardRef(InternalTree) as <RecordType extends object = any>(props: TreeProps<RecordType> & { ref?: Ref<RcTree> }) => React.ReactElement;

type InternalTreeType = typeof ForwardTree;

interface TreeInterface extends InternalTreeType {
    displayName?: string;
    defaultProps?: Partial<TreeProps<any>>;
    TreeNode: typeof TreeNode;
    DirectoryTree: typeof DirectoryTree;
}

const Tree = ForwardTree as TreeInterface;

Tree.TreeNode = TreeNode;

Tree.defaultProps = {
    checkable: false,
    selectable: true,
    showIcon: false,
    motion: collapseMotion,
    blockNode: false,
    itemHeight: 20,
};

export default Tree;
