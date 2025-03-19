import { ElButton, ElPopover } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <>
            <ElPopover placement="top-start" title="标题" width={200} trigger="hover" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                <ElButton style={{ marginRight: 20 }}>Hover 激活</ElButton>
            </ElPopover>
            <ElPopover title="标题" width={200} content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                <ElButton style={{ marginRight: 20 }}>Click 激活</ElButton>
            </ElPopover>
            <ElPopover placement="right" title="标题" width={200} trigger="contextmenu" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                <ElButton>contextmenu 激活</ElButton>
            </ElPopover>
        </>
    );
};

export default App;
