import { ElLink, ElPagination, PageType } from '@parker/element-plus-react';
import React, { useCallback } from 'react';

const App = () => {
    const itemRender = useCallback((page: number, type: PageType, originalElement: any) => {
        if (type === 'prev') {
            return <ElLink type="primary">Previous</ElLink>;
        }
        if (type === 'next') {
            return <ElLink type="primary">Next</ElLink>;
        }
        return originalElement;
    }, []);

    return <ElPagination total={500} itemRender={itemRender} />;
};

export default App;
