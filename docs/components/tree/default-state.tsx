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
    const data = [
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
    ];

    return <ElTree data={data} props={defaultProps} nodeKey="id" showCheckbox defaultExpandedKeys={[2, 3]} defaultCheckedKeys={[5]} style={{ maxWidth: 600 }} />;
};

export default App;
