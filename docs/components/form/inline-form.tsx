/* eslint-disable no-console */
import { ElButton, ElForm, ElInput, ElOption, ElSelect, useForm } from '@qsxy/element-plus-react';
import React, { useCallback } from 'react';

const App = () => {
    const [formInstance] = useForm();

    const onSubmit = useCallback(() => {
        console.log('submit!');
    }, []);

    return (
        <ElForm form={formInstance} inline style={{ width: 800 }}>
            <ElForm.Item name="name" label="审批人">
                <ElInput />
            </ElForm.Item>
            <ElForm.Item name="region" label="活动区域">
                <ElSelect placeholder="活动区域">
                    <ElOption label="区域一" value="shanghai" />
                    <ElOption label="区域二" value="beijing" />
                </ElSelect>
            </ElForm.Item>
            <ElForm.Item>
                <ElButton type="primary" onClick={onSubmit}>
                    查询
                </ElButton>
            </ElForm.Item>
        </ElForm>
    );
};

export default App;
