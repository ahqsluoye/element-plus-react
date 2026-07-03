import { ElButton, ElButtonGroup, ElIcon } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <>
            <ElButtonGroup>
                <ElButton type="primary" icon="angle-left">
                    上一页
                </ElButton>
                <ElButton type="primary" icon="angle-right">
                    下一页
                </ElButton>
            </ElButtonGroup>

            <ElButtonGroup style={{ marginLeft: 20 }}>
                <ElButton type="primary" icon="trash-alt" />
                <ElButton type="primary" icon="magnifying-glass" />
                <ElButton type="primary">
                    <ElIcon name="upload" className="el-icon--right" />
                </ElButton>
            </ElButtonGroup>
        </>
    );
};

export default App;
