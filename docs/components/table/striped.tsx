import { ElTable, ElTableColumn } from '@parker/element-plus-react';
import React from 'react';
import { tableData } from './data';

const App = () => {
    return (
        <ElTable data={tableData} stripe style={{ width: '100%' }}>
            <ElTableColumn prop="date" label="Date" width={180} />
            <ElTableColumn prop="name" label="Name" width={180} />
            <ElTableColumn prop="address" label="Address" align="center" />
        </ElTable>
    );
};

export default App;
