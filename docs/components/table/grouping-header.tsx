import { ElTable, ElTableColumn } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElTable data={tableData} style={{ width: '100%' }}>
            <ElTableColumn prop="date" label="Date" width={150} />
            <ElTableColumn label="Delivery Info">
                <ElTableColumn prop="name" label="Name" width={120} />
                <ElTableColumn label="Address Info">
                    <ElTableColumn prop="state" label="State" width={120} />
                    <ElTableColumn prop="city" label="City" width={120} />
                    <ElTableColumn prop="address" label="Address" />
                    <ElTableColumn prop="zip" label="Zip" width={120} />
                </ElTableColumn>
            </ElTableColumn>
        </ElTable>
    );
};

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

export default App;
