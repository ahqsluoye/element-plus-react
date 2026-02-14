import { ElAlert } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div style={{ maxWidth: '600px' }}>
            <ElAlert title="Primary alert" type="primary" showIcon style={{ marginBottom: '20px' }} />
            <ElAlert title="Success alert" type="success" showIcon style={{ marginBottom: '20px' }} />
            <ElAlert title="Info alert" type="info" showIcon style={{ marginBottom: '20px' }} />
            <ElAlert title="Warning alert" type="warning" showIcon style={{ marginBottom: '20px' }} />
            <ElAlert title="Error alert" type="error" showIcon style={{ marginBottom: '20px' }} />
            <ElAlert title="Error alert with custom icon" type="error" icon="bell" showIcon></ElAlert>
        </div>
    );
};

export default App;
