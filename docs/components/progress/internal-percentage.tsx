import { ElProgress } from '@parker/element-plus-react';
import React from 'react';
import './style.scss';

const App = () => {
    return (
        <div className="demo-progress">
            <ElProgress textInside strokeWidth={26} percentage={70} />
            <ElProgress textInside strokeWidth={24} percentage={100} status="success" />
            <ElProgress textInside strokeWidth={22} percentage={80} status="warning" />
            <ElProgress textInside strokeWidth={20} percentage={50} status="exception" />
        </div>
    );
};

export default App;
