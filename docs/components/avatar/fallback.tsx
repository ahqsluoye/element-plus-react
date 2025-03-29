import { ElAvatar } from '@qsxy/element-plus-react';
import React from 'react';
import './style.scss';

const App = () => {
    const errorHandler = () => true;

    return (
        <div className="demo-type">
            <ElAvatar size={60} src="https://empty" onError={errorHandler}>
                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
            </ElAvatar>
        </div>
    );
};

export default App;
