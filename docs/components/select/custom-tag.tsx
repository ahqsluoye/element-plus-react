import { ElOption, ElSelect, ElTag } from '@qsxy/element-plus-react';
import React from 'react';
import './custom-header.scss';

const App = () => {
    const colors = [
        {
            value: '#E63415',
            label: 'red',
        },
        {
            value: '#FF6600',
            label: 'orange',
        },
        {
            value: '#FFDE0A',
            label: 'yellow',
        },
        {
            value: '#1EC79D',
            label: 'green',
        },
        {
            value: '#14CCCC',
            label: 'cyan',
        },
        {
            value: '#4167F0',
            label: 'blue',
        },
        {
            value: '#6222C9',
            label: 'purple',
        },
    ];

    return (
        <ElSelect
            defaultValue={colors.map(item => item.value)}
            multiple
            className="custom-tag-select"
            popperClass="custom-tag-select"
            style={{ width: 300 }}
            tag={({ data, selectDisabled, deleteTag }) => (
                <>
                    {data.map(item => (
                        <ElTag key={item.value} color={item.value} disableTransitions />
                    ))}
                </>
            )}
        >
            {colors.map(item => (
                <ElOption key={item.value} value={item.value} label={item.label}>
                    <div className="flex items-center">
                        <ElTag color={item.value} style={{ marginRight: 8 }} size="small" disableTransitions />
                        <span style={{ color: item.value }}>{item.label}</span>
                    </div>
                </ElOption>
            ))}
        </ElSelect>
    );
};

export default App;
