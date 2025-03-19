import { ElSwitch } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <>
            <div>
                <ElSwitch defaultValue={true} activeIcon="check" inactiveIcon="close" />
            </div>
            <div>
                <ElSwitch defaultValue={true} inlinePrompt activeIcon="check" inactiveIcon="close" />
            </div>
        </>
    );
};

export default App;
