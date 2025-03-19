import { ElForm, ElInput, ElInputNumber } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    const [formInstance] = ElForm.useForm<{ name: string; age: number }>();
    const nameValue = ElForm.useWatch('name', formInstance);

    return (
        <>
            <ElForm form={formInstance} labelWidth={130} style={{ width: 800 }}>
                <ElForm.Item name="name" label="姓名 (监听值变化)">
                    <ElInput />
                </ElForm.Item>
                <ElForm.Item name="age" label="年龄 (不监听)">
                    <ElInputNumber />
                </ElForm.Item>
            </ElForm>

            <div style={{ background: 'var(--el-color-info-light-9)', padding: 15 }}>
                <pre>姓名: {nameValue}</pre>
            </div>
        </>
    );
};

export default App;
