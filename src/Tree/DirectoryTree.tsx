import classNames from 'classnames';
import * as React from 'react';
import RcTree from './RCTree';

import { Icon } from '../Icon';
import Tree, { AntdTreeNodeAttribute, TreeProps } from './Tree';
import { BasicDataNode, DataNode, EventDataNode, Key } from './typings';
import { conductExpandParent } from './util';
import { calcRangeKeys, convertDirectoryKeysToNodes } from './utils/dictUtil';
import { convertDataToEntities, convertTreeToData } from './utils/treeUtil';

export type ExpandAction = false | 'click' | 'doubleClick';

export interface DirectoryTreeProps<T extends BasicDataNode = DataNode> extends TreeProps<T> {
    expandAction?: ExpandAction;
}

type DirectoryTreeCompoundedComponent = (<T extends BasicDataNode | DataNode = DataNode>(
    props: React.PropsWithChildren<DirectoryTreeProps<T>> & React.RefAttributes<RcTree>,
) => React.ReactElement) &
    Pick<React.FC, 'displayName'>;

export interface DirectoryTreeState {
    expandedKeys?: Key[];
    selectedKeys?: Key[];
}

function getIcon(props: AntdTreeNodeAttribute): React.ReactNode {
    const { isLeaf, expanded } = props;
    if (isLeaf) {
        return <Icon name="file-lines" prefix="far" />;
    }
    return expanded ? <Icon name="folder-open" prefix="far" /> : <Icon name="folder-closed" prefix="fas" />;
}

function getTreeData({ treeData, children }: DirectoryTreeProps) {
    return treeData || convertTreeToData(children);
}

const DirectoryTree: React.ForwardRefRenderFunction<RcTree, DirectoryTreeProps> = ({ defaultExpandAll, defaultExpandParent, defaultExpandedKeys, ...props }, ref) => {
    // Shift click usage
    const lastSelectedKey = React.useRef<Key>(null);

    const cachedSelectedKeys = React.useRef<Key[]>(null);

    const getInitExpandedKeys = () => {
        const { keyEntities } = convertDataToEntities(getTreeData(props));

        let initExpandedKeys: Key[];

        // Expanded keys
        if (defaultExpandAll) {
            initExpandedKeys = Object.keys(keyEntities);
        } else if (defaultExpandParent) {
            initExpandedKeys = conductExpandParent(props.expandedKeys || defaultExpandedKeys || [], keyEntities);
        } else {
            initExpandedKeys = props.expandedKeys || defaultExpandedKeys || [];
        }
        return initExpandedKeys;
    };

    const [selectedKeys, setSelectedKeys] = React.useState(props.selectedKeys || props.defaultSelectedKeys || []);
    const [expandedKeys, setExpandedKeys] = React.useState(() => getInitExpandedKeys());

    React.useEffect(() => {
        if ('selectedKeys' in props) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            setSelectedKeys(props.selectedKeys!);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.selectedKeys]);

    React.useEffect(() => {
        if ('expandedKeys' in props) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            setExpandedKeys(props.expandedKeys!);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.expandedKeys]);

    const onExpand = (
        keys: Key[],
        info: {
            node: EventDataNode<any>;
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

    const onSelect = (
        keys: Key[],
        event: {
            event: 'select';
            selected: boolean;
            node: any;
            selectedNodes: DataNode[];
            nativeEvent: MouseEvent;
        },
    ) => {
        const { multiple, fieldNames } = props;
        const { node, nativeEvent } = event;
        const { key = '' } = node;

        const treeData = getTreeData(props);
        // const newState: DirectoryTreeState = {};

        // We need wrap this event since some value is not same
        const newEvent = {
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
            newEvent.selectedNodes = convertDirectoryKeysToNodes(treeData, newSelectedKeys, fieldNames);
        } else if (multiple && shiftPick) {
            // Shift click
            newSelectedKeys = Array.from(
                new Set([
                    ...(cachedSelectedKeys.current || []),
                    ...calcRangeKeys({
                        treeData,
                        expandedKeys,
                        startKey: key,
                        endKey: lastSelectedKey.current!,
                        fieldNames,
                    }),
                ]),
            );
            newEvent.selectedNodes = convertDirectoryKeysToNodes(treeData, newSelectedKeys, fieldNames);
        } else {
            // Single click
            newSelectedKeys = [key];
            lastSelectedKey.current = key;
            cachedSelectedKeys.current = newSelectedKeys;
            newEvent.selectedNodes = convertDirectoryKeysToNodes(treeData, newSelectedKeys, fieldNames);
        }

        props.onSelect?.(newSelectedKeys, newEvent);
        if (!('selectedKeys' in props)) {
            setSelectedKeys(newSelectedKeys);
        }
    };

    const { className, showIcon = true, expandAction = 'click', ...otherProps } = props;

    const prefixCls = 'el-tree';
    const connectClassName = classNames(`${prefixCls}-directory`, className);

    return (
        <Tree
            icon={getIcon}
            ref={ref}
            blockNode
            {...otherProps}
            showIcon={showIcon}
            expandAction={expandAction}
            prefixCls={prefixCls}
            className={connectClassName}
            expandedKeys={expandedKeys}
            selectedKeys={selectedKeys}
            onSelect={onSelect}
            onExpand={onExpand}
        />
    );
};

const ForwardDirectoryTree = React.forwardRef(DirectoryTree) as unknown as DirectoryTreeCompoundedComponent;

if (process.env.NODE_ENV !== 'production') {
    ForwardDirectoryTree.displayName = 'DirectoryTree';
}

export default ForwardDirectoryTree;
