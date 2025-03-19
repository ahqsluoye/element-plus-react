import { ElButton, ElTable, ElTableColumn, TableRef } from '@qsxy/element-plus-react';
import React, { useCallback, useRef, useState } from 'react';

interface User {
    date: string;
    name: string;
    state: string;
    city: string;
    address: string;
    zip: string;
}

const App = () => {
    const multipleTableRef = useRef<TableRef<User> | null>(null);

    const [, setMultipleSelection] = useState<User[]>();

    const toggleSelection = useCallback((rows?: User[]) => {
        if (rows) {
            rows.forEach(row => {
                multipleTableRef.current?.toggleRowSelection(row, undefined);
            });
        } else {
            multipleTableRef.current?.clearSelection();
        }
    }, []);

    const handleSelectionChange = useCallback((val: User[]) => {
        // eslint-disable-next-line no-console
        console.log(val);
        setMultipleSelection(val);
    }, []);

    return (
        <>
            <ElTable ref={multipleTableRef} data={tableData} style={{ width: '100%' }} onSelectionChange={handleSelectionChange}>
                <ElTableColumn
                    type="selection"
                    width={55}
                    fixed
                    selectable={(row: User) => {
                        return row.date !== '2016-05-02';
                    }}
                />
                <ElTableColumn prop="date" label="Date" width={180} />
                <ElTableColumn prop="name" label="Name" width={180} />
                <ElTableColumn prop="state" label="State" width={180} />
                <ElTableColumn prop="city" label="City" width={180} />
                <ElTableColumn prop="address" label="Address" showOverflowTooltip />
                <ElTableColumn prop="zip" label="Zip" width={120} />
            </ElTable>
            <div style={{ marginTop: 20 }}>
                <ElButton onClick={() => toggleSelection([tableData[1], tableData[2]])}>oggle selection status of second and third rows</ElButton>
                <ElButton onClick={() => toggleSelection()}>Clear selection</ElButton>
            </div>
        </>
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
