import { ElSlider } from '@qsxy/element-plus-react';
import React, { useState } from 'react';
import './sizes.scss';

interface SizesProps {
    // Add props here
}

const App: React.FC<SizesProps> = props => {
    const [value, setValue] = useState(0);

    return (
        <div className="slider-demo-block-sizes">
            <ElSlider value={value} showInput size="large" onChange={setValue} />
            <ElSlider value={value} showInput onChange={setValue} />
            <ElSlider value={value} showInput size="small" onChange={setValue} />
        </div>
    );
};

export default App;
