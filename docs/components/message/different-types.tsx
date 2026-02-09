import { ElButton, ElMessage } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <>
            <ElButton plain onClick={() => ElMessage.primary('This is a primary message.')} style={{ marginRight: 20 }}>
                Primary
            </ElButton>
            <ElButton plain onClick={() => ElMessage({ type: 'success', message: 'This is a success message.' })} style={{ marginRight: 20 }}>
                Success
            </ElButton>
            <ElButton plain onClick={() => ElMessage.warning('This is a warning message.')} style={{ marginRight: 20 }}>
                Warning
            </ElButton>
            <ElButton plain onClick={() => ElMessage.info('This is a info message.')} style={{ marginRight: 20 }}>
                Info
            </ElButton>
            <ElButton plain onClick={() => ElMessage.error('This is a error message.')}>
                Error
            </ElButton>
        </>
    );
};

export default App;
