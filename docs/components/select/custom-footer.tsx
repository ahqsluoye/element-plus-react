import { ElButton, ElInput, ElOption, ElSelect } from '@qsxy/element-plus-react';
import React, { useState } from 'react';
import './custom-header.scss';

const App = () => {
    const [isAdding, setIsAdding] = useState(false);
    const [optionName, setOptionName] = useState('');
    const [value, setValue] = useState([]);
    const [cities, setCities] = useState([
        {
            value: 'Beijing',
            label: 'Beijing',
        },
        {
            value: 'Shanghai',
            label: 'Shanghai',
        },
        {
            value: 'Nanjing',
            label: 'Nanjing',
        },
        {
            value: 'Chengdu',
            label: 'Chengdu',
        },
        {
            value: 'Shenzhen',
            label: 'Shenzhen',
        },
        {
            value: 'Guangzhou',
            label: 'Guangzhou',
        },
    ]);

    const onAddOption = () => {
        setIsAdding(true);
    };

    const onConfirm = () => {
        if (optionName) {
            setCities(prev => [
                ...prev,
                {
                    label: optionName,
                    value: optionName,
                },
            ]);
            clear();
        }
    };

    const clear = () => {
        setOptionName('');
        setIsAdding(false);
    };

    const onChange = (val: string[], data: any) => {
        console.log(val, data);
        setValue(val);
    };

    return (
        <ElSelect
            value={value}
            multiple
            style={{ width: 300 }}
            onChange={onChange}
            footer={
                <>
                    {!isAdding ? (
                        <ElButton text bg size="small" onClick={onAddOption}>
                            Add an option
                        </ElButton>
                    ) : (
                        <>
                            <ElInput className="option-input" placeholder="input option name" size="small" value={optionName} onChange={val => setOptionName(val + '')}></ElInput>
                            <ElButton type="primary" size="small" onClick={onConfirm}>
                                confirm
                            </ElButton>
                            <ElButton size="small" onClick={clear}>
                                cancel
                            </ElButton>
                        </>
                    )}
                </>
            }
        >
            {cities.map(city => (
                <ElOption key={city.value} value={city.value} label={city.label} />
            ))}
        </ElSelect>
    );
};

export default App;
