import { ConfigProviderProps, ElConfigProvider } from '@qsxy/element-plus-react';
import React from 'react';
import Message from './messageApp';

const App = () => {
    const config: ConfigProviderProps['message'] = {
        showClose: true,
        grouping: true,
    };

    return (
        <>
            <ElConfigProvider message={config}>
                <Message />
            </ElConfigProvider>
        </>
    );
};

export default App;
