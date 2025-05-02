/* eslint-disable no-console */
import { ElButton, ElDatePicker, ElForm, ElInput, ElLink, ElMessage, ElOption, ElSelect, ElTooltip } from '@qsxy/element-plus-react';
import React, { useCallback } from 'react';

const App = () => {
    const onFinish = useCallback((values: any) => {
        ElMessage.success(`表单提交值：${JSON.stringify(values)}，可打开浏览器控制台查看数据`);
        console.log('Received values of form:', values);
    }, []);

    return (
        <ElForm name="complex-form" onFinish={onFinish} style={{ width: 800 }}>
            <ElForm.Item label="账号" name="username" rules={[{ required: true }]}>
                {({ value, onChange, error }: { value?: string; onChange?: (value: string) => void; error?: boolean }) => (
                    <div style={{ display: 'flex', gap: 8 }}>
                        <ElInput value={value} onChange={onChange} error={error} style={{ width: 160 }} />
                        <ElTooltip content="Useful information" placement="top">
                            <ElLink href="#" type="primary">
                                帮助文档
                            </ElLink>
                        </ElTooltip>
                    </div>
                )}
            </ElForm.Item>

            <ElForm.Item label="地址">
                <ElForm.Item
                    name={['address', 'street']}
                    noStyle
                    validateStatus="warning"
                    rules={[{ required: true, message: '详细地址不可为空' }]}
                    errorStyle={{ paddingLeft: 140 }}
                >
                    <ElInput
                        style={{ width: '50%' }}
                        placeholder="详细地址"
                        prepend={
                            <ElForm.Item name={['address', 'province']} noStyle rules={[{ required: true, message: '省份不可为空' }]}>
                                <ElSelect placeholder="选择省份" style={{ width: 140 }}>
                                    <ElOption value="Zhejiang" label="浙江" />
                                    <ElOption value="Jiangsu" label="江苏" />
                                </ElSelect>
                            </ElForm.Item>
                        }
                    />
                </ElForm.Item>
            </ElForm.Item>

            <ElForm.Item label="生日">
                <ElForm.Item name="year" rules={[{ required: true, message: '年份不可为空' }]} style={{ display: 'inline-block', width: '50%' }} pure>
                    <ElDatePicker format="YYYY" type="year" placeholder="请输入年份" />
                </ElForm.Item>
                <ElForm.Item name="month" rules={[{ required: true, message: '日期不可为空' }]} style={{ display: 'inline-block', width: 'calc(50% - 8px)' }} labelWidth={10}>
                    <ElDatePicker format="MM-DD" placeholder="请输入日期" />
                </ElForm.Item>
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
