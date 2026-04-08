import React, { CSSProperties, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { nextTick } from '../../../Util';
import { placeholderSign } from '../private';
import type { RowEventHandlers, TableV2RowProps } from '../row';
import { TableV2Context } from '../tokens';

const useTableRow = (props: TableV2RowProps) => {
    const context = useContext(TableV2Context);
    if (!context) {
        throw new Error('TableV2Row must be used within TableV2Context.Provider');
    }

    const { isScrolling } = context;
    const [measured, setMeasured] = useState(false);
    const rowRef = useRef<HTMLDivElement>(null);

    const measurable = useMemo(() => {
        return typeof props.estimatedRowHeight === 'number' && props.rowIndex >= 0;
    }, [props.estimatedRowHeight, props.rowIndex]);

    const doMeasure = (isInit = false) => {
        const $rowRef = rowRef.current;
        if (!$rowRef) {
            return;
        }
        const { columns, onRowHeightChange, rowKey, rowIndex, style } = props;
        const { height } = $rowRef.getBoundingClientRect();
        setMeasured(true);

        nextTick(() => {
            if (isInit || height !== Number.parseInt(style?.height as string)) {
                const firstColumn = columns[0];
                const isPlaceholder = firstColumn?.placeholderSign === placeholderSign;
                onRowHeightChange?.({ rowKey, height, rowIndex }, firstColumn && !isPlaceholder && firstColumn.fixed);
            }
        });
    };

    const eventHandlers = useMemo(() => {
        const { rowData, rowIndex, rowKey, onRowHover } = props;
        const handlers = props.rowEventHandlers || ({} as RowEventHandlers);
        const eventHandler = {} as {
            [key in keyof RowEventHandlers]: (e: any) => void;
        };

        Object.entries(handlers).forEach(([eventName, handler]) => {
            if (typeof handler === 'function') {
                eventHandler[eventName] = (event: any) => {
                    handler({
                        event,
                        rowData,
                        rowIndex,
                        rowKey,
                    });
                };
            }
        });

        if (onRowHover) {
            [
                { name: 'onMouseleave', hovered: false },
                { name: 'onMouseenter', hovered: true },
            ].forEach(({ name, hovered }) => {
                const existedHandler = eventHandler[name];
                eventHandler[name] = (event: any) => {
                    onRowHover({
                        event,
                        hovered,
                        rowData,
                        rowIndex,
                        rowKey,
                    });

                    existedHandler?.(event);
                };
            });
        }
        return eventHandler;
    }, [props]);

    const onExpand = (expanded: boolean) => {
        const { onRowExpand, rowData, rowIndex, rowKey } = props;

        onRowExpand?.({
            expanded,
            rowData,
            rowIndex,
            rowKey,
        });
    };

    // Equivalent to onMounted
    useEffect(() => {
        if (measurable) {
            doMeasure(true);
        }
    }, []);

    return { isScrolling, measurable, measured, rowRef, eventHandlers, onExpand };
};

const TableV2Row: React.FC<TableV2RowProps> = ({
    className,
    columns,
    columnsStyles,
    expandColumnKey,
    depth,
    rowData,
    rowIndex,
    style,
    rowFormatter,
    cellFormatter,
    ...restProps
}) => {
    const { eventHandlers, isScrolling, measurable, measured, rowRef, onExpand } = useTableRow(restProps as TableV2RowProps);

    const renderContent = () => {
        let ColumnCells = columns.map((column, columnIndex) => {
            const expandable = Array.isArray(rowData.children) && rowData.children.length > 0 && column.key === expandColumnKey;

            return cellFormatter?.({
                column,
                columns,
                columnIndex,
                depth,
                style: columnsStyles[column.key],
                rowData,
                rowIndex,
                isScrolling,
                expandIconProps: expandable
                    ? {
                          rowData,
                          rowIndex,
                          onExpand,
                      }
                    : undefined,
            });
        });

        if (rowFormatter) {
            ColumnCells = rowFormatter({
                cells: ColumnCells.map(node => {
                    if (Array.isArray(node) && node.length === 1) {
                        return node[0];
                    }
                    return node;
                }),
                style,
                columns,
                depth,
                rowData,
                rowIndex,
                isScrolling,
            });
        }

        return ColumnCells;
    };

    if (measurable) {
        const { height, ...exceptHeightStyle } = style || {};
        return (
            <div ref={rowRef} className={className} style={measured ? style : exceptHeightStyle} role="row" {...eventHandlers}>
                {renderContent()}
            </div>
        );
    }

    return (
        <div ref={rowRef} className={className} style={style} role="row" {...eventHandlers}>
            {renderContent()}
        </div>
    );
};

TableV2Row.displayName = 'ElTableV2TableRow';

export default TableV2Row;

export type TableV2RowCellRenderParam = {
    column: TableV2RowProps['columns'][number];
    columns: TableV2RowProps['columns'];
    columnIndex: number;
    depth: number;
    style: CSSProperties;
    rowData: any;
    rowIndex: number;
    isScrolling: boolean;
    expandIconProps?: {
        rowData: any;
        rowIndex: number;
        onExpand: (expand: boolean) => void;
    };
};
