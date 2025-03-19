/* eslint-disable no-console */
import { ElDirectoryTree } from '@parker/element-plus-react';
import React from 'react';
import { Demo2 } from './treeData';

const App = () => {
    return (
        <ElDirectoryTree
            treeData={Demo2}
            showIcon={false}
            checkable
            onCheck={(checkedKeys: string[], info: any) => {
                console.log('onCheck', checkedKeys, info);
            }}
        />
    );
};

export default App;
