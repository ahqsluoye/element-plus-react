import { ElButton, ElMessage } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElButton
            onClick={() => {
                ElMessage('只是一条消息提示');
            }}
        >
            打开消息提示
        </ElButton>
    );
};

export default App;
