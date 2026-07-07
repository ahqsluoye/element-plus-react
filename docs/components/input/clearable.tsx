import { ElInput } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div>
            <ElInput placeholder="可一键清空" clearable />
            <ElInput placeholder="不可一键清空" />
        </div>
    );
};

export default App;
