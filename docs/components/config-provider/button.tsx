import { ConfigProviderProps, ElButton, ElCheckbox, ElConfigProvider, ElDivider, ElOption, ElSelect, TypeAttributes } from '@qsxy/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const [config, setConfig] = useState<ConfigProviderProps['button']>({
        autoInsertSpace: true,
        plain: true,
        round: true,
        type: 'default',
    });
    const buttonTypes = ['default', 'primary', 'success', 'warning', 'danger', 'info'];

    return (
        <>
            <div>
                <ElCheckbox checked={config.autoInsertSpace} onChange={checked => setConfig(prev => ({ ...prev, autoInsertSpace: checked }))}>
                    autoInsertSpace
                </ElCheckbox>
                <ElCheckbox checked={config.plain} onChange={checked => setConfig(prev => ({ ...prev, plain: checked }))}>
                    plain
                </ElCheckbox>
                <ElCheckbox checked={config.round} onChange={checked => setConfig(prev => ({ ...prev, round: checked }))}>
                    round
                </ElCheckbox>
                <ElSelect
                    value={config.type}
                    onChange={value => setConfig(prev => ({ ...prev, type: value as TypeAttributes.Appearance }))}
                    clearable={false}
                    style={{ maxWidth: '150px' }}
                >
                    {buttonTypes.map(type => (
                        <ElOption key={type} value={type}>
                            {type}
                        </ElOption>
                    ))}
                </ElSelect>
            </div>
            <ElDivider />
            <ElConfigProvider button={config}>
                <ElButton>中文</ElButton>
            </ElConfigProvider>
        </>
    );
};

export default App;
