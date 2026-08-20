import { ElAffix, ElAnchor, ElAnchorLink } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElAffix offset={60}>
            <ElAnchor offset={70} style={{ width: 300 }}>
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
        </ElAffix>
    );
};

export default App;
