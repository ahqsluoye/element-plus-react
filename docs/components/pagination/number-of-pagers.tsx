import { ElButton, ElMessage, ElPagination } from '@parker/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(500);

    return (
        <div>
            <ElButton onClick={() => setTotal(Math.trunc(Math.random() * 100))}>切换总条数</ElButton>
            <ElButton onClick={() => setTotal(0)}>切换0条</ElButton>
            <br />
            <br />
            <ElPagination
                current={current}
                total={total}
                showTotal={t => `总条数： ${t}`}
                onChange={pageNumber => {
                    setCurrent(pageNumber);
                    ElMessage.info('Page: ' + pageNumber);
                }}
            />
        </div>
    );
};

export default App;
