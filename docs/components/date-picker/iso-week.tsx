import { ElDatePicker } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div>
            ISO标准周数：
            <ElDatePicker type="week" isoWeek style={{ width: 200, marginRight: 20 }} />
            非ISO标准周数：
            <ElDatePicker type="week" style={{ width: 200 }} />
        </div>
    );
};

export default App;
