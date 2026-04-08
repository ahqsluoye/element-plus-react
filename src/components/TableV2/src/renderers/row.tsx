import React from 'react';
import { Row } from '../components';
import { tryCall } from '../utils';

import classNames from 'classnames';
import { UseNamespaceReturn } from '../../../hooks/useClassNames';
import type { TableV2Props } from '../table';
import type { TableGridRowSlotParams } from '../table-grid';
import type { UseTableReturn } from '../use-table';

type RowRendererProps = TableGridRowSlotParams &
    Pick<TableV2Props, 'expandColumnKey' | 'estimatedRowHeight' | 'rowProps' | 'rowClass' | 'rowKey' | 'rowEventHandlers' | 'rowFormatter' | 'cellFormatter'> &
    Pick<UseTableReturn, 'depthMap' | 'expandedRowKeys' | 'hasFixedColumns' | 'onRowHovered' | 'onRowExpanded' | 'columnsStyles'> & {
        ns: UseNamespaceReturn;
        tableInstance?: any;
    };

const RowRenderer = (props: RowRendererProps) => {
    const {
        columns,
        columnsStyles,
        depthMap,
        expandColumnKey,
        expandedRowKeys,
        estimatedRowHeight,
        hasFixedColumns,
        rowData,
        rowIndex,
        style,
        isScrolling,
        rowProps,
        rowClass,
        rowKey,
        rowEventHandlers,
        ns,
        onRowHovered,
        onRowExpanded,
    } = props;

    const rowKls = tryCall(rowClass, { columns, rowData, rowIndex }, '');
    const additionalProps = tryCall(rowProps, {
        columns,
        rowData,
        rowIndex,
    });
    const _rowKey = rowData[rowKey];
    const depth = depthMap[_rowKey] || 0;
    const canExpand = Boolean(expandColumnKey);
    const isFixedRow = rowIndex < 0;
    const kls = classNames(
        ns.e('row'),
        rowKls,
        ns.is({ expanded: canExpand && expandedRowKeys.includes(_rowKey), fixed: !depth && isFixedRow, customized: Boolean(props.rowFormatter) }),
        {
            [ns.e(`row-depth-${depth}`)]: canExpand && rowIndex >= 0,
        },
    );

    const onRowHover = hasFixedColumns ? onRowHovered : undefined;

    const _rowProps = {
        ...additionalProps,
        columns,
        columnsStyles,
        className: kls,
        depth,
        expandColumnKey,
        estimatedRowHeight: isFixedRow ? undefined : estimatedRowHeight,
        isScrolling,
        rowIndex,
        rowData,
        rowKey: _rowKey,
        rowEventHandlers,
        style,
        rowFormatter: props.rowFormatter,
        cellFormatter: props.cellFormatter,
    };

    const handlerMouseEnter = (e: MouseEvent) => {
        onRowHover?.({
            hovered: true,
            rowKey: _rowKey,
            event: e,
            rowData,
            rowIndex,
        });
    };

    const handlerMouseLeave = (e: MouseEvent) => {
        onRowHover?.({
            hovered: false,
            rowKey: _rowKey,
            event: e,
            rowData,
            rowIndex,
        });
    };

    return <Row {..._rowProps} onRowExpand={onRowExpanded} onMouseenter={handlerMouseEnter} onMouseleave={handlerMouseLeave} rowkey={_rowKey}></Row>;
};

export default RowRenderer;
