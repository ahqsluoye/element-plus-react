import { ElIcon, ElInput } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div>
            <ElInput.Range prefix={<ElIcon name="magnifying-glass" />} style={{ width: 300, marginRight: 20 }} />
            <ElInput.Range type="number" precision={2} suffix={<ElIcon name="6" />} style={{ width: 300, marginRight: 20 }} />
            <ElInput.Range prepend="Http://" style={{ width: 500 }} append=".com" />
        </div>
    );
};

export default App;
