import { ElCol, ElInputNumber, ElRow } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElRow>
            <ElCol span={8}>
                <ElInputNumber controlsPositionRight min={0} size="large" style={{ width: 200 }} />
            </ElCol>
            <ElCol span={8}>
                <ElInputNumber controlsPositionRight min={0} style={{ width: 200 }} />
            </ElCol>
            <ElCol span={8}>
                <ElInputNumber controlsPositionRight min={0} size="small" style={{ width: 200 }} />
            </ElCol>
        </ElRow>
    );
};

export default App;
