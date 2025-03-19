import { ElTreeSelect } from '@parker/element-plus-react';
import cloneDeep from 'lodash/cloneDeep';
import React from 'react';
import { Demo1 } from '../tree/treeData';

const App = () => {
    return <ElTreeSelect treeData={cloneDeep(Demo1)} checkStrictly style={{ width: 200 }} />;
};

export default App;
