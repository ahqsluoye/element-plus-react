import { useClassNames } from '@qsxy/element-plus-react/hooks';
import { addClass, removeClass } from 'dom-lib';
import React, { useCallback, useRef } from 'react';
import { isFunction } from '../../Util';
import { AllowDragFunction, AllowDropFunction, FakeNode, NodeDropType } from '../typings';
import type Node from './node';
import type TreeStore from './tree-store';

export interface TreeNode {
    node: Node;
    $el?: HTMLElement;
}

export interface DragOptions {
    event: React.DragEvent<HTMLDivElement>;
    treeNode: TreeNode;
}

interface Props {
    props: {
        allowDrag?: AllowDragFunction;
        allowDrop?: AllowDropFunction;
        onNodeDragStart?: (node: Node, event: React.DragEvent<HTMLDivElement>) => void;
        onNodeDragEnter?: (dragNode: Node, dropNode: Node, event: React.DragEvent<HTMLDivElement>) => void;
        onNodeDragLeave?: (dragNode: Node, dropNode: Node, event: React.DragEvent<HTMLDivElement>) => void;
        onNodeDragOver?: (dragNode: Node, dropNode: Node, event: React.DragEvent<HTMLDivElement>) => void;
        onNodeDragEnd?: (dragNode: Node, dropNode: Node, dropType: NodeDropType, event: React.DragEvent<HTMLDivElement>) => void;
        onNodeDrop?: (dragNode: Node, dropNode: Node, dropType: NodeDropType, event: React.DragEvent<HTMLDivElement>) => void;
    };
    elRef: React.RefObject<HTMLElement>;
    dropIndicatorRef: React.RefObject<HTMLElement>;
    store: TreeStore;
}

export interface DragEvents {
    treeNodeDragStart: (options: DragOptions) => void;
    treeNodeDragOver: (options: DragOptions) => void;
    treeNodeDragEnd: (event: React.DragEvent<HTMLDivElement>) => void;
}

export const dragEventsKey = Symbol('dragEvents');

interface DragState {
    allowDrop: boolean;
    dropType: NodeDropType | null;
    draggingNode: TreeNode | null;
    showDropIndicator: boolean;
    dropNode: TreeNode | null;
}

