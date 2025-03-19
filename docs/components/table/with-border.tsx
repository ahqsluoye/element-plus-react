import { ElTable, ElTableColumn } from '@qsxy/element-plus-react';
import React from 'react';
import { tableData } from './data';

const App = () => {
    return (
        <ElTable data={tableData} border style={{ width: '100%' }}>
            <ElTableColumn prop="date" label="Date" width={180} />
            <ElTableColumn prop="name" label="Name" width={180} />
            <ElTableColumn prop="address" label="Address" />
        </ElTable>
    );
};

export default App;
