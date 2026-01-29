import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useConfigProvider } from '../ConfigProvider/ConfigProviderContext';
import { mergeDefaultProps } from '../Util';
import { useClassNames, useForceUpdate } from '../hooks';
import { DragEventsContext, TreeContext, TreeNodeExpandContext } from './TreeContext';
import TreeNode from './TreeNode';
import Node from './model/node';
import TreeStore from './model/tree-store';
import { useDragNodeHandler } from './model/useDragNode';
import { useNodeExpandEventBroadcast } from './model/useNodeExpandEventBroadcast';
import { getNodeKey as getNodeKeyUtil, handleCurrentChange } from './model/util';
import { TreeData, TreeKey, TreeNodeData, TreeNodeRef, TreeProps, TreeRef } from './typings';

// 主组件
const Tree = forwardRef<TreeRef, TreeProps>((props, ref) => {
    props = mergeDefaultProps(
        {
            renderAfterExpand: true,
            expandOnClickNode: true,
            checkOnClickLeaf: true,
            autoExpandParent: true,
            indent: 18,
            props: {
                children: 'children',
                label: 'label',
                disabled: 'disabled',
                isLeaf: 'isLeaf',
                class: null,
            },
        },
        props,
    );
    const {
        nodeKey,
        data: tableData,
        lazy,
        props: treeProps,
        load,
        currentNodeKey,
        checkStrictly,
        checkDescendants,
        defaultCheckedKeys,
        defaultExpandedKeys,
        autoExpandParent,
        defaultExpandAll,
        filterNodeMethod,
        accordion,
        renderAfterExpand,
        showCheckbox,
        renderContent,
        highlightCurrent,
        emptyText,
        renderEmpty,
        onNodeExpand,
    } = props;

    const { locale } = useConfigProvider();
    const { t } = useTranslation();
    const ns = useClassNames('tree');
    const { forceUpdate } = useForceUpdate();

    // 初始化 TreeStore
    const [store] = useState(() => {
        const initialStore = new TreeStore({
            key: nodeKey,
            data: tableData,
            lazy,
            props: treeProps,
            load,
            currentNodeKey: currentNodeKey || null,
            checkStrictly,
            checkDescendants,
            defaultCheckedKeys: defaultCheckedKeys || [],
            defaultExpandedKeys: defaultExpandedKeys || [],
            autoExpandParent,
            defaultExpandAll,
            filterNodeMethod,
            forceUpdate,
        });
        initialStore.initialize();
        return initialStore;
    });

    const root = useMemo(() => store.root, [store.root]);
    // const [currentNode, setCurNode] = useState<Node>(null);
    const elRef = useRef(null);
    const dropIndicatorRef = useRef(null);

    const { broadcastExpanded, parentNodeMap } = useNodeExpandEventBroadcast(props);

    const { dragState, ...dragEvents } = useDragNodeHandler({
        props,
        elRef,
        dropIndicatorRef,
        store,
    });

    // useKeydown(elRef, store);

    // 检查是否为选择树
    const isSelectTree = useMemo(() => {
        // let parent = instanceRef.current?.parent;
        // while (parent) {
        //     if (parent.type?.name === 'ElTreeSelect') {
        //         return true;
        //     }
        //     parent = parent.parent;
        // }
        return false;
    }, []);

    // 判断是否为空
    const isEmpty = useCallback(() => {
        const { childNodes } = root;
        return (!childNodes || childNodes.length === 0 || childNodes.every(({ visible }) => !visible)) && !isSelectTree;
    }, [root, isSelectTree]);

    // 监听属性变化 - currentNodeKey
    useEffect(() => {
        store.setCurrentNodeKey(currentNodeKey || null);
    }, [currentNodeKey, store]);

    // 监听属性变化 - defaultCheckedKeys
    useEffect(() => {
        if (!isEqual(props.defaultCheckedKeys, prevDefaultCheckedKeysRef.current)) {
            store.setDefaultCheckedKey(props.defaultCheckedKeys || []);
        }
        prevDefaultCheckedKeysRef.current = props.defaultCheckedKeys;
    }, [props.defaultCheckedKeys, store]);

    // 监听属性变化 - defaultExpandedKeys
    useEffect(() => {
        store.setDefaultExpandedKeys(props.defaultExpandedKeys || []);
    }, [props.defaultExpandedKeys, store]);

    // 监听属性变化 - data
    useEffect(() => {
        store.setData(props.data);
    }, [props.data, store]);

    // 监听属性变化 - checkStrictly
    useEffect(() => {
        store.checkStrictly = props.checkStrictly;
    }, [props.checkStrictly, store]);

    // 保存前一个值的 ref
    const prevDefaultCheckedKeysRef = useRef(props.defaultCheckedKeys);

    // 方法定义
    const filter = useCallback(
        (value: string) => {
            if (!props.filterNodeMethod) {
                throw new Error('[Tree] filterNodeMethod is required when filter');
            }
            store.filter(value);
        },
        [props.filterNodeMethod, store],
    );

    const getNodeKey = useCallback(
        node => {
            return getNodeKeyUtil(props.nodeKey, node.data);
        },
        [props.nodeKey],
    );

    const requireNodeKey = useCallback(
        methodName => {
            if (!props.nodeKey) {
                throw new Error(`[Tree] nodeKey is required in ${methodName}`);
            }
        },
        [props.nodeKey],
    );

    const getNodePath = useCallback(
        (data: TreeKey | TreeNodeData | Node) => {
            requireNodeKey('getNodePath');

            const node = store.getNode(data);
            if (!node) {
                return [];
            }
            const path = [node.data];
            let parent = node.parent;
            while (parent && parent !== root) {
                path.push(parent.data);
                parent = parent.parent;
            }
            return path.reverse();
        },
        [requireNodeKey, store, root],
    );

    const getCheckedNodes = useCallback(
        (leafOnly?: boolean, includeHalfChecked?: boolean) => {
            return store.getCheckedNodes(leafOnly, includeHalfChecked);
        },
        [store],
    );

    const getCheckedKeys = useCallback(
        (leafOnly?: boolean) => {
            return store.getCheckedKeys(leafOnly);
        },
        [store],
    );

    const getCurrentNode = useCallback(() => {
        const curNode = store.getCurrentNode();
        return curNode ? curNode.data : null;
    }, [store]);

    const getCurrentKey = useCallback(() => {
        requireNodeKey('getCurrentKey');

        const curNode = getCurrentNode();
        return curNode ? curNode[props.nodeKey] : null;
    }, [getCurrentNode, requireNodeKey, props.nodeKey]);

    const setCheckedNodes = useCallback(
        (nodes: Node[], leafOnly?: boolean) => {
            requireNodeKey('setCheckedNodes');
            store.setCheckedNodes(nodes, leafOnly);
            forceUpdate();
        },
        [forceUpdate, requireNodeKey, store],
    );

    const setCheckedKeys = useCallback(
        (keys: TreeKey[], leafOnly?: boolean) => {
            requireNodeKey('setCheckedKeys');
            store.setCheckedKeys(keys, leafOnly);
            forceUpdate();
        },
        [forceUpdate, requireNodeKey, store],
    );

    const setChecked = useCallback(
        (data: TreeKey | TreeNodeData, checked: boolean, deep: boolean) => {
            store.setChecked(data, checked, deep);
            forceUpdate();
        },
        [forceUpdate, store],
    );

    const getHalfCheckedNodes = useCallback(() => {
        return store.getHalfCheckedNodes();
    }, [store]);

    const getHalfCheckedKeys = useCallback(() => {
        return store.getHalfCheckedKeys();
    }, [store]);

    const setCurrentNode = useCallback(
        (node: Node, shouldAutoExpandParent = true) => {
            requireNodeKey('setCurrentNode');

            handleCurrentChange(
                store,
                (event, ...args) => {
                    // 触发事件回调
                    props[event]?.(...args);
                },
                () => {
                    broadcastExpanded(node);
                    store.setUserCurrentNode(node, shouldAutoExpandParent);
                },
            );
        },
        [broadcastExpanded, requireNodeKey, store, props],
    );

    const setCurrentKey = useCallback(
        (key = null, shouldAutoExpandParent = true) => {
            requireNodeKey('setCurrentKey');

            handleCurrentChange(
                store,
                (event, ...args) => {
                    // 触发事件回调
                    props[event]?.(...args);
                },
                () => {
                    broadcastExpanded();
                    store.setCurrentNodeKey(key, shouldAutoExpandParent);
                },
            );
        },
        [broadcastExpanded, requireNodeKey, store, props],
    );

    const getNode = useCallback(
        (data: TreeKey | TreeNodeData | Node) => {
            return store.getNode(data);
        },
        [store],
    );

    const remove = useCallback(
        (data: TreeNodeData | Node) => {
            store.remove(data);
        },
        [store],
    );

    const append = useCallback(
        (data: TreeNodeData, parentNode: TreeNodeData | TreeKey | Node) => {
            store.append(data, parentNode);
        },
        [store],
    );

    const insertBefore = useCallback(
        (data: TreeNodeData, refNode: TreeKey | TreeNodeData | Node) => {
            store.insertBefore(data, refNode);
        },
        [store],
    );

    const insertAfter = useCallback(
        (data: TreeNodeData, refNode: TreeKey | TreeNodeData | Node) => {
            store.insertAfter(data, refNode);
        },
        [store],
    );

    const handleNodeExpand = useCallback(
        (nodeData: TreeNodeData, node: Node, instance: TreeNodeRef) => {
            broadcastExpanded(node);
            onNodeExpand?.(nodeData, node, instance);
        },
        [broadcastExpanded, onNodeExpand],
    );

    const updateKeyChildren = useCallback(
        (key: TreeKey, data: TreeData) => {
            requireNodeKey('updateKeyChild');
            store.updateChildren(key, data);
        },
        [requireNodeKey, store],
    );

    useImperativeHandle(ref, () => ({
        filter,
        getNodeKey,
        getNode,
        getCheckedNodes,
        getCheckedKeys,
        getHalfCheckedNodes,
        getHalfCheckedKeys,
        getCurrentNode,
        getCurrentKey,
        setCurrentNode,
        setCurrentKey,
        remove,
        append,
        insertBefore,
        insertAfter,
        updateKeyChildren,
        getNodePath,
        setCheckedNodes,
        setCheckedKeys,
        setChecked,
    }));

    // 提供上下文
    const contextValue = useMemo(
        () => ({
            // ctx: { emit: noop },
            props,
            store,
            // storeRef,
            // actions,
            root,
            forceUpdate,
            // currentNode,
            // setCurrentNode: setCurNode,
        }),
        [props, store, root, forceUpdate],
    );

    // 渲染函数
    const renderTreeNodes = () => {
        if (isEmpty()) {
            return (
                <div className={ns.e('empty-block')}>
                    {renderEmpty ? renderEmpty() : <span className={ns.e('empty-text')}>{emptyText || t('el.tree.emptyText', { lng: locale })}</span>}
                </div>
            );
        }

        return root.childNodes.map(child => (
            <TreeNode
                key={getNodeKey(child)}
                node={child}
                props={treeProps}
                accordion={accordion}
                renderAfterExpand={renderAfterExpand}
                showCheckbox={showCheckbox}
                renderContent={renderContent}
                onNodeExpand={handleNodeExpand}
            />
        ));
    };

    return (
        <TreeContext.Provider value={contextValue}>
            <DragEventsContext.Provider value={dragEvents}>
                <TreeNodeExpandContext.Provider value={{ parentNodeMap }}>
                    <div
                        ref={elRef}
                        className={classNames(
                            ns.b(),
                            ns.is({ dragging: !!dragState.draggingNode, 'drop-not-allow': !dragState.allowDrop, 'drop-inner': dragState.dropType === 'inner' }),
                            { [ns.m('highlight-current')]: highlightCurrent },
                            props.className,
                        )}
                        style={props.style}
                        role="tree"
                    >
                        {renderTreeNodes()}
                        <div style={{ display: dragState.showDropIndicator ? 'block' : 'none' }} ref={dropIndicatorRef} className={ns.e('drop-indicator')} />
                    </div>
                </TreeNodeExpandContext.Provider>
            </DragEventsContext.Provider>
        </TreeContext.Provider>
    );
});

Tree.displayName = 'ElTree';
export default Tree;
