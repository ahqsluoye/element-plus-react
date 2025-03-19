import { ElTimePicker } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ float: 'left', flex: '0 0 25%' }}>
                <span className="demonstration">默认格式：HH:mm:ss</span>
                <ElTimePicker style={{ width: 200, marginRight: 20 }} />
            </div>
            <div style={{ float: 'left', flex: '0 0 25%' }}>
                <span className="demonstration">格式：HHmmss</span>
                <ElTimePicker format="HHmmss" style={{ width: 200, marginRight: 20 }} />
            </div>
            <div style={{ float: 'left', flex: '0 0 25%' }}>
                <span className="demonstration">格式：HH:mm</span>
                <ElTimePicker format="HH:mm" style={{ width: 200, marginRight: 20 }} />
            </div>
            <div style={{ float: 'left', flex: '0 0 25%' }}>
                <span className="demonstration">格式：HHmm</span>
                <ElTimePicker format="HHmm" style={{ width: 200, marginRight: 20 }} />
            </div>
        </div>
    );
};

export default App;