export function useDragNodeHandler({ props, elRef, dropIndicatorRef, store }: Props) {
    const ns = useClassNames('tree');
    const { allowDrag, allowDrop, onNodeDragStart, onNodeDragEnter, onNodeDragLeave, onNodeDragOver, onNodeDragEnd, onNodeDrop } = props;

    // const [dragState, setDragState] = useState<{
    //     allowDrop: boolean;
    //     dropType: NodeDropType | null;
    //     draggingNode: TreeNode | null;
    //     showDropIndicator: boolean;
    //     dropNode: TreeNode | null;
    // }>({
    //     showDropIndicator: false,
    //     draggingNode: null,
    //     dropNode: null,
    //     allowDrop: true,
    //     dropType: null,
    // });

    // 使用ref来保存最新的dragState值
    const dragStateRef = useRef<DragState>({
        showDropIndicator: false,
        draggingNode: null,
        dropNode: null,
        allowDrop: true,
        dropType: null,
    });
    // dragStateRef.current = dragState;

    const setDragState = useCallback(
        (fn: (prev: DragState) => DragState) => {
            dragStateRef.current = fn(dragStateRef.current);
            if (!dragStateRef.current.allowDrop) {
                elRef.current.classList.add(ns.is('drop-not-allow'));
            } else {
                elRef.current.classList.remove(ns.is('drop-not-allow'));
            }
            if (dragStateRef.current.dropType === 'inner') {
                elRef.current.classList.add(ns.is('drop-inner'));
            } else {
                elRef.current.classList.remove(ns.is('drop-inner'));
            }
        },
        [elRef, ns],
    );

    const treeNodeDragStart = useCallback(
        ({ event, treeNode }: DragOptions) => {
            if (!event.dataTransfer) {
                return;
            }
            if (isFunction(allowDrag) && !allowDrag(treeNode.node)) {
                event.preventDefault();
                return false;
            }
            event.dataTransfer.effectAllowed = 'move';

            // wrap in try catch to address IE's error when first param is 'text/plain'
            try {
                // setData is required for draggable to work in FireFox
                // the content has to be '' so dragging a node out of the tree won't open a new tab in FireFox
                event.dataTransfer.setData('text/plain', '');
            } catch {
                //
            }

            setDragState(prev => ({
                ...prev,
                draggingNode: treeNode,
            }));
            elRef.current.classList.add(ns.is('dragging'));

            onNodeDragStart?.(treeNode.node, event);
        },
        [allowDrag, elRef, ns, onNodeDragStart, setDragState],
    );

    const treeNodeDragOver = useCallback(
        ({ event, treeNode }: DragOptions) => {
            if (!event.dataTransfer) {
                return;
            }
            const dropNode = treeNode;
            const oldDropNode = dragStateRef.current.dropNode;
            if (oldDropNode && oldDropNode.node.id !== dropNode.node.id && oldDropNode.$el) {
                removeClass(oldDropNode.$el, ns.is('drop-inner'));
            }
            const draggingNode = dragStateRef.current.draggingNode;
            if (!draggingNode || !dropNode) {
                return;
            }

            let dropPrev = true;
            let dropInner = true;
            let dropNext = true;
            let userAllowDropInner = true;
            if (isFunction(allowDrop)) {
                dropPrev = allowDrop(draggingNode.node, dropNode.node, 'prev');
                userAllowDropInner = dropInner = allowDrop(draggingNode.node, dropNode.node, 'inner');
                dropNext = allowDrop(draggingNode.node, dropNode.node, 'next');
            }
            event.dataTransfer.dropEffect = dropInner || dropPrev || dropNext ? 'move' : 'none';
            if ((dropPrev || dropInner || dropNext) && oldDropNode?.node.id !== dropNode.node.id) {
                if (oldDropNode) {
                    onNodeDragLeave?.(draggingNode.node, oldDropNode.node, event);
                }
                onNodeDragEnter?.(draggingNode.node, dropNode.node, event);
            }

            if (dropPrev || dropInner || dropNext) {
                setDragState(prev => ({
                    ...prev,
                    dropNode: dropNode,
                }));
            } else {
                // Reset dragState.value.dropNode to null when allowDrop is transfer from true to false.(For issue #14704)
                setDragState(prev => ({
                    ...prev,
                    dropNode: null,
                }));
            }

            if (dropNode.node.nextSibling === draggingNode.node) {
                dropNext = false;
            }
            if (dropNode.node.previousSibling === draggingNode.node) {
                dropPrev = false;
            }
            if (dropNode.node.contains(draggingNode.node, false)) {
                dropInner = false;
            }
            if (draggingNode.node === dropNode.node || draggingNode.node.contains(dropNode.node)) {
                dropPrev = false;
                dropInner = false;
                dropNext = false;
            }
            const dropEl = dropNode.$el;

            // find target node without children, just calc content node height
            const targetPosition = dropEl.querySelector(`.${ns.be('node', 'content')}`).getBoundingClientRect();
            const treePosition = elRef.current.getBoundingClientRect();
            const treeScrollTop = elRef.current.scrollTop;
            let dropType: NodeDropType;

            const getPrevPercent = () => {
                if (!dropPrev) {
                    return Number.NEGATIVE_INFINITY;
                }
                if (dropInner) {
                    return 0.25;
                }
                if (dropNext) {
                    return 0.45;
                }
                return 1;
            };

            const getNextPercent = () => {
                if (!dropNext) {
                    return Number.POSITIVE_INFINITY;
                }
                if (dropInner) {
                    return 0.75;
                }
                if (dropPrev) {
                    return 0.55;
                }
                return 0;
            };
            const prevPercent = getPrevPercent();
            const nextPercent = getNextPercent();

            let indicatorTop = -9999;
            const distance = event.clientY - targetPosition.top;
            if (distance < targetPosition.height * prevPercent) {
                dropType = 'before';
            } else if (distance > targetPosition.height * nextPercent) {
                dropType = 'after';
            } else if (dropInner) {
                dropType = 'inner';
            } else {
                dropType = 'none';
            }

            const iconPosition = dropEl.querySelector(`.${ns.be('node', 'expand-icon')}`).getBoundingClientRect();
            const dropIndicator = dropIndicatorRef.current;
            if (dropType === 'before') {
                indicatorTop = iconPosition.top - treePosition.top + treeScrollTop;
            } else if (dropType === 'after') {
                indicatorTop = iconPosition.bottom - treePosition.top + treeScrollTop;
            }
            dropIndicator.style.top = `${indicatorTop}px`;
            dropIndicator.style.left = `${iconPosition.right - treePosition.left}px`;

            if (dropType === 'inner') {
                addClass(dropEl, ns.is('drop-inner'));
            } else {
                removeClass(dropEl, ns.is('drop-inner'));
            }

            const showDropIndicator = dropType === 'before' || dropType === 'after';
            dropIndicatorRef.current.style.display = showDropIndicator ? 'block' : 'none';
            const _allowDrop = showDropIndicator || userAllowDropInner;
            const newDragState = {
                showDropIndicator,
                allowDrop: _allowDrop,
                dropType,
            };

            setDragState(prev => ({
                ...prev,
                ...newDragState,
            }));

            onNodeDragOver?.(draggingNode.node, dropNode.node, event);
        },
        [allowDrop, ns, elRef, dropIndicatorRef, setDragState, onNodeDragOver, onNodeDragEnter, onNodeDragLeave],
    );

    const treeNodeDragEnd = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            const currentDragState = dragStateRef.current;
            const { draggingNode, dropType, dropNode } = currentDragState;
            event.preventDefault();

            // https://bugzilla.mozilla.org/show_bug.cgi?id=1911486
            if (event.dataTransfer) {
                event.dataTransfer.dropEffect = 'move';
            }

            if (draggingNode?.node.data && dropNode) {
                const draggingNodeCopy: FakeNode = { data: draggingNode.node.data };
                if (dropType !== 'none') {
                    draggingNode.node.remove();
                }
                if (dropType === 'before') {
                    dropNode.node.parent?.insertBefore(draggingNodeCopy, dropNode.node);
                } else if (dropType === 'after') {
                    dropNode.node.parent?.insertAfter(draggingNodeCopy, dropNode.node);
                } else if (dropType === 'inner') {
                    dropNode.node.insertChild(draggingNodeCopy);
                }
                if (dropType !== 'none') {
                    store.registerNode(draggingNodeCopy as any);
                    if (store.key) {
                        //restore checkbox state after dragging
                        draggingNode.node.eachNode(node => {
                            store?.nodesMap[node.data[store?.key]]?.setChecked(node.checked, !store?.checkStrictly);
                        });
                    }
                }

                removeClass(dropNode.$el, ns.is('drop-inner'));

                onNodeDragEnd?.(draggingNode.node, dropNode.node, dropType, event);
                if (dropType !== 'none') {
                    onNodeDrop?.(draggingNode.node, dropNode.node, dropType, event);
                }
            }
            if (draggingNode && !dropNode) {
                onNodeDragEnd?.(draggingNode.node, null, dropType, event);
            }

            // setDragState({
            //     showDropIndicator: false,
            //     draggingNode: null,
            //     dropNode: null,
            //     allowDrop: true,
            //     dropType: null,
            // });
            dropIndicatorRef.current.style.display = 'none';
            elRef.current.classList.remove(ns.is('dragging'));
            elRef.current.classList.remove(ns.is('drop-not-allow'));
            elRef.current.classList.remove(ns.is('drop-inner'));

            dragStateRef.current = {
                showDropIndicator: false,
                draggingNode: null,
                dropNode: null,
                allowDrop: true,
                dropType: null,
            };
        },
        [dropIndicatorRef, elRef, ns, onNodeDragEnd, onNodeDrop, store],
    );

    return {
        treeNodeDragStart,
        treeNodeDragOver,
        treeNodeDragEnd,
    };
}
