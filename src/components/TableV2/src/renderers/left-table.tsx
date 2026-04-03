import Table from '../table-grid';

import React, { forwardRef, RefObject } from 'react';
import { TableV2GridProps } from '../grid';
import { TableGridInstance } from '../table-grid';

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
            {props.children}
        </Table>
    );
});

export default LeftTable;
