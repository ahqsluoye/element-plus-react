import { ElAutoResizer, ElCheckbox, ElTableV2 } from '@qsxy/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const SelectionCell = ({ value, intermediate = false, onChange }) => {
        return <ElCheckbox onChange={onChange} checked={value} indeterminate={intermediate} />;
    };

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
                    checked: false,
                    parentId: null,
                },
            );
        });

    const columns = generateColumns(10);
    const [data, setData] = useState(generateData(columns, 200));

    columns.unshift({
        key: 'selection',
        width: 50,
        cellRenderer: ({ rowData, rowIndex }) => {
            const onChange = value => {
                setData(prev => prev.map((item, index) => (index === rowIndex ? { ...item, checked: value } : item)));
            };
            return <SelectionCell onChange={onChange} value={rowData.checked} />;
        },

        headerCellRenderer: () => {
            const onChange = value =>
                setData(
                    data.map(row => {
                        row.checked = value;
                        return row;
                    }),
                );
            const allSelected = data.every(row => row.checked);
            const containsChecked = data.some(row => row.checked);

            return <SelectionCell value={allSelected} intermediate={containsChecked && !allSelected} onChange={onChange} />;
        },
    });

    return (
        <div style={{ height: 400 }}>
            <ElAutoResizer>
                <ElTableV2 columns={columns} data={data} fixed />
            </ElAutoResizer>
        </div>
    );
};

export default App;
