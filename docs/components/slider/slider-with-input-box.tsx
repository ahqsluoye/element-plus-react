import { ElSlider } from '@qsxy/element-plus-react';
import React from 'react';
import './slider-with-input-box.scss';

const App = () => {
    return (
        <div className="slider-demo-block">
            <ElSlider defaultValue={0} showInput />
        </div>
    );
};

export default App;
