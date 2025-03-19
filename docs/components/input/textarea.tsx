import { ElInput } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div>
            <ElInput.TextArea rows={2} placeholder="请输入内容" style={{ width: 600 }} />
            <br />
            <br />
            <ElInput.TextArea rows={2} placeholder="请输入内容" style={{ width: 600 }} disabled />
        </div>
    );
};

export default App;
