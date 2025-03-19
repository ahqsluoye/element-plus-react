/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { ElTable, ElTableColumn, TableColumnCtx } from '@parker/element-plus-react';
import React, { useCallback } from 'react';

interface User {
    id: string;
    name: string;
    amount1: string;
    amount2: string;
    amount3: number;
}

interface SpanMethodProps {
    row: User;
    column: TableColumnCtx<User>;
    rowIndex: number;
    columnIndex: number;
}

const tableData: User[] = [
    {
        id: '12987122',
        name: 'Tom',
        amount1: '234',
        amount2: '3.2',
        amount3: 10,
    },
    {
        id: '12987123',
        name: 'Tom',
        amount1: '165',
        amount2: '4.43',
        amount3: 12,
    },
    {
        id: '12987124',
        name: 'Tom',
        amount1: '324',
        amount2: '1.9',
        amount3: 9,
    },
    {
        id: '12987125',
        name: 'Tom',
        amount1: '621',
        amount2: '2.2',
        amount3: 17,
    },
    {
        id: '12987126',
        name: 'Tom',
        amount1: '539',
        amount2: '4.1',
        amount3: 15,
    },
];

const App = () => {
    const arraySpanMethod = useCallback(({ row, column, rowIndex, columnIndex }: SpanMethodProps) => {
        if (rowIndex % 2 === 0) {
            if (columnIndex === 0) {
                return [1, 2];
            } else if (columnIndex === 1) {
                return [0, 0];
            }
        }
    }, []);

    const objectSpanMethod = useCallback(({ row, column, rowIndex, columnIndex }: SpanMethodProps) => {
        if (columnIndex === 0) {
            if (rowIndex % 2 === 0) {
                return {
                    rowspan: 2,
                    colspan: 1,
                };
            } else {
                return {
                    rowspan: 0,
                    colspan: 0,
                };
            }
        }
    }, []);

    return (
        <div>
            <ElTable data={tableData} spanMethod={arraySpanMethod} border style={{ width: '100%' }}>
                <ElTableColumn prop="id" label="ID" width={180} />
                <ElTableColumn prop="name" label="Name" />
                <ElTableColumn prop="amount1" sortable label="Amount 1" />
                <ElTableColumn prop="amount2" sortable label="Amount 2" />
                <ElTableColumn prop="amount3" sortable label="Amount 3" />
            </ElTable>

            <ElTable data={tableData} spanMethod={objectSpanMethod} border style={{ width: '100%', marginTop: 20 }}>
                <ElTableColumn prop="id" label="ID" width={180} />
                <ElTableColumn prop="name" label="Name" />
                <ElTableColumn prop="amount1" sortable label="Amount 1" />
                <ElTableColumn prop="amount2" sortable label="Amount 2" />
                <ElTableColumn prop="amount3" sortable label="Amount 3" />
            </ElTable>
        </div>
    );
};

export default App;
