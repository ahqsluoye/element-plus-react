import React, { CSSProperties, useMemo } from 'react';

import type { TableV2HeaderRowProps } from '../header-row';
import type { ColumnCellsType } from '../types';

const TableV2HeaderRow: React.FC<TableV2HeaderRowProps> = ({ className, columns, columnsStyles, headerIndex, style, cell, header }) => {
    const Cells = useMemo(() => {
        let cells: ColumnCellsType = columns.map((column, columnIndex) => {
            return cell?.({
                columns,
                column,
                columnIndex,
                headerIndex,
                style: columnsStyles[column.key],
            });
        });

        if (header) {
            // 如果提供了自定义渲染函数，调用它
            cells = header({
                cells: Cells.map(node => {
                    if (Array.isArray(node) && node.length === 1) {
                        return node[0];
                    }
                    return node;
                }),
                columns,
                headerIndex,
            });
        }

        return cells;
    }, [columns, header, cell, headerIndex, columnsStyles]);

    return (
        <div className={className} style={style} role="row">
            {Cells}
        </div>
    );
};

export default TableV2HeaderRow;

export type TableV2HeaderRowCellRendererParams = {
    columns: TableV2HeaderRowProps['columns'];
    column: TableV2HeaderRowProps['columns'][number];
    columnIndex: number;
    headerIndex: number;
    style: CSSProperties;
};

export type TableV2HeaderRowRendererParams = {
    cells: ColumnCellsType;
    columns: TableV2HeaderRowProps['columns'];
    headerIndex: number;
};
