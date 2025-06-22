import { ElPagination } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div>
            <ElPagination simple defaultCurrentPage={2} total={50} />
            <br />
            <ElPagination disabled simple defaultCurrentPage={2} total={50} />
        </div>
    );
};

export default App;
