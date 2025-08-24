import { ElDivider, ElLink } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div>
            <ElLink>default</ElLink>
            <ElDivider direction="vertical" />
            <ElLink underline="always">always</ElLink>
            <ElDivider direction="vertical" />
            <ElLink underline="hover">hover</ElLink>
            <ElDivider direction="vertical" />
            <ElLink underline="never">never</ElLink>
        </div>
    );
};

export default App;
