import { ElProgress } from '@qsxy/element-plus-react';
import React from 'react';
import './style.scss';

const App = () => {
    return (
        <div className="demo-progress">
            <ElProgress type="circle" percentage={0} />
            <ElProgress type="circle" percentage={25} />
            <ElProgress type="circle" percentage={100} status="success" />
            <ElProgress type="circle" percentage={70} status="warning" />
            <ElProgress type="circle" percentage={50} status="exception" />
        </div>
    );
};

export default App;
