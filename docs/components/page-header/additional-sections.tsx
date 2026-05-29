import { ElAvatar, ElButton, ElPageHeader, ElSpace, ElTag } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElPageHeader
            icon={null}
            content={
                <ElSpace alignment="center">
                    <ElAvatar style={{ marginRight: '.75rem' }} size={32} src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                    <span className="text-large font-600 mr-3">Title</span>
                    <span style={{ marginRight: '.5rem', color: 'var(--el-text-color-regular)' }}>Sub title</span>
                    <ElTag>Default</ElTag>
                </ElSpace>
            }
            extra={
                <div className="flex items-center">
                    <ElButton>Print</ElButton>
                    <ElButton type="primary" className="ml-2">
                        Edit
                    </ElButton>
                </div>
            }
        />
    );
};

export default App;
