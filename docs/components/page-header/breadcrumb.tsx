import { ElBreadcrumb, ElBreadcrumbItem, ElPageHeader } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElPageHeader
            breadcrumb={
                <ElBreadcrumb separator="/">
                    <ElBreadcrumbItem to={{ path: './page-header.html' }}>homepage</ElBreadcrumbItem>
                    <ElBreadcrumbItem>
                        <a href="./page-header.html">route 1</a>
                    </ElBreadcrumbItem>
                    <ElBreadcrumbItem>route 2</ElBreadcrumbItem>
                </ElBreadcrumb>
            }
            content={<span style={{ fontWeight: 600, marginRight: '.75rem' }}>Title</span>}
        ></ElPageHeader>
    );
};

export default App;
