import { ElPagination } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div>
            <ElPagination simple defaultCurrent={2} total={50} />
            <br />
            <ElPagination disabled simple defaultCurrent={2} total={50} />
        </div>
    );
};

export default App;
