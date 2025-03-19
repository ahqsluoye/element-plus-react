import { ElSwitch } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div>
            <ElSwitch disabled style={{ marginRight: 20 }} />
            <ElSwitch defaultValue={true} disabled />
        </div>
    );
};

export default App;
