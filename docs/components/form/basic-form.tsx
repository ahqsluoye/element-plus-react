import {
    ElButton,
    ElCheckbox,
    ElCheckboxGroup,
    ElCol,
    ElDatePicker,
    ElForm,
    ElFormItem,
    ElInput,
    ElOption,
    ElRadio,
    ElRadioGroup,
    ElRow,
    ElSelect,
    ElSpace,
    ElSwitch,
    ElTextArea,
    ElTimePicker,
    useForm,
} from '@qsxy/element-plus-react';
import React, { useCallback, useMemo } from 'react';

const App = () => {
    const [formInstance] = useForm();
    const initialValues = useMemo(() => {
        return { name: '', region: '', date1: '', date2: '', delivery: false, type: [], resource: '', desc: '' };
    }, []);

    const onSubmit = useCallback(() => {
        console.log('submit!');
    }, []);

    return (
        <ElForm form={formInstance} initialValues={initialValues} style={{ width: 800 }}>
            <ElFormItem name="name" label="活动名称" help="请输入活动名称">
                <ElInput />
            </ElFormItem>
            <ElFormItem name="region" label="活动区域">
                <ElSelect placeholder="请选择活动区域">
                    <ElOption label="区域一" value="shanghai" />
                    <ElOption label="区域二" value="beijing" />
                </ElSelect>
            </ElFormItem>
            <ElFormItem label="活动时间">
                <ElRow style={{ width: '100%' }}>
                    <ElCol span={11}>
                        <ElFormItem name={['date', 'date1']} noStyle>
                            <ElDatePicker type="date" placeholder="选择日期" />
                        </ElFormItem>
                    </ElCol>
                    <ElCol span={2} style={{ textAlign: 'center' }}>
                        <span style={{ color: 'var(--el-text-color-placeholder)' }}>-</span>
                    </ElCol>
                    <ElCol span={11}>
                        <ElFormItem name={['date', 'date2']} noStyle>
                            <ElTimePicker placeholder="选择时间" />
                        </ElFormItem>
                    </ElCol>
                </ElRow>
            </ElFormItem>
            <ElFormItem name="delivery" label="即时配送">
                <ElSwitch />
            </ElFormItem>
            <ElFormItem name="type" label="活动性质">
                <ElCheckboxGroup name="type">
                    <ElCheckbox value="Online activities">美食/餐厅线上活动</ElCheckbox>
                    <ElCheckbox value="Promotion activities">地推活动</ElCheckbox>
                    <ElCheckbox value="Offline activities">线下主题活动</ElCheckbox>
                    <ElCheckbox value="Simple brand exposure">单纯品牌曝光</ElCheckbox>
                </ElCheckboxGroup>
            </ElFormItem>
            <ElFormItem name="resource" label="特殊资源">
                <ElRadioGroup>
                    <ElRadio value="Sponsor">线上品牌商赞助</ElRadio>
                    <ElRadio value="Venue">线下场地免费</ElRadio>
                </ElRadioGroup>
            </ElFormItem>
            <ElFormItem name="desc" label="活动形式">
                <ElTextArea />
            </ElFormItem>
            <ElSpace justify="center" style={{ width: '100%' }}>
                <ElFormItem>
                    <ElButton type="primary" onClick={onSubmit}>
                        立即创建
                    </ElButton>
                    <ElButton>取消</ElButton>
                </ElFormItem>
            </ElSpace>
        </ElForm>
    );
};

export default App;
