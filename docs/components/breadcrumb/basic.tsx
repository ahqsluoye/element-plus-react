import { ElBreadcrumb, ElBreadcrumbItem } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElBreadcrumb separator="/">
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
