import { ElTreeSelect, generateTree } from '@parker/element-plus-react';
import cloneDeep from 'lodash/cloneDeep';
import React, { useMemo } from 'react';
import { Demo4, Demo5 } from '../tree/treeData';

const App = () => {
    const data = useMemo(() => generateTree(cloneDeep(Demo5), '0', { idKey: 'pkid', parentIdKey: 'parentId' }), []);

    return (
        <>
            <ElTreeSelect
                treeData={cloneDeep(Demo4)}
                filterable
                checkStrictly={false}
                fieldNames={{ key: 'nodeid', title: 'text', children: 'children' }}
                placeholder="请选择数据集"
                style={{ width: 350, marginRight: 20 }}
            />
            <ElTreeSelect
                treeData={data}
                filterable
                checkStrictly={false}
                fieldNames={{ key: 'pkid', title: 'typeName', children: 'children' }}
                placeholder="请选择数据集"
                style={{ width: 350 }}
            />
        </>
    );
};

export default App;
