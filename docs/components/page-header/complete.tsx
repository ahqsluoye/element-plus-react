import { ElAvatar, ElBreadcrumb, ElBreadcrumbItem, ElButton, ElDescriptions, ElDescriptionsItem, ElPageHeader, ElSpace, ElTag } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    const onBack = () => {
        console.log('go back');
    };

    return (
        <div aria-label="A complete example of page header">
            <ElPageHeader
                onBack={onBack}
                breadcrumb={
                    <ElBreadcrumb separator="/">
                        <ElBreadcrumbItem to={{ path: './page-header.html' }}>homepage</ElBreadcrumbItem>
                        <ElBreadcrumbItem>
                            <a href="./page-header.html">route 1</a>
                        </ElBreadcrumbItem>
                        <ElBreadcrumbItem>route 2</ElBreadcrumbItem>
                    </ElBreadcrumb>
                }
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
                        <ElButton type="primary" style={{ marginLeft: '.5rem' }}>
                            Edit
                        </ElButton>
                    </div>
                }
            >
                <ElDescriptions column={3} size="small" style={{ marginTop: '1rem' }}>
                    <ElDescriptionsItem label="Username">kooriookami</ElDescriptionsItem>
                    <ElDescriptionsItem label="Telephone">18100000000</ElDescriptionsItem>
                    <ElDescriptionsItem label="Place">Suzhou</ElDescriptionsItem>
                    <ElDescriptionsItem label="Remarks">
                        <ElTag size="small">School</ElTag>
                    </ElDescriptionsItem>
                    <ElDescriptionsItem label="Address">No. 18, Wantang Road, Suzhou City, Jiangsu Province</ElDescriptionsItem>
                </ElDescriptions>
            </ElPageHeader>
        </div>
    );
};

export default App;
