/* eslint-disable no-console */
import { ElButton, ElIcon, ElPopover, ElTable, ElTableColumn, ElTag, RenderCell, TableColumnCtx } from '@parker/element-plus-react';
import React, { useCallback } from 'react';
import { tableData } from './data';

interface User {
    date: string;
    name: string;
    address: string;
}

const App = () => {
    const handleEdit = useCallback((index: number, row: User, column?: TableColumnCtx<User>) => {
        console.log(index, row, column);
    }, []);

    const handleDelete = useCallback((index: number, row: User, column?: TableColumnCtx<User>) => {
        console.log(index, row, column);
    }, []);

    return (
        <ElTable data={tableData} height={250} style={{ width: '100%' }}>
            <ElTableColumn fixed prop="date" label="Date" width={180}>
                {(scope: RenderCell<User>) => (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <ElIcon name="timeline" />
                        <span style={{ marginLeft: 10 }}>{scope.row.date}</span>
                    </div>
                )}
            </ElTableColumn>
            <ElTableColumn prop="name" label="Name" width={180}>
                {(scope: RenderCell<User>) => (
                    <ElPopover
                        trigger="hover"
                        placement="top"
                        hideTimeout={0}
                        content={
                            <span>
                                <div>name: {scope.row.name}</div>
                                <div>address: {scope.row.address}</div>
                            </span>
                        }
                    >
                        <ElTag>{scope.row.name}</ElTag>
                    </ElPopover>
                )}
            </ElTableColumn>
            <ElTableColumn label="Operations">
                {(scope: RenderCell<User>) => (
                    <>
                        <ElButton size="small" onClick={() => handleEdit(scope.$index, scope.row, scope.column)}>
                            Edit
                        </ElButton>
                        <ElButton type="danger" size="small" onClick={() => handleDelete(scope.$index, scope.row, scope.column)}>
                            Delete
                        </ElButton>
                    </>
                )}
            </ElTableColumn>
        </ElTable>
    );
};

export default App;
