import { ElIcon, ElSegmented, ElSpace, IconName } from '@qsxy/element-plus-react';
import React from 'react';

type SegmentedOption = {
    label: string;
    value: string;
    icon: IconName;
    disabled?: boolean;
};

const App = () => {
    const options: SegmentedOption[] = [
        {
            label: 'Apple',
            value: 'Apple',
            icon: 'apple-whole',
        },
        {
            label: 'Cherry',
            value: 'Cherry',
            icon: 'cherries',
        },
        {
            label: 'Grape',
            value: 'Grape',
            icon: 'grapes',
        },
        {
            label: 'Banana',
            value: 'Banana',
            icon: 'banana',
        },
        {
            label: 'Pear',
            value: 'Pear',
            icon: 'pear',
        },
        {
            label: 'Watermelon',
            value: 'Watermelon',
            icon: 'melon',
        },
    ];

    return (
        <ElSegmented defaultValue={'Apple'} options={options}>
            {(item: SegmentedOption) => (
                <ElSpace direction="vertical" style={{ padding: '10px 5px' }}>
                    <ElIcon size="2x" name={item.icon}></ElIcon>
                    <div>{item.label}</div>
                </ElSpace>
            )}
        </ElSegmented>
    );
};

export default App;
