import Table, { TableGridInstance } from '../table-grid';

import React from 'react';
import { TableV2GridProps } from '../grid';

type RightTableProps = TableV2GridProps & {
    children?: React.ReactNode;
};

const RightTable = ({ ref, ...props }: RightTableProps & { ref?: React.Ref<TableGridInstance | null> }) => {
    if (!props.columns.length) {
        return;
    }

    return (
        <Table ref={ref} {...props}>
            {params => props.rowFormatter && props.rowFormatter(params)}
        </Table>
    );
};

RightTable.displayName = 'RightTable';

export default RightTable;
