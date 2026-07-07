import { ElSelect } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    const props = {
        value: 'id',
        label: 'label',
        options: 'options',
        disabled: 'disabled',
        data: 'id',
    };

    const options = [
        {
            id: 'Option1',
            label: 'Option1',
        },
        {
            id: 'Option2',
            label: 'Option2',
            disabled: true,
        },
        {
            id: 'Option3',
            label: 'Option3',
        },
        {
            id: 'Option4',
            label: 'Option4',
        },
        {
            id: 'Option5',
            label: '分组',
            options: [
                {
                    id: 'Option5-1',
                    label: 'Option5-1',
                },
                {
                    id: 'Option5-2',
                    label: 'Option5-2',
                },
                {
                    id: 'Option5-3',
                    label: 'Option5-3',
                },
            ],
        },
    ];

    return <ElSelect props={props} options={options} placeholder="Select" style={{ width: 300 }} onChange={console.log} />;
};

export default App;
