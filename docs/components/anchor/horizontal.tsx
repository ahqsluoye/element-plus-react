import { ElAnchor, ElAnchorLink } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElAnchor offset={70} direction="horizontal">
            <ElAnchorLink href="#基础用法" title="基础用法" />
            <ElAnchorLink href="#水平模式" title="水平模式" />
            <ElAnchorLink href="#滚动容器" title="滚动容器" />
        </ElAnchor>
    );
};

export default App;
