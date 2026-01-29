import { ElTree } from '@qsxy/element-plus-react';
import React from 'react';

interface Tree {
    label: string;
    children?: Tree[];
}

const App = () => {
    const defaultProps = {
        children: 'children',
        label: 'label',
    };

    const data: Tree[] = [
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

    const handleNodeClick = (data: Tree) => {
        console.log(data);
    };

    return <ElTree data={data} props={defaultProps} style={{ maxWidth: 600 }} onNodeClick={handleNodeClick} />;
};

export default App;
