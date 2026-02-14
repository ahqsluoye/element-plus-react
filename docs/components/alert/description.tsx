import { ElAlert } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div style={{ maxWidth: '600px' }}>
            <ElAlert title="With description" type="success" description="This is a description." />
        </div>
    );
};

export default App;
