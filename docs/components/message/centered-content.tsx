import { ElButton, ElMessage } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return <ElButton onClick={() => ElMessage({ message: '居中的文字', center: true })}>文字居中</ElButton>;
};

export default App;
