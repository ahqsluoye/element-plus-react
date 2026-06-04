import { ElAnchor, ElAnchorLink } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    const handleChange = (href: string) => {
        console.log(`anchor change: ${href}`);
    };

    return (
        <ElAnchor offset={70} onChange={handleChange}>
            <ElAnchorLink href="#基础用法" title="基础用法" />
            <ElAnchorLink href="#水平模式" title="水平模式" />
            <ElAnchorLink href="#滚动容器" title="滚动容器" />
            <ElAnchorLink href="#锚点链接变化" title="锚点链接变化" />
            <ElAnchorLink href="#下划线类型" title="下划线类型" />
            <ElAnchorLink href="#固定模式" title="固定模式" />
            <ElAnchorLink href="#anchor-api" title="Anchor API">
                <ElAnchorLink href="#anchor-属性" title="Anchor 属性" />
                <ElAnchorLink href="#anchor-事件" title="Anchor 事件" />
            </ElAnchorLink>
        </ElAnchor>
    );
};

export default App;
