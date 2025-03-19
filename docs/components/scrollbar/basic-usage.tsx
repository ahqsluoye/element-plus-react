import { ElScrollbar } from '@parker/element-plus-react';
import React from 'react';
import './basic-usage.scss';

const App = () => {
    return (
        <ElScrollbar height={400} viewStyle={{ padding: '0 10px' }}>
            {new Array(20).fill(0).map((_, item) => {
                return (
                    <p key={item} className="scrollbar-demo-item">
                        {item}
                    </p>
                );
            })}
        </ElScrollbar>
    );
};

export default App;
