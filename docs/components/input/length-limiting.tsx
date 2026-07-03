import { ElInput, ElTextArea } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <>
            <ElInput placeholder="请输入内容" maxLength={10} showWordLimit style={{ marginBottom: 10 }} />
            <ElTextArea placeholder="请输入内容" maxLength={30} showWordLimit />
        </>
    );
};

export default App;
