import React, { Component } from 'react';
import { IconName } from '../Icon';
import { TreeNodeProps } from './TreeNode';

export { ScrollTo } from '../VirtualList';

/** For fieldNames, we provides a abstract interface */
export interface BasicDataNode {
    checkable?: boolean;
    disabled?: boolean;
    disableCheckbox?: boolean;
    icon?: IconType;
    isLeaf?: boolean;
    selectable?: boolean;
    switcherIcon?: IconType;

    /** Set style of TreeNode. This is not recommend if you don't have any force requirement */
    className?: string;
    style?: React.CSSProperties;
}

export interface DataNode<T = any> extends BasicDataNode {
    children?: T[];
    key?: string | number;
    title?: string | React.ReactElement;
}

export interface EventDataNode extends DataNode {
    expanded: boolean;
    selected: boolean;
    checked: boolean;
    loaded: boolean;
    loading: boolean;
    halfChecked: boolean;
    dragOver: boolean;
    dragOverGapTop: boolean;
    dragOverGapBottom: boolean;
    pos: string;
    active: boolean;
}

export type IconType = React.ReactElement | ((props: TreeNodeProps) => React.ReactElement) | IconName;

export type Key = string | number;

export type NodeElement = React.ReactElement<TreeNodeProps> & {
    selectHandle?: HTMLSpanElement;
    type: {
        isTreeNode: boolean;
    };
};

export type NodeInstance<TreeDataType extends BasicDataNode = DataNode> = Component<TreeNodeProps<TreeDataType>> & {
    selectHandle?: HTMLSpanElement;
};

export interface Entity {
    node: NodeElement;
    index: number;
    key: Key;
    pos: string;
    parent?: Entity;
    children?: Entity[];
}

export interface DataEntity<TreeDataType extends BasicDataNode = DataNode> extends Omit<Entity, 'node' | 'parent' | 'children'> {
    node: TreeDataType;
    nodes: TreeDataType[];
    parent?: DataEntity<TreeDataType>;
    children?: DataEntity<TreeDataType>[];
    level: number;
}

export interface FlattenNode {
    parent: FlattenNode | null;
    children: FlattenNode[];
    pos: string;
    data: DataNode;
    title: React.ReactElement;
    key: Key;
    isStart: boolean[];
    isEnd: boolean[];
}

export type GetKey<RecordType> = (record: RecordType, index?: number) => Key;

export type GetCheckDisabled<RecordType> = (record: RecordType) => boolean;

export type Direction = 'ltr' | 'rtl' | undefined;

export interface FieldNames {
    title?: string;

    /** @private Internal usage for `rc-tree-select`, safe to remove if no need */
    _title?: string[];
    key?: string;
    children?: string;
}
