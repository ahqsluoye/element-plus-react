/* eslint-disable @typescript-eslint/no-unused-vars */
import { ElTable, ElTableColumn, TableColumnCtx } from '@qsxy/element-plus-react';
import React, { useCallback } from 'react';
import { tableData } from './data';

interface User {
    date: string;
    name: string;
    address: string;
}

const App = () => {
    const formatter = useCallback((row: User, column: TableColumnCtx<User>) => {
        return row.address;
    }, []);

    return (
        <ElTable data={tableData} defaultSort={{ prop: 'date', order: 'descending' }} style={{ width: '100%' }}>
            <ElTableColumn prop="date" label="Date" width={180} />
            <ElTableColumn prop="name" label="Name" width={180} sortable sortOrders={['descending', 'ascending', null]} />
            <ElTableColumn prop="address" label="Address" formatter={formatter} />
        </ElTable>
    );
};

export default App;
