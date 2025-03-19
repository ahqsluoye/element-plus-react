import React, { Context, createContext } from 'react';

/**
 * Webpack has bug for import loop, which is not the same behavior as ES module.
 * When util.js imports the TreeNode for tree generate will cause treeContextTypes be empty.
 */
import { DraggableConfig } from './RCTree';
import { BasicDataNode, DataEntity, DataNode, Direction, EventDataNode, IconType, Key, NodeInstance } from './typings';

export type NodeMouseEventParams = {
    event: React.MouseEvent;
    node: EventDataNode;
};
export type NodeDragEventParams = {
    event: DragEvent;
    node: EventDataNode;
};

export type NodeMouseEventHandler = (e: React.MouseEvent<HTMLSpanElement>, node: EventDataNode) => void;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type NodeDragEventHandler<T = HTMLDivElement, TreeDataType extends BasicDataNode = DataNode> = (e: any, node: NodeInstance<TreeDataType>, outsideTree?: boolean) => void;

export interface TreeContextProps {
    prefixCls: string;
    selectable: boolean;
    showIcon: boolean;
    icon: IconType;
    switcherIcon: IconType;
    draggable?: DraggableConfig;
    draggingNodeKey?: Key;
    checkable: boolean | React.ReactElement;
    checkStrictly: boolean;
    disabled: boolean;
    keyEntities: Record<Key, DataEntity<any>>;
    // for details see comment in Tree.state (Tree.tsx)
    dropLevelOffset?: number;
    dropContainerKey: Key | null;
    dropTargetKey: Key | null;
    dropPosition: -1 | 0 | 1 | null;
    indent: number | null;
    dropIndicatorRender: (props: { dropPosition: -1 | 0 | 1; dropLevelOffset: number; indent; prefixCls; direction: Direction }) => React.ReactElement;
    dragOverNodeKey: Key | null;
    direction: Direction;

    loadData: (treeNode: EventDataNode) => Promise<void>;
    filterTreeNode: (treeNode: EventDataNode) => boolean;
    titleRender?: (node: any) => React.ReactElement | string;

    onNodeClick: NodeMouseEventHandler;
    onNodeDoubleClick: NodeMouseEventHandler;
    onNodeExpand: NodeMouseEventHandler;
    onNodeSelect: NodeMouseEventHandler;
    onNodeCheck: (e: React.MouseEvent<HTMLSpanElement>, treeNode: EventDataNode, checked: boolean) => void;
    onNodeLoad: (treeNode: EventDataNode) => void;
    onNodeMouseEnter: NodeMouseEventHandler;
    onNodeMouseLeave: NodeMouseEventHandler;
    onNodeContextMenu: NodeMouseEventHandler;
    onNodeDragStart: NodeDragEventHandler<any, any>;
    onNodeDragEnter: NodeDragEventHandler<any, any>;
    onNodeDragOver: NodeDragEventHandler<any, any>;
    onNodeDragLeave: NodeDragEventHandler<any, any>;
    onNodeDragEnd: NodeDragEventHandler<any, any>;
    onNodeDrop: NodeDragEventHandler<any, any>;
}

export const TreeContext: Context<TreeContextProps | null> = createContext(null);
