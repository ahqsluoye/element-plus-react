import { ElButton, ElDialog, ElForm, ElInput } from '@qsxy/element-plus-react';
import React, { useCallback, useState } from 'react';

const App = () => {
    const [formInstance] = ElForm.useForm();
    const initialValues = { userName: '张三' };

    const [visible, setVisible] = useState(false);
    const onClose = useCallback(() => {
        setVisible(false);
    }, []);

    return (
        <>
            <ElButton onClick={() => setVisible(true)}>打开对话框</ElButton>
            <ElDialog visible={visible} beforeClose={onClose}>
                <ElDialog.body>
                    <ElForm form={formInstance} initialValues={initialValues}>
                        <ElForm.Item
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
                        </ElForm.Item>
                    </ElForm>
                </ElDialog.body>
            </ElDialog>
        </>
    );
};

export default App;
