import { ElTreeSelect } from '@qsxy/element-plus-react';
import cloneDeep from 'lodash/cloneDeep';
import React from 'react';
import { Demo1 } from '../tree/treeData';

const App = () => {
    return <ElTreeSelect treeData={cloneDeep(Demo1)} checkStrictly={false} defaultValue={'0-0-0'} onChange={(value, level) => console.log(value, level)} style={{ width: 200 }} />;
};

export default App;
