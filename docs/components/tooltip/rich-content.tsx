import { ElButton, ElTooltip } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElTooltip
            enterable
            showArrow={false}
            hideAfter={1000}
            content={
                <span>
                    多行信息
                    <br />
                    第二行信息
                </span>
            }
            placement="top"
            className="item"
        >
            <ElButton>Top center</ElButton>
        </ElTooltip>
    );
};

export default App;
