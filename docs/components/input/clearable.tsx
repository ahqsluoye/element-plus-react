import { ElInput, ElSpace, ElTextArea } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElSpace size={20}>
            <ElInput clearable placeholder="Please input" style={{ width: 240 }} />
            <ElTextArea clearable placeholder="Please input" style={{ width: 240 }} />
        </ElSpace>
    );
};

export default App;
