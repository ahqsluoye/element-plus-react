import React, { forwardRef } from 'react';
import Table, { TableGridInstance } from '../table-grid';

import type { TableV2GridProps } from '../grid';

export type MainTableRendererProps = TableV2GridProps & {};

const MainTable = forwardRef<TableGridInstance, MainTableRendererProps>((props, ref) => {
    return (
        <Table ref={ref} {...props}>
            {params => props.rowFormatter && props.rowFormatter(params)}
        </Table>
    );
});

MainTable.displayName = 'MainTable';

export default MainTable;
