import { ElWatermark } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElWatermark font={{ color: 'rgba(0, 0, 0, .15)' }} content={['Element+', 'Element Plus']}>
            <div style={{ height: '500px' }} />
        </ElWatermark>
    );
};

export default App;
