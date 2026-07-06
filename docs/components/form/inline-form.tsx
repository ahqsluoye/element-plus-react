import { ElButton, ElForm, ElFormItem, ElInput, ElOption, ElSelect, useForm } from '@qsxy/element-plus-react';
import React, { useCallback } from 'react';

const App = () => {
    const [formInstance] = useForm();

    const onSubmit = useCallback(() => {
        console.log('submit!');
    }, []);

    return (
        <ElForm form={formInstance} inline style={{ width: 800 }}>
            <ElFormItem name="name" label="审批人">
                <ElInput />
            </ElFormItem>
            <ElFormItem name="region" label="活动区域">
                <ElSelect placeholder="活动区域">
                    <ElOption label="区域一" value="shanghai" />
                    <ElOption label="区域二" value="beijing" />
                </ElSelect>
            </ElFormItem>
            <ElFormItem>
                <ElButton type="primary" onClick={onSubmit}>
                    查询
                </ElButton>
            </ElFormItem>
        </ElForm>
    );
};

export default App;
