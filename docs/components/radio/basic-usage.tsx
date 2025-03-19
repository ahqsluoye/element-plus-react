import { ElRadio, ElRadioGroup } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div>
            <ElRadioGroup defaultValue={0}>
                <ElRadio value={0}>备选项 1</ElRadio>
                <ElRadio value={1}>备选项 2</ElRadio>
            </ElRadioGroup>
        </div>
    );
};

export default App;
