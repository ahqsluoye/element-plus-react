import { ElButton, ElNotification } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElButton
            type="primary"
            onClick={() =>
                ElNotification({
                    title: 'info',
                    message: '这是一条没有关闭按钮的消息',
                    showClose: false,
                })
            }
            style={{ marginRight: 20 }}
        >
            隐藏关闭按钮
        </ElButton>
    );
};

export default App;
