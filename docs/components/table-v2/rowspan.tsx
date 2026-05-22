import { ElTableV2 } from '@qsxy/element-plus-react';
import { Column } from '@qsxy/element-plus-react/TableV2';
import React, { cloneElement } from 'react';

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
    const data = generateData(columns, 200);

    const rowSpanIndex = 0;
    columns[rowSpanIndex].rowSpan = ({ rowIndex }) => (rowIndex % 2 === 0 && rowIndex <= data.length - 2 ? 2 : 1);

    const Row = ({ rowData, rowIndex, cells, columns }) => {
        const rowSpan = columns[rowSpanIndex].rowSpan({ rowData, rowIndex });
        if (rowSpan > 1) {
            const cell = cells[rowSpanIndex];
            const style = {
                ...cell.props.style,
                backgroundColor: 'var(--el-color-primary-light-3)',
                height: `${rowSpan * 50 - 1}px`,
                alignSelf: 'flex-start',
                zIndex: 1,
            };
            cells[rowSpanIndex] = cloneElement(cell, { style });
        }
        return cells;
    };
    return <ElTableV2 columns={columns} data={data} width={700} height={400} fixed rowFormatter={Row} />;
};

export default App;
