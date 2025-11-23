import { ElCol, ElOption, ElRow, ElSelect } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    const onChange = (value: string, data: any) => {
        console.log(value, data);
    };

    return (
        <ElRow gutter={15}>
            <ElCol span={8}>
                <ElSelect defaultValue={4} size="large" style={{ width: 300 }} onChange={onChange}>
                    <ElOption value={1} label="黄金糕" />
                    <ElOption value={2} label="双皮奶" />
                    <ElOption value={3} label="蚵仔煎" />
                    <ElOption value={4} label="龙须面" />
                    <ElOption value={5} label="北京烤鸭" />
                </ElSelect>
            </ElCol>
            <ElCol span={8}>
                <ElSelect defaultValue={4} style={{ width: 300 }} onChange={onChange}>
                    <ElOption value={1} label="黄金糕" />
                    <ElOption value={2} label="双皮奶" />
                    <ElOption value={3} label="蚵仔煎" />
                    <ElOption value={4} label="龙须面" />
                    <ElOption value={5} label="北京烤鸭" />
                </ElSelect>
            </ElCol>
            <ElCol span={8}>
                <ElSelect defaultValue={4} size="small" style={{ width: 300 }} onChange={onChange}>
                    <ElOption value={1} label="黄金糕" />
                    <ElOption value={2} label="双皮奶" />
                    <ElOption value={3} label="蚵仔煎" />
                    <ElOption value={4} label="龙须面" />
                    <ElOption value={5} label="北京烤鸭" />
                </ElSelect>
            </ElCol>
        </ElRow>
    );
};

export default App;
