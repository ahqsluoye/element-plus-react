import { ElTextArea } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div>
            <ElTextArea rows={2} placeholder="请输入内容" style={{ width: 600 }} />
            <br />
            <br />
            <ElTextArea rows={2} placeholder="请输入内容" style={{ width: 600 }} plain />
        </div>
    );
};

export default App;
