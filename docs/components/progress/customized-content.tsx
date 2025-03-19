import { ElButton, ElProgress } from '@parker/element-plus-react';
import React from 'react';
import './style.scss';

const App = () => {
    return (
        <div className="demo-progress">
            <ElProgress percentage={50}>
                <ElButton link>Content</ElButton>
            </ElProgress>
            <ElProgress textInside strokeWidth={20} percentage={50} status="exception">
                <span>Content</span>
            </ElProgress>
            <ElProgress type="circle" percentage={100} status="success">
                <ElButton type="success" icon="check" circle />
            </ElProgress>
            <ElProgress type="dashboard" percentage={80}>
                <span className="percentage-value">80%</span>
                <span className="percentage-label">Progressing</span>
            </ElProgress>
        </div>
    );
};

export default App;
