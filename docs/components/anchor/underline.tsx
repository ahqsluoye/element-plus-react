import { ElAnchor, ElAnchorLink } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElAnchor type="underline" offset={70}>
            <ElAnchorLink href="#基础用法" title="基础用法" />
            <ElAnchorLink href="#水平模式" title="水平模式" />
            <ElAnchorLink href="#滚动容器" title="滚动容器" />
            <ElAnchorLink href="#anchor-api" title="Anchor API">
                <ElAnchorLink href="#anchor-属性" title="Anchor 属性" />
                <ElAnchorLink href="#anchor-事件" title="Anchor 事件" />
            </ElAnchorLink>
        </ElAnchor>
    );
};

export default App;
