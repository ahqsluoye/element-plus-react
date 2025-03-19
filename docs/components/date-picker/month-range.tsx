import { ElDatePicker } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <>
            <ElDatePicker type="monthrange" style={{ width: 300, marginRight: 20, marginBottom: 10 }} />
            <ElDatePicker type="monthrange" unlinkPanels style={{ width: 300, marginRight: 20 }} />
        </>
    );
};

export default App;
