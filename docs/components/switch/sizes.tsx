import { ElSwitch } from '@parker/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const [value, setValue] = useState(false);

    return (
        <div>
            <ElSwitch value={value} onChange={(val: boolean) => setValue(val)} size="large" activeText="开" inactiveText="关" />
            <br />
            <ElSwitch value={value} onChange={(val: boolean) => setValue(val)} activeText="开" inactiveText="关" />
            <br />
            <ElSwitch value={value} onChange={(val: boolean) => setValue(val)} size="small" activeText="开" inactiveText="关" />
        </div>
    );
};

export default App;
