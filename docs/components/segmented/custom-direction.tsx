import { ElIcon, ElSegmented, ElSpace, IconName } from '@qsxy/element-plus-react';
import React, { useState } from 'react';

type SegmentedOption = {
    label: string;
    value: string;
    icon: IconName;
    disabled?: boolean;
};

const App = () => {
    const [value, setValue] = useState('Apple');
    const [direction, setDirection] = useState<'horizontal' | 'vertical'>('horizontal');
    const [size, setSize] = useState<'large' | 'default' | 'small'>('default');

    const directionOptions = [
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Vertical', value: 'vertical' },
    ];

    const sizeOptions = ['large', 'default', 'small'];

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
            disabled: true,
        },
    ];

    return (
        <div>
            <ElSegmented value={size} onChange={setSize} options={sizeOptions} style={{ marginBottom: '1rem' }} />
            <br />
            <ElSegmented value={direction} onChange={setDirection} options={directionOptions} style={{ marginBottom: '1rem' }} />
            <br />
            <ElSegmented value={value} onChange={setValue} options={options} direction={direction} size={size}>
                {(item: SegmentedOption) => (
                    <ElSpace direction="vertical" style={{ padding: '10px 5px' }}>
                        <ElIcon size="2x" name={item.icon}></ElIcon>
                        <div>{item.label}</div>
                    </ElSpace>
                )}
            </ElSegmented>
        </div>
    );
};

export default App;
