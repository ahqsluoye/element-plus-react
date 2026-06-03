import React, { useState } from 'react';
import { ElSteps, ElStep, ElButton } from '@qsxy/element-plus-react';

const App = () => {
    const [active, setActive] = useState(0);

    const next = () => {
        setActive(prev => {
            if (prev >= 2) return 0;
            return prev + 1;
        });
    };

    return (
        <>
            <ElSteps style={{ maxWidth: 600 }} active={active} finishStatus="success">
                <ElStep title="Step 1" />
                <ElStep title="Step 2" />
                <ElStep title="Step 3" />
            </ElSteps>
            <ElButton style={{ marginTop: 12 }} onClick={next}>
                Next step
            </ElButton>
        </>
    );
};

export default App;