import { ElTableV2, TableV2Column } from '@qsxy/element-plus-react';
import React, { cloneElement } from 'react';

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
    const data = generateData(columns, 200);

    const colSpanIndex = 1;
    columns[colSpanIndex].colSpan = ({ rowIndex }) => (rowIndex % 4) + 1;
    columns[colSpanIndex].align = 'center';

    const Row = ({ rowData, rowIndex, cells, columns }) => {
        const colSpan = columns[colSpanIndex].colSpan({ rowData, rowIndex });
        if (colSpan > 1) {
            let width = Number.parseInt(cells[colSpanIndex].props.style.width);
            for (let i = 1; i < colSpan; i++) {
                width += Number.parseInt(cells[colSpanIndex + i].props.style.width);
                cells[colSpanIndex + i] = null;
            }
            const style = {
                ...cells[colSpanIndex].props.style,
                width: `${width}px`,
                backgroundColor: 'var(--el-color-primary-light-3)',
            };
            cells[colSpanIndex] = cloneElement(cells[colSpanIndex], { style });
        }

        return cells;
    };
    return <ElTableV2 columns={columns} data={data} width={700} height={400} fixed rowFormatter={Row} />;
};

export default App;
