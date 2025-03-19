import { ElDivider, ElLink } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div>
            <ElLink href="https://element.eleme.io" target="_blank">
                默认链接
            </ElLink>
            <ElDivider direction="vertical" />
            <ElLink type="primary">主要链接</ElLink>
            <ElDivider direction="vertical" />
            <ElLink type="success">成功链接</ElLink>
            <ElDivider direction="vertical" />
            <ElLink type="warning">警告链接</ElLink>
            <ElDivider direction="vertical" />
            <ElLink type="danger">危险链接</ElLink>
            <ElDivider direction="vertical" />
            <ElLink type="info">信息链接</ElLink>
        </div>
    );
};

export default App;
