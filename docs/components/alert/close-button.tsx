import { ElAlert } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    const hello = () => {
        // eslint-disable-next-line no-alert
        alert('Hello World!');
    };
    return (
        <div style={{ maxWidth: 600 }}>
            <ElAlert title="Unclosable alert" type="success" closable={false} style={{ marginBottom: 20 }} />
            <ElAlert title="Customized close text" type="info" closeText="Gotcha" style={{ marginBottom: 20 }} />
            <ElAlert title="Alert with callback" type="warning" onClose={hello} style={{ marginBottom: 20 }} />
        </div>
    );
};

export default App;
