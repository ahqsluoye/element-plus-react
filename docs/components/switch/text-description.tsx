import { ElSwitch } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div>
            <ElSwitch defaultValue={true} activeText="按月付费" inactiveText="按年付费" style={{ marginRight: 20 }} />
            <ElSwitch activeText="按月付费" inactiveText="按年付费" activeColor="#13ce66" inactiveColor="#ff4949" style={{ marginRight: 20 }} />
            <div>
                <ElSwitch inlinePrompt activeText="Y" inactiveText="N" style={{ marginRight: 20 }} defaultValue={true} />
                <ElSwitch inlinePrompt activeText="是" inactiveText="否" activeColor="#13ce66" inactiveColor="#ff4949" defaultValue={true} style={{ marginRight: 20 }} />
                <ElSwitch inlinePrompt activeText="超出省略" inactiveText="超出省略" style={{ marginRight: 20 }} width={60} defaultValue={true} />
                <ElSwitch inlinePrompt activeText="完整展示多个内容" inactiveText="多个内容" style={{ marginRight: 20 }} defaultValue={true} />
            </div>
        </div>
    );
};

export default App;
