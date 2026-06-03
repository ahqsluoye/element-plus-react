import { ElStep, ElSteps } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <>
            <ElSteps className="mb-4" style={{ maxWidth: 600 }} space={200} active={1} simple>
                <ElStep title="Step 1" icon="edit" />
                <ElStep title="Step 2" icon="upload" />
                <ElStep title="Step 3" icon="image" />
            </ElSteps>
            <ElSteps style={{ maxWidth: 600 }} active={1} finishStatus="success" simple>
                <ElStep title="Step 1" />
                <ElStep title="Step 2" />
                <ElStep title="Step 3" />
            </ElSteps>
        </>
    );
};

export default App;
