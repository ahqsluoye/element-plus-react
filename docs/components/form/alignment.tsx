import { ElForm, ElInput, ElRadioButton, ElRadioGroup, useForm } from '@qsxy/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const [labelPosition, setLabelPosition] = useState<'left' | 'right' | 'top'>('right');
    const [formInstance] = useForm();

    return (
        <>
            <ElRadioGroup value={labelPosition} onChange={(value: 'left' | 'right' | 'top') => setLabelPosition(value)}>
                <ElRadioButton value="left">Left</ElRadioButton>
                <ElRadioButton value="right">Right</ElRadioButton>
                <ElRadioButton value="top">Top</ElRadioButton>
            </ElRadioGroup>
            <ElForm form={formInstance} labelPosition={labelPosition} style={{ maxWidth: 460, marginTop: 20 }}>
                <ElForm.Item name="name" label="活动名称">
                    <ElInput />
                </ElForm.Item>
                <ElForm.Item name="region" label="区域">
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
