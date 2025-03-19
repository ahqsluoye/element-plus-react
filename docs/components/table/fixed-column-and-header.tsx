/* eslint-disable no-console */
import { ElTable, ElTableColumn, ElTag, RenderCell } from '@parker/element-plus-react';
import React from 'react';

interface TableData {
    date: string;
    name: string;
    state: string;
    city: string;
    address: string;
    zip: string;
    tag: string;
}
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
    },
    {
        date: '2016-05-08',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
    },
    {
        date: '2016-05-06',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
    },
    {
        date: '2016-05-07',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
    },
];

const App = () => {
    return (
        <ElTable data={tableData} height={250} style={{ width: '100%' }}>
            <ElTableColumn fixed prop="date" label="Date" width={150} />
            <ElTableColumn fixed prop="name" label="Name" width={120}>
                {(scope: RenderCell<TableData>) => <ElTag>{scope.row.name}</ElTag>}
            </ElTableColumn>
            <ElTableColumn prop="state" label="State" width={120} />
            <ElTableColumn prop="address" label="Address" width={600} />
            <ElTableColumn prop="zip" label="Zip" width={120} />
        </ElTable>
    );
};

export default App;
