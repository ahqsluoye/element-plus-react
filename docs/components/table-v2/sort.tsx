import { ElTableV2, TableV2Column, TableV2SortOrder } from '@qsxy/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const generateColumns = (length = 10, prefix = 'column-', props = {}) =>
        Array.from({ length }).map((_, columnIndex) => ({
            ...props,
            key: `${prefix}${columnIndex}`,
            dataKey: `${prefix}${columnIndex}`,
            title: `TableV2Column ${columnIndex}`,
            width: 150,
        })) as TableV2Column[];

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

    columns[0].sortable = true;

    const [sortState, setSortState] = useState({
        key: 'column-0',
        order: TableV2SortOrder.ASC,
    });

    const onSort = sortBy => {
        console.log(sortBy);
        setData(data.reverse());
        setSortState(sortBy);
    };
    return <ElTableV2 columns={columns} data={data} width={700} height={400} fixed sortBy={sortState} onColumnSort={onSort} />;
};

export default App;
