import { ElText } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <ElText>span</ElText>
            <ElText tag="p">This is a paragraph.</ElText>
            <ElText tag="b">Bold</ElText>
            <ElText tag="i">Italic</ElText>
            <ElText>
                This is
                <ElText tag="sub" size="small">
                    subscript
                </ElText>
            </ElText>
            <ElText>
                This is
                <ElText tag="sup" size="small">
                    superscript
                </ElText>
            </ElText>
            <ElText tag="ins">Inserted</ElText>
            <ElText tag="del">Deleted</ElText>
            <ElText tag="mark">Mark</ElText>
        </div>
    );
};

export default App;
