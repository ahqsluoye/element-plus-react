import { ElCol, ElRow } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElRow gutter={20}>
            <ElCol span={6}>
                <div className="grid-content ep-bg-purple" />
            </ElCol>
            <ElCol span={6}>
                <div className="grid-content ep-bg-purple" />
            </ElCol>
            <ElCol span={6}>
                <div className="grid-content ep-bg-purple" />
            </ElCol>
            <ElCol span={6}>
                <div className="grid-content ep-bg-purple" />
            </ElCol>
        </ElRow>
    );
};

export default App;
