import { ElPagination } from '@qsxy/element-plus-react';
import React from 'react';
import './basic-usage.scss';

const App = () => {
    return (
        <>
            <div className="example-pagination-block">
                <div className="example-demonstration">When you have few pages</div>
                <ElPagination layout="prev, pager, next" total={50} />
            </div>
            <div className="example-pagination-block">
                <div className="example-demonstration">When you have more than 7 pages</div>
                <ElPagination layout="prev, pager, next" total={1000} />
            </div>
        </>
    );
};

export default App;
