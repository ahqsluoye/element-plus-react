import { ElButton, ElDrawer, ElForm, ElInput, useForm } from '@parker/element-plus-react';
import React, { useCallback, useState } from 'react';

const App = () => {
    const [visible, setVisible] = useState(false);
    const onClose = useCallback(() => {
        setVisible(false);
    }, []);

    const [formInstance] = useForm();
    const initialValues = { userName: '张三', address: { province: '2' } };

    return (
        <>
            <ElButton onClick={() => setVisible(true)}>打开对话框</ElButton>
            <ElDrawer visible={visible} onClose={onClose}>
                <ElDrawer.Header border>标题</ElDrawer.Header>
                <ElDrawer.Body>
                    <ElForm form={formInstance} initialValues={initialValues} inline>
                        <ElForm.Item
                            label="名称"
                            name="userName"
                            required
                            rules={[
                                {
                                    required: true,
                                    message: '名称不能为空哦',
                                },
                                { phone: true },
                            ]}
                        >
                            <ElInput />
                        </ElForm.Item>
                    </ElForm>
                </ElDrawer.Body>
                <ElDrawer.Footer>
                    <ElButton type="primary">确定</ElButton>
                    <ElButton onClick={onClose}>取消</ElButton>
                </ElDrawer.Footer>
            </ElDrawer>
        </>
    );
};

export default App;
