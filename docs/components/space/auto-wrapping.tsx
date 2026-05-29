import { ElButton, ElSpace } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElSpace wrap>
            {Array.from({ length: 20 }).map((_, i) => (
                <ElButton key={i} text>
                    Text button
                </ElButton>
            ))}
        </ElSpace>
    );
};

export default App;
