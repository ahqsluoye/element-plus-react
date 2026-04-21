import React from 'react';
import { ElTableV2 } from '@qsxy/element-plus-react';

const generateData = (count: number) => {
    return Array.from({ length: count }).map((_, index) => ({
        id: index + 1,
        name: `Name ${index + 1}`,
        age: 20 + (index % 30),
        address: `Address ${index + 1}`,
        email: `email${index + 1}@example.com`,
        phone: `138${String(index).padStart(8, '0')}`,
        department: `Department ${(index % 10) + 1}`,
        position: `Position ${(index % 5) + 1}`,
        salary: 5000 + index * 10,
    }));
};

const columns = [
    { key: 'id', dataKey: 'id', title: 'ID', width: 80, fixed: 'left' },
    { key: 'name', dataKey: 'name', title: 'Name', width: 150, fixed: 'left' },
    { key: 'age', dataKey: 'age', title: 'Age', width: 100 },
    { key: 'address', dataKey: 'address', title: 'Address', width: 200 },
    { key: 'email', dataKey: 'email', title: 'Email', width: 200 },
    { key: 'phone', dataKey: 'phone', title: 'Phone', width: 150 },
    { key: 'department', dataKey: 'department', title: 'Department', width: 150 },
    { key: 'position', dataKey: 'position', title: 'Position', width: 150 },
    { key: 'salary', dataKey: 'salary', title: 'Salary', width: 120, fixed: 'right' },
];

const data = generateData(50);

export default function FixedColumn() {
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
