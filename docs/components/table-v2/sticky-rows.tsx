import { ElTableV2 } from '@qsxy/element-plus-react';
import React, { useMemo, useState } from 'react';
import './sticky-rows.scss';

const App = () => {
    const generateColumns = (length = 10, prefix = 'column-', props = {}) =>
        Array.from({ length }).map((_, columnIndex) => ({
            ...props,
            key: `${prefix}${columnIndex}`,
            dataKey: `${prefix}${columnIndex}`,
            title: `Column ${columnIndex}`,
            width: 150,
        }));

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
    const data = generateData(columns, 200);

    const rowClass = ({ rowIndex }) => {
        if (rowIndex < 0 || (rowIndex + 1) % 5 === 0) return 'sticky-row';
    };

    const [stickyIndex, setStickyIndex] = useState(0);

    const fixedData = useMemo(() => data.slice(stickyIndex, stickyIndex + 1), [stickyIndex, data]);

    const tableData = useMemo(() => {
        return data.slice(1);
    }, [data]);

    const onScroll = ({ scrollTop }) => {
        setStickyIndex(Math.floor(scrollTop / 250) * 5);
    };
    return <ElTableV2 columns={columns} data={data} fixedData={fixedData} rowClass={rowClass} height={400} width={700} fixed onScroll={onScroll} />;
};

export default App;
