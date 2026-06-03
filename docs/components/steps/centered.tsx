import React from 'react';
import { ElSteps, ElStep } from '@qsxy/element-plus-react';

const App = () => {
    return (
        <ElSteps style={{ maxWidth: 600 }} active={2} alignCenter>
            <ElStep title="Step 1" description="Some description" />
            <ElStep title="Step 2" description="Some description" />
            <ElStep title="Step 3" description="Some description" />
        </ElSteps>
    );
};

export default App;