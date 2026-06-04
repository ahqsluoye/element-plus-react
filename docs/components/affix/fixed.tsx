import React from 'react';
import { ElAffix, ElButton } from '@qsxy/element-plus-react';

const App = () => {
    return (
        <ElAffix position="bottom" offset={20}>
            <ElButton type="primary">Offset bottom 20px</ElButton>
        </ElAffix>
    );
};

export default App;