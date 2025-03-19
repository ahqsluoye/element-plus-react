import { ElButton, ElCard } from '@parker/element-plus-react';
import React from 'react';
import './basic.scss';

const App = () => {
    return (
        <ElCard
            className="box-card"
            header={
                <div className="card-header">
                    <span>Card name</span>
                    <ElButton className="button" text>
                        Operation button
                    </ElButton>
                </div>
            }
        >
            {new Array(4).fill('').map((_, o) => (
                <div key={o} className="text item">
                    {'List item ' + o}
                </div>
            ))}
        </ElCard>
    );
};

export default App;
