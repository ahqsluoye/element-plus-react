import { ElDivider, ElTreeSelect } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    const sourceData = [
        {
            value: '1',
            label: 'Level one 1',
            children: [
                {
                    value: '1-1',
                    label: 'Level two 1-1',
                    children: [
                        {
                            value: '1-1-1',
                            label: 'Level three 1-1-1',
                        },
                    ],
                },
            ],
        },
        {
            value: '2',
            label: 'Level one 2',
            children: [
                {
                    value: '2-1',
                    label: 'Level two 2-1',
                    children: [
                        {
                            value: '2-1-1',
                            label: 'Level three 2-1-1',
                        },
                    ],
                },
                {
                    value: '2-2',
                    label: 'Level two 2-2',
                    children: [
                        {
                            value: '2-2-1',
                            label: 'Level three 2-2-1',
                        },
                    ],
                },
            ],
        },
        {
            value: '3',
            label: 'Level one 3',
            children: [
                {
                    value: '3-1',
                    label: 'Level two 3-1',
                    children: [
                        {
                            value: '3-1-1',
                            label: 'Level three 3-1-1',
                        },
                    ],
                },
                {
                    value: '3-2',
                    label: 'Level two 3-2',
                    children: [
                        {
                            value: '3-2-1',
                            label: 'Level three 3-2-1',
                        },
                    ],
                },
            ],
        },
    ];

    const [data, setData] = React.useState(sourceData);
    const [value, setValue] = React.useState();

    const filterMethod = val => {
        setData(sourceData.filter(filterNodeMethod.bind(null, val)));
    };

    const filterNodeMethod = (val, data) => {
        return data.label.includes(val);
    };

    return (
        <>
            <ElTreeSelect value={value} data={data} onChange={val => setValue(val)} filterable style={{ width: 240 }} />
            <ElDivider />
            show checkbox：
            <ElTreeSelect value={value} data={data} onChange={val => setValue(val)} filterable filterMethod={filterMethod} style={{ width: 240 }} />
            <ElDivider />
            show checkbox with `check-on-click-node`：
            <ElTreeSelect value={value} data={data} onChange={val => setValue(val)} filterable filterNodeMethod={filterNodeMethod} style={{ width: 240 }} />
        </>
    );
};

export default App;
