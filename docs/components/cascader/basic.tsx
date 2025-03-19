import { ElCascader } from '@qsxy/element-plus-react';
import React from 'react';
import { options1 } from './data';

const App = () => {
    return (
        <>
            <div className="m-4">
                <p>点击展开子项列表页 (默认)</p>
                <ElCascader options={options1} style={{ width: 300 }} />
            </div>
            <div className="m-4">
                <p>鼠标悬浮展开子项列表页</p>
                <ElCascader options={options1} props={{ expandTrigger: 'hover' }} style={{ width: 300 }} />
            </div>
        </>
    );
};

export default App;
