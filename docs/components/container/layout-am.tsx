import { ElAside, ElContainer, ElMain } from '@qsxy/element-plus-react';
import React from 'react';
import './common-layout.scss';

const App = () => {
    return (
        <div className="common-layout">
            <ElContainer>
                <ElAside width="200px">Aside</ElAside>
                <ElMain>Main</ElMain>
                <ElAside width="200px">Aside</ElAside>
            </ElContainer>
        </div>
    );
};

export default App;
