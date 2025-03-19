import { ElColorPicker } from '@qsxy/element-plus-react';
import React from 'react';
import './sizes.scss';

const App = () => {
    return (
        <div className="demo-color-sizes">
            <ElColorPicker size="large" defaultValue="409EFF" />
            <ElColorPicker defaultValue="409EFF" />
            <ElColorPicker size="small" defaultValue="409EFF" />
        </div>
    );
};

export default App;
