import { ElButton } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <>
            <div className="mb-4">
                <ElButton>默认按钮</ElButton>
                <ElButton type="primary">主要按钮</ElButton>
                <ElButton type="success">成功按钮</ElButton>
                <ElButton type="info">信息按钮</ElButton>
                <ElButton type="warning">警告按钮</ElButton>
                <ElButton type="danger">危险按钮</ElButton>
            </div>

            <div className="mb-4">
                <ElButton plain>朴素按钮</ElButton>
                <ElButton type="primary" plain>
                    主要按钮
                </ElButton>
                <ElButton type="success" plain>
                    成功按钮
                </ElButton>
                <ElButton type="info" plain>
                    信息按钮
                </ElButton>
                <ElButton type="warning" plain>
                    警告按钮
                </ElButton>
                <ElButton type="danger" plain>
                    危险按钮
                </ElButton>
            </div>

            <div className="mb-4">
                <ElButton round>圆角按钮</ElButton>
                <ElButton type="primary" round>
                    主要按钮
                </ElButton>
                <ElButton type="success" round>
                    成功按钮
                </ElButton>
                <ElButton type="info" round>
                    信息按钮
                </ElButton>
                <ElButton type="warning" round>
                    警告按钮
                </ElButton>
                <ElButton type="danger" round>
                    危险按钮
                </ElButton>
            </div>

            <div>
                <ElButton icon="magnifying-glass" circle />
                <ElButton type="primary" icon="edit" circle />
                <ElButton type="success" icon="check" circle />
                <ElButton type="info" icon="comment-pen" circle />
                <ElButton type="warning" icon="star" circle />
                <ElButton type="danger" icon="trash-alt" circle />
            </div>
        </>
    );
};

export default App;
