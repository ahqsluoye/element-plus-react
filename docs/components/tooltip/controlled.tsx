import { ElButton, ElTooltip } from '@parker/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const [visible, setVisible] = useState(false);

    return (
        <ElTooltip content="Content" placement="top" visible={visible} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
            <ElButton>Hover me</ElButton>
        </ElTooltip>
    );
};

export default App;
