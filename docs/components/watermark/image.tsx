import { ElWatermark } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElWatermark width={130} height={30} image="https://element-plus.org/images/element-plus-logo.svg">
            <div style={{ height: '500px' }} />
        </ElWatermark>
    );
};

export default App;
