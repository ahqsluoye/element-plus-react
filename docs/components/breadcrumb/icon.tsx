import { ElBreadcrumb, ElBreadcrumbItem, ElIcon } from '@qsxy/element-plus-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const App = () => {
    const navigate = useNavigate();
    return (
        <ElBreadcrumb separator={<ElIcon name="angle-right" />} navigate={navigate}>
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
