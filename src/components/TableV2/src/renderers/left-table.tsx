import Table, { TableGridInstance } from '../table-grid';

import React, { forwardRef, RefObject } from 'react';
import { TableV2GridProps } from '../grid';

type LeftTableProps = TableV2GridProps & {
    leftTableRef: RefObject<TableGridInstance | undefined>;
    children?: React.ReactNode;
};

const LeftTable = forwardRef<TableGridInstance, LeftTableProps>((props, ref) => {
    if (!props.columns.length) {
        return;
    }

    return (
        <Table ref={ref} {...props}>
            {params => props.rowFormatter && props.rowFormatter(params)}
        </Table>
    );
});

LeftTable.displayName = 'LeftTable';

export default LeftTable;
