import { CardProps, ConfigProviderProps, ElCard, ElConfigProvider, ElDivider, ElRadio, ElRadioGroup } from '@qsxy/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const [config, setConfig] = useState<ConfigProviderProps['card']>({
        shadow: 'always',
    });

    return (
        <>
            Shadow:
            <div>
                <ElRadioGroup value={config.shadow} onChange={(value: CardProps['shadow']) => setConfig(prev => ({ ...prev, shadow: value }))}>
                    <ElRadio value="always">always</ElRadio>
                    <ElRadio value="hover">hover</ElRadio>
                    <ElRadio value="never">never</ElRadio>
                </ElRadioGroup>
                <ElDivider />
                <ElConfigProvider card={config}>
                    <ElCard>Card desu!</ElCard>
                </ElConfigProvider>
            </div>
        </>
    );
};

export default App;
