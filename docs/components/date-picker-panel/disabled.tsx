import { ElDatePickerPanel, ElSpace, ElSwitch } from '@qsxy/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const [disabled, setDisabled] = useState(true);
    return (
        <ElSpace style={{ width: '100%' }} justify="center" alignment="center">
            <ElSpace style={{ width: '320px' }} justify="center" alignment="center" fill>
                <ElSwitch value={disabled} onChange={setDisabled} activeText="Disabled" inactiveText="Enabled" />
                <ElDatePickerPanel disabled={disabled} />
            </ElSpace>
        </ElSpace>
    );
};

export default App;
