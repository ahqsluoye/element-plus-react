import { ElTable, ElTableColumn, randomCode } from '@qsxy/element-plus-react';
import React from 'react';
import { tableData, tableData1 } from './tree-data';

interface User {
    id: number | string;
    date: string;
    name: string;
    address: string;
    hasChildren?: boolean;
    children?: User[];
}

const load = (row: User, treeNode: unknown, resolve: (date: User[]) => void) => {
    setTimeout(() => {
        resolve([
            {
                id: randomCode(11),
                date: '2016-05-01',
                name: 'wangxiaohu',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                id: randomCode(11),
                date: '2016-05-01',
                name: 'wangxiaohu',
                address: 'No. 189, Grove St, Los Angeles',
            },
        ]);
    }, 1000);
};

const App = () => {
    return (
        <>
            <ElTable data={tableData} rowKey="id" border /* indent={0} */ expandRowKeys={['3']} style={{ width: '100%', marginBottom: 20 }}>
                <ElTableColumn prop="date" label="Date" sortable />
                <ElTableColumn prop="name" label="Name" sortable />
                <ElTableColumn prop="address" label="Address" />
            </ElTable>

            <ElTable data={tableData1} rowKey="id" border lazy load={load} style={{ width: '100%' }}>
                <ElTableColumn prop="date" label="Date" sortable />
                <ElTableColumn prop="name" label="Name" sortable />
                <ElTableColumn prop="address" label="Address" />
            </ElTable>
        </>
    );
};

export default App;
