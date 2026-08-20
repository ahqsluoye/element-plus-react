import { ElAnchor, ElAnchorLink } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElAnchor offset={70} direction="horizontal">
            <ElAnchorLink href="#basic-usage" title="Basic Usage" />
            <ElAnchorLink href="#horizontal-mode" title="Horizontal Mode" />
            <ElAnchorLink href="#scroll-container" title="Scroll Container" />
        </ElAnchor>
    );
};

export default App;
