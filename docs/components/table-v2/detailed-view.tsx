import { ElTableV2 } from '@qsxy/element-plus-react';
import React from 'react';
import './detailed-view.scss';

const App = () => {
    const detailedText = `Velit sed aspernatur tempora. Natus consequatur officiis dicta vel assumenda.
Itaque est temporibus minus quis. Ipsum commodiab porro vel voluptas illum.
Qui quam nulla et dolore autem itaque est.
Id consequatur ipsum ea fuga et odit eligendi impedit.
Maiores officiis occaecati et magnam et sapiente est velit sunt.
Non et tempore temporibus. Excepturi et quos. Minus distinctio aut.
Voluptatem ea excepturi omnis vel. Non aperiam sit sed laboriosam eaque omnis deleniti.
Est molestiae omnis non et nulla repudiandae fuga sit.`;

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
    const data = generateData(columns, 200).map(data => {
        data.children = [
            {
                id: `${data.id}-detail-content`,
                detail: detailedText,
            },
        ];
        return data;
    });

    const Row = params => {
        const { cells, rowData } = params;
        if (rowData.detail) return <div className="p-6">{rowData.detail}</div>;
        return cells;
    };
    return <ElTableV2 columns={columns} data={data} width={700} height={400} estimatedRowHeight={50} expandColumnKey={columns[0].key} rowFormatter={Row} />;
};

export default App;
