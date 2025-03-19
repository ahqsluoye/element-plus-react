import { ElInput } from '@qsxy/element-plus-react';
import React from 'react';
import './style.scss';

const App = () => {
    return (
        <>
            <ElInput placeholder="名称" disabled value="禁用状态" />
            <ElInput placeholder="名称" readOnly clearable={false} value="只读状态" />
            <ElInput placeholder="名称" plain readOnly clearable={false} value="无边框模式" />
        </>
    );
};

export default App;
