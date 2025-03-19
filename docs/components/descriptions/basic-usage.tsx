import { ElDescriptions, ElDescriptionsItem, ElTag } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElDescriptions title="User Info" style={{ width: 800 }}>
            <ElDescriptionsItem label="Username">kooriookami</ElDescriptionsItem>
            <ElDescriptionsItem label="Telephone">18100000000</ElDescriptionsItem>
            <ElDescriptionsItem label="Place">Suzhou</ElDescriptionsItem>
            <ElDescriptionsItem label="Remarks">
                <ElTag size="small">School</ElTag>
            </ElDescriptionsItem>
            <ElDescriptionsItem label="Address">No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province</ElDescriptionsItem>
        </ElDescriptions>
    );
};

export default App;
