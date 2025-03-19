import { ElSwitch } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div>
            <ElSwitch loading style={{ marginRight: 20 }} />
            <ElSwitch defaultValue={true} loading />
        </div>
    );
};

export default App;
