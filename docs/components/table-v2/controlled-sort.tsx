import { ElTableV2 } from '@qsxy/element-plus-react';
import { Column, TableV2SortOrder } from '@qsxy/element-plus-react/TableV2';
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

    columns[0].sortable = true;
    columns[1].sortable = true;

    const [sortState, setSortState] = useState({
        'column-0': TableV2SortOrder.DESC,
        'column-1': TableV2SortOrder.ASC,
    });

    const onSort = ({ key, order }) => {
        console.log({ key, order });
        setData(data.reverse());
        setSortState(prev => ({ ...prev, [key]: order }));
    };
    return <ElTableV2 columns={columns} data={data} width={700} height={400} fixed sortState={sortState} onColumnSort={onSort} />;
};

export default App;
