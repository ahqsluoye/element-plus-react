import { ElProgress } from '@parker/element-plus-react';
import React from 'react';
import './style.scss';

const App = () => {
    return (
        <div className="demo-progress">
            <ElProgress percentage={50} indeterminate />
            <ElProgress percentage={100} format={percentage => (percentage === 100 ? 'Full' : `${percentage}%`)} indeterminate />
            <ElProgress percentage={100} status="success" indeterminate duration={5} />
            <ElProgress percentage={100} status="warning" indeterminate duration={1} />
            <ElProgress percentage={50} status="exception" indeterminate />
        </div>
    );
};

export default App;
