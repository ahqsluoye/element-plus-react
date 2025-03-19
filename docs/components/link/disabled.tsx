import { ElDivider, ElLink } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div>
            <ElLink disabled>默认链接</ElLink>
            <ElDivider direction="vertical" />
            <ElLink type="primary" disabled>
                主要链接
            </ElLink>
            <ElDivider direction="vertical" />
            <ElLink type="success" disabled>
                成功链接
            </ElLink>
            <ElDivider direction="vertical" />
            <ElLink type="warning" disabled>
                警告链接
            </ElLink>
            <ElDivider direction="vertical" />
            <ElLink type="danger" disabled>
                危险链接
            </ElLink>
            <ElDivider direction="vertical" />
            <ElLink type="info" disabled>
                信息链接
            </ElLink>
        </div>
    );
};

export default App;
