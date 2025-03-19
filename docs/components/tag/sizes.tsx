import { ElRow, ElTag } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <>
            <ElRow>
                <ElTag size="large" style={{ marginRight: 20 }}>
                    标签一
                </ElTag>
                <ElTag style={{ marginRight: 20 }}>标签二</ElTag>
                <ElTag size="small" style={{ marginRight: 20 }}>
                    标签三
                </ElTag>
            </ElRow>
            <ElRow>
                <ElTag size="large" closable style={{ marginRight: 20 }}>
                    标签一
                </ElTag>
                <ElTag closable style={{ marginRight: 20 }}>
                    标签二
                </ElTag>
                <ElTag size="small" closable style={{ marginRight: 20 }}>
                    标签三
                </ElTag>
            </ElRow>
        </>
    );
};

export default App;
