import { ElAffix, ElButton } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElAffix offset={120}>
            <ElButton type="primary">Offset top 120px</ElButton>
        </ElAffix>
    );
};

export default App;
