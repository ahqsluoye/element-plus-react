import Table, { TableGridInstance } from '../table-grid';

import React, { RefObject } from 'react';
import { TableV2GridProps } from '../grid';

type LeftTableProps = TableV2GridProps & {
    leftTableRef: RefObject<TableGridInstance | undefined>;
    children?: React.ReactNode;
};

const LeftTable = ({ ref, ...props }: LeftTableProps & { ref?: React.Ref<TableGridInstance | null> }) => {
    if (!props.columns.length) {
        return;
    }

    return (
        <Table ref={ref} {...props}>
            {params => props.rowFormatter && props.rowFormatter(params)}
        </Table>
    );
};

LeftTable.displayName = 'LeftTable';

export default LeftTable;
