import { ElButton, ElNotification } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <>
            <ElButton
                type="primary"
                onClick={() =>
                    ElNotification({
                        title: '自定义位置',
                        message: '右上角弹出',
                    })
                }
                style={{ marginRight: 20 }}
            >
                右上角
            </ElButton>
            <ElButton
                type="primary"
                onClick={() =>
                    ElNotification({
                        title: '自定义位置',
                        position: 'bottom-right',
                        message: '右下角弹出',
                    })
                }
                style={{ marginRight: 20 }}
            >
                右下角
            </ElButton>
            <ElButton
                type="primary"
                onClick={() =>
                    ElNotification({
                        title: '自定义位置',
                        position: 'bottom-left',
                        message: '左下角弹出',
                    })
                }
                style={{ marginRight: 20 }}
            >
                左下角
            </ElButton>
            <ElButton
                type="primary"
                onClick={() =>
                    ElNotification({
                        title: '自定义位置',
                        position: 'top-left',
                        message: '左上角弹出',
                    })
                }
                style={{ marginRight: 20 }}
            >
                左上角
            </ElButton>
        </>
    );
};

export default App;
