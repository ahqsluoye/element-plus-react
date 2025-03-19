import { ElDatePicker } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div>
            ISO标准周数：
            <ElDatePicker style={{ width: 200, marginRight: 20 }} />
            非ISO标准周数：
            <ElDatePicker isoWeek={false} style={{ width: 200 }} />
        </div>
    );
};

export default App;
