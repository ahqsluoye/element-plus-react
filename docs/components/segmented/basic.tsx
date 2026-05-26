import { ElSegmented, ElSpace } from '@qsxy/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const options = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const [value, setValue] = useState('Mon');

    return (
        <ElSpace direction="vertical" alignment="left" size={15}>
            <ElSegmented value={value} onChange={setValue} options={options} size="large" />
            <ElSegmented value={value} onChange={setValue} options={options} size="default" />
            <ElSegmented value={value} onChange={setValue} options={options} size="small" />
        </ElSpace>
    );
};

export default App;
