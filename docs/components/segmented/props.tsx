import { ElSegmented } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    const props = {
        label: 'myLabel',
        value: 'myValue',
        disabled: 'myDisabled',
    };
    const options = [
        {
            myLabel: 'Mon',
            myValue: 'Mon',
            myDisabled: true,
        },
        {
            myLabel: 'Tue',
            myValue: 'Tue',
        },
        {
            myLabel: 'Wed',
            myValue: 'Wed',
            myDisabled: true,
        },
        {
            myLabel: 'Thu',
            myValue: 'Thu',
        },
        {
            myLabel: 'Fri',
            myValue: 'Fri',
            myDisabled: true,
        },
        {
            myLabel: 'Sat',
            myValue: 'Sat',
        },
        {
            myLabel: 'Sun',
            myValue: 'Sun',
        },
    ];
    return <ElSegmented defaultValue={'Mon'} options={options} props={props} />;
};

export default App;
