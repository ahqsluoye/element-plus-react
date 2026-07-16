import useChildrenInstance from '@qsxy/element-plus-react/hooks/useChildrenInstance';
import React, { FC } from 'react';
import { TableColumnProps } from './typings';

export interface TableColumnRef {
    props: TableColumnProps;
}

const TableColumn: FC<TableColumnProps> = props => {
    const getChildren = useChildrenInstance<TableColumnProps>('ElTableColumn');
    if (props.children instanceof Function) {
        return <div />;
    } else {
        const columns = props.children ? getChildren(props.children) : [];
        return <div>{columns}</div>;
    }
};

TableColumn.displayName = 'ElTableColumn';

export default TableColumn;
