import Table, { TableGridInstance } from '../table-grid';

import React, { forwardRef } from 'react';
import { TableV2GridProps } from '../grid';

type RightTableProps = TableV2GridProps & {
    children?: React.ReactNode;
};

const RightTable = forwardRef<TableGridInstance, RightTableProps>((props, ref) => {
    if (!props.columns.length) {
        return;
    }

    return (
        <Table ref={ref} {...props}>
            {props.children}
        </Table>
    );
});

export default RightTable;
