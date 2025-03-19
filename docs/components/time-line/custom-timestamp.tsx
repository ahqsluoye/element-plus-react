import { ElCard, ElTimeLine, ElTimeLineItem } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElTimeLine>
            <ElTimeLineItem timestamp="2018/4/12" placement="top">
                <ElCard>
                    <h4>更新 Github 模板</h4>
                    <p>王小虎 提交于 2018/4/12 20:46</p>
                </ElCard>
            </ElTimeLineItem>
            <ElTimeLineItem timestamp="2018/4/3" placement="top">
                <ElCard>
                    <h4>更新 Github 模板</h4>
                    <p>王小虎 提交于 2018/4/3 20:46</p>
                </ElCard>
            </ElTimeLineItem>
            <ElTimeLineItem timestamp="2018/4/2" placement="top">
                <ElCard>
                    <h4>更新 Github 模板</h4>
                    <p>王小虎 提交于 2018/4/2 20:46</p>
                </ElCard>
            </ElTimeLineItem>
        </ElTimeLine>
    );
};

export default App;
