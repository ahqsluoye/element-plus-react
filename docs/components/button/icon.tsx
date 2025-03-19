import { ElButton, ElIcon } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div className="flex">
            <ElButton type="primary" icon="edit" />
            <ElButton type="primary" icon="share" />
            <ElButton type="primary" icon="trash-alt" />
            <ElButton type="primary" icon="magnifying-glass">
                搜索
            </ElButton>
            <ElButton type="primary">
                上传
                <ElIcon name="upload" className="el-icon--right" />
            </ElButton>
        </div>
    );
};

export default App;
