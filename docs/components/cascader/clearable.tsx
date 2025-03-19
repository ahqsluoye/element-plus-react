import { ElCascader } from '@qsxy/element-plus-react';
import React from 'react';
import { options1 } from './data';

const App = () => {
    return <ElCascader filterable options={options1} style={{ width: 300 }} />;
};

export default App;
