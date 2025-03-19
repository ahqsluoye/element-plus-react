import { ElDatePicker } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div>
            <ElDatePicker type="yearrange" style={{ width: 300, marginRight: 20, marginBottom: 10 }} />
            <ElDatePicker type="yearrange" unlinkPanels style={{ width: 300, marginRight: 20 }} />
        </div>
    );
};

export default App;
