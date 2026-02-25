import { ElInputNumber, ElSpace } from '@qsxy/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const [value, setValue] = useState(1);

    return (
        <ElSpace direction="vertical">
            <ElSpace>
                <ElInputNumber value={value} prefix={'￥'} onChange={(val: number) => setValue(val)} />
                <ElInputNumber value={value} suffix={'RMB'} controls={false} controlsPosition="right" onChange={(val: number) => setValue(val)} />
            </ElSpace>
        </ElSpace>
    );
};

export default App;
