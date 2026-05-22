import { ElTableV2 } from '@qsxy/element-plus-react';
import { TableV2FixedDir, TableV2Placeholder } from '@qsxy/element-plus-react/TableV2';
import React, { useState } from 'react';
import './grouping-header.scss';

const App = () => {
    const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
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
    const columns = generateColumns(15);
    const [data, setData] = useState(generateData(columns, 200));

    const fixedColumns = columns.map((column, columnIndex) => {
        let fixed = undefined;
        if (columnIndex < 3) fixed = TableV2FixedDir.LEFT;
        if (columnIndex > 12) fixed = TableV2FixedDir.RIGHT;
        return { ...column, fixed, width: 100 };
    });

    const CustomizedHeader = ({ cells, columns, headerIndex }) => {
        if (headerIndex === 2) return cells;

        const groupCells = [];
        let width = 0;
        let idx = 0;

        columns.forEach((column, columnIndex) => {
            if (column.placeholderSign === TableV2Placeholder) groupCells.push(cells[columnIndex]);
            else {
                width += cells[columnIndex].props.column.width;
                idx++;

                const nextColumn = columns[columnIndex + 1];
                if (columnIndex === columns.length - 1 || nextColumn.placeholderSign === TableV2Placeholder || idx === (headerIndex === 0 ? 4 : 2)) {
                    groupCells.push(
                        <div
                            className="flex items-center justify-center custom-header-cell"
                            role="columnheader"
                            style={{
                                ...cells[columnIndex].props.style,
                                width: `${width}px`,
                            }}
                        >
                            Group width {width}
                        </div>,
                    );
                    width = 0;
                    idx = 0;
                }
            }
        });

        return groupCells;
    };

    const headerClass = ({ headerIndex }) => {
        if (headerIndex === 1) return 'el-primary-color';
        return '';
    };
    return (
        <>
            <ElTableV2 columns={fixedColumns} data={data} width={700} height={400} fixed headerHeight={[50, 40, 50]} headerClass={headerClass} headerFormatter={CustomizedHeader} />
        </>
    );
};

export default App;
