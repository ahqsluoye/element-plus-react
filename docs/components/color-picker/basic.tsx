import { ElColorPicker } from '@parker/element-plus-react';
import React from 'react';
import './basic.scss';

const App = () => {
    return (
        <div>
            <div className="demo-color-block">
                <span className="demonstration">有默认值</span>
                <ElColorPicker defaultValue="#409EFF" />
            </div>
            <div className="demo-color-block">
                <span className="demonstration">无默认值</span>
                <ElColorPicker colorFormat="hsv" />
            </div>
        </div>
    );
};

export default App;
