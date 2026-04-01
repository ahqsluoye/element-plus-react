import { ElLink, ElTable, ElTableColumn, ElTag, RenderCell } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    const tableData = [
        {
            address: 'Lohrbergstr. 86c, Süd Lilli, Saarland',
            tags: ['Office', 'Home', 'Park', 'Garden'],
            url: 'https://github.com/element-plus/element-plus/issues',
        },
        {
            address: '760 A Street, South Frankfield, Illinois',
            tags: ['error', 'warning', 'success', 'info'],
            url: 'https://github.com/element-plus/element-plus/pulls',
        },
        {
            address: 'Arnold-Ohletz-Str. 41a, Alt Malinascheid, Thüringen',
            tags: ['one', 'two', 'three', 'four', 'five'],
            url: 'https://github.com/element-plus/element-plus/discussions',
        },
        {
            address: '23618 Windsor Drive, West Ricardoview, Idaho',
            tags: ['blue', 'white', 'dark', 'gray', 'red', 'bright'],
            url: 'https://github.com/element-plus/element-plus/actions',
        },
    ];

    const tableRowFormatter = data => {
        return `${data.cellValue}: table formatter`;
    };

    const withVNode = data => {
        return (
            <ElLink type="primary" href={data.cellValue}>
                {data.cellValue}
            </ElLink>
        );
    };

    return (
        <ElTable data={tableData} showOverflowTooltip tooltipFormatter={({ row }) => tableRowFormatter(row)} style={{ width: '100%' }}>
            <ElTableColumn prop="address" label="extends table formatter" width={240} />
            <ElTableColumn prop="tags" label="formatter object" width={240} tooltipFormatter={({ row }) => row.tags.join(', ')}>
                {({ row }: RenderCell<any>) =>
                    row.tags.map(tag => (
                        <ElTag key={tag} type="primary" style={{ marginLeft: 5 }}>
                            {tag}
                        </ElTag>
                    ))
                }
            </ElTableColumn>
            <ElTableColumn prop="url" label="with vnode" width={240} tooltipFormatter={withVNode} />
        </ElTable>
    );
};

export default App;
