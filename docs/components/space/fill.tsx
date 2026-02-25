import { ElButton, ElCard, ElSpace, ElSwitch } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    const [fill, setFill] = React.useState(true);
    return (
        <div>
            <div style={{ marginBottom: '15px' }}>
                fill: <ElSwitch value={fill} onChange={(_, checked) => setFill(checked)} />
            </div>
            <ElSpace fill={fill} wrap>
                {Array.from({ length: 3 }).map((_, i) => (
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
                        {Array.from({ length: 5 }).map((_, o) => (
                            <div key={o} className="text item">
                                {`List item ${o}`}
                            </div>
                        ))}
                    </ElCard>
                ))}
            </ElSpace>
        </div>
    );
};

export default App;
