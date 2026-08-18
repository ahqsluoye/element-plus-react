import type { ConfigProviderProps } from '@qsxy/element-plus-react';
import { ElConfigProvider, ElDatePicker, ElDateTimePicker, ElDivider, ElSegmented, ElSpace } from '@qsxy/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const [config, setConfig] = useState<ConfigProviderProps['datePicker']>({
        isoWeek: false,
    });

    return (
        <>
            isoWeek:
            <div>
                <ElSegmented
                    value={config.isoWeek}
                    options={[
                        { label: 'false', value: false },
                        { label: 'true', value: true },
                    ]}
                    onChange={(value: boolean) => setConfig(prev => ({ ...prev, isoWeek: value }))}
                ></ElSegmented>
                <ElDivider />
                <ElConfigProvider datePicker={config}>
                    <ElSpace>
                        <ElDatePicker type="date" />
                        <ElDateTimePicker placeholder="请选择日期时间" />
                    </ElSpace>
                </ElConfigProvider>
            </div>
        </>
    );
};

export default App;
