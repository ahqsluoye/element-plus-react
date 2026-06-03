import { ElStep, ElSteps } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElSteps style={{ maxWidth: 600 }} active={1}>
            <ElStep title="Step 1" icon="edit" />
            <ElStep title="Step 2" icon="upload" />
            <ElStep title="Step 3" icon="image" />
        </ElSteps>
    );
};

export default App;
