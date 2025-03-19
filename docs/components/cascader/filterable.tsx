import { ElCascader } from '@qsxy/element-plus-react';
import { useMount } from 'ahooks';
import React, { useState } from 'react';
import { options1 } from './data';

const App = () => {
    const [value, setV] = useState(['guide', 'disciplines', 'feedback']);

    useMount(() => {
        setTimeout(() => {
            setV(['guide', 'disciplines', 'efficiency']);
        }, 3000);
    });

    return <ElCascader filterable options={options1} value={value} style={{ width: 300 }} />;
};

export default App;
