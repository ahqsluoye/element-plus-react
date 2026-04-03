import React from 'react';
import type { Column } from './types';

export interface TableV2HeaderProps {
    className?: string;
    columns: Column<any>[];
    fixedHeaderData?: any[];
    headerData: any[];
    headerHeight?: number | number[];
    rowWidth: number;
    rowHeight?: number;
    height: number;
    width: number;
    dynamic?: (props: any) => React.ReactNode;
    fixed?: (props: any) => React.ReactNode;
}
