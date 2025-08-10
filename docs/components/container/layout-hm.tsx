import { ElContainer, ElHeader, ElMain } from '@qsxy/element-plus-react';
import React from 'react';
import './common-layout.scss';

const App = () => {
    return (
        <div className="common-layout">
            <ElContainer>
                <ElHeader>Header</ElHeader>
                <ElMain>Main</ElMain>
            </ElContainer>
        </div>
    );
};

export default App;
