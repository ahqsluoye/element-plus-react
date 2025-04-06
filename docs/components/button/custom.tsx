import { ElButton } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div className="mb-4">
            <ElButton color="#626aef">Default</ElButton>
            <ElButton color="#626aef" plain>
                Plain
            </ElButton>
            <ElButton color="#626aef" disabled>
                Disabled
            </ElButton>
            <ElButton color="#626aef" plain disabled>
                Disabled Plain
            </ElButton>
        </div>
    );
};

export default App;
