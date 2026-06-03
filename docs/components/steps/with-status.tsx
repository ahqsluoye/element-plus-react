import { ElStep, ElSteps } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElSteps style={{ maxWidth: 600 }} space={200} active={2} finishStatus="success">
            <ElStep title="Done" />
            <ElStep title="Processing" />
            <ElStep title="Step 3" />
        </ElSteps>
    );
};

export default App;
