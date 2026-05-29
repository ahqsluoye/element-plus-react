import { ElButton, ElCard, ElSlider, ElSpace } from '@qsxy/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const [size, setSize] = useState(20);

    return (
        <>
            <ElSlider value={size} onChange={v => setSize(Number(v))} />
            <ElSpace wrap size={size}>
                {Array.from({ length: 2 }).map((_, i) => (
                    <ElCard
                        key={i}
                        className="box-card"
                        style={{ width: '250px' }}
                        header={
                            <div className="card-header">
                                <span>Card name</span>
                                <ElButton className="button" text>
                                    Operation button
                                </ElButton>
                            </div>
                        }
                    >
                        {Array.from({ length: 4 }).map((_, o) => (
                            <div key={o} className="text item">
                                {'List item ' + (o + 1)}
                            </div>
                        ))}
                    </ElCard>
                ))}
            </ElSpace>
        </>
    );
};

export default App;
