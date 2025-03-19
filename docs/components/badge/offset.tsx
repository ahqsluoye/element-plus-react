import { ElBadge, ElButton } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElBadge value={12} offset={[10, 5]}>
            <ElButton>offset</ElButton>
        </ElBadge>
    );
};

export default App;
