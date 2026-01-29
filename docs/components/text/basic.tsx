import { ElText } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <>
            <ElText className="mx-1">Default</ElText>
            <ElText className="mx-1" type="primary">
                Primary
            </ElText>
            <ElText className="mx-1" type="success">
                Success
            </ElText>
            <ElText className="mx-1" type="info">
                Info
            </ElText>
            <ElText className="mx-1" type="warning">
                Warning
            </ElText>
            <ElText className="mx-1" type="danger">
                Danger
            </ElText>
        </>
    );
};

export default App;
