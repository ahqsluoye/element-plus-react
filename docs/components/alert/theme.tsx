import { ElAlert } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div style={{ maxWidth: 600 }}>
            <ElAlert title="Primary alert" type="primary" effect="dark" style={{ marginBottom: 20 }} />
            <ElAlert title="Success alert" type="success" effect="dark" style={{ marginBottom: 20 }} />
            <ElAlert title="Info alert" type="info" effect="dark" style={{ marginBottom: 20 }} />
            <ElAlert title="Warning alert" type="warning" effect="dark" style={{ marginBottom: 20 }} />
            <ElAlert title="Error alert" type="error" effect="dark" />
        </div>
    );
};

export default App;
