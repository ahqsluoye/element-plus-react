import { ElPageHeader } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    const goBack = () => {
        console.log('go back');
    };

    return <ElPageHeader onBack={goBack} content={<span style={{ fontWeight: 600, marginRight: '.75rem' }}>Title</span>}></ElPageHeader>;
};

export default App;
