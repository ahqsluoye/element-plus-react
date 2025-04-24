import { ElSkeleton, ElSkeletonItem } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElSkeleton
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
        />
    );
};

export default App;
