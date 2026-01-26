import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useConfigProvider } from '../ConfigProvider/ConfigProviderContext';
import { useClassNames } from '../hooks';
import TreeNode from './TreeNode';
import Node from './model/node';
import TreeStore from './model/tree-store';
import { useDragNodeHandler } from './model/useDragNode';
import { useNodeExpandEventBroadcast } from './model/useNodeExpandEventBroadcast';
import { getNodeKey as getNodeKeyUtil, handleCurrentChange } from './model/util';
import { TreeComponentProps, TreeNodeData, TreeNodeRef } from './typings';

// 创建上下文
const RootTreeContext = React.createContext(null);
const FormItemContext = React.createContext(undefined);

// 主组件
const Tree = (props: TreeComponentProps) => {
    const {
        nodeKey,
        data,
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
        ...restProps
    } = props;

    const { locale } = useConfigProvider();
    const { t } = useTranslation();
    const ns = useClassNames('tree');

    // 初始化 TreeStore
    const [store] = useState(() => {
        const initialStore = new TreeStore({
            key: nodeKey,
            data,
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
        });
        initialStore.initialize();
        return initialStore;
    });

    const root = useMemo(() => store.root, [store.root]);
    // const [currentNode, setCurrentNode] = useState(null);
    const elRef = useRef(null);
    const dropIndicatorRef = useRef(null);
    const instanceRef = useRef({});

    const { broadcastExpanded } = useNodeExpandEventBroadcast(props);

    const { dragState } = useDragNodeHandler({
        props,
        ctx: {},
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
    const isEmpty = useMemo(() => {
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
        value => {
            if (!props.filterNodeMethod) {
                throw new Error('[Tree] filterNodeMethod is required when filter');
            }
            store.filter(value);
        },
        [store, props.filterNodeMethod],
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
        data => {
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
        (leafOnly, includeHalfChecked) => {
            return store.getCheckedNodes(leafOnly, includeHalfChecked);
        },
        [store],
    );

    const getCheckedKeys = useCallback(
        leafOnly => {
            return store.getCheckedKeys(leafOnly);
        },
        [store],
    );

    const getCurrentNode = useCallback(() => {
        const currentNode = store.getCurrentNode();
        return currentNode ? currentNode.data : null;
    }, [store]);

    const getCurrentKey = useCallback(() => {
        requireNodeKey('getCurrentKey');

        const currentNode = getCurrentNode();
        return currentNode ? currentNode[props.nodeKey] : null;
    }, [getCurrentNode, requireNodeKey, props.nodeKey]);

    const setCheckedNodes = useCallback(
        (nodes, leafOnly) => {
            requireNodeKey('setCheckedNodes');
            store.setCheckedNodes(nodes, leafOnly);
        },
        [requireNodeKey, store],
    );

    const setCheckedKeys = useCallback(
        (keys, leafOnly) => {
            requireNodeKey('setCheckedKeys');
            store.setCheckedKeys(keys, leafOnly);
        },
        [requireNodeKey, store],
    );

    const setChecked = useCallback(
        (data, checked, deep) => {
            store.setChecked(data, checked, deep);
        },
        [store],
    );

    const getHalfCheckedNodes = useCallback(() => {
        return store.getHalfCheckedNodes();
    }, [store]);

    const getHalfCheckedKeys = useCallback(() => {
        return store.getHalfCheckedKeys();
    }, [store]);

    const setCurrentNode = useCallback(
        (node, shouldAutoExpandParent = true) => {
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
        data => {
            return store.getNode(data);
        },
        [store],
    );

    const remove = useCallback(
        data => {
            store.remove(data);
        },
        [store],
    );

    const append = useCallback(
        (data, parentNode) => {
            store.append(data, parentNode);
        },
        [store],
    );

    const insertBefore = useCallback(
        (data, refNode) => {
            store.insertBefore(data, refNode);
        },
        [store],
    );

    const insertAfter = useCallback(
        (data, refNode) => {
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
        (key, data) => {
            requireNodeKey('updateKeyChild');
            store.updateChildren(key, data);
        },
        [requireNodeKey, store],
    );

    // 提供上下文
    const contextValue = useMemo(
        () => ({
            ctx: restProps,
            props,
            store,
            root,
            currentNode,
            instance: instanceRef.current,
        }),
        [restProps, props, store, root, currentNode],
    );

    // 渲染函数
    const renderTreeNodes = () => {
        if (isEmpty) {
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
        <RootTreeContext.Provider value={contextValue}>
            <FormItemContext.Provider value={undefined}>
                <div
                    ref={elRef}
                    className={classNames([
                        ns.b(),
                        ns.is('dragging', !!dragState.draggingNode),
                        ns.is('drop-not-allow', !dragState.allowDrop),
                        ns.is('drop-inner', dragState.dropType === 'inner'),
                        { [ns.m('highlight-current')]: highlightCurrent },
                    ])}
                    role="tree"
                >
                    {renderTreeNodes()}
                    <div style={{ display: dragState.showDropIndicator ? 'block' : 'none' }} ref={dropIndicatorRef} className={ns.e('drop-indicator')} />
                </div>
            </FormItemContext.Provider>
        </RootTreeContext.Provider>
    );
};

// 自定义 Hook 用于获取树上下文
const useTreeContext = () => {
    const context = useContext(RootTreeContext);
    if (!context) {
        throw new Error('useTreeContext must be used within a Tree component');
    }
    return context;
};

export { Tree, useTreeContext };
