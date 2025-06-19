import { ElButton, ElCol, ElForm, ElIcon, ElInput, ElMessage, ElRow } from '@qsxy/element-plus-react';
import React, { useCallback } from 'react';

const App = () => {
    const onFinish = useCallback((values: any) => {
        ElMessage.success(`表单提交值：${JSON.stringify(values)}，可打开浏览器控制台查看数据`);
        console.log('Received values of form:', values);
    }, []);

    return (
        <ElForm name="dynamic_form_nest_item" onFinish={onFinish} labelWidth={0} style={{ width: 600 }}>
            <ElForm.List name="users">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <ElRow key={key} style={{ width: '100%', marginBottom: 15 }}>
                                <ElCol span={6}>
                                    <ElForm.Item {...restField} name={[name, 'first']} label="姓" pure rules={[{ required: true }]}>
                                        <ElInput placeholder="请输入姓" />
                                    </ElForm.Item>
                                </ElCol>
                                <ElCol span={6}>
                                    <ElForm.Item {...restField} name={[name, 'last']} pure rules={[{ required: true, message: '名字不可为空' }]} labelWidth={15}>
                                        <ElInput placeholder="请输入名字" />
                                    </ElForm.Item>
                                </ElCol>
                                <ElCol span={2}>
                                    <ElIcon name="minus-circle" onClick={() => remove(name)} style={{ marginLeft: 5 }} />
                                </ElCol>
                            </ElRow>
                        ))}
                        <ElForm.Item style={{ width: '100%' }}>
                            <ElButton onClick={() => add()} block dashed icon="plus">
                                添加字段
                            </ElButton>
                        </ElForm.Item>
                    </>
                )}
            </ElForm.List>
            <ElForm.Item>
                <ElButton type="primary" nativeType="submit">
                    提交
                </ElButton>
            </ElForm.Item>
        </ElForm>
    );
};

export default App;
