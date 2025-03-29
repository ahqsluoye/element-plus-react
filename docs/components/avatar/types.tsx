import { ElAvatar } from '@qsxy/element-plus-react';
import React from 'react';
import './style.scss';

const App = () => {
    return (
        <div className="demo-type">
            <div>
                <ElAvatar icon="user" />
            </div>
            <div>
                <ElAvatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            </div>
            <div>
                <ElAvatar> user </ElAvatar>
            </div>
        </div>
    );
};

export default App;
