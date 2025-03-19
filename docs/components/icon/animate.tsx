import { ElIcon } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div className="fa-3x" style={{ display: 'flex', padding: '0.5rem', justifyContent: 'space-around' }}>
            <ElIcon prefix="fas" name="spinner" spin style={{ marginRight: 20 }} />
            <ElIcon prefix="fas" name="circle-notch" spin style={{ marginRight: 20 }} />
            <ElIcon prefix="fas" name="sync" spin style={{ marginRight: 20 }} />
            <ElIcon prefix="fas" name="cog" spin style={{ marginRight: 20 }} />
            <ElIcon prefix="fas" name="spinner" pulse style={{ marginRight: 20 }} />
            <ElIcon prefix="fas" name="stroopwafel" spin style={{ marginRight: 20 }} />
        </div>
    );
};

export default App;
