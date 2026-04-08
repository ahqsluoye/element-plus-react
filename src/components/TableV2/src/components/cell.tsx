import React, { useMemo } from 'react';
import type { TableV2CellProps } from '../cell';

const TableV2Cell: React.FC<TableV2CellProps> = ({ className, cellData, style, children, ...rest }) => {
    const displayText = useMemo(() => {
        return cellData?.toString?.() || '';
    }, [cellData]);

    return (
        <div className={className} title={displayText} style={style}>
            {children ?? displayText}
        </div>
    );
};

TableV2Cell.displayName = 'ElTableV2Cell';

export default TableV2Cell;
