import { useRef } from 'react';

import { useTreeNodeExpandContext } from '../TreeContext';
import type Node from './node';

interface NodeMap {
    treeNodeExpand(node?: Node): void;
    children: Set<NodeMap>;
}

interface Props {
    node?: Node;
    accordion?: boolean;
}

export function useNodeExpandEventBroadcast(props: Props) {
    const { parentNodeMap } = useTreeNodeExpandContext();
    // const currentNodeMap = useRef(null);

    const currentNodeMap = useRef<NodeMap>({
        treeNodeExpand: node => {
            if (props.node !== node) {
                props.node?.collapse();
            }
        },
        children: new Set(),
    });

    if (parentNodeMap?.current) {
        parentNodeMap.current.children.add(currentNodeMap.current);
    }
    // useEffect(() => {
    //     // parentNodeMap.current = currentNodeMap.current;

    //     return () => {
    //         if (parentNodeMap?.current) {
    //             parentNodeMap.current.children.delete(currentNodeMap.current);
    //         }
    //         currentNodeMap.current = null;
    //     };
    // });

    return {
        parentNodeMap: currentNodeMap,
        broadcastExpanded: (node?: Node): void => {
            if (!props.accordion) {
                return;
            }
            for (const childNode of currentNodeMap.current.children) {
                childNode.treeNodeExpand(node);
            }
        },
    };
}
