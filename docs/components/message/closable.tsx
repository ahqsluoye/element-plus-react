import { ElButton, ElMessage } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <>
            <ElButton type="success" onClick={() => ElMessage.success({ message: '只是一条消息提示', showClose: false })} style={{ marginRight: 20 }}>
                成功
            </ElButton>
            <ElButton type="warning" onClick={() => ElMessage.warning({ message: '这是一条警告消息', showClose: false })} style={{ marginRight: 20 }}>
                警告
            </ElButton>
            <ElButton type="info" onClick={() => ElMessage.info({ message: '只是一条消息提示', showClose: false })} style={{ marginRight: 20 }}>
                消息
            </ElButton>
            <ElButton type="danger" onClick={() => ElMessage.error({ message: '这是一条错误消息', showClose: false })}>
                错误
            </ElButton>
        </>
    );
};

export default App;
