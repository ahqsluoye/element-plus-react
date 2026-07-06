import { ElForm, ElFormItem, ElInput, ElInputNumber, useForm, useWatch } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    const [formInstance] = useForm<{ name: string; age: number }>();
    const nameValue = useWatch('name', formInstance);

    return (
        <>
            <ElForm form={formInstance} labelWidth={130} style={{ width: 800 }}>
                <ElFormItem name="name" label="姓名 (监听值变化)">
                    <ElInput />
                </ElFormItem>
                <ElFormItem name="age" label="年龄 (不监听)">
                    <ElInputNumber />
                </ElFormItem>
            </ElForm>

            <div style={{ background: 'var(--el-color-info-light-9)', padding: 15 }}>
                <pre>姓名: {nameValue}</pre>
            </div>
        </>
    );
};

export default App;
