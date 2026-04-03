import React from 'react';
import { Column } from './types';

export type TableV2HeaderCell = {
    className?: string;
    column?: Column<any>;
    columnIndex?: number;
    children: React.ReactElement | React.ReactElement[];
};
export type TableV2HeaderCellPublic = {
    className?: string;
    column?: Column<any>;
    columnIndex?: number;
};
