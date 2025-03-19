import { ElDivider, ElLink } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div>
            <ElLink>无下划线</ElLink>
            <ElDivider direction="vertical" />
            <ElLink underline>有下划线</ElLink>
        </div>
    );
};

export default App;
