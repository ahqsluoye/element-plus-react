import { ElTransfer } from '@qsxy/element-plus-react';
import React, { useMemo } from 'react';

const App = () => {
    const mockData = useMemo(
        () =>
            new Array(20).fill(0).map((_, i) => {
                return {
                    value: i,
                    desc: `Option ${i}`,
                    disabled: i % 4 === 0,
                };
            }),
        [],
    );

    return (
        <ElTransfer
            data={mockData}
            props={{
                key: 'value',
                label: 'desc',
            }}
        />
    );
};

export default App;
