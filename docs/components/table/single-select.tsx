import { ElTable, ElTableColumn, TableRef } from '@parker/element-plus-react';
import React, { useCallback, useRef, useState } from 'react';
import { tableData } from './data';

interface User {
    date: string;
    name: string;
    address: string;
}

const App = () => {
    const tableRef = useRef<TableRef<User> | null>(null);

    const [, setCurrentRow] = useState<User>();

    const handleCurrentChange = useCallback((val: User | undefined) => {
        setCurrentRow(val);
    }, []);

    return (
        <ElTable ref={tableRef} data={tableData} highlightCurrentRow style={{ width: '100%' }} onCurrentChange={handleCurrentChange}>
            <ElTableColumn type="index" width={50} />
            <ElTableColumn prop="date" label="Date" width={180} />
            <ElTableColumn prop="name" label="Name" width={180} />
            <ElTableColumn prop="address" label="Address" />
        </ElTable>
    );
};

export default App;
