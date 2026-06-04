import React from 'react';
import { ElAffix, ElButton } from '@qsxy/element-plus-react';
import './target.css';

const App = () => {
    return (
        <div className="affix-container">
            <ElAffix target=".affix-container" offset={80}>
                <ElButton type="primary">Target container</ElButton>
            </ElAffix>
        </div>
    );
};

export default App;