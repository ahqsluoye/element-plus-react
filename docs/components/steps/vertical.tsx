import React from 'react';
import { ElSteps, ElStep } from '@qsxy/element-plus-react';

const App = () => {
    return (
        <div style={{ height: 300, maxWidth: 600 }}>
            <ElSteps direction="vertical" active={1}>
                <ElStep title="Step 1" />
                <ElStep title="Step 2" />
                <ElStep title="Step 3" />
            </ElSteps>
        </div>
    );
};

export default App;