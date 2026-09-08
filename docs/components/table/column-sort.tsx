import { ElTable, ElTableColumn } from '@qsxy/element-plus-react';
import React from 'react';
import { tableData } from './data';

const App = () => {
    return (
        <ElTable data={tableData} columnSortEnabled onColumnSortChange={console.log} style={{ width: '100%' }}>
            <ElTableColumn prop="date" label="Date" />
            <ElTableColumn prop="name" label="Name" />
            <ElTableColumn prop="address" label="Address" />
        </ElTable>
    );
};

export default App;
