import { ElCol, ElRow, ElSelect } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElRow gutter={15}>
            <ElCol span={8}>
                <ElSelect multiple style={{ width: 300 }}>
                    <ElSelect.Option value="1" label="黄金糕" />
                    <ElSelect.Option value="2" label="双皮奶" />
                    <ElSelect.Option value="3" label="蚵仔煎" />
                    <ElSelect.Option value="4" label="龙须面" />
                    <ElSelect.Option value="5" label="北京烤鸭" />
                </ElSelect>
            </ElCol>
            <ElCol span={8}>
                <ElSelect multiple collapseTags style={{ width: 300 }}>
                    <ElSelect.Option value="1" label="黄金糕" />
                    <ElSelect.Option value="2" label="双皮奶" />
                    <ElSelect.Option value="3" label="蚵仔煎" />
                    <ElSelect.Option value="4" label="龙须面" />
                    <ElSelect.Option value="5" label="北京烤鸭" />
                </ElSelect>
            </ElCol>
        </ElRow>
    );
};

export default App;
