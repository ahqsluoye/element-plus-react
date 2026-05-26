import { ElSegmented, ElSpace } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    const options = [
        {
            label: 'Mon',
            value: 'Mon',
            disabled: true,
        },
        {
            label: 'Tue',
            value: 'Tue',
        },
        {
            label: 'Wed',
            value: 'Wed',
            disabled: true,
        },
        {
            label: 'Thu',
            value: 'Thu',
        },
        {
            label: 'Fri',
            value: 'Fri',
            disabled: true,
        },
        {
            label: 'Sat',
            value: 'Sat',
        },
        {
            label: 'Sun',
            value: 'Sun',
        },
    ];
    return (
        <ElSpace direction="vertical" size={12}>
            <ElSegmented defaultValue={'Mon'} options={options} disabled />
            <ElSegmented defaultValue={'Mon'} options={options} />
        </ElSpace>
    );
};

export default App;
