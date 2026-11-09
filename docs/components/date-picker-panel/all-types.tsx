import { DateType, ElDatePickerPanel, ElOption, ElSelect } from '@qsxy/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const types = [
        'year',
        'years',
        'month',
        'months',
        'date',
        'dates',
        'week',
        'quarter',
        'quarters',
        // 'quarterrange',
        // 'datetime',
        // 'datetimerange',
        'daterange',
        'monthrange',
        'yearrange',
    ];
    const [type, setType] = useState<DateType>('date');
    const [value, setValue] = useState<string | number | string[] | Date | Date[] | number[]>();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, width: '100%' }}>
            <ElSelect
                value={type}
                onChange={val => {
                    setType(val as DateType);
                    setValue('');
                }}
                style={{ width: 250 }}
            >
                {types.map(optionType => (
                    <ElOption key={optionType} value={optionType} label={optionType} />
                ))}
            </ElSelect>
            <ElDatePickerPanel type={type} value={value} onChange={val => setValue(val)} />
        </div>
    );
};

export default App;
