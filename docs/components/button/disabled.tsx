import { ElButton } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <>
            <div className="mb-4">
                <ElButton disabled>默认按钮</ElButton>
                <ElButton type="primary" disabled>主要按钮</ElButton>
                <ElButton type="success" disabled>成功按钮</ElButton>
                <ElButton type="info" disabled>信息按钮</ElButton>
                <ElButton type="warning" disabled>警告按钮</ElButton>
                <ElButton type="danger" disabled>危险按钮</ElButton>
            </div>

            <div>
                <ElButton plain disabled>朴素按钮</ElButton>
                <ElButton type="primary" plain disabled>主要按钮</ElButton>
                <ElButton type="success" plain disabled>成功按钮</ElButton>
                <ElButton type="info" plain disabled>信息按钮</ElButton>
                <ElButton type="warning" plain disabled>警告按钮</ElButton>
                <ElButton type="danger" plain disabled>危险按钮</ElButton>
            </div>
        </>
    );
};

export default App;
