import { ElCheckbox, ElCheckboxGroup } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'];

    return (
        <ElCheckboxGroup defaultValue={['Shanghai', 'Beijing']} min={1} max={2}>
            {cities.map(item => (
                <ElCheckbox key={item} value={item}>
                    {item}
                </ElCheckbox>
            ))}
        </ElCheckboxGroup>
    );
};

export default App;
