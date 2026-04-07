import React, { forwardRef } from 'react';
import Table, { TableGridInstance } from '../table-grid';

import type { TableV2GridProps } from '../grid';

export type MainTableRendererProps = TableV2GridProps & {};

const MainTable = forwardRef<TableGridInstance, MainTableRendererProps>((props, ref) => {
    return (
        <Table ref={ref} {...props}>
            {props.children}
        </Table>
    );
});

export default MainTable;
