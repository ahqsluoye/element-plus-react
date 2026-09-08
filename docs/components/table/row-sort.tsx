import { ElTable, ElTableColumn } from '@qsxy/element-plus-react';
import React, { useState } from 'react';

interface DragRow {
    id: number;
    date: string;
    name: string;
    address: string;
}

const initialData: DragRow[] = Array.from({ length: 120 }, (_, i) => ({
    id: i + 1,
    date: `2016-05-${String((i % 28) + 1).padStart(2, '0')}`,
    name: `Tom ${i + 1}`,
    address: `No. ${189 + i}, Grove St, Los Angeles`,
}));

/** 直接拖拽行排序（120 行数据验证大数据量下的流畅性） */
const RowDragDemo = () => {
    const [data, setData] = useState(initialData);

    return (
        <ElTable
            data={data}
            rowKey="id"
            height={400}
            rowSortEnabled
            onRowSortChange={(nextData, { fromIndex, toIndex, row }) => {
                setData(nextData);
                console.log(`行 ${row.name} 从 ${fromIndex} 移动到 ${toIndex}`, nextData);
            }}
            style={{ width: '100%' }}
        >
            <ElTableColumn type="index" width={60} />
            <ElTableColumn prop="date" label="Date" width={140} />
            <ElTableColumn prop="name" label="Name" width={140} />
            <ElTableColumn prop="address" label="Address" />
        </ElTable>
    );
};

/** 通过拖拽手柄排序（rowSortEnabled='handle' + type='drag' 列） */
const HandleDragDemo = () => {
    const [data, setData] = useState(initialData.slice(0, 8));

    return (
        <ElTable
            data={data}
            rowKey="id"
            rowSortEnabled="handle"
            onRowSortChange={nextData => {
                setData(nextData);
            }}
            style={{ width: '100%' }}
        >
            <ElTableColumn type="drag" width={48} />
            <ElTableColumn type="index" width={60} />
            <ElTableColumn prop="date" label="Date" width={140} />
            <ElTableColumn prop="name" label="Name" width={140} />
            <ElTableColumn prop="address" label="Address" />
        </ElTable>
    );
};

const App = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <RowDragDemo />
            <HandleDragDemo />
        </div>
    );
};

export default App;
