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
        joinDate: `2020-0${((index % 9) + 1)}-0${((index % 28) + 1)}`,
    }));
};

const columns = [
    { key: 'id', dataKey: 'id', title: 'ID', width: 80 },
    { key: 'name', dataKey: 'name', title: 'Name', width: 150 },
    { key: 'age', dataKey: 'age', title: 'Age', width: 100 },
    { key: 'address', dataKey: 'address', title: 'Address', width: 200 },
    { key: 'email', dataKey: 'email', title: 'Email', width: 200 },
    { key: 'phone', dataKey: 'phone', title: 'Phone', width: 150 },
    { key: 'department', dataKey: 'department', title: 'Department', width: 150 },
    { key: 'position', dataKey: 'position', title: 'Position', width: 150 },
    { key: 'salary', dataKey: 'salary', title: 'Salary', width: 120 },
    { key: 'joinDate', dataKey: 'joinDate', title: 'Join Date', width: 150 },
];

const data = generateData(10000);

export default function LargeData() {
    return (
        <div>
            <p>共 {data.length.toLocaleString()} 条数据</p>
            <ElTableV2
                columns={columns}
                data={data}
                width={1000}
                height={500}
            />
        </div>
    );
}
