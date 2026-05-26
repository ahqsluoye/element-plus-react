import { ElSlider } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div className="slider-demo-block">
            <ElSlider
                range
                marks={{
                    0: '0°C',
                    8: '8°C',
                    37: '37°C',
                    50: {
                        style: {
                            color: '#1989FA',
                        },
                        label: '50%',
                    },
                }}
                defaultValue={[30, 60]}
            />
        </div>
    );
};

export default App;
