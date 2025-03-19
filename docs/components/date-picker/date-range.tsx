import { ElDatePicker } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div>
            <ElDatePicker type="daterange" style={{ width: 300, marginRight: 20, marginBottom: 10 }} />
            <ElDatePicker type="daterange" unlinkPanels style={{ width: 300, marginRight: 20 }} />
        </div>
    );
};

export default App;
