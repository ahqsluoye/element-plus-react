import { ElSlider } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div className="slider-demo-block">
            <ElSlider range showStops max={10} defaultValue={[4, 8]} />
        </div>
    );
};

export default App;
