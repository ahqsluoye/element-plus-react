import React, { CSSProperties } from 'react';
import { CellFormatProps, RowFormatProps } from './table';
import type { Column, FixedDirection, KeyType, RowCommonParams } from './types';

export type RowExpandParams = {
    expanded: boolean;
    rowKey: KeyType;
} & RowCommonParams;

export type RowHoverParams = {
    event?: MouseEvent;
    hovered: boolean;
    rowKey: KeyType;
} & Partial<RowCommonParams>;

export type RowEventHandlerParams = {
    rowKey?: KeyType;
    event: Event;
} & Partial<RowCommonParams>;

export type RowHeightChangedParams = {
    rowKey: KeyType;
    height: number;
    rowIndex: number;
};

export type RowExpandHandler = (params: RowExpandParams) => void;
export type RowHoverHandler = (params: RowHoverParams) => void;
export type RowEventHandler = (params: RowEventHandlerParams) => void;
export type RowHeightChangeHandler = (row: RowHeightChangedParams, fixedDirection: boolean | FixedDirection | undefined) => void;

export type RowEventHandlers = {
    onClick?: RowEventHandler;
    onContextMenu?: RowEventHandler;
    onDblClick?: RowEventHandler;
    onMouseEnter?: RowEventHandler;
    onMouseLeave?: RowEventHandler;
};

export interface TableV2RowProps {
    className?: string;
    columns: Column<any>[];
    columnsStyles: Record<KeyType, CSSProperties>;
    depth?: number;
    expandColumnKey?: string;
    estimatedRowHeight?: number;
    isScrolling?: boolean;
    onRowExpand?: RowExpandHandler;
    onRowHover?: RowHoverHandler;
    onRowHeightChange?: RowHeightChangeHandler;
    rowData: any;
    rowEventHandlers?: RowEventHandlers;
    rowIndex: number;
    rowKey: KeyType;
    style?: CSSProperties;
    rowFormatter?: (props: RowFormatProps) => React.ReactNode[];
    cellFormatter?: (props: CellFormatProps<any>) => React.ReactNode;
}
