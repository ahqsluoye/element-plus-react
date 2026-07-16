import React, { Children, FC } from 'react';
import { TableV2HeaderCell } from '../header-cell';

const HeaderCell: FC<TableV2HeaderCell> = props => {
    const { children, ...rest } = props;

    return children ? (
        Children.map(children, child => React.cloneElement(child, { ...rest }))
    ) : (
        <div className={props.className} title={props.column?.title}>
            {props.column?.title}
        </div>
    );
};

HeaderCell.displayName = 'ElTableV2HeaderCell';

export default HeaderCell;
