import { ElButton, ElCard, ElSkeleton, ElSkeletonItem, ElSwitch } from '@qsxy/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const [loading, setLoading] = useState(true);

    return (
        <div>
            <div>
                <span style={{ marginRight: 10 }}>Switch Loading</span>
                <ElSwitch value={loading} onChange={setLoading} />
            </div>

            <ElSkeleton
                visible={loading}
                animated
                throttle={500}
                style={{ width: 240 }}
                formatter={
                    <>
                        <ElSkeletonItem variant="image" style={{ width: 240, height: 240 }} />
                        <div style={{ padding: 14 }}>
                            <ElSkeletonItem rowMargin={0} style={{ width: '50%' }} />
                            <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'space-between' }}>
                                <ElSkeletonItem rowMargin={5} rowHeight={13} style={{ width: '70%', marginRight: 16 }} />
                                <ElSkeletonItem rowMargin={5} rowHeight={13} style={{ width: '30%' }} />
                            </div>
                        </div>
                    </>
                }
            >
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <ElCard bodyStyle={{ padding: 0, marginBottom: 1 }}>
                        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" className="image" />
                        <div style={{ padding: 14 }}>
                            <span>Delicious hamburger</span>
                            <div className="bottom card-header">
                                <div className="time">{new Date().toDateString()}</div>
                                <ElButton text className="button">
                                    operation button
                                </ElButton>
                            </div>
                        </div>
                    </ElCard>
                </div>
            </ElSkeleton>
        </div>
    );
};

export default App;
