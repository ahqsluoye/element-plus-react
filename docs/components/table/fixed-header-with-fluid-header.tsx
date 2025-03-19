import { ElButton, ElTable, ElTableColumn, RenderCell } from '@parker/element-plus-react';
import dayjs from 'dayjs';
import cloneDeep from 'lodash/cloneDeep';
import React, { useCallback, useMemo, useState } from 'react';

interface TableData {
    date: string;
    name: string;
    state: string;
    city: string;
    address: string;
    zip: string;
}

const App = () => {
    const [tableData, setTableData] = useState([
        {
            date: '2016-05-01',
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
            date: '2016-05-03',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036',
        },
    ]);

    const now = useMemo(() => new Date(), []);

    const onAddItem = useCallback(() => {
        now.setDate(now.getDate() + 1);
        setTableData([
            ...tableData,
            {
                date: dayjs(now).format('YYYY-MM-DD'),
                name: 'Tom',
                state: 'California',
                city: 'Los Angeles',
                address: 'No. 189, Grove St, Los Angeles',
                zip: 'CA 90036',
            },
        ]);
    }, [now, tableData]);

    const deleteRow = useCallback(
        (index?: number) => {
            const temp = cloneDeep(tableData);
            temp.splice(index, 1);
            setTableData(temp);
        },
        [tableData],
    );

    return (
        <div>
            <ElTable data={tableData} style={{ width: '100%' }} maxHeight="250">
                <ElTableColumn type="selection" width={55} fixed />
                <ElTableColumn fixed prop="date" label="Date" width={150} />
                <ElTableColumn prop="name" label="Name" width={120} />
                <ElTableColumn prop="state" label="State" width={120} />
                <ElTableColumn prop="city" label="City" width={120} />
                <ElTableColumn prop="address" label="Address" width={600} />
                <ElTableColumn prop="zip" label="Zip" width={120} />
                <ElTableColumn fixed="right" label="Operations" width={120}>
                    {(scope: RenderCell<TableData>) => (
                        <ElButton link type="primary" size="small" onClick={() => deleteRow(scope.$index)}>
                            删除
                        </ElButton>
                    )}
                </ElTableColumn>
            </ElTable>
            <ElButton block onClick={onAddItem} style={{ marginTop: 15 }}>
                添加
            </ElButton>
        </div>
    );
};

export default App;
