import { ElButton, ElIcon } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <>
            <ElButton.Group>
                <ElButton type="primary" icon="angle-left">
                    上一页
                </ElButton>
                <ElButton type="primary" icon="angle-right">
                    下一页
                </ElButton>
            </ElButton.Group>

            <ElButton.Group style={{ marginLeft: 20 }}>
                <ElButton type="primary" icon="trash-alt" />
                <ElButton type="primary" icon="magnifying-glass" />
                <ElButton type="primary">
                    <ElIcon name="upload" className="el-icon--right" />
                </ElButton>
            </ElButton.Group>
        </>
    );
};

export default App;
