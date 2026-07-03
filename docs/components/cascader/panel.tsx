import { ElCascaderPanel } from '@qsxy/element-plus-react';
import React from 'react';
import { options1 } from './data';

const App = () => {
    return <ElCascaderPanel options={options1} filterable style={{ width: 300 }} />;
};

export default App;
