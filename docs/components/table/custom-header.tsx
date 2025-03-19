/* eslint-disable no-console */
import { ElButton, ElInput, ElTable, ElTableColumn, RenderCell } from '@qsxy/element-plus-react';
import React, { useCallback } from 'react';
import { tableData } from './data';

interface User {
    date: string;
    name: string;
    address: string;
}

const App = () => {
    const handleEdit = useCallback((index: number, row: User) => {
        console.log(index, row);
    }, []);

    const handleDelete = useCallback((index: number, row: User) => {
        console.log(index, row);
    }, []);

    return (
        <ElTable data={tableData} height={250} style={{ width: '100%' }}>
            <ElTableColumn prop="date" label="Date" width={180} />
            <ElTableColumn prop="name" label="Name" width={180} />
            <ElTableColumn label={<ElInput placeholder="Type to search" />}>
                {(scope: RenderCell<User>) => (
                    <>
                        <ElButton size="small" onClick={() => handleEdit(scope.$index, scope.row)}>
                            Edit
                        </ElButton>
                        <ElButton type="danger" size="small" onClick={() => handleDelete(scope.$index, scope.row)}>
                            Delete
                        </ElButton>
                    </>
                )}
            </ElTableColumn>
        </ElTable>
    );
};

export default App;
