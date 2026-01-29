import { ElTree, TreeNodeData } from '@qsxy/element-plus-react';
import React from 'react';
import './custom-node-class.scss';

interface Tree {
    id: number;
    label: string;
    isPenultimate?: boolean;
    children?: Tree[];
}

const App = () => {
    const customNodeClass = ({ isPenultimate }: TreeNodeData) => (isPenultimate ? 'is-penultimate' : '');

    const defaultProps = {
        class: customNodeClass,
    };

    const data: Tree[] = [
        {
            id: 1,
            label: 'Level one 1',
            children: [
                {
                    id: 4,
                    label: 'Level two 1-1',
                    isPenultimate: true,
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
            isPenultimate: true,
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
            isPenultimate: true,
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
    ];

    const handleNodeClick = (data: Tree) => {
        console.log(data);
    };

    return <ElTree data={data} props={defaultProps} showCheckbox nodeKey="id" defaultExpandAll expandOnClickNode={false} style={{ maxWidth: 600 }} onNodeClick={handleNodeClick} />;
};

export default App;
