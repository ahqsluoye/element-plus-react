import { ElRadio, ElRadioGroup } from '@parker/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const [radio, setRadio] = useState('9');
    return (
        <ElRadioGroup value={radio} onChange={(value: string) => setRadio(value)}>
            <ElRadio value="3">Option A</ElRadio>
            <ElRadio value="6">Option B</ElRadio>
            <ElRadio value="9">Option C</ElRadio>
        </ElRadioGroup>
    );
};

export default App;
