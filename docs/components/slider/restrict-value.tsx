import { ElSlider } from '@qsxy/element-plus-react';
import React from 'react';
import './show-marks.scss';

const App = () => {
    return (
        <>
            <div className="slider-demo-block-show-marks">
                <ElSlider
                    defaultValue={37}
                    vertical
                    height="200px"
                    marks={{
                        0: '0°C',
                        37: '37°C',
                        100: '100°C',
                    }}
                    placement="right"
                    formatTooltip={v => `${v}°C`}
                    step="mark"
                />
            </div>
            <div className="slider-demo-block-show-marks">
                <ElSlider
                    defaultValue={37}
                    marks={{
                        0: '0cm',
                        10: '10cm',
                        25: '25cm',
                        50: '50cm',
                        75: '75cm',
                        100: '100cm',
                    }}
                    step="mark"
                />
            </div>
            <div className="slider-demo-block-show-marks">
                <ElSlider
                    defaultValue={[13, 42]}
                    range
                    marks={{
                        0: '0',
                        13: '13',
                        42: '42',
                        58: '58',
                        89: '89',
                        100: '100',
                    }}
                    step="mark"
                />
            </div>
        </>
    );
};

export default App;
