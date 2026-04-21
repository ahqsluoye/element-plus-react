import React from 'react';
import { ElTableV2 } from '@qsxy/element-plus-react';

const generateData = (count: number) => {
    return Array.from({ length: count }).map((_, index) => ({
        id: index + 1,
        name: `Name ${index + 1}`,
        age: 20 + (index % 30),
        address: `Address ${index + 1}`,
        score: Math.floor(Math.random() * 100),
    }));
};

const columns = [
    { key: 'id', dataKey: 'id', title: 'ID', width: 80, sortable: true },
    { key: 'name', dataKey: 'name', title: 'Name', width: 150 },
    { key: 'age', dataKey: 'age', title: 'Age', width: 100, sortable: true },
    { key: 'address', dataKey: 'address', title: 'Address', width: 200 },
    { key: 'score', dataKey: 'score', title: 'Score', width: 120, sortable: true },
];

const data = generateData(50);

export default function Sort() {
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
