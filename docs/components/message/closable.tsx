import { ElButton, ElMessage } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <>
            <ElButton plain onClick={() => ElMessage.success({ message: '只是一条消息提示', showClose: false })} style={{ marginRight: 20 }}>
                成功
            </ElButton>
            <ElButton plain onClick={() => ElMessage.warning({ message: '这是一条警告消息', showClose: false })} style={{ marginRight: 20 }}>
                警告
            </ElButton>
            <ElButton plain onClick={() => ElMessage.info({ message: '只是一条消息提示', showClose: false })} style={{ marginRight: 20 }}>
                消息
            </ElButton>
            <ElButton plain onClick={() => ElMessage.error({ message: '这是一条错误消息', showClose: false })}>
                错误
            </ElButton>
        </>
    );
};

export default App;
