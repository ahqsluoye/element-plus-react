import { ElCol, ElOption, ElRow, ElSelect } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElRow gutter={15}>
            <ElCol span={8}>
                <ElSelect allowCreate style={{ width: 300 }}>
                    <ElOption value="1" label="黄金糕" />
                    <ElOption value="2" label="双皮奶" />
                </ElSelect>
            </ElCol>
            <ElCol span={8}>
                <ElSelect multiple allowCreate style={{ width: 300 }}>
                    <ElOption value="1" label="黄金糕" />
                    <ElOption value="2" label="双皮奶" />
                </ElSelect>
            </ElCol>
        </ElRow>
    );
};

export default App;
