import { ElTable, ElTableColumn } from '@parker/element-plus-react';
import React from 'react';
import { tableData } from './data';
import './with-status.scss';

interface User {
    date: string;
    name: string;
    address: string;
}

const App = () => {
    const tableRowClassName = ({ rowIndex }: { row: User; rowIndex: number }) => {
        if (rowIndex === 1) {
            return 'warning-row';
        } else if (rowIndex === 3) {
            return 'success-row';
        }
        return '';
    };

    return (
        <ElTable data={tableData} style={{ width: '100%' }} rowClassName={tableRowClassName}>
            <ElTableColumn prop="date" label="Date" width={180} />
            <ElTableColumn prop="name" label="Name" width={180} />
            <ElTableColumn prop="address" label="Address" />
        </ElTable>
    );
};

export default App;
