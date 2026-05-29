import { ElButton, ElDivider, ElSpace } from '@qsxy/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const [size, setSize] = useState(10);

    return (
        <ElSpace size={size} spacer={<ElDivider direction="vertical" />}>
            {Array.from({ length: 2 }).map((_, i) => (
                <ElButton key={i}>button {i + 1}</ElButton>
            ))}
        </ElSpace>
    );
};

export default App;
