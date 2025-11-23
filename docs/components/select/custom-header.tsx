import { ElCheckbox, ElOption, ElSelect } from '@qsxy/element-plus-react';
import React, { useEffect, useState } from 'react';
import './custom-header.scss';

const App = () => {
    const [checkAll, setCheckAll] = useState(false);
    const [indeterminate, setIndeterminate] = useState(false);
    const [value, setValue] = useState([]);
    const cities = [
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
    ];

    useEffect(() => {
        if (value.length === 0) {
            setCheckAll(false);
            setIndeterminate(false);
        } else if (value.length === cities.length) {
            setCheckAll(true);
            setIndeterminate(false);
        } else {
            setIndeterminate(true);
        }
    }, [value]);

    const handleCheckAll = val => {
        setIndeterminate(false);
        if (val) {
            setValue(cities.map(_ => _.value));
        } else {
            setValue([]);
        }
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
            header={
                <ElCheckbox checked={checkAll} size="small" indeterminate={indeterminate} onChange={handleCheckAll}>
                    All
                </ElCheckbox>
            }
        >
            {cities.map(city => (
                <ElOption key={city.value} value={city.value} label={city.label} />
            ))}
        </ElSelect>
    );
};

export default App;
