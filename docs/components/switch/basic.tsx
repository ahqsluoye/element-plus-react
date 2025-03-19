import { ElSwitch } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div>
            <ElSwitch defaultValue={true} style={{ marginRight: 20 }} />
            <ElSwitch activeColor="#13ce66" inactiveColor="#ff4949" activeValue="是" inactiveValue="否" style={{ marginRight: 20 }} />
            <ElSwitch activeValue="是" inactiveValue="否" style={{ '--el-switch-on-color': '#13ce66', '--el-switch-off-color': '#ff4949' }} />
        </div>
    );
};

export default App;
