import { ElButton, ElCard, ElRadio, ElSlider, ElSpace } from '@qsxy/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const [direction, setDirection] = useState<'horizontal' | 'vertical'>('horizontal');
    const [fillRatio, setFillRatio] = useState(30);

    return (
        <div>
            <div style={{ marginBottom: '15px' }}>
                direction:
                <ElRadio value="horizontal" checked={direction === 'horizontal'} onChange={() => setDirection('horizontal')}>
                    horizontal
                </ElRadio>
                <ElRadio value="vertical" checked={direction === 'vertical'} onChange={() => setDirection('vertical')}>
                    vertical
                </ElRadio>
            </div>
            <div style={{ marginBottom: '15px' }}>
                fillRatio:
                <ElSlider value={fillRatio} onChange={v => setFillRatio(Number(v))} />
            </div>
            <ElSpace fill wrap fillRatio={fillRatio} direction={direction} style={{ width: '100%' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                    <ElCard
                        key={i}
                        className="box-card"
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
        </div>
    );
};

export default App;
