import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { isFunction, isString } from '../Util';
import { useClassNames } from '../hooks';
import useTreeContext from './TreeContext';
import TreeNodeContent from './TreeNodeContent';
import type Node from './model/node';
import { useNodeExpandEventBroadcast } from './model/useNodeExpandEventBroadcast';
import { handleCurrentChange } from './model/util';
import { TreeNodeProps } from './typings';

const TreeNode = (props: TreeNodeProps) => {
    const tree = useTreeContext();
    // const tree = inject<RootTreeType>(ROOT_TREE_INJECTION_KEY)!;
    // const dragEvents = inject(dragEventsKey)!;

    // 状态定义
    const [expanded, setExpanded] = useState(false);
    const [childNodeRendered, setChildNodeRendered] = useState(false);
    const [oldChecked, setOldChecked] = useState(false);
    const [oldIndeterminate, setOldIndeterminate] = useState<boolean>();

    // 引用
    const nodeRef = useRef(null);
    const instanceRef = useRef({});

    // provide(NODE_INSTANCE_INJECTION_KEY, instance);
    // if (!tree) {
    //     debugWarn('Tree', "Can not find node's tree.");
    // }

    // 初始化检查
    useEffect(() => {
        // if (!tree) {
        //     debugWarn('Tree', "Can not find node's tree.");
        // }

        if (props.node?.expanded) {
            setExpanded(true);
            setChildNodeRendered(true);
        }
    }, []);

    const ns = useClassNames('tree');
    const { broadcastExpanded } = useNodeExpandEventBroadcast(props);

    const childrenKey = useMemo(() => tree.props.props['children'] || 'children', [tree.props.props]);
    const children = useMemo(() => props.node?.data?.[childrenKey], [props.node?.data, childrenKey]);

    const handleSelectChange = useCallback(
        (checked: boolean, indeterminate: boolean) => {
            if (oldChecked !== checked || oldIndeterminate !== indeterminate) {
                // tree?.ctx?.emit('check-change', props.node?.data, checked, indeterminate);
            }
            setOldChecked(checked);
            setOldIndeterminate(indeterminate);
        },
        [oldChecked, oldIndeterminate],
    );

    // 监听子节点变化
    useEffect(() => {
        if (children && Array.isArray(children)) {
            props.node?.updateChildren();
        }
    }, [children, props.node, props.node.data, tree.props.props]);

    // 监听不确定状态变化
    useEffect(() => {
        if (props.node?.indeterminate !== undefined) {
            handleSelectChange(props.node.checked, props.node.indeterminate);
        }
    }, [props.node?.indeterminate]);

    // 监听选中状态变化
    useEffect(() => {
        if (props.node?.checked !== undefined) {
            handleSelectChange(props.node.checked, props.node.indeterminate);
        }
    }, [props.node?.checked]);

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

    const handleClick = useCallback(
        e => {
            handleCurrentChange(tree.store, tree.ctx.emit, () => {
                const nodeKeyProp = tree?.props?.nodeKey;
                if (nodeKeyProp) {
                    const curNodeKey = getNodeKey(props.node);
                    tree.store.setCurrentNodeKey(curNodeKey);
                } else {
                    tree.store.setCurrentNode(props.node);
                }
            });
            tree.currentNode = props.node;

            if (tree.props.expandOnClickNode) {
                handleExpandIconClick();
            }

            if ((tree.props.checkOnClickNode || (props.node.isLeaf && tree.props.checkOnClickLeaf && props.showCheckbox)) && !props.node.disabled) {
                handleCheckChange(!props.node.checked);
            }
            tree.ctx.emit('node-click', props.node.data, props.node, instanceRef.current, e);
        },
        [tree, props.node, props.showCheckbox, getNodeKey],
    );

    const handleContextMenu = useCallback(
        event => {
            if (tree.instance.vnode.props?.['onNodeContextmenu']) {
                event.stopPropagation();
                event.preventDefault();
            }
            tree.ctx.emit('node-contextmenu', event, props.node.data, props.node, instanceRef.current);
        },
        [tree, props.node],
    );

    const handleExpandIconClick = useCallback(() => {
        if (props.node.isLeaf) {
            return;
        }
        if (expanded) {
            tree.ctx.emit('node-collapse', props.node.data, props.node, instanceRef.current);
            props.node.collapse();
        } else {
            props.node.expand(() => {
                props.onNodeExpand?.(props.node.data, props.node, instanceRef.current);
            });
        }
    }, [expanded, tree, props.node, props.onNodeExpand]);

    const handleCheckChange = useCallback(
        value => {
            const checkStrictly = tree?.props.checkStrictly;
            const childNodes = props.node.childNodes;
            if (!checkStrictly && childNodes.length) {
                value = childNodes.some(node => !node.isEffectivelyChecked);
            }
            props.node.setChecked(value, !checkStrictly);

            setTimeout(() => {
                const store = tree.store.value;
                tree.ctx.emit('check', props.node.data, {
                    checkedNodes: store.getCheckedNodes(),
                    checkedKeys: store.getCheckedKeys(),
                    halfCheckedNodes: store.getHalfCheckedNodes(),
                    halfCheckedKeys: store.getHalfCheckedKeys(),
                });
            }, 0);
        },
        [tree, props.node],
    );

    const handleChildNodeExpand = useCallback(
        (nodeData, node, instance) => {
            broadcastExpanded(node);
            tree.ctx.emit('node-expand', nodeData, node, instance);
        },
        [broadcastExpanded, tree],
    );

    const handleDragStart = useCallback(
        event => {
            if (!tree.props.draggable) {
                return;
            }
            dragEvents.treeNodeDragStart({ event, treeNode: props });
        },
        [tree.props.draggable, dragEvents, props],
    );

    const handleDragOver = useCallback(
        event => {
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

    const handleDrop = useCallback(event => {
        event.preventDefault();
    }, []);

    const handleDragEnd = useCallback(
        event => {
            if (!tree.props.draggable) {
                return;
            }
            dragEvents.treeNodeDragEnd(event);
        },
        [tree.props.draggable, dragEvents],
    );

    // 渲染子节点
    const renderChildren = useMemo(() => {
        if (!expanded || (!props.renderAfterExpand && !childNodeRendered)) {
            return null;
        }

        return (
            <div className={`${ns.be('node', 'children')}`} role="group" aria-expanded={expanded} onClick={e => e.stopPropagation()}>
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
        );
    }, [expanded, childNodeRendered, props.node?.childNodes, props, ns, getNodeKey, handleChildNodeExpand]);

    // 计算样式
    const nodeClasses = [
        ns.b('node'),
        ns.is('expanded', expanded),
        ns.is('current', props.node?.isCurrent),
        ns.is('hidden', !props.node?.visible),
        ns.is('focusable', !props.node?.disabled),
        ns.is('checked', !props.node?.disabled && props.node?.checked),
        getNodeClass(props.node),
    ]
        .filter(Boolean)
        .join(' ');

    const contentPaddingLeft = `${(props.node?.level - 1) * tree.props.indent}px`;

    return (
        <div
            ref={nodeRef}
            className={nodeClasses}
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
                {tree.props.icon || CaretRight ? (
                    <span
                        className={classNames([
                            ns.be('node', 'expand-icon'),
                            ns.is('leaf', props.node?.isLeaf),
                            {
                                expanded: !props.node?.isLeaf && expanded,
                            },
                        ])}
                        onClick={e => {
                            e.stopPropagation();
                            handleExpandIconClick();
                        }}
                    >
                        {React.createElement(tree.props.icon || CaretRight)}
                    </span>
                ) : null}

                {props.showCheckbox && (
                    <input
                        type="checkbox"
                        checked={props.node?.checked}
                        ref={el => {
                            if (el) {
                                el.indeterminate = props.node?.indeterminate;
                            }
                        }}
                        disabled={!!props.node?.disabled}
                        onClick={e => e.stopPropagation()}
                        onChange={e => handleCheckChange(e.target.checked)}
                    />
                )}

                {props.node?.loading && (
                    <span className={classNames([ns.be('node', 'loading-icon'), ns.is('loading')])}>
                        <Loading />
                    </span>
                )}

                <TreeNodeContent node={props.node} renderContent={props.renderContent} />
            </div>

            {renderChildren}
        </div>
    );
};

export default TreeNode;
