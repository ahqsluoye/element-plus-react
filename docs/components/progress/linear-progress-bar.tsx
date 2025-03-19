import { ElProgress } from '@parker/element-plus-react';
import React from 'react';
import './style.scss';

const App = () => {
    return (
        <div className="demo-progress">
            <ElProgress percentage={50} />
            <ElProgress percentage={100} format={value => (value === 100 ? 'Full' : `${value}%`)} />
            <ElProgress percentage={100} status="success" />
            <ElProgress percentage={100} status="warning" />
            <ElProgress percentage={50} status="exception" />
        </div>
    );
};

export default App;
