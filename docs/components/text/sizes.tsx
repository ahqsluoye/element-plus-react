import { ElText } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <>
            <ElText className="mx-1" size="large">
                Large
            </ElText>
            <ElText className="mx-1">Default</ElText>
            <ElText className="mx-1" size="small">
                Small
            </ElText>
        </>
    );
};

export default App;
