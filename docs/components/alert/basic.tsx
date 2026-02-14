import { ElAlert } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div style={{ maxWidth: 600 }}>
            <ElAlert title="Primary alert" type="primary" style={{ marginBottom: 20 }} />
            <ElAlert title="Success alert" type="success" style={{ marginBottom: 20 }} />
            <ElAlert title="Info alert" type="info" style={{ marginBottom: 20 }} />
            <ElAlert title="Warning alert" type="warning" style={{ marginBottom: 20 }} />
            <ElAlert title="Error alert" type="error" />
        </div>
    );
};

export default App;
