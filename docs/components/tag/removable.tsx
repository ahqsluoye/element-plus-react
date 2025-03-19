import { ElTag } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <>
            <ElTag closable style={{ marginRight: 20 }}>
                标签一
            </ElTag>
            <ElTag type="success" closable style={{ marginRight: 20 }}>
                标签二
            </ElTag>
            <ElTag type="info" closable style={{ marginRight: 20 }}>
                标签三
            </ElTag>
            <ElTag type="warning" closable style={{ marginRight: 20 }}>
                标签四
            </ElTag>
            <ElTag type="danger" closable style={{ marginRight: 20 }}>
                标签五
            </ElTag>
        </>
    );
};

export default App;
