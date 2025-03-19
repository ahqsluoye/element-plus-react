/* eslint-disable no-console */
import { ElButton, ElForm, ElInput, ElMessage } from '@parker/element-plus-react';
import React, { useCallback } from 'react';

const App = () => {
    const onFinish = useCallback((value: object) => {
        ElMessage.success(`表单提交值：${JSON.stringify(value)}，可打开浏览器控制台查看数据`);
        console.log(value);
    }, []);

    return (
        <ElForm name="form_item_path" onFinish={onFinish} style={{ width: 800 }}>
            <ElForm.Item label="姓名">
                <ElForm.Item name={['user', 'name', 'firstName']} pure style={{ display: 'inline-block', width: '50%' }}>
                    <ElInput placeholder="请输入姓" />
                </ElForm.Item>
                <ElForm.Item name={['user', 'name', 'lastName']} labelWidth={10} style={{ display: 'inline-block', width: '50%' }}>
                    <ElInput placeholder="请输入名字" />
                </ElForm.Item>
            </ElForm.Item>

            <ElForm.Item name={['user', 'age']} label="年龄">
                <ElInput />
            </ElForm.Item>

            <ElForm.Item>
                <ElButton type="primary" nativeType="submit">
                    提交
                </ElButton>
            </ElForm.Item>
        </ElForm>
    );
};

export default App;
