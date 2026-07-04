import { ElCheckboxGroup } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    const checkList = ['Value selected and disabled', 'Value A'];
    const props = { label: 'name', value: 'id', disabled: 'unable' };
    const options = [
        { name: 'Option A', id: 'Value A' },
        { name: 'Option B', id: 'Value B' },
        { name: 'Option C', id: 'Value C' },
        { name: 'disabled', id: 'Value disabled', unable: true },
        {
            name: 'selected and disabled',
            id: 'Value selected and disabled',
            unable: true,
        },
    ];

    return <ElCheckboxGroup defaultValue={checkList} props={props} options={options} />;
};

export default App;
