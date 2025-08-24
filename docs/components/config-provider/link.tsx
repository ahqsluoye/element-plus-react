import { ConfigProviderProps, ElCol, ElConfigProvider, ElDivider, ElLink, ElOption, ElRow, ElSelect, TypeAttributes } from '@qsxy/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const [config, setConfig] = useState<ConfigProviderProps['link']>({
        type: 'success',
        underline: 'always',
    });
    const buttonTypes = ['default', 'primary', 'success', 'warning', 'danger', 'info'];
    const underlineOptions = ['always', 'never', 'hover'];

    return (
        <>
            <ElRow>
                <ElCol span={3}>
                    <span>Type:</span>
                    <ElSelect
                        value={config.type}
                        onChange={value => setConfig(prev => ({ ...prev, type: value as TypeAttributes.Appearance }))}
                        clearable={false}
                        style={{ maxWidth: '150px', marginLeft: 15 }}
                    >
                        {buttonTypes.map(type => (
                            <ElOption key={type} value={type}>
                                {type}
                            </ElOption>
                        ))}
                    </ElSelect>
                </ElCol>
                <ElCol span={4}>
                    <span>Underline:</span>
                    <ElSelect
                        value={config.underline}
                        onChange={value => setConfig({ ...config, underline: value as 'always' | 'hover' | 'never' })}
                        clearable={false}
                        style={{ maxWidth: '150px', marginLeft: 15 }}
                    >
                        {underlineOptions.map(type => (
                            <ElOption key={type} value={type}>
                                {type}
                            </ElOption>
                        ))}
                    </ElSelect>
                </ElCol>
            </ElRow>
            <ElDivider />
            <ElConfigProvider link={config}>
                <ElLink>Link desu!</ElLink>
            </ElConfigProvider>
        </>
    );
};

export default App;
