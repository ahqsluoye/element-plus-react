import { ElTable, ElTableColumn } from '@qsxy/element-plus-react';
import React from 'react';
import { tableData } from './data';

const App = () => {
    const indexMethod = (index: number) => {
        return index * 2;
    };

    return (
        <ElTable data={tableData} style={{ width: '100%' }}>
            <ElTableColumn type="index" index={indexMethod} width={60} />
            <ElTableColumn prop="date" label="Date" width={180} />
            <ElTableColumn prop="name" label="Name" width={180} />
            <ElTableColumn prop="address" label="Address" align="center" />
        </ElTable>
    );
};

export default App;
