/* eslint-disable @typescript-eslint/no-non-null-assertion */
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import React, { Ref, createRef, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import RcTree from './RCTree';
import { DataNode, EventDataNode, Key } from './typings';
import { conductExpandParent } from './util';
import { convertDataToEntities, convertTreeToData } from './utils/treeUtil';

import { Icon } from '../Icon';
import Tree, { AntdTreeNodeAttribute, TreeProps } from './Tree';
import { calcRangeKeys, convertDirectoryKeysToNodes } from './utils/dictUtil';

export type ExpandAction = false | 'click' | 'doubleClick';

export interface DirectoryTreeProps<T> extends TreeProps<T> {
    expandAction?: ExpandAction;
}

export interface DirectoryTreeState {
    expandedKeys?: Key[];
    selectedKeys?: Key[];
}

const hasChildren = props => {
    const { eventKey } = props;
    const {
        context: { keyEntities },
    } = props;
    const { children } = keyEntities[eventKey] || {};

    return !!(children || []).length;
};

const isLeaf = props => {
    const { loaded } = props;
    const {
        context: { loadData },
    } = props;

    const _hasChildren = hasChildren(props);

    if (props.isLeaf === false) {
        return false;
    }

    return props.isLeaf || (!loadData && !_hasChildren) || (loadData && loaded && !_hasChildren);
};

function getIcon(props: AntdTreeNodeAttribute): React.ReactElement {
    const { expanded } = props;
    const _isLeaf = isLeaf(props);
    if (_isLeaf) {
        return <Icon name="file-lines" prefix="far" />;
    }
    return expanded ? <Icon name="folder-open" prefix="far" /> : <Icon name="folder-closed" prefix="fas" />;
}

function getTreeData<T>({ treeData, children }: DirectoryTreeProps<T>) {
    return treeData || convertTreeToData(children);
}

function InternalDirectoryTree<RecordType extends object = DataNode>(
    { defaultExpandAll, defaultExpandParent, defaultExpandedKeys, ...props }: DirectoryTreeProps<RecordType>,
    ref: Ref<RcTree>,
) {
    // Shift click usage
    const lastSelectedKey = useRef<Key>();

    const cachedSelectedKeys = useRef<Key[]>();

    const treeRef = createRef<RcTree>();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    useImperativeHandle(ref, () => treeRef.current!);

    const getInitExpandedKeys = () => {
        const { keyEntities } = convertDataToEntities(getTreeData(props));

        let initExpandedKeys: any;

        // Expanded keys
        if (defaultExpandAll) {
            initExpandedKeys = Object.keys(keyEntities);
        } else if (defaultExpandParent) {
            initExpandedKeys = conductExpandParent(props.expandedKeys || defaultExpandedKeys || [], keyEntities);
        } else {
            initExpandedKeys = props.expandedKeys || defaultExpandedKeys;
        }
        return initExpandedKeys;
    };

    const [selectedKeys, setSelectedKeys] = useState(props.selectedKeys || props.defaultSelectedKeys || []);
    const [expandedKeys, setExpandedKeys] = useState(getInitExpandedKeys());

    useEffect(() => {
        if ('selectedKeys' in props) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            setSelectedKeys(props.selectedKeys!);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.selectedKeys]);

    useEffect(() => {
        if ('expandedKeys' in props) {
            setExpandedKeys(props.expandedKeys);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.expandedKeys]);

    const expandFolderNode = (event: React.MouseEvent<HTMLElement>, node: any) => {
        if (node.isLeaf || event.shiftKey || event.metaKey || event.ctrlKey) {
            return;
        }

        // Call internal rc-tree expand function
        // https://github.com/ant-design/ant-design/issues/12567
        treeRef.current!.onNodeExpand(event as any, node);
    };

    const onDebounceExpand = debounce(expandFolderNode, 200, {
        leading: true,
    });
    const onExpand = (
        keys: Key[],
        info: {
            node: EventDataNode;
            expanded: boolean;
            nativeEvent: MouseEvent;
        },
    ) => {
        if (!('expandedKeys' in props)) {
            setExpandedKeys(keys);
        }
        // Call origin function
        return props.onExpand?.(keys, info);
    };

    const onClick = (event: React.MouseEvent<HTMLElement>, node: EventDataNode) => {
        const { expandAction } = props;

        // Expand the tree
        if (expandAction === 'click') {
            onDebounceExpand(event, node);
        }

        props.onClick?.(event, node);
    };

    const onDoubleClick = (event: React.MouseEvent<HTMLElement>, node: EventDataNode) => {
        const { expandAction } = props;

        // Expand the tree
        if (expandAction === 'doubleClick') {
            onDebounceExpand(event, node);
        }

        props.onDoubleClick?.(event, node);
    };

    const onSelect = (
        keys: Key[],
        event: {
            event: 'select';
            selected: boolean;
            node: any;
            selectedNodes: RecordType[];
            nativeEvent: MouseEvent;
        },
    ) => {
        const { multiple } = props;
        const { node, nativeEvent } = event;
        const { key = '' } = node;

        const treeData = getTreeData(props);
        // const newState: DirectoryTreeState = {};

        // We need wrap this event since some value is not same
        const newEvent: any = {
            ...event,
            selected: true, // Directory selected always true
        };

        // Windows / Mac single pick
        const ctrlPick: boolean = nativeEvent?.ctrlKey || nativeEvent?.metaKey;
        const shiftPick: boolean = nativeEvent?.shiftKey;

        // Generate new selected keys
        let newSelectedKeys: Key[];
        if (multiple && ctrlPick) {
            // Control click
            newSelectedKeys = keys;
            lastSelectedKey.current = key;
            cachedSelectedKeys.current = newSelectedKeys;
            newEvent.selectedNodes = convertDirectoryKeysToNodes(treeData, newSelectedKeys);
        } else if (multiple && shiftPick) {
            // Shift click
            newSelectedKeys = Array.from(
                new Set([
                    ...(cachedSelectedKeys.current || []),
                    ...calcRangeKeys({
                        treeData,
                        expandedKeys,
                        startKey: key,
                        endKey: lastSelectedKey.current,
                    }),
                ]),
            );
            newEvent.selectedNodes = convertDirectoryKeysToNodes(treeData, newSelectedKeys);
        } else {
            // Single click
            newSelectedKeys = [key];
            lastSelectedKey.current = key;
            cachedSelectedKeys.current = newSelectedKeys;
            newEvent.selectedNodes = convertDirectoryKeysToNodes(treeData, newSelectedKeys);
        }

        props.onSelect?.(newSelectedKeys, newEvent);
        if (!('selectedKeys' in props)) {
            setSelectedKeys(newSelectedKeys);
        }
    };

    const { prefixCls = 'r-tree', className, ...otherProps } = props;

    const connectClassName = classNames(`${prefixCls}-directory`, className);

    return (
        <Tree
            icon={getIcon}
            ref={treeRef}
            blockNode
            {...otherProps}
            prefixCls={prefixCls}
            className={connectClassName}
            expandedKeys={expandedKeys}
            selectedKeys={selectedKeys}
            onSelect={onSelect}
            onClick={onClick}
            onDoubleClick={onDoubleClick}
            onExpand={onExpand}
        />
    );
}

const ForwardDirectoryTree = forwardRef(InternalDirectoryTree) as <RecordType extends object = any>(
    props: DirectoryTreeProps<RecordType> & { ref?: Ref<RcTree> },
) => React.ReactElement;

type InternalDirectoryTreeType = typeof ForwardDirectoryTree;

interface DirectoryTreeInterface extends InternalDirectoryTreeType {
    displayName?: string;
    defaultProps?: Partial<DirectoryTreeProps<any>>;
}

const DirectoryTree = ForwardDirectoryTree as DirectoryTreeInterface;

DirectoryTree.displayName = 'DirectoryTree';

DirectoryTree.defaultProps = {
    showIcon: true,
    expandAction: 'doubleClick' as DirectoryTreeProps<any>['expandAction'],
};

export default DirectoryTree;
