import { ElIcon } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div className="fa-4x" style={{ display: 'flex', padding: '0.5rem', justifyContent: 'space-around' }}>
            <ElIcon prefix="fas" name="snowboarding" style={{ marginRight: 20 }} />
            <ElIcon prefix="fas" name="snowboarding" rotate={90} style={{ marginRight: 20 }} />
            <ElIcon prefix="fas" name="snowboarding" rotate={180} style={{ marginRight: 20 }} />
            <ElIcon prefix="fas" name="snowboarding" rotate={270} style={{ marginRight: 20 }} />
            <ElIcon prefix="fas" name="snowboarding" flip="horizontal" style={{ marginRight: 20 }} />
            <ElIcon prefix="fas" name="snowboarding" flip="vertical" style={{ marginRight: 20 }} />
            <ElIcon prefix="fas" name="snowboarding" flip="both" style={{ marginRight: 20 }} />
        </div>
    );
};

export default App;
