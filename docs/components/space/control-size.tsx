import { ElButton, ElCard, ElRadio, ElRadioGroup, ElSpace } from '@qsxy/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const [size, setSize] = useState<'large' | 'default' | 'small'>('default');

    return (
        <ElSpace direction="vertical" alignment="start" size={30}>
            <ElRadioGroup value={size} onChange={v => setSize(v as 'large' | 'default' | 'small')}>
                <ElRadio value="large">Large</ElRadio>
                <ElRadio value="default">Default</ElRadio>
                <ElRadio value="small">Small</ElRadio>
            </ElRadioGroup>

            <ElSpace wrap size={size}>
                {Array.from({ length: 3 }).map((_, i) => (
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
        </ElSpace>
    );
};

export default App;
