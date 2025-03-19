import { ElBadge, ElButton } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <>
            <ElBadge isDot style={{ marginRight: 40 }}>
                消息
            </ElBadge>
            <ElBadge isDot style={{ marginRight: 40 }}>
                <ElButton type="primary">回复</ElButton>
            </ElBadge>
        </>
    );
};

export default App;
