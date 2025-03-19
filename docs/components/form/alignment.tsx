import { ElForm, ElInput, ElRadio, ElRadioGroup, useForm } from '@qsxy/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const [labelPosition, setLabelPosition] = useState<'left' | 'right' | 'top'>('right');
    const [formInstance] = useForm();

    return (
        <>
            <ElRadioGroup value={labelPosition} onChange={(value: 'left' | 'right' | 'top') => setLabelPosition(value)}>
                <ElRadio.Button value="left">Left</ElRadio.Button>
                <ElRadio.Button value="right">Right</ElRadio.Button>
                <ElRadio.Button value="top">Top</ElRadio.Button>
            </ElRadioGroup>
            <ElForm form={formInstance} labelPosition={labelPosition} style={{ maxWidth: 460, marginTop: 20 }}>
                <ElForm.Item name="name" label="活动名称">
                    <ElInput />
                </ElForm.Item>
                <ElForm.Item name="region" label="活动区域">
                    <ElInput />
                </ElForm.Item>
                <ElForm.Item name="type" label="活动形式">
                    <ElInput />
                </ElForm.Item>
            </ElForm>
        </>
    );
};

export default App;
