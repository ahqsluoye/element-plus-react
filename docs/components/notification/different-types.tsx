import { ElButton, ElNotification } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <>
            <ElButton
                onClick={() =>
                    ElNotification({
                        title: '消息',
                        type: 'info',
                        message: '这是一条消息的提示消息',
                    })
                }
                style={{ marginRight: 20 }}
            >
                消息
            </ElButton>
            <ElButton
                onClick={() =>
                    ElNotification({
                        title: '成功',
                        type: 'success',
                        message: '这是一条成功的提示消息',
                    })
                }
                style={{ marginRight: 20 }}
            >
                成功
            </ElButton>
            <ElButton
                onClick={() =>
                    ElNotification.warning({
                        title: '警告',
                        message: '这是一条警告的提示消息',
                    })
                }
                style={{ marginRight: 20 }}
            >
                警告
            </ElButton>
            <ElButton
                onClick={() =>
                    ElNotification.error({
                        title: '错误',
                        message: '这是一条错误的提示消息',
                    })
                }
                style={{ marginRight: 20 }}
            >
                错误
            </ElButton>
        </>
    );
};

export default App;
