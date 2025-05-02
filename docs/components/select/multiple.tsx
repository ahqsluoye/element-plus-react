import { ElCol, ElOption, ElRow, ElSelect } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElRow gutter={15}>
            <ElCol span={24}>
                <div style={{ marginBottom: 10 }}>default</div>
                <ElSelect multiple style={{ width: 300 }}>
                    <ElOption value="1" label="黄金糕" />
                    <ElOption value="2" label="双皮奶" />
                    <ElOption value="3" label="蚵仔煎" />
                    <ElOption value="4" label="龙须面" />
                    <ElOption value="5" label="北京烤鸭" />
                </ElSelect>
            </ElCol>
            <ElCol span={24}>
                <div style={{ marginTop: 10, marginBottom: 10 }}>use collapse-tags</div>
                <ElSelect multiple collapseTags collapseTagsTooltip={false} style={{ width: 300 }}>
                    <ElOption value="1" label="黄金糕" />
                    <ElOption value="2" label="双皮奶" />
                    <ElOption value="3" label="蚵仔煎" />
                    <ElOption value="4" label="龙须面" />
                    <ElOption value="5" label="北京烤鸭" />
                </ElSelect>
            </ElCol>
            <ElCol span={24}>
                <div style={{ marginTop: 10, marginBottom: 10 }}>use collapse-tags-tooltip</div>
                <ElSelect multiple collapseTags collapseTagsTooltip tagType="danger" style={{ width: 300 }}>
                    <ElOption value="1" label="黄金糕" />
                    <ElOption value="2" label="双皮奶" />
                    <ElOption value="3" label="蚵仔煎" />
                    <ElOption value="4" label="龙须面" />
                    <ElOption value="5" label="北京烤鸭" />
                </ElSelect>
            </ElCol>
            <ElCol span={24}>
                <div style={{ marginTop: 10, marginBottom: 10 }}>use collapse-tags</div>
                <ElSelect multiple collapseTags collapseTagsTooltip maxCollapseTags={3} style={{ width: 300 }}>
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
