import { ElTableV2 } from '@qsxy/element-plus-react';
import { Column, TableV2FixedDir, TableV2SortOrder } from '@qsxy/element-plus-react/TableV2';
import React, { useState } from 'react';

const App = () => {
    const generateColumns = (length = 10, prefix = 'column-', props = {}) =>
        Array.from({ length }).map((_, columnIndex) => ({
            ...props,
            key: `${prefix}${columnIndex}`,
            dataKey: `${prefix}${columnIndex}`,
            title: `Column ${columnIndex}`,
            width: 150,
        })) as Column[];

    const generateData = (columns, length = 200, prefix = 'row-') =>
        Array.from({ length }).map((_, rowIndex) => {
            return columns.reduce(
                (rowData, column, columnIndex) => {
                    rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`;
                    return rowData;
                },
                {
                    id: `${prefix}${rowIndex}`,
                    parentId: null,
                },
            );
        });

    const columns = generateColumns(10);
    const [data, setData] = useState(generateData(columns));

    columns[0].fixed = true;
    columns[1].fixed = TableV2FixedDir.LEFT;
    columns[9].fixed = TableV2FixedDir.RIGHT;

    for (let i = 0; i < 3; i++) columns[i].sortable = true;

    const [sortBy, setSortBy] = useState({
        key: 'column-0',
        order: TableV2SortOrder.ASC,
    });

    const onSort = _sortBy => {
        setData(data.reverse());
        setSortBy(_sortBy);
    };

    return <ElTableV2 columns={columns} data={data} width={700} height={400} fixed sortBy={sortBy} onColumnSort={onSort} />;
};

export default App;
