import { ElButton, ElNotification } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <>
            <ElButton
                type="primary"
                onClick={() =>
                    ElNotification.info({
                        title: '标题名称',
                        message: <span style={{ color: 'teal' }}>这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案</span>,
                    })
                }
                style={{ marginRight: 20 }}
            >
                可自动关闭
            </ElButton>
            <ElButton
                type="primary"
                onClick={() =>
                    ElNotification.info({
                        title: '提示',
                        message: '这是一条不会自动关闭的消息',
                        duration: 0,
                    })
                }
            >
                不会自动关闭
            </ElButton>
        </>
    );
};

export default App;
