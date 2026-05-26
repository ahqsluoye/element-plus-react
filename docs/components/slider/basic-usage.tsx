import { ElSlider } from '@qsxy/element-plus-react';
import React from 'react';
import './basic-usage.scss';

const App = () => {
    return (
        <>
            <div className="slider-demo-block">
                <span className="demonstration">Default value</span>
                <ElSlider defaultValue={0} />
            </div>
            <div className="slider-demo-block">
                <span className="demonstration">Customized initial value</span>
                <ElSlider defaultValue={0} />
            </div>
            <div className="slider-demo-block">
                <span className="demonstration">Hide Tooltip</span>
                <ElSlider defaultValue={0} showTooltip={false} />
            </div>
            <div className="slider-demo-block">
                <span className="demonstration">Format Tooltip</span>
                <ElSlider defaultValue={0} formatTooltip={val => val / 100} />
            </div>
            <div className="slider-demo-block">
                <span className="demonstration">Disabled</span>
                <ElSlider defaultValue={0} disabled />
            </div>
        </>
    );
};

export default App;
