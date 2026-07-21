import type { TreeNode, TreeNodeData, TreeRef, TreeStore } from '@qsxy/element-plus-react';
import { ElButton, ElTree } from '@qsxy/element-plus-react';
import React, { useRef, useState } from 'react';
import './customized-node.scss';

interface Tree {
    id: number;
    label: string;
    children?: Tree[];
}

let id = 1000;

const App = () => {
    const defaultProps = {
        children: 'children',
        label: 'label',
    };

    const treeRef = useRef<TreeRef>(null);

    const append = (data: TreeNodeData) => {
        const newChild = { id: id++, label: 'testtest', children: [] };
        treeRef.current?.append(newChild, data);
    };

    const remove = (node: TreeNode, data: TreeNodeData) => {
        treeRef.current?.remove(data);
    };

    const renderContent = (props: { node: TreeNode; data: TreeNodeData; store: TreeStore }) => {
        const { node, data } = props;
        return (
            <div className="custom-tree-node">
                <span>{node.label}</span>
                <div>
                    <ElButton type="primary" link onClick={() => append(data)}>
                        Append
                    </ElButton>
                    <ElButton style={{ marginLeft: 4 }} type="danger" link onClick={() => remove(node, data)}>
                        Delete
                    </ElButton>
                </div>
            </div>
        );
    };

    const [dataSource] = useState<Tree[]>([
        {
            id: 1,
            label: 'Level one 1',
            children: [
                {
                    id: 4,
                    label: 'Level two 1-1',
                    children: [
                        {
                            id: 9,
                            label: 'Level three 1-1-1',
                        },
                        {
                            id: 10,
                            label: 'Level three 1-1-2',
                        },
                    ],
                },
            ],
        },
        {
            id: 2,
            label: 'Level one 2',
            children: [
                {
                    id: 5,
                    label: 'Level two 2-1',
                },
                {
                    id: 6,
                    label: 'Level two 2-2',
                },
            ],
        },
        {
            id: 3,
            label: 'Level one 3',
            children: [
                {
                    id: 7,
                    label: 'Level two 3-1',
                },
                {
                    id: 8,
                    label: 'Level two 3-2',
                },
            ],
        },
    ]);

    return (
        <ElTree
            ref={treeRef}
            data={dataSource}
            props={defaultProps}
            showCheckbox
            defaultExpandAll
            expandOnClickNode={false}
            style={{ maxWidth: 600 }}
            renderContent={renderContent}
        />
    );
};

export default App;
