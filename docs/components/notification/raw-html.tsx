import { ElButton, ElNotification } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElButton
            type="primary"
            onClick={() =>
                ElNotification({
                    title: 'HTML片段',
                    message: (
                        <strong>
                            这是 <i>HTML</i> 片段
                        </strong>
                    ),
                })
            }
            style={{ marginRight: 20 }}
        >
            使用HTML片段
        </ElButton>
    );
};

export default App;
