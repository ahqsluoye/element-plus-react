import debounce from 'lodash/debounce';
import isNumber from 'lodash/isNumber';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FixedDir } from '../constants';

import type { UseNamespaceReturn } from '@qsxy/element-plus-react/hooks/useClassNames';
import type { onRowRenderedParams } from '../grid';
import type { RowExpandParams, RowHeightChangedParams, RowHoverParams } from '../row';
import type { TableV2Props } from '../table';
import type { TableGridInstance } from '../table-grid';
import type { FixedDirection, KeyType } from '../types';

type Heights = Record<KeyType, number>;
type GridInstanceRef = React.RefObject<TableGridInstance | null>;

type UseRowProps = {
    mainTableRef: GridInstanceRef;
    leftTableRef: GridInstanceRef;
    rightTableRef: GridInstanceRef;
    tableInstance: any;
    ns: UseNamespaceReturn;
    isScrolling: boolean;
    onExpandedRowKeys?: (expandedRowKeys: KeyType[]) => void;
};

export const useRow = (props: TableV2Props, { mainTableRef, leftTableRef, rightTableRef, tableInstance, ns, isScrolling, onExpandedRowKeys }: UseRowProps) => {
    // const [isResetting, setIsResetting] = useState(false);
    const [expandedRowKeys, setExpandedRowKeys] = useState<KeyType[]>(props.defaultExpandedRowKeys || []);
    const [lastRenderedRowIndex, setLastRenderedRowIndex] = useState(-1);
    const resetIndexRef = useRef<number | null>(null);
    const [rowHeights, setRowHeights] = useState<Heights>({});

    const isResetting = useRef(false);
    const pendingRowHeightsRef = useRef<Heights>({});
    const leftTableHeightsRef = useRef<Heights>({});
    const mainTableHeightsRef = useRef<Heights>({});
    const rightTableHeightsRef = useRef<Heights>({});

    const isDynamic = useMemo(() => isNumber(props.estimatedRowHeight), [props.estimatedRowHeight]);

    const onRowsRendered = useCallback(
        (params: onRowRenderedParams) => {
            props.onRowsRendered?.(params);

            if (params.rowCacheEnd > lastRenderedRowIndex) {
                setLastRenderedRowIndex(params.rowCacheEnd);
            }
        },
        [lastRenderedRowIndex, props],
    );

    const onRowHovered = useCallback(
        ({ hovered, rowKey }: RowHoverParams) => {
            if (isScrolling) {
                return;
            }
            // TODO: 需要找到合适的 DOM 引用方式
            // const tableRoot = tableInstance!.vnode.el as HTMLElement
            // const rows = tableRoot.querySelectorAll(`[rowkey="${String(rowKey)}"]`)
            // rows.forEach(row => {
            //   if (hovered) {
            //     row.classList.add(ns.is('hovered'))
            //   } else {
            //     row.classList.remove(ns.is('hovered'))
            //   }
            // })
        },
        [isScrolling],
    );

    const onRowExpanded = useCallback(
        ({ expanded, rowData, rowIndex, rowKey }: RowExpandParams) => {
            setExpandedRowKeys(prev => {
                const currentKeyIndex = prev.indexOf(rowKey);
                let newExpandedRowKeys;
                if (expanded) {
                    if (currentKeyIndex === -1) {
                        newExpandedRowKeys = [...prev, rowKey];
                    } else {
                        newExpandedRowKeys = [...prev];
                    }
                } else {
                    if (currentKeyIndex > -1) {
                        newExpandedRowKeys = prev.filter(key => key !== rowKey);
                    } else {
                        newExpandedRowKeys = [...prev];
                    }
                }
                onExpandedRowKeys?.(newExpandedRowKeys);
                props.onRowExpand?.({ expanded, rowData, rowIndex, rowKey });
                props.onExpandedRowsChange?.(newExpandedRowKeys);
                return newExpandedRowKeys;
            });

            // TODO: 需要找到合适的 DOM 引用方式
            // const tableRoot = tableInstance!.vnode.el as HTMLElement;
            // const hoverRow = tableRoot.querySelector(`.${ns.is('hovered')}[rowkey="${String(rowKey)}"]`);
            // if (hoverRow) {
            //     nextTick(() => onRowHovered({ hovered: true, rowKey }));
            // }
        },
        [onExpandedRowKeys, props],
    );

    const resetAfterIndex = useCallback(
        (index: number, forceUpdate = false) => {
            if (!isDynamic) {
                return;
            }
            [mainTableRef, leftTableRef, rightTableRef].forEach(tableRef => {
                const table = tableRef.current;
                if (table) {
                    (table as any).resetAfterRowIndex?.(index, forceUpdate);
                }
            });
        },
        [isDynamic, mainTableRef, leftTableRef, rightTableRef],
    );

    // Equivalent to debounce for flushing row heights
    const flushingRowHeights = debounce(
        useCallback(() => {
            isResetting.current = true;
            setRowHeights(prev => ({ ...prev, ...pendingRowHeightsRef.current }));
            resetAfterIndex(resetIndexRef.current, false);
            pendingRowHeightsRef.current = {};
            // force update
            resetIndexRef.current = null;
            (mainTableRef.current as any)?.forceUpdate?.();
            (leftTableRef.current as any)?.forceUpdate?.();
            (rightTableRef.current as any)?.forceUpdate?.();
            isResetting.current = false;
        }, [resetAfterIndex, mainTableRef, leftTableRef, rightTableRef]),
        0,
    );

    const resetHeights = useCallback((rowKey: KeyType, height: number, rowIdx: number) => {
        const resetIdx = resetIndexRef.current;
        if (resetIdx === null) {
            resetIndexRef.current = rowIdx;
        } else {
            if (resetIdx > rowIdx) {
                resetIndexRef.current = rowIdx;
            }
        }

        pendingRowHeightsRef.current[rowKey] = height;
    }, []);

    const onRowHeightChange = useCallback(
        ({ rowKey, height, rowIndex }: RowHeightChangedParams, fixedDir: FixedDirection) => {
            if (!fixedDir) {
                mainTableHeightsRef.current[rowKey] = height;
            } else {
                if (fixedDir === FixedDir.RIGHT) {
                    rightTableHeightsRef.current[rowKey] = height;
                } else {
                    leftTableHeightsRef.current[rowKey] = height;
                }
            }

            const maximumHeight = Math.max(leftTableHeightsRef.current[rowKey] || 0, rightTableHeightsRef.current[rowKey] || 0, mainTableHeightsRef.current[rowKey] || 0);

            if (rowHeights[rowKey] !== maximumHeight) {
                resetHeights(rowKey, maximumHeight, rowIndex);
                flushingRowHeights();
            }
        },
        [rowHeights, resetHeights, flushingRowHeights],
    );

    return {
        expandedRowKeys,
        setExpandedRowKeys,
        lastRenderedRowIndex,
        setLastRenderedRowIndex,
        isDynamic,
        isResetting,
        rowHeights,

        resetAfterIndex,
        onRowExpanded,
        onRowHovered,
        onRowsRendered,
        onRowHeightChange,
    };
};

export type UseRowReturn = ReturnType<typeof useRow>;
