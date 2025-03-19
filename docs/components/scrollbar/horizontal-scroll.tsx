import { ElScrollbar } from '@qsxy/element-plus-react';
import React from 'react';
import './horizontal-scroll.scss';

const App = () => {
    return (
        <ElScrollbar>
            <div className="scrollbar-flex-content">
                {new Array(50).fill(0).map((_, item) => {
                    return (
                        <p key={item} className="scrollbar-demo-item-1">
                            {item}
                        </p>
                    );
                })}
            </div>
        </ElScrollbar>
    );
};

export default App;
