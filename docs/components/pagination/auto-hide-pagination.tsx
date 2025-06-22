import { ElPagination, ElSwitch } from '@qsxy/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const [value, setValue] = useState(false);
    return (
        <>
            <ElSwitch value={value} onChange={setValue} />
            <div>
                <ElPagination hideOnSinglePage={value} layout="prev, pager, next" total={5} />
            </div>
        </>
    );
};

export default App;
