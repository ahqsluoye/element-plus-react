import { ElBadge, ElButton } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <>
            <ElBadge value={12} max={99} style={{ marginRight: 40 }}>
                <ElButton>消息</ElButton>
            </ElBadge>
            <ElBadge value={3} max={10} style={{ marginRight: 40 }}>
                <ElButton>回复</ElButton>
            </ElBadge>
        </>
    );
};

export default App;
