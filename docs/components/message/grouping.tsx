import { ElButton, ElMessage } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElButton
            onClick={() => {
                ElMessage({ message: 'This is a message.', grouping: true });
            }}
        >
            Show message
        </ElButton>
    );
};

export default App;
