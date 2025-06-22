import { ElPagination } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div>
            <ElPagination pageSize={20} pagerCount={11} layout="prev, pager, next" total={1000} />
        </div>
    );
};

export default App;
