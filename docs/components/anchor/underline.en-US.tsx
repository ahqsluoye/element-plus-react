import { ElAnchor, ElAnchorLink } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElAnchor type="underline" offset={70}>
            <ElAnchorLink href="#basic-usage" title="Basic Usage" />
            <ElAnchorLink href="#horizontal-mode" title="Horizontal Mode" />
            <ElAnchorLink href="#scroll-container" title="Scroll Container" />
            <ElAnchorLink href="#anchor-api" title="Anchor API">
                <ElAnchorLink href="#anchor-properties" title="Anchor Properties" />
                <ElAnchorLink href="#anchor-events" title="Anchor Events" />
            </ElAnchorLink>
        </ElAnchor>
    );
};

export default App;
