import { CSSProperties, useMemo } from 'react';
import { SortOrder, oppositeOrderMap } from '../constants';
import { placeholderSign } from '../private';
import { calcColumnStyle } from './utils';

import { isObject } from '@qsxy/element-plus-react/Util/base';
import { TableV2Props } from '../table';
import { AnyColumns, Column, KeyType } from '../types';

interface UseColumnsReturn {
    columns: AnyColumns;
    columnsStyles: Record<KeyType, CSSProperties>;
    columnsTotalWidth: number;
    fixedColumnsOnLeft: AnyColumns;
    fixedColumnsOnRight: AnyColumns;
    hasFixedColumns: number;
    mainColumns: AnyColumns;
    normalColumns: AnyColumns;
    visibleColumns: AnyColumns;
    getColumn: (key: KeyType) => Column<any> | undefined;
    getColumnStyle: (key: KeyType) => CSSProperties | undefined;
    updateColumnWidth: (column: Column<any>, width: number) => void;
    onColumnSorted: (e: MouseEvent) => void;
}

function useColumns(props: TableV2Props, columns: AnyColumns, fixed: boolean): UseColumnsReturn {
    const _columns = useMemo(
        () =>
            columns.map((column, index) => ({
                ...column,
                key: column.key ?? column.dataKey ?? index,
            })),
        [columns],
    );

    const visibleColumns = useMemo(() => {
        return _columns.filter(column => !column.hidden);
    }, [_columns]);

    const fixedColumnsOnLeft = useMemo(() => {
        return visibleColumns.filter(column => column.fixed === 'left' || column.fixed === true);
    }, [visibleColumns]);

    const fixedColumnsOnRight = useMemo(() => {
        return visibleColumns.filter(column => column.fixed === 'right');
    }, [visibleColumns]);

    const normalColumns = useMemo(() => {
        return visibleColumns.filter(column => !column.fixed);
    }, [visibleColumns]);

    const mainColumns = useMemo(() => {
        const ret: AnyColumns = [];

        fixedColumnsOnLeft.forEach(column => {
            ret.push({
                ...column,
                placeholderSign,
            });
        });

        normalColumns.forEach(column => {
            ret.push(column);
        });

        fixedColumnsOnRight.forEach(column => {
            ret.push({
                ...column,
                placeholderSign,
            });
        });

        return ret;
    }, [fixedColumnsOnLeft, normalColumns, fixedColumnsOnRight]);

    const hasFixedColumns = useMemo(() => {
        return fixedColumnsOnLeft.length || fixedColumnsOnRight.length;
    }, [fixedColumnsOnLeft, fixedColumnsOnRight]);

    const columnsStyles = useMemo(() => {
        return _columns.reduce<Record<KeyType, CSSProperties>>((style, column) => {
            style[column.key] = calcColumnStyle(column, fixed, props.fixed);
            return style;
        }, {});
    }, [_columns, fixed, props.fixed]);

    const columnsTotalWidth = useMemo(() => {
        return visibleColumns.reduce((width, column) => width + column.width, 0);
    }, [visibleColumns]);

    const getColumn = (key: KeyType) => {
        return _columns.find(column => column.key === key);
    };

    const getColumnStyle = (key: KeyType) => {
        return columnsStyles[key];
    };

    const updateColumnWidth = (column: Column<any>, width: number) => {
        column.width = width;
    };

    function onColumnSorted(e: MouseEvent) {
        const { key } = (e.currentTarget as HTMLElement).dataset;
        if (!key) {
            return;
        }
        const { sortState, sortBy } = props;

        let order = SortOrder.ASC;

        if (isObject(sortState)) {
            order = oppositeOrderMap[sortState[key]];
        } else if (sortBy && typeof sortBy === 'object' && 'order' in sortBy) {
            order = oppositeOrderMap[(sortBy as any).order];
        }

        props.onColumnSort?.({ column: getColumn(key), key, order });
    }

    return {
        columns: _columns,
        columnsStyles,
        columnsTotalWidth,
        fixedColumnsOnLeft,
        fixedColumnsOnRight,
        hasFixedColumns,
        mainColumns,
        normalColumns,
        visibleColumns,

        getColumn,
        getColumnStyle,
        updateColumnWidth,
        onColumnSorted,
    };
}

export { useColumns };
export type { UseColumnsReturn };
