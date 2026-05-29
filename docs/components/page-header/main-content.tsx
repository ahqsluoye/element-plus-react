import { ElPageHeader } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElPageHeader content={<span style={{ fontWeight: 600, marginRight: '.75rem' }}>Title</span>}>
            <div className="mt-4 text-sm font-bold">Your additional content can be added with default slot, You may put as many content as you want here.</div>
        </ElPageHeader>
    );
};

export default App;
