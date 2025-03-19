import { ElBadge, ElButton } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <>
            <ElBadge value="new" max={99} style={{ marginRight: 40 }}>
                <ElButton>消息</ElButton>
            </ElBadge>
            <ElBadge value="hot" max={10} style={{ marginRight: 40 }}>
                <ElButton>回复</ElButton>
            </ElBadge>
        </>
    );
};

export default App;
