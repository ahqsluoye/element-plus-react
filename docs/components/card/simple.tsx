import { ElCard } from '@qsxy/element-plus-react';
import React from 'react';
import './basic.scss';

const App = () => {
    return (
        <ElCard className="box-card">
            {new Array(4).fill('').map((_, o) => (
                <div key={o} className="text item">
                    {'List item ' + o}
                </div>
            ))}
        </ElCard>
    );
};

export default App;
