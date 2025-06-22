import { ElPagination } from '@qsxy/element-plus-react';
import React, { useCallback } from 'react';

const App = () => {
    const showTotal = useCallback((total: number, [from, to]: [number, number]) => {
        return `显示第 ${from} 到第 ${to} 条记录，总共 ${total} 条记录`;
    }, []);

    return (
        <div>
            <ElPagination size="small" layout="prev, pager, next" total={50} style={{ marginBottom: 20 }} />
            <ElPagination size="small" background layout="prev, pager, next" total={50} showSizeChanger showQuickJumper style={{ marginBottom: 20 }} />
        </div>
    );
};

export default App;
