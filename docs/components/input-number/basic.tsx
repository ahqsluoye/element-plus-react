import { ElInputNumber } from '@qsxy/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const [value, setValue] = useState(1);

    return (
        <ElInputNumber
            min={1}
            max={10}
            value={value}
            onChange={(val: number) => {
                setValue(val);
            }}
            style={{ width: 200 }}
        />
    );
};

export default App;
