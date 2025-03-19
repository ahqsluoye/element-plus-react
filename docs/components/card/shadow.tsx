import { ElCard, ElCol, ElRow } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElRow gutter={12}>
            <ElCol span={8}>
                <ElCard shadow="always"> Always </ElCard>
            </ElCol>
            <ElCol span={8}>
                <ElCard shadow="hover"> Hover </ElCard>
            </ElCol>
            <ElCol span={8}>
                <ElCard shadow="never"> Never </ElCard>
            </ElCol>
        </ElRow>
    );
};

export default App;
