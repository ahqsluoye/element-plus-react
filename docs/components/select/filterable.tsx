import { ElOption, ElSelect } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElSelect filterable defaultValue={'5'} style={{ width: 300 }}>
            <ElOption value="1" label="黄金糕" />
            <ElOption value="2" label="双皮奶" />
            <ElOption value="3" label="蚵仔煎" />
            <ElOption value="4" label="龙须面" />
            <ElOption value="5" label="北京烤鸭" />
        </ElSelect>
    );
};

export default App;
