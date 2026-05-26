import { ElSlider } from '@qsxy/element-plus-react';
import React from 'react';
import './discrete-values.scss';

const App = () => {
    return (
        <>
            <div className="slider-demo-block">
                <span className="demonstration">Breakpoints not displayed</span>
                <ElSlider defaultValue={0} step={10} />
            </div>
            <div className="slider-demo-block">
                <span className="demonstration">Breakpoints displayed</span>
                <ElSlider defaultValue={0} step={10} showStops />
            </div>
        </>
    );
};

export default App;
