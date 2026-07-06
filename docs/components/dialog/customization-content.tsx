import { ElButton, ElDialog, ElForm, ElFormItem, ElInput, useForm } from '@qsxy/element-plus-react';
import React, { useCallback, useState } from 'react';

const App = () => {
    const [formInstance] = useForm();
    const initialValues = { userName: '张三' };

    const [visible, setVisible] = useState(false);
    const onClose = useCallback(() => {
        setVisible(false);
    }, []);

    return (
        <>
            <ElButton onClick={() => setVisible(true)}>打开对话框</ElButton>
            <ElDialog visible={visible} beforeClose={onClose}>
                <ElForm form={formInstance} initialValues={initialValues}>
                    <ElFormItem
                        label="名称"
                        name="userName"
                        rules={[
                            {
                                required: true,
                                message: '名称不能为空哦',
                            },
                        ]}
                    >
                        <ElInput />
                    </ElFormItem>
                </ElForm>
            </ElDialog>
        </>
    );
};

export default App;
