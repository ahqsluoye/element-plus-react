import { ElAnchor, ElAnchorLink } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    const handleChange = (href: string) => {
        console.log(`anchor change: ${href}`);
    };

    return (
        <ElAnchor offset={70} onChange={handleChange}>
            <ElAnchorLink href="#basic-usage" title="Basic Usage" />
            <ElAnchorLink href="#horizontal-mode" title="Horizontal Mode" />
            <ElAnchorLink href="#scroll-container" title="Scroll Container" />
            <ElAnchorLink href="#anchor-link-change" title="Anchor Link Change" />
            <ElAnchorLink href="#underline-type" title="Underline Type" />
            <ElAnchorLink href="#affix-mode" title="Affix Mode" />
            <ElAnchorLink href="#anchor-api" title="Anchor API">
                <ElAnchorLink href="#anchor-properties" title="Anchor Properties" />
                <ElAnchorLink href="#anchor-events" title="Anchor Events" />
            </ElAnchorLink>
        </ElAnchor>
    );
};

export default App;
