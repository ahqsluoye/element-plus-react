import type { AllowDropType, NodeDropType, TreeNode } from '@qsxy/element-plus-react';
import { ElTree } from '@qsxy/element-plus-react';
import React from 'react';

interface Tree {
    label: string;
    children?: Tree[];
}

const App = () => {
    const handleDragStart = (node: TreeNode, ev: DragEvent) => {
        console.log('drag start', node);
    };
    const handleDragEnter = (draggingNode: TreeNode, dropNode: TreeNode, ev: DragEvent) => {
        console.log('tree drag enter:', dropNode.label);
    };
    const handleDragLeave = (draggingNode: TreeNode, dropNode: TreeNode, ev: DragEvent) => {
        console.log('tree drag leave:', dropNode.label);
    };
    const handleDragOver = (draggingNode: TreeNode, dropNode: TreeNode, ev: DragEvent) => {
        console.log('tree drag over:', dropNode.label);
    };
    const handleDragEnd = (draggingNode: TreeNode, dropNode: TreeNode | null, dropType: NodeDropType, ev: DragEvent) => {
        console.log('tree drag end:', dropNode && dropNode.label, dropType);
    };
    const handleDrop = (draggingNode: TreeNode, dropNode: TreeNode, dropType: Exclude<NodeDropType, 'none'>, ev: DragEvent) => {
        console.log('tree drop:', dropNode.label, dropType);
    };
    const allowDrop = (draggingNode: TreeNode, dropNode: TreeNode, type: AllowDropType) => {
        if (dropNode.data.label === 'Level two 3-1') {
            return type !== 'inner';
        } else {
            return true;
        }
    };
    const allowDrag = (draggingNode: TreeNode) => {
        return !draggingNode.data.label.includes('Level three 3-1-1');
    };

    const data = [
        {
            label: 'Level one 1',
            children: [
                {
                    label: 'Level two 1-1',
                    children: [
                        {
                            label: 'Level three 1-1-1',
                        },
                    ],
                },
            ],
        },
        {
            label: 'Level one 2',
            children: [
                {
                    label: 'Level two 2-1',
                    children: [
                        {
                            label: 'Level three 2-1-1',
                        },
                    ],
                },
                {
                    label: 'Level two 2-2',
                    children: [
                        {
                            label: 'Level three 2-2-1',
                        },
                    ],
                },
            ],
        },
        {
            label: 'Level one 3',
            children: [
                {
                    label: 'Level two 3-1',
                    children: [
                        {
                            label: 'Level three 3-1-1',
                        },
                    ],
                },
                {
                    label: 'Level two 3-2',
                    children: [
                        {
                            label: 'Level three 3-2-1',
                        },
                    ],
                },
            ],
        },
    ];

    return (
        <ElTree
            data={data}
            allowDrop={allowDrop}
            allowDrag={allowDrag}
            draggable
            defaultExpandAll
            nodeKey="id"
            onNodeDragStart={handleDragStart}
            onNodeDragEnter={handleDragEnter}
            onNodeDragLeave={handleDragLeave}
            onNodeDragOver={handleDragOver}
            onNodeDragEnd={handleDragEnd}
            onNodeDrop={handleDrop}
            style={{ maxWidth: 600 }}
        />
    );
};

export default App;
