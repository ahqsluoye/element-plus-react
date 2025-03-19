import { ElButton, ElNotification } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElButton
            type="primary"
            onClick={() =>
                ElNotification({
                    title: '偏移',
                    message: '这是一条带有偏移的提示消息',
                    offset: 100,
                })
            }
            style={{ marginRight: 20 }}
        >
            偏移的消息
        </ElButton>
    );
};

export default App;
