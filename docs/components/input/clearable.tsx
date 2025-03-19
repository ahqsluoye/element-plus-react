import { ElInput } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div>
            <ElInput placeholder="可一键清空" />
            <ElInput placeholder="不可一键清空" clearable={false} />
        </div>
    );
};

export default App;
