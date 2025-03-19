import { ElButton, ElPopconfirm } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElPopconfirm title="确认要删除吗？" placement="top" className="item">
            <ElButton>删除</ElButton>
        </ElPopconfirm>
    );
};

export default App;
