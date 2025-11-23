import { ElInput } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return <ElInput placeholder="请输入内容" formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />;
};

export default App;
