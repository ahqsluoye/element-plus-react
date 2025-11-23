import { ElCol, ElOption, ElRow, ElSelect } from '@qsxy/element-plus-react';
import React from 'react';
import './custom-loading.scss';

const App = () => {
    const options = [
        {
            value: 'Option1',
            label: 'Label1',
        },
        {
            value: 'Option2',
            label: 'Label2',
        },
        {
            value: 'Option3',
            label: 'Label3',
        },
        {
            value: 'Option4',
            label: 'Label4',
        },
        {
            value: 'Option5',
            label: 'Label5',
        },
    ];

    return (
        <ElRow gutter={15}>
            <ElCol span={8}>
                <ElSelect
                    labelFormat={(index, value, label) => {
                        return (
                            <>
                                <span>{label}: </span>
                                <span style={{ fontWeight: 'bold' }}>{value}</span>
                            </>
                        );
                    }}
                    style={{ width: 240, marginRight: 20 }}
                >
                    {options.map(item => {
                        return <ElOption value={item.value} label={item.label} key={item.value} />;
                    })}
                </ElSelect>
            </ElCol>
            <ElCol span={8}>
                <ElSelect
                    labelFormat={(index, value, label) => {
                        return (
                            <>
                                <span>{label}: </span>
                                <span style={{ fontWeight: 'bold' }}>{value}</span>
                            </>
                        );
                    }}
                    multiple
                    style={{ width: 240, marginRight: 20 }}
                >
                    {options.map(item => {
                        return <ElOption value={item.value} label={item.label} key={item.value} />;
                    })}
                </ElSelect>
            </ElCol>
        </ElRow>
    );
};

export default App;
