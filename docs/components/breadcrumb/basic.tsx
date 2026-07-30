import { ElBreadcrumb, ElBreadcrumbItem } from '@qsxy/element-plus-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const App = () => {
    const navigate = useNavigate();
    return (
        <ElBreadcrumb separator="/" navigate={navigate}>
            <ElBreadcrumbItem to={{ path: '/' }}>首页</ElBreadcrumbItem>
            <ElBreadcrumbItem>
                <a href="/">活动管理</a>
            </ElBreadcrumbItem>
            <ElBreadcrumbItem>活动列表</ElBreadcrumbItem>
            <ElBreadcrumbItem>活动详情</ElBreadcrumbItem>
        </ElBreadcrumb>
    );
};

export default App;
