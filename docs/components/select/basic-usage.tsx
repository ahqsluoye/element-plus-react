import { ElCol, ElOption, ElRow, ElSelect } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    const [value, setValue] = React.useState<number>(4);
    const onChange = (val: number, data: any) => {
        console.log(val, data);
        setValue(val);
    };

    return (
        <ElRow gutter={15}>
            <ElCol span={8}>
                <ElSelect value={value} size="large" style={{ width: 300 }} onChange={onChange}>
                    <ElOption value={1} label="黄金糕" />
                    <ElOption value={2} label="双皮奶" />
                    <ElOption value={3} label="蚵仔煎" />
                    <ElOption value={4} label="龙须面" />
                    <ElOption value={5} label="北京烤鸭" />
                </ElSelect>
            </ElCol>
            <ElCol span={8}>
                <ElSelect value={value} style={{ width: 300 }} onChange={onChange}>
                    <ElOption value={1} label="黄金糕" />
                    <ElOption value={2} label="双皮奶" />
                    <ElOption value={3} label="蚵仔煎" />
                    <ElOption value={4} label="龙须面" />
                    <ElOption value={5} label="北京烤鸭" />
                </ElSelect>
            </ElCol>
            <ElCol span={8}>
                <ElSelect value={value} size="small" style={{ width: 300 }} onChange={onChange}>
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
