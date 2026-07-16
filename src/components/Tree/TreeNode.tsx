import Checkbox from '@qsxy/element-plus-react/Checkbox/Checkbox';
import Icon from '@qsxy/element-plus-react/Icon/Icon';
import Transition from '@qsxy/element-plus-react/Transition/Transition';
import { isFunction, isString } from '@qsxy/element-plus-react/Util/base';
import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import classNames from 'classnames';
import React, { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { afterEnter, afterLeave, beforeEnter, beforeLeave, onEnter, onLeave } from './CollapseTransition';
import useTreeContext, { TreeNodeExpandContext, useDragEventsContext } from './TreeContext';
import TreeNodeContent from './TreeNodeContent';
import type Node from './model/node';
import { useNodeExpandEventBroadcast } from './model/useNodeExpandEventBroadcast';
import { getNodeKey as getNodeKeyUtil, handleCurrentChange } from './model/util';
import { TreeNodeData, TreeNodeProps, TreeNodeRef } from './typings';

const TreeNode = (props: TreeNodeProps) => {
    const tree = useTreeContext();
    const dragEvents = useDragEventsContext();

    // 状态定义
    const [expanded, setExpanded] = useState(false);
    const [childNodeRendered, setChildNodeRendered] = useState(false);
    const [oldChecked, setOldChecked] = useState(false);
    const [oldIndeterminate, setOldIndeterminate] = useState<boolean>();

    // 引用
    const nodeRef = useRef(null);
    const transitionNodeRef = useRef(null);
    const instanceRef = useRef<TreeNodeRef>(null);

    // 初始化检查
    useEffect(() => {
        setExpanded(props.node.expanded);
        if (props.node.expanded) {
            setChildNodeRendered(true);
        }
    }, [props.node?.expanded]);

    const ns = useClassNames('tree');
    const { broadcastExpanded, parentNodeMap } = useNodeExpandEventBroadcast(props);

    const childrenKey = useMemo(() => tree.props.props['children'] || 'children', [tree.props.props]);
    const children = useMemo(() => props.node?.data?.[childrenKey], [props.node?.data, childrenKey]);

    const handleSelectChange = useCallback(
        (checked: boolean, indeterminate: boolean) => {
            if (oldChecked !== checked || oldIndeterminate !== indeterminate) {
                tree?.props?.onCheckChange?.(props.node?.data, checked, indeterminate);
            }
            setOldChecked(checked);
            setOldIndeterminate(indeterminate);
        },
        [oldChecked, oldIndeterminate, props.node?.data, tree?.props],
    );

    // 监听子节点变化
    useEffect(() => {
        props.node?.updateChildren();
    }, [children]);

    // 监听不确定状态变化
    useEffect(() => {
        handleSelectChange(props.node.checked, props.node.indeterminate);
    }, [props.node.indeterminate, props.node.checked]);

    // 监听选中状态变化
    // useEffect(() => {
    //     if (props.node?.checked !== undefined) {
    //         handleSelectChange(props.node.checked, props.node.indeterminate);
    //     }
    // }, [props.node?.checked]);

    // 监听子节点数量变化
    useEffect(() => {
        props.node?.reInitChecked();
    }, [props.node?.childNodes?.length]);

    // 监听展开状态变化
    useEffect(() => {
        if (props.node?.expanded !== undefined) {
            setExpanded(props.node.expanded);
            if (props.node.expanded) {
                setChildNodeRendered(true);
            }
        }
    }, [props.node?.expanded]);

    // 工具函数
    const getNodeKey = useCallback(
        (node: Node) => {
            return getNodeKeyUtil(tree?.props?.nodeKey, node?.data);
        },
        [tree?.props?.nodeKey],
    );

    const getNodeClass = useCallback(
        (node: Node) => {
            const nodeClassFunc = props.props?.class;
            if (!nodeClassFunc) {
                return {};
            }

            let className;
            if (isFunction(nodeClassFunc)) {
                className = nodeClassFunc(node?.data, node);
            } else {
                className = nodeClassFunc;
            }

            if (isString(className)) {
                return { [className]: true };
            } else {
                return className;
            }
        },
        [props.props?.class],
    );

    const handleExpandIconClick = useCallback(() => {
        if (props.node.isLeaf) {
            return;
        }
        if (expanded) {
            tree.props.onNodeCollapse?.(props.node.data, props.node, instanceRef);
            props.node.collapse();
            tree.forceUpdate();
        } else {
            props.node.expand(() => {
                props.onNodeExpand?.(props.node.data, props.node, instanceRef);
                tree.forceUpdate();
            });
        }
    }, [props, expanded, tree]);

    const handleCheckChange = useCallback(
        value => {
            const checkStrictly = tree?.props.checkStrictly;
            const childNodes = props.node.childNodes;
            if (!checkStrictly && childNodes.length) {
                value = childNodes.some(node => !node.isEffectivelyChecked);
            }
            props.node.setChecked(value, !checkStrictly);
            tree.forceUpdate();

            setTimeout(() => {
                const store = tree.store;
                tree.props.onCheck?.(props.node.data, {
                    checkedNodes: store.getCheckedNodes(),
                    checkedKeys: store.getCheckedKeys(),
                    halfCheckedNodes: store.getHalfCheckedNodes(),
                    halfCheckedKeys: store.getHalfCheckedKeys(),
                });
            }, 0);
        },
        [tree, props.node],
    );

    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            handleCurrentChange(tree.store, tree.props.onCurrentChange, () => {
                const nodeKeyProp = tree?.props?.nodeKey;
                if (nodeKeyProp) {
                    const curNodeKey = getNodeKey(props.node);
                    tree.store.setCurrentNodeKey(curNodeKey);
                } else {
                    tree.store.setCurrentNode(props.node);
                }
            });

            if (tree.props.expandOnClickNode) {
                handleExpandIconClick();
            }

            if ((tree.props.checkOnClickNode || (props.node.isLeaf && tree.props.checkOnClickLeaf && props.showCheckbox)) && !props.node.disabled) {
                handleCheckChange(!props.node.checked);
            }
            tree.props.onNodeClick?.(props.node.data, props.node, instanceRef, e);
            tree.forceUpdate();
        },
        [tree, props.node, props.showCheckbox, getNodeKey, handleExpandIconClick, handleCheckChange],
    );

    const handleContextMenu = useCallback(
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (tree.props?.['onNodeContextmenu']) {
                event.stopPropagation();
                event.preventDefault();
            }
            tree.props.onNodeContextmenu?.(event, props.node.data, props.node, instanceRef);
        },
        [tree, props.node],
    );

    const handleChildNodeExpand = useCallback(
        (nodeData: TreeNodeData, node: Node, instance) => {
            broadcastExpanded(node);
            tree.props.onNodeExpand?.(nodeData, node, instance);
            tree.forceUpdate();
        },
        [broadcastExpanded, tree],
    );

    const handleDragStart = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.stopPropagation();
            if (!tree.props.draggable) {
                return;
            }
            dragEvents.treeNodeDragStart({ event, treeNode: props });
        },
        [tree.props.draggable, dragEvents, props],
    );

    const handleDragOver = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.stopPropagation();
            event.preventDefault();
            if (!tree.props.draggable) {
                return;
            }
            dragEvents.treeNodeDragOver({
                event,
                treeNode: { $el: nodeRef.current, node: props.node },
            });
        },
        [tree.props.draggable, dragEvents, props.node],
    );

    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.stopPropagation();
        event.preventDefault();
    }, []);

    const handleDragEnd = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.stopPropagation();
            if (!tree.props.draggable) {
                return;
            }
            dragEvents.treeNodeDragEnd(event);
            tree.forceUpdate();
        },
        [tree, dragEvents],
    );

    useImperativeHandle(instanceRef, () => ({
        handleExpandIconClick,
    }));
    const contentPaddingLeft = useMemo(() => `${(props.node?.level - 1) * tree.props.indent}px`, [props.node?.level, tree.props.indent]);

    return (
        <TreeNodeExpandContext.Provider value={{ parentNodeMap }}>
            <div
                ref={nodeRef}
                className={classNames([
                    ns.b('node'),
                    ns.is({
                        expanded,
                        current: props.node?.isCurrent,
                        hidden: !props.node?.visible,
                        focusable: !props.node?.disabled,
                        checked: !props.node?.disabled && props.node?.checked,
                    }),
                    getNodeClass(props.node),
                ])}
                role="treeitem"
                tabIndex={-1}
                aria-expanded={expanded}
                aria-disabled={props.node?.disabled}
                aria-checked={props.node?.checked}
                draggable={tree.props.draggable}
                data-key={getNodeKey(props.node)}
                onClick={e => handleClick(e)}
                onContextMenu={handleContextMenu}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
                onDrop={handleDrop}
            >
                <div className={ns.be('node', 'content')} style={{ paddingLeft: contentPaddingLeft }}>
                    <Icon
                        name={tree.props.icon || 'angle-right'}
                        prefix="far"
                        className={classNames([
                            ns.be('node', 'expand-icon'),
                            ns.is({ leaf: props.node?.isLeaf }),
                            {
                                expanded: !props.node?.isLeaf && expanded,
                            },
                        ])}
                        onClick={e => {
                            e.stopPropagation();
                            handleExpandIconClick();
                        }}
                    />

                    {props.showCheckbox && (
                        <Checkbox
                            checked={props.node?.checked}
                            indeterminate={props.node?.indeterminate}
                            disabled={!!props.node?.disabled}
                            onClick={e => e.stopPropagation()}
                            onChange={handleCheckChange}
                        />
                    )}

                    {props.node?.loading && (
                        <span className={classNames([ns.be('node', 'loading-icon'), ns.is('loading')])}>
                            <Icon name="loader" prefix="far" spin />
                        </span>
                    )}

                    <TreeNodeContent node={props.node} renderContent={props.renderContent} />
                </div>

                <Transition
                    nodeRef={transitionNodeRef}
                    name={ns.b('menu-collapse', false)}
                    duration={10}
                    visible={expanded && childNodeRendered}
                    beforeEnter={() => beforeEnter(transitionNodeRef)}
                    onEnter={() => onEnter(transitionNodeRef)}
                    afterEnter={() => afterEnter(transitionNodeRef)}
                    beforeLeave={() => beforeLeave(transitionNodeRef)}
                    onLeave={() => onLeave(transitionNodeRef)}
                    afterLeave={() => afterLeave(transitionNodeRef)}
                >
                    {!props.renderAfterExpand || childNodeRendered ? (
                        <div
                            ref={transitionNodeRef}
                            className={classNames(ns.be('node', 'children'), ns.b('collapse-transition', false))}
                            role="group"
                            aria-expanded={expanded}
                            onClick={e => e.stopPropagation()}
                        >
                            {props.node?.childNodes?.map(child => (
                                <TreeNode
                                    key={getNodeKey(child)}
                                    node={child}
                                    props={props.props}
                                    accordion={props.accordion}
                                    renderContent={props.renderContent}
                                    renderAfterExpand={props.renderAfterExpand}
                                    showCheckbox={props.showCheckbox}
                                    onNodeExpand={handleChildNodeExpand}
                                />
                            ))}
                        </div>
                    ) : null}
                </Transition>
            </div>
        </TreeNodeExpandContext.Provider>
    );
};

TreeNode.displayName = 'ElTreeNode';

export default TreeNode;
