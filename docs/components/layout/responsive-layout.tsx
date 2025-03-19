import { ElCol, ElRow } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElRow gutter={10}>
            <ElCol xs={8} sm={6} md={4} lg={3} xl={1}>
                <div className="grid-content ep-bg-purple" />
            </ElCol>
            <ElCol xs={4} sm={6} md={8} lg={9} xl={11}>
                <div className="grid-content ep-bg-purple-light" />
            </ElCol>
            <ElCol xs={4} sm={6} md={8} lg={9} xl={11}>
                <div className="grid-content ep-bg-purple" />
            </ElCol>
            <ElCol xs={8} sm={6} md={4} lg={3} xl={1}>
                <div className="grid-content ep-bg-purple-light" />
            </ElCol>
        </ElRow>
    );
};

export default App;
