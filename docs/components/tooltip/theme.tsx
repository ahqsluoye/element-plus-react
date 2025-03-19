import { ElButton, ElTooltip } from '@qsxy/element-plus-react';
import React from 'react';
import './theme.scss';

const App = () => {
    return (
        <div className="box">
            <ElTooltip content="Top center" placement="top" className="item">
                <ElButton>Dark</ElButton>
            </ElTooltip>
            <ElTooltip content="Bottom center" placement="bottom" effect="light" className="item">
                <ElButton>Light</ElButton>
            </ElTooltip>

            <ElTooltip content="Bottom center" effect="customized" className="item">
                <ElButton>Customized theme</ElButton>
            </ElTooltip>
        </div>
    );
};

export default App;
