import React, { FC } from 'react';
import { useChildrenInstance } from '../hooks';
import { TableColumnProps } from './typings';

export interface TableColumnRef {
    props: TableColumnProps<any>;
}

const TableColumn: FC<TableColumnProps<any>> = props => {
    const getChildren = useChildrenInstance<TableColumnProps<any>>('TableColumn');
    if (props.children instanceof Function) {
        return <div />;
    } else {
        const columns = props.children ? getChildren(props.children) : [];
        return <div>{columns}</div>;
    }
};

TableColumn.displayName = 'TableColumn';

export default TableColumn;
