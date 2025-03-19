import { ElCol, ElRow } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <>
            <ElRow gutter={20}>
                <ElCol span={6}>
                    <div className="grid-content ep-bg-purple" />
                </ElCol>
                <ElCol span={6} offset={6}>
                    <div className="grid-content ep-bg-purple" />
                </ElCol>
            </ElRow>
            <ElRow gutter={20}>
                <ElCol span={6} offset={6} pull={1}>
                    <div className="grid-content ep-bg-purple" />
                </ElCol>
                <ElCol span={6} offset={6}>
                    <div className="grid-content ep-bg-purple" />
                </ElCol>
            </ElRow>
            <ElRow gutter={20}>
                <ElCol span={12} offset={6} push={4}>
                    <div className="grid-content ep-bg-purple" />
                </ElCol>
            </ElRow>
        </>
    );
};

export default App;
