import { ElSlider } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <>
            <div className="slider-demo-block">
                <ElSlider defaultValue={0} />
            </div>
            <div className="slider-demo-block">
                <ElSlider defaultValue={0} placement="bottom" />
            </div>
            <div className="slider-demo-block">
                <ElSlider defaultValue={0} placement="right" />
            </div>
            <div className="slider-demo-block">
                <ElSlider defaultValue={0} placement="left" />
            </div>
        </>
    );
};

export default App;
