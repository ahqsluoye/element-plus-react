import { ElCheckbox } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div>
            <ElCheckbox disabled>Disabled</ElCheckbox>
            <ElCheckbox disabled checked>
                Disabled Checked
            </ElCheckbox>
            <ElCheckbox>Not disabled</ElCheckbox>
        </div>
    );
};

export default App;
