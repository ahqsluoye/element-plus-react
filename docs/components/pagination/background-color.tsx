import { ElPagination } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div>
            <ElPagination background layout="prev, pager, next" total={1000} />
        </div>
    );
};

export default App;
