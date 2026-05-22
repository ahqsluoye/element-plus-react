import { ElAutoResizer, ElTableV2 } from '@qsxy/element-plus-react';
import { Column } from '@qsxy/element-plus-react/TableV2';
import React, { useState } from 'react';
import './cross-hovering.scss';

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
    columns.unshift({
        key: 'column-n-1',
        width: 50,
        title: 'Row No.',
        cellRenderer: ({ rowIndex }) => `${rowIndex + 1}`,
        align: 'center',
    });
    const data = generateData(columns, 200);

    const [kls, setKls] = useState('');
    const cellProps = ({ columnIndex }) => {
        const key = `hovering-col-${columnIndex}`;
        return {
            ['data-key']: key,
            onMouseEnter: () => {
                setKls(key);
            },
            onMouseLeave: () => {
                setKls('');
            },
        };
    };

    return (
        <div style={{ height: 400 }}>
            <ElAutoResizer>
                <ElTableV2 columns={columns} cellProps={cellProps} className={kls} data={data} />
            </ElAutoResizer>
        </div>
    );
};

export default App;
