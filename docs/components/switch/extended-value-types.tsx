import { ElSwitch, ElTooltip } from '@qsxy/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const [value, setValue] = useState('0');

    return (
        <ElTooltip content={'当前值：' + value} placement="top">
            <ElSwitch value={value} onChange={(val: string) => setValue(val)} activeColor="#13ce66" inactiveColor="#ff4949" activeValue="100" inactiveValue="0" />
        </ElTooltip>
    );
};

export default App;
