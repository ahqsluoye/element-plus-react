import { ElAlert } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div style={{ maxWidth: '600px' }}>
            <ElAlert title="Primary alert" type="primary" description="More text description" showIcon style={{ marginBottom: 20 }} />
            <ElAlert title="Success alert" type="success" description="More text description" showIcon style={{ marginBottom: 20 }} />
            <ElAlert title="Info alert" type="info" description="More text description" showIcon style={{ marginBottom: 20 }} />
            <ElAlert title="Warning alert" type="warning" description="More text description" showIcon style={{ marginBottom: 20 }} />
            <ElAlert title="Error alert" type="error" description="More text description" showIcon style={{ marginBottom: 20 }} />
        </div>
    );
};

export default App;
