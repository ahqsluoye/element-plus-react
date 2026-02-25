import { ElInputNumber } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return <ElInputNumber defaultValue={1} precision={2} step={0.1} max={30} style={{ width: 200 }} />;
};

export default App;
