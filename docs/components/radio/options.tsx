import { ElRadioGroup } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    const props = { value: 'id', label: 'name', disabled: 'unable' };
    const options = [
        {
            id: 3,
            name: 'Option A',
        },
        {
            id: 6,
            name: 'Option B',
        },
        {
            id: 9,
            name: 'Option C',
            unable: true,
        },
    ];

    return <ElRadioGroup defaultValue={3} props={props} options={options} />;
};

export default App;
