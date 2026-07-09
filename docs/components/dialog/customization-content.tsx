import { ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElMessageBox, useForm } from '@qsxy/element-plus-react';
import React, { useCallback, useState } from 'react';

const App = () => {
    const [formInstance] = useForm();
    const initialValues = { userName: '张三' };

    const [visible, setVisible] = useState(false);
    const onClose = useCallback((done: (cancle: boolean) => void) => {
        ElMessageBox.confirm('确定要关闭吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        })
            .then(() => {
                done(false);
            })
            .catch(() => {
                // 取消关闭
                done(true);
            });
    }, []);

    return (
        <>
            <ElButton onClick={() => setVisible(true)}>打开对话框</ElButton>
            <ElDialog visible={visible} beforeClose={onClose} onCloseDialog={() => setVisible(false)}>
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
