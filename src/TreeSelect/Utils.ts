import { DataNode } from '../Tree';

/** 单选不可选父级 */
export const parentNotSelectable = (treeData: DataNode[] = []) => {
    return treeData.map(node => {
        if (node?.children?.length > 0) {
            node.children = parentNotSelectable(node.children);
            return {
                ...node,
                selectable: false,
            };
        }
        return node;
    });
};
