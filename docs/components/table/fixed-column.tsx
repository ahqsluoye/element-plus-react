/* eslint-disable no-console */
import { ElButton, ElTable, ElTableColumn, ElTag, RenderCell } from '@parker/element-plus-react';
import React, { useCallback } from 'react';

interface TableData {
    date: string;
    name: string;
    state: string;
    city: string;
    address: string;
    zip: string;
    tag: string;
}

const App = () => {
    const handleClick = useCallback((scope: RenderCell<TableData>) => {
        console.log(scope);
    }, []);

    return (
        <ElTable data={tableData} height={250} style={{ width: '100%' }}>
            <ElTableColumn fixed prop="date" label="Date" width={150} />
            <ElTableColumn fixed prop="name" label="Name" width={120}>
                {(scope: RenderCell<TableData>) => <ElTag>{scope.row.name}</ElTag>}
            </ElTableColumn>
            <ElTableColumn prop="state" label="State" width={120} />
            <ElTableColumn prop="address" label="Address" width={600} />
            <ElTableColumn fixed="right" prop="zip" label="Zip" width={120} />
            <ElTableColumn fixed="right" label="Operations" width={120}>
                {(scope: RenderCell<TableData>) => (
                    <>
                        <ElButton link type="primary" size="small" onClick={() => handleClick(scope)}>
                            Detail
                        </ElButton>
                        <ElButton link type="primary" size="small" onClick={() => handleClick(scope)}>
                            Edit
                        </ElButton>
                    </>
                )}
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
        tag: 'Home',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Office',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Home',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Office',
    },
];

export default App;
