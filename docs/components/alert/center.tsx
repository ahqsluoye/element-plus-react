import { ElAlert } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div style={{ maxWidth: '600px' }}>
            <ElAlert title="Primary alert" type="primary" center showIcon style={{ marginBottom: '20px' }} />
            <ElAlert title="Success alert" type="success" center showIcon style={{ marginBottom: '20px' }} />
            <ElAlert title="Info alert" type="info" center showIcon style={{ marginBottom: '20px' }} />
            <ElAlert title="Warning alert" type="warning" center showIcon style={{ marginBottom: '20px' }} />
            <ElAlert title="Error alert" type="error" center showIcon style={{ marginBottom: '20px' }} />
        </div>
    );
};

export default App;
