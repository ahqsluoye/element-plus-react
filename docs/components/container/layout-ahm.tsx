import { ElAside, ElContainer, ElHeader, ElMain } from '@qsxy/element-plus-react';
import React from 'react';
import './common-layout.scss';

const App = () => {
    return (
        <div className="common-layout">
            <ElContainer>
                <ElAside width="200px">Aside</ElAside>
                <ElContainer>
                    <ElHeader>Header</ElHeader>
                    <ElMain>Main</ElMain>
                </ElContainer>
            </ElContainer>
        </div>
    );
};

export default App;
