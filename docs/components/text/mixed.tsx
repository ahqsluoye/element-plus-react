import { ElButton, ElIcon, ElText } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', columnGap: 15, width: 360 }}>
            <ElText>
                <ElIcon name="home" />
                Element-Plus
            </ElText>
            <div>
                <ElText>Rate</ElText>
                <ElIcon name="star" />
                <ElIcon name="star" />
                <ElIcon name="star" />
                <ElIcon name="star" />
                <ElIcon name="star" />
            </div>
            <ElText>
                This is text mixed icon
                <ElIcon name="bell" />
                and component
                <ElButton>Button</ElButton>
            </ElText>
        </div>
    );
};

export default App;
