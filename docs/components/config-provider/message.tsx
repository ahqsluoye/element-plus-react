import { ConfigProviderProps, ElButton, ElConfigProvider, ElMessage } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    const config: ConfigProviderProps['message'] = {
        showClose: false,
    };

    const open = () => {
        ElMessage.success('This is a message from bottom.');
    };

    return (
        <>
            <ElConfigProvider message={config}>
                <ElButton onClick={open}>OPEN</ElButton>
            </ElConfigProvider>
        </>
    );
};

export default App;
