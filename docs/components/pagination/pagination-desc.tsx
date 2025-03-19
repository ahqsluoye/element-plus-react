import { ElPagination } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div>
            <ElPagination total={85} showTotal={total => `Total ${total} items`} defaultPageSize={20} defaultCurrent={1} />
            <br />
            <ElPagination total={85} showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`} defaultPageSize={20} defaultCurrent={1} />
        </div>
    );
};

export default App;
