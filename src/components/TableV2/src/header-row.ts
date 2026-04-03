import { NativeProps } from '@qsxy/element-plus-react/types/common';
import { CSSProperties } from 'react';
import { Column, ColumnCellsType, KeyType } from './types';

export type TableV2HeaderRowProps = {
    columnsStyles: Record<KeyType, CSSProperties>;
    columns: Column<any>[];
    headerIndex?: number | undefined;
    cell?: (props: any) => ColumnCellsType;
    header?: (props: any) => ColumnCellsType;
} & NativeProps;
