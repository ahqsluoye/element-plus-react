import {
    ElButton,
    ElCheckbox,
    ElCheckboxGroup,
    ElCol,
    ElDatePicker,
    ElDrawer,
    ElForm,
    ElInput,
    ElOption,
    ElRadio,
    ElRadioGroup,
    ElRow,
    ElSelect,
    ElSwitch,
    ElTimePicker,
    useForm,
} from '@qsxy/element-plus-react';
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
            <ElDrawer visible={visible} close={onClose} title="标题">
                <ElDrawer.body>
                    <ElForm form={formInstance} initialValues={initialValues} labelWidth={80}>
                        <ElForm.Item name="name" label="活动名称">
                            <ElInput />
                        </ElForm.Item>
                        <ElForm.Item name="region" label="活动区域">
                            <ElSelect placeholder="请选择活动区域">
                                <ElOption label="区域一" value="shanghai" />
                                <ElOption label="区域二" value="beijing" />
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
                        <ElForm.Item name="desc" label="活动形式">
                            <ElInput.TextArea />
                        </ElForm.Item>
                        <ElForm.Item>
                            <ElButton type="primary">立即创建</ElButton>
                            <ElButton>取消</ElButton>
                        </ElForm.Item>
                    </ElForm>
                </ElDrawer.body>
            </ElDrawer>
        </>
    );
};

export default App;
