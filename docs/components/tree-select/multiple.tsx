/* eslint-disable no-console */
import { ElTreeSelect } from '@qsxy/element-plus-react';
import cloneDeep from 'lodash/cloneDeep';
import React from 'react';
import { Demo2 } from '../tree/treeData';

const App = () => {
    return <ElTreeSelect treeData={cloneDeep(Demo2)} multiple onChange={(v, l) => console.log(v, l)} style={{ width: 200 }} />;
};

export default App;
