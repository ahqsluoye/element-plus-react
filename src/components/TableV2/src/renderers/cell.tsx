import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import React, { useMemo } from 'react';
import { ExpandIcon, TableCell, TableV2RowCellRenderParam } from '../components';
import { Alignment } from '../constants';
import { placeholderSign } from '../private';
import { componentToSlot, enforceUnit, tryCall } from '../utils';

import type { UseNamespaceReturn } from '@qsxy/element-plus-react/hooks/useClassNames';
import type { IconSize } from '@qsxy/element-plus-react/Icon/typings';
import classNames from 'classnames';
import type { TableV2Props } from '../table';
import type { UseTableReturn } from '../use-table';

type CellRendererProps = TableV2RowCellRenderParam &
    Pick<TableV2Props, 'cellProps' | 'expandColumnKey' | 'indentSize' | 'rowKey'> & {
        expandedRowKeys: UseTableReturn['expandedRowKeys'];
        ns: UseNamespaceReturn;
        iconSize?: IconSize;
        children?: React.ReactNode;
    };

const CellRenderer: React.FC<CellRendererProps> = ({
    // renderer props
    columns,
    column,
    columnIndex,
    depth,
    expandIconProps,
    isScrolling,
    rowData,
    rowIndex,
    // from use-table
    style,
    expandedRowKeys,
    ns,
    // derived props
    cellProps: _cellProps,
    expandColumnKey,
    indentSize,
    iconSize,
    rowKey,
    children,
}) => {
    const cellStyle = useMemo(() => enforceUnit(style), [style]);

    const { cellRenderer, dataKey, dataGetter } = column;

    const cellData = useMemo(() => {
        if (column.placeholderSign === placeholderSign) {
            return undefined;
        }
        return isFunction(dataGetter) ? dataGetter({ columns, column, columnIndex, rowData, rowIndex }) : get(rowData, dataKey ?? '');
    }, [dataGetter, columns, column, columnIndex, rowData, rowIndex, dataKey]);

    const extraCellProps = useMemo(() => {
        if (column.placeholderSign === placeholderSign) {
            return {};
        }
        return tryCall(_cellProps, {
            cellData,
            columns,
            column,
            columnIndex,
            rowIndex,
            rowData,
        });
    }, [_cellProps, cellData, columns, column, columnIndex, rowIndex, rowData]);

    const cellProps = useMemo(
        () => ({
            className: ns.e('cell-text'),
            columns,
            column,
            columnIndex,
            cellData,
            isScrolling,
            rowData,
            rowIndex,
        }),
        [ns, columns, column, columnIndex, cellData, isScrolling, rowData, rowIndex],
    );

    const columnCellRenderer = componentToSlot<typeof cellProps>(cellRenderer);
    const Cell = columnCellRenderer ? columnCellRenderer(cellProps) : children || <TableCell {...cellProps}>{cellData}</TableCell>;

    const kls = useMemo(
        () => classNames(ns.e('row-cell'), column.className, ns.is({ 'align-center': column.align === Alignment.CENTER, 'align-right': column.align === Alignment.RIGHT })),
        [ns, column.className, column.align],
    );

    const expandable = rowIndex >= 0 && expandColumnKey && column.key === expandColumnKey;
    const expanded = rowIndex >= 0 && expandedRowKeys.includes(rowData[rowKey]);

    let IconOrPlaceholder: React.ReactNode = null;
    if (expandable) {
        if (isObject(expandIconProps)) {
            IconOrPlaceholder = (
                <ExpandIcon
                    {...expandIconProps}
                    className={[ns.e('expand-icon'), ns.is('expanded', expanded)].join(' ')}
                    size={iconSize}
                    expanded={expanded}
                    ariaLabel={expanded ? '折叠行' : '展开行'}
                    style={{ marginInlineStart: `${depth * indentSize}px` }}
                    expandable
                />
            );
        } else {
            IconOrPlaceholder = <div style={{ marginInlineStart: `${depth * indentSize}px`, width: iconSize, height: iconSize }} />;
        }
    }

    // 占位符单元格
    if (column.placeholderSign === placeholderSign) {
        return <div className={ns.em('row-cell', 'placeholder')} style={cellStyle} />;
    }

    return (
        <div className={kls} style={cellStyle} {...extraCellProps} role="cell">
            {IconOrPlaceholder}
            {Cell}
        </div>
    );
};

export default React.memo(CellRenderer);
