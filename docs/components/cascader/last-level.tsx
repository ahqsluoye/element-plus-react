import { ElCascader } from '@qsxy/element-plus-react';
import React from 'react';
import { options1 } from './data';

const App = () => {
    return <ElCascader options={options1} showAllLevels={false} style={{ width: 300 }} />;
};

export default App;
