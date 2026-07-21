import type { FilterNodeMethodFunction, TreeRef } from '@qsxy/element-plus-react';
import { ElInput, ElTree } from '@qsxy/element-plus-react';
import React, { useRef } from 'react';

interface Tree {
    [key: string]: any;
}

const App = () => {
    const defaultProps = {
        children: 'children',
        label: 'label',
    };

    const treeRef = useRef<TreeRef>(null);

    const filterNode: FilterNodeMethodFunction = (value: string, data: Tree) => {
        if (!value) return true;
        return data.label.includes(value);
    };

    const data: Tree[] = [
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

    return (
        <>
            <ElInput placeholder="请输入内容" onChange={val => treeRef.current?.filter(val)} style={{ width: '15rem', marginBottom: '1rem' }} />
            <ElTree ref={treeRef} data={data} props={defaultProps} defaultExpandAll filterNodeMethod={filterNode} style={{ maxWidth: 600 }} />
        </>
    );
};

export default App;
