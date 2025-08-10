import { ElBreadcrumb, ElBreadcrumbItem, ElIcon } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElBreadcrumb separator={<ElIcon name="angle-right" />}>
            <ElBreadcrumbItem to={{ path: '/' }}>
                <ElIcon name="home" /> 主页
            </ElBreadcrumbItem>
            <ElBreadcrumbItem to={{ path: '/components/button' }}>Button 按钮</ElBreadcrumbItem>
            <ElBreadcrumbItem>活动列表</ElBreadcrumbItem>
            <ElBreadcrumbItem>活动详情</ElBreadcrumbItem>
        </ElBreadcrumb>
    );
};

export default App;
