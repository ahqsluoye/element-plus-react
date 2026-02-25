import { ElIcon, ElInputNumber, ElSpace } from '@qsxy/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const [value, setValue] = useState(1);

    return (
        <ElSpace direction="vertical">
            <ElSpace>
                <ElInputNumber value={value} onChange={(val: number) => setValue(val)} />
                <ElInputNumber value={value} decreaseIcon={<ElIcon name="angle-down" />} increaseIcon={<ElIcon name="angle-up" />} onChange={(val: number) => setValue(val)} />
            </ElSpace>
            <ElSpace>
                <ElInputNumber value={value} controlsPosition="right" onChange={(val: number) => setValue(val)} />
                <ElInputNumber
                    value={value}
                    controlsPosition="right"
                    decreaseIcon={<ElIcon name="minus" />}
                    increaseIcon={<ElIcon name="plus" />}
                    onChange={(val: number) => setValue(val)}
                />
            </ElSpace>
        </ElSpace>
    );
};

export default App;
