import { ElPagination } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div>
            <ElPagination showQuickJumper total={500} />
            <br />
            <ElPagination showQuickJumper defaultCurrent={2} total={500} disabled />
        </div>
    );
};

export default App;
