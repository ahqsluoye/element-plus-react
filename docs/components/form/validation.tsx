/* eslint-disable no-console */
import {
    ElButton,
    ElCheckbox,
    ElCheckboxGroup,
    ElCol,
    ElDatePicker,
    ElForm,
    ElInput,
    ElRadio,
    ElRadioGroup,
    ElRow,
    ElSelect,
    ElSwitch,
    ElTimePicker,
    FormRules,
    useForm,
} from '@qsxy/element-plus-react';
import React, { useCallback, useMemo } from 'react';

const App = () => {
    const [formInstance] = useForm();
    const initialValues = useMemo(() => {
        return { name: 'Hello', region: '', date1: '', date2: '', delivery: false, type: [], resource: '', desc: '' };
    }, []);

    const rules = useMemo<FormRules>(() => {
        return {
            name: [
                { required: true, message: '请输入活动名称' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符' },
            ],
            region: [{ required: true, message: '请选择活动区域' }],
            date: {
                date1: [{ type: 'date', required: true, message: '请选择日期' }],
                date2: [{ type: 'date', required: true, message: '请选择时间' }],
            },
            type: [{ type: 'array', required: true, message: '请至少选择一个活动性质' }],
            resource: [{ required: true, message: '请选择活动资源' }],
            desc: [{ required: true, message: '请填写活动形式' }],
        };
    }, []);

    const onSubmit = useCallback(() => {
        formInstance
            .validateFields()
            .then(result => {
                console.log('submit!', result);
            })
            .catch(reason => {
                console.log('error submit!', reason);
            });
    }, [formInstance]);

    const resetForm = useCallback(() => {
        formInstance.resetFields();
    }, [formInstance]);

    return (
        <ElForm form={formInstance} initialValues={initialValues} rules={rules} style={{ width: 800 }}>
            <ElForm.Item name="name" label="活动名称" colon>
                <ElInput />
            </ElForm.Item>
            <ElForm.Item name="region" label="活动区域">
                <ElSelect placeholder="请选择活动区域">
                    <ElSelect.Option label="区域一" value="shanghai" />
                    <ElSelect.Option label="区域二" value="beijing" />
                </ElSelect>
            </ElForm.Item>
            <ElForm.Item label="活动时间">
                <ElRow style={{ width: '100%' }}>
                    <ElCol span={11}>
                        <ElForm.Item name={['date', 'date1']} noStyle>
                            <ElDatePicker type="date" placeholder="选择日期" />
                        </ElForm.Item>
                    </ElCol>
                    <ElCol span={2} style={{ textAlign: 'center' }}>
                        <span style={{ color: 'var(--el-text-color-placeholder)' }}>-</span>
                    </ElCol>
                    <ElCol span={11}>
                        <ElForm.Item name={['date', 'date2']} noStyle>
                            <ElTimePicker placeholder="选择时间" />
                        </ElForm.Item>
                    </ElCol>
                </ElRow>
            </ElForm.Item>
            <ElForm.Item name="delivery" label="即时配送">
                <ElSwitch />
            </ElForm.Item>
            <ElForm.Item name="type" label="活动性质">
                <ElCheckboxGroup name="type">
                    <ElCheckbox value="Online activities">美食/餐厅线上活动</ElCheckbox>
                    <ElCheckbox value="Promotion activities">地推活动</ElCheckbox>
                    <ElCheckbox value="Offline activities">线下主题活动</ElCheckbox>
                    <ElCheckbox value="Simple brand exposure">单纯品牌曝光</ElCheckbox>
                </ElCheckboxGroup>
            </ElForm.Item>
            <ElForm.Item name="resource" label="特殊资源">
                <ElRadioGroup>
                    <ElRadio value="Sponsor">线上品牌商赞助</ElRadio>
                    <ElRadio value="Venue">线下场地免费</ElRadio>
                </ElRadioGroup>
            </ElForm.Item>
            <ElForm.Item name="desc" label="活动形式" validateTrigger="onBlur">
                <ElInput.TextArea />
            </ElForm.Item>
            <ElForm.Item>
                <ElButton type="primary" onClick={onSubmit}>
                    立即创建
                </ElButton>
                <ElButton onClick={resetForm}>重置</ElButton>
            </ElForm.Item>
        </ElForm>
    );
};

export default App;
