import React from 'react';
import { ElTableV2, ElButton, ElTag } from '@qsxy/element-plus-react';

const generateData = (count: number) => {
    return Array.from({ length: count }).map((_, index) => ({
        id: index + 1,
        name: `Name ${index + 1}`,
        age: 20 + (index % 30),
        status: index % 3 === 0 ? 'active' : index % 3 === 1 ? 'pending' : 'inactive',
    }));
};

const columns = [
    { key: 'id', dataKey: 'id', title: 'ID', width: 80 },
    { key: 'name', dataKey: 'name', title: 'Name', width: 150 },
    { key: 'age', dataKey: 'age', title: 'Age', width: 100 },
    { 
        key: 'status', 
        dataKey: 'status', 
        title: 'Status', 
        width: 150,
        render: ({ row }) => {
            const type = row.status === 'active' ? 'success' : row.status === 'pending' ? 'warning' : 'danger';
            return <ElTag type={type}>{row.status}</ElTag>;
        }
    },
    {
        key: 'action',
        title: 'Action',
        width: 200,
        render: ({ row, rowIndex }) => (
            <>
                <ElButton type="primary" size="small" style={{ marginRight: 8 }}>
                    Edit
                </ElButton>
                <ElButton type="danger" size="small">
                    Delete
                </ElButton>
            </>
        ),
    },
];

const data = generateData(50);

export default function CustomCell() {
    return (
        <div>
            <ElTableV2
                columns={columns}
                data={data}
                width={800}
                height={400}
            />
        </div>
    );
}
