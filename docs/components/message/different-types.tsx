import { ElButton, ElMessage } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <>
            <ElButton type="success" onClick={() => ElMessage.success('这是一条成功消息')} style={{ marginRight: 20 }}>
                成功
            </ElButton>
            <ElButton type="warning" onClick={() => ElMessage.warning('这是一条警告消息')} style={{ marginRight: 20 }}>
                警告
            </ElButton>
            <ElButton type="info" onClick={() => ElMessage.info('只是一条消息提示')} style={{ marginRight: 20 }}>
                消息
            </ElButton>
            <ElButton type="danger" onClick={() => ElMessage.error('这是一条错误消息')}>
                错误
            </ElButton>
        </>
    );
};

export default App;
