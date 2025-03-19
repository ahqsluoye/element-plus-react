import { ElDescriptions, ElDescriptionsItem, ElTag } from '@qsxy/element-plus-react';
import React from 'react';
import './customized-style.scss';

const App = () => {
    return (
        <ElDescriptions title="Customized style list" column={3} border style={{ width: 800 }}>
            <ElDescriptionsItem label="Username" labelAlign="right" align="center" labelClassName="my-label" className="my-content" width={150}>
                kooriookami
            </ElDescriptionsItem>
            <ElDescriptionsItem label="Telephone" labelAlign="right" align="center">
                18100000000
            </ElDescriptionsItem>
            <ElDescriptionsItem label="Place" labelAlign="right" align="center">
                Suzhou
            </ElDescriptionsItem>
            <ElDescriptionsItem label="Remarks" labelAlign="right" align="center">
                <ElTag size="small">School</ElTag>
            </ElDescriptionsItem>
            <ElDescriptionsItem label="Address" labelAlign="right" align="center">
                No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
            </ElDescriptionsItem>
        </ElDescriptions>
    );
};

export default App;
