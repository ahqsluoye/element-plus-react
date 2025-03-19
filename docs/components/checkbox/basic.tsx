import { ElCheckbox } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <>
            <div>
                <ElCheckbox size="large">Option 1</ElCheckbox>
                <ElCheckbox size="large">Option 2</ElCheckbox>
            </div>
            <div>
                <ElCheckbox>Option 1</ElCheckbox>
                <ElCheckbox>Option 2</ElCheckbox>
            </div>
            <div>
                <ElCheckbox size="small">Option 1</ElCheckbox>
                <ElCheckbox size="small">Option 2</ElCheckbox>
            </div>
        </>
    );
};

export default App;
