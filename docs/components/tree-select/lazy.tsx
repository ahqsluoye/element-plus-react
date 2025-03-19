import { ElTreeSelect } from '@qsxy/element-plus-react';
import cloneDeep from 'lodash/cloneDeep';
import React, { useLayoutEffect, useState } from 'react';
import { Demo1 } from '../tree/treeData';

const App = () => {
    const [treeData, setTreeData] = useState([]);

    useLayoutEffect(() => {
        setTimeout(() => {
            setTreeData(cloneDeep(Demo1));
        }, 3000);
    }, []);

    return <ElTreeSelect treeData={treeData} checkStrictly={false} defaultValue={'0-0-0'} style={{ width: 200 }} />;
};

export default App;
