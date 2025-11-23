import { ElCol, ElOption, ElRow, ElSelect } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    const onChange = (value: string, data: any) => {
        console.log(value, data);
    };

    return (
        <ElRow gutter={15}>
            <ElCol span={24}>
                <div style={{ marginBottom: 10 }}>default</div>
                <ElSelect multiple style={{ width: 300 }} onChange={onChange} defaultValue={['1', '2']}>
                    <ElOption value="1" label="黄金糕" data={{ value: 1, label: '黄金糕', price: 999 }} />
                    <ElOption value="2" label="双皮奶" data={{ value: 2, label: '双皮奶', price: 1999, no: 999 }} />
                    <ElOption value="3" label="蚵仔煎" data={{ value: 3, label: '蚵仔煎', price: 2999 }} />
                    <ElOption value="4" label="龙须面" data={{ value: 4, label: '龙须面', price: 3999 }} />
                    <ElOption value="5" label="北京烤鸭" data={{ value: 5, label: '北京烤鸭', price: 4999 }} />
                </ElSelect>
            </ElCol>
            <ElCol span={24}>
                <div style={{ marginTop: 10, marginBottom: 10 }}>use collapse-tags</div>
                <ElSelect multiple collapseTags collapseTagsTooltip={false} style={{ width: 300 }} onChange={onChange}>
                    <ElOption value="1" label="黄金糕" />
                    <ElOption value="2" label="双皮奶" />
                    <ElOption value="3" label="蚵仔煎" />
                    <ElOption value="4" label="龙须面" />
                    <ElOption value="5" label="北京烤鸭" />
                </ElSelect>
            </ElCol>
            <ElCol span={24}>
                <div style={{ marginTop: 10, marginBottom: 10 }}>use collapse-tags-tooltip</div>
                <ElSelect multiple collapseTags collapseTagsTooltip tagType="danger" style={{ width: 300 }} onChange={onChange}>
                    <ElOption value="1" label="黄金糕" />
                    <ElOption value="2" label="双皮奶" />
                    <ElOption value="3" label="蚵仔煎" />
                    <ElOption value="4" label="龙须面" />
                    <ElOption value="5" label="北京烤鸭" />
                </ElSelect>
            </ElCol>
            <ElCol span={24}>
                <div style={{ marginTop: 10, marginBottom: 10 }}>use collapse-tags</div>
                <ElSelect multiple collapseTags collapseTagsTooltip maxCollapseTags={3} style={{ width: 300 }} onChange={onChange}>
                    <ElOption value="1" label="黄金糕" />
                    <ElOption value="2" label="双皮奶" />
                    <ElOption value="3" label="蚵仔煎" />
                    <ElOption value="4" label="龙须面" />
                    <ElOption value="5" label="北京烤鸭" />
                </ElSelect>
            </ElCol>
        </ElRow>
    );
};

export default App;
