import { ElTree } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    const defaultProps = {
        children: 'children',
        label: 'label',
        disabled: 'disabled',
    };

    const data = [
        {
            id: 1,
            label: 'Level one 1',
            children: [
                {
                    id: 3,
                    label: 'Level two 2-1',
                    children: [
                        {
                            id: 4,
                            label: 'Level three 3-1-1',
                        },
                        {
                            id: 5,
                            label: 'Level three 3-1-2',
                            disabled: true,
                        },
                    ],
                },
                {
                    id: 2,
                    label: 'Level two 2-2',
                    disabled: true,
                    children: [
                        {
                            id: 6,
                            label: 'Level three 3-2-1',
                        },
                        {
                            id: 7,
                            label: 'Level three 3-2-2',
                            disabled: true,
                        },
                    ],
                },
            ],
        },
    ];

    return <ElTree data={data} props={defaultProps} showCheckbox style={{ maxWidth: 600 }} />;
};

export default App;
