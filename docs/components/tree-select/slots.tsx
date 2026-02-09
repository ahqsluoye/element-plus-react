import { ElTreeSelect } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    const data = [
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

    const renderContent = ({ data }) => {
        return (
            <span
                style={{
                    color: '#626AEF',
                }}
            >
                {data.label}
            </span>
        );
    };

    return <ElTreeSelect data={data} renderContent={renderContent} style={{ width: 240 }} />;
};

export default App;
