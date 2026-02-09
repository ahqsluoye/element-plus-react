import { ElButton, ElMessage } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <>
            <ElButton plain onClick={() => ElMessage.primary({ message: 'This is a primary message.', showClose: true })} style={{ marginRight: 20 }}>
                Primary
            </ElButton>
            <ElButton plain onClick={() => ElMessage.success({ message: 'This is a success message.', showClose: true })} style={{ marginRight: 20 }}>
                Success
            </ElButton>
            <ElButton plain onClick={() => ElMessage.warning({ message: 'This is a priwarningmary message.', showClose: true })} style={{ marginRight: 20 }}>
                Warning
            </ElButton>
            <ElButton plain onClick={() => ElMessage.info({ message: 'This is a info message.', showClose: true })} style={{ marginRight: 20 }}>
                Info
            </ElButton>
            <ElButton plain onClick={() => ElMessage.error({ message: 'This is a error message.', showClose: true })}>
                Error
            </ElButton>
            <ElButton plain onClick={() => ElMessage.info({ message: 'Oops, this is a message that does not automatically close.', duration: 0, showClose: true })}>
                Won't close automatically
            </ElButton>
        </>
    );
};

export default App;
