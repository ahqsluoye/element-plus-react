import React, { useState } from 'react';
import { ElTableV2, ElButton } from '@qsxy/element-plus-react';

const generateData = (count: number) => {
    return Array.from({ length: count }).map((_, index) => ({
        id: index + 1,
        name: `Name ${index + 1}`,
        age: 20 + (index % 30),
        address: `Address ${index + 1}`,
    }));
};

const columns = [
    { key: 'id', dataKey: 'id', title: 'ID', width: 80 },
    { key: 'name', dataKey: 'name', title: 'Name', width: 150 },
    { key: 'age', dataKey: 'age', title: 'Age', width: 100 },
    { key: 'address', dataKey: 'address', title: 'Address', width: 200 },
];

const data = generateData(50);

export default function Selection() {
    const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([]);

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <ElButton
                    onClick={() => setSelectedRowKeys([])}
                    disabled={selectedRowKeys.length === 0}
                >
                    Clear Selection
                </ElButton>
                <span style={{ marginLeft: 16 }}>
                    Selected: {selectedRowKeys.length}
                </span>
            </div>
            <ElTableV2
                columns={columns}
                data={data}
                width={800}
                height={400}
                rowKey="id"
                rowSelection={{
                    type: 'checkbox',
                    selectedRowKeys,
                    onChange: setSelectedRowKeys,
                }}
            />
        </div>
    );
}
