import { RootTreeType, TreeKey, TreeNodeData } from '../typings';
import type Node from './node';

export const NODE_KEY = '$treeNodeId';

export const markNodeData = function (node: Node, data: TreeNodeData | null): void {
    if (!data || data[NODE_KEY]) {
        return;
    }
    Object.defineProperty(data, NODE_KEY, {
        value: node.id,
        enumerable: false,
        configurable: false,
        writable: false,
    });
};

export const getNodeKey = (key: TreeKey | undefined, data: TreeNodeData) => data?.[key || NODE_KEY];

export const handleCurrentChange = (store: RootTreeType['store'], onCurrentChange: (data: TreeNodeData, currentNode: Node) => void, setCurrent: () => void) => {
    const preCurrentNode = store.currentNode;
    setCurrent();
    const currentNode = store.currentNode;
    if (preCurrentNode === currentNode) {
        return;
    }

    onCurrentChange?.(currentNode ? currentNode.data : null, currentNode);
};
