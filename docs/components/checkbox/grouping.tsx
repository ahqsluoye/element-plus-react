import { ElCheckbox, ElCheckboxGroup } from '@parker/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const [checkList] = useState(['selected and disabled', 'Option A']);

    return (
        <div>
            <ElCheckboxGroup defaultValue={checkList}>
                <ElCheckbox value="Option A">Option A</ElCheckbox>
                <ElCheckbox value="Option B">Option B</ElCheckbox>
                <ElCheckbox value="Option C">Option C</ElCheckbox>
                <ElCheckbox value="disabled" disabled>
                    disabled
                </ElCheckbox>
                <ElCheckbox value="selected and disabled" disabled>
                    selected and disabled
                </ElCheckbox>
            </ElCheckboxGroup>
            <div>
                <ElCheckboxGroup defaultValue={true}>
                    <ElCheckbox>Option A</ElCheckbox>
                </ElCheckboxGroup>
            </div>
        </div>
    );
};

export default App;
