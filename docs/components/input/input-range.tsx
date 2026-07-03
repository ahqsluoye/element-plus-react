import { ElIcon, ElInputRange } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div>
            <ElInputRange prefix={<ElIcon name="magnifying-glass" />} style={{ width: 300, marginRight: 20 }} />
            <ElInputRange type="number" precision={2} suffix={<ElIcon name="6" />} style={{ width: 300, marginRight: 20 }} />
            <ElInputRange prepend="Http://" style={{ width: 500 }} append=".com" />
        </div>
    );
};

export default App;
