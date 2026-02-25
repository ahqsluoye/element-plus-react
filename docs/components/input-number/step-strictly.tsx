import { ElInputNumber } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return <ElInputNumber defaultValue={2} step={2} stepStrictly style={{ width: 200 }} />;
};

export default App;
