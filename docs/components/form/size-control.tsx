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
    TypeAttributes,
    useForm,
} from '@qsxy/element-plus-react';
import React, { useCallback, useMemo, useState } from 'react';

const App = () => {
    const [formInstance] = useForm();
    const [disabled, setDisabled] = useState(false);
    const [size, setSize] = useState<TypeAttributes.Size>('');
    const [labelPosition, setLabelPosition] = useState<'left' | 'right' | 'top'>('right');

    const initialValues = useMemo(() => {
        return { name: '', region: '', date1: '', date2: '', delivery: false, type: [], resource: '', desc: '' };
    }, []);

    const onSubmit = useCallback(() => {
        console.log('submit!');
    }, []);

    return (
        <ElRow>
            <ElCol span={24}>
                <ElRadioGroup value={size} onChange={(value: TypeAttributes.Size) => setSize(value)}>
                    <ElRadio.Button value="large">大</ElRadio.Button>
                    <ElRadio.Button value={''}>默认</ElRadio.Button>
                    <ElRadio.Button value="small">小</ElRadio.Button>
                </ElRadioGroup>
                <ElRadioGroup value={labelPosition} onChange={(value: 'left' | 'right' | 'top') => setLabelPosition(value)} style={{ marginLeft: 20 }}>
                    <ElRadio.Button value="left">Left</ElRadio.Button>
                    <ElRadio.Button value="right">Right</ElRadio.Button>
                    <ElRadio.Button value="top">Top</ElRadio.Button>
                </ElRadioGroup>
                <span style={{ marginLeft: 20 }}>
                    禁用表单：
                    <ElSwitch value={disabled} activeText="是" inactiveText="否" inlinePrompt onChange={(_, checked: boolean) => setDisabled(checked)} />
                </span>
            </ElCol>

            <ElCol span={24}>
                <ElForm form={formInstance} initialValues={initialValues} labelPosition={labelPosition} size={size} disabled={disabled} style={{ marginTop: 20, width: 800 }}>
                    <ElForm.Item name="name" label="活动名称">
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
                            <ElRadio.Button value="Sponsor">线上品牌商赞助</ElRadio.Button>
                            <ElRadio.Button value="Venue">线下场地免费</ElRadio.Button>
                        </ElRadioGroup>
                    </ElForm.Item>
                    <ElForm.Item name="desc" label="活动形式">
                        <ElInput.TextArea />
                    </ElForm.Item>
                    <ElForm.Item center labelWidth="0">
                        <ElButton type="primary" onClick={onSubmit}>
                            立即创建
                        </ElButton>
                        <ElButton>取消</ElButton>
                    </ElForm.Item>
                </ElForm>
            </ElCol>
        </ElRow>
    );
};

export default App;
