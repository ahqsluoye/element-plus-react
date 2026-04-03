import React, { CSSProperties } from 'react';
import { Column } from './types';

export type TableV2CellProps = {
    style?: CSSProperties;
    cellData?: any;
    rowData?: any;
    className?: string;
    column?: Column<any>;
    columnIndex?: number;
    rowIndex?: number;
    children: React.ReactElement | React.ReactElement[];
};

export type TableV2CellPropsPublic = {
    style?: CSSProperties;
    cellData?: any;
    rowData?: any;
    className?: string;
    column?: Column<any>;
    columnIndex?: number;
    rowIndex?: number;
};
