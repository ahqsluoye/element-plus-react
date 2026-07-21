import type { TreeNode, TreeRef } from '@qsxy/element-plus-react';
import { ElButton, ElTree } from '@qsxy/element-plus-react';
import React, { useRef } from 'react';

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

    const treeRef = useRef<TreeRef>(null);

    const getCheckedNodes = () => {
        console.log(treeRef.current.getCheckedNodes(false, false));
    };
    const getCheckedKeys = () => {
        console.log(treeRef.current.getCheckedKeys(false));
    };
    const setCheckedNodes = () => {
        treeRef.current.setCheckedNodes(
            [
                {
                    id: 5,
                    label: 'Level two 2-1',
                },
                {
                    id: 9,
                    label: 'Level three 1-1-1',
                },
            ] as TreeNode[],
            false,
        );
    };
    const setCheckedKeys = () => {
        treeRef.current.setCheckedKeys([3], false);
    };
    const resetChecked = () => {
        treeRef.current.setCheckedKeys([], false);
    };

    return (
        <>
            <ElTree ref={treeRef} data={data} props={defaultProps} nodeKey="id" highlightCurrent defaultExpandAll showCheckbox style={{ maxWidth: 600 }} />
            <div style={{ marginTop: 15 }}>
                <ElButton onClick={getCheckedNodes}>get by node</ElButton>
                <ElButton onClick={getCheckedKeys}>get by key</ElButton>
                <ElButton onClick={setCheckedNodes}>set by node</ElButton>
                <ElButton onClick={setCheckedKeys}>set by key</ElButton>
                <ElButton onClick={resetChecked}>reset</ElButton>
            </div>
        </>
    );
};

export default App;
