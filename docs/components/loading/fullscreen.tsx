import { ElButton, ElLoading } from '@parker/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <ElButton
                onClick={() => {
                    const loading = ElLoading.service({ text: '服务方式调用，正在加载中...' });
                    setTimeout(() => {
                        loading.close();
                    }, 2000);
                }}
            >
                服务方式调用
            </ElButton>
            <ElButton
                onClick={() => {
                    setVisible(true);
                    setTimeout(() => {
                        setVisible(false);
                    }, 3000);
                }}
            >
                组件方式调用
            </ElButton>
            {<ElLoading text="组件方式调用，正在加载中..." visible={visible} />}
        </>
    );
};

export default App;
