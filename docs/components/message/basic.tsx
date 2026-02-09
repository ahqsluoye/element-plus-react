import { ElButton, ElMessage } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElButton
            onClick={() => {
                ElMessage('This is a message.');
            }}
        >
            Show message
        </ElButton>
    );
};

export default App;
