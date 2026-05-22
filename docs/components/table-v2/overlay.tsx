import { ElIcon, ElTableV2 } from '@qsxy/element-plus-react';
import React from 'react';

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

    const columns = generateColumns(10);
    const data = generateData(columns, 200);

    return (
        <ElTableV2
            columns={columns}
            data={data}
            width={700}
            height={400}
            rowHeight={40}
            overlay={
                <div className="el-loading-mask" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--el-mask-color)' }}>
                    <ElIcon name="loader" prefix="fal" className="is-loading" style={{ color: 'var(--el-color-primary)' }} spin size="2x" />
                </div>
            }
        />
    );
};

export default App;
