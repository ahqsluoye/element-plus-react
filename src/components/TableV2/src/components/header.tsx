import { nextTick } from '@qsxy/element-plus-react/Util';
import castArray from 'lodash/castArray';
import React, { CSSProperties, forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { useClassNames } from '../../../hooks';
import type { TableV2HeaderProps } from '../header';
import { TABLE_V2_GRID_INJECTION_KEY } from '../tokens';
import { enforceUnit } from '../utils';

const TableV2Header = forwardRef<TableV2HeaderInstance, TableV2HeaderProps>((props, ref) => {
    const { className, columns, fixedHeaderData, headerData, headerHeight, rowWidth, rowHeight, height, width, dynamic, fixed } = props;
    const ns = useClassNames('table-v2');
    const scrollLeftInfo = useContext(TABLE_V2_GRID_INJECTION_KEY);

    const headerRef = useRef<HTMLDivElement>(null);

    const headerStyle = useMemo<CSSProperties>(
        () =>
            enforceUnit({
                width,
                height,
            }),
        [width, height],
    );

    const rowStyle = useMemo<CSSProperties>(
        () =>
            enforceUnit({
                width: rowWidth,
                height,
            }),
        [rowWidth, height],
    );

    const headerHeights = useMemo(() => castArray(headerHeight || 50), [headerHeight]);

    const scrollToLeft = (left?: number) => {
        const headerEl = headerRef.current;
        nextTick(() => {
            if (headerEl?.scroll) {
                headerEl.scroll({
                    left,
                });
            }
        });
    };

    const renderFixedRows = () => {
        const fixedRowClassName = ns.e('fixed-header-row');

        return fixedHeaderData?.map((fixedRowData, fixedRowIndex) => {
            const style: CSSProperties = enforceUnit({
                height: rowHeight,
                width: '100%',
            });

            return fixed?.({
                class: fixedRowClassName,
                columns,
                rowData: fixedRowData,
                rowIndex: -(fixedRowIndex + 1),
                style,
            });
        });
    };

    const renderDynamicRows = () => {
        const dynamicRowClassName = ns.e('dynamic-header-row');

        return headerHeights.map((rowHeight, rowIndex) => {
            const style: CSSProperties = enforceUnit({
                width: '100%',
                height: rowHeight,
            });

            return dynamic?.({
                class: dynamicRowClassName,
                columns,
                headerIndex: rowIndex,
                style,
            });
        });
    };

    // Equivalent to onUpdated - scroll when scrollLeftInfo changes
    useEffect(() => {
        if (scrollLeftInfo !== undefined) {
            scrollToLeft(scrollLeftInfo);
        }
    }, [scrollLeftInfo]);

    useImperativeHandle(ref, () => ({
        scrollToLeft,
    }));

    if (height <= 0) {
        return null;
    }

    return (
        <div ref={headerRef} className={className} style={headerStyle} role="rowgroup">
            <div style={rowStyle} className={ns.e('header')}>
                {renderDynamicRows()}
                {renderFixedRows()}
            </div>
        </div>
    );
});

TableV2Header.displayName = 'ElTableV2Header';

export default TableV2Header;

export type TableV2HeaderInstance = {
    /**
     * @description scroll to position based on the provided value
     */
    scrollToLeft: (left?: number) => void;
};

export type TableV2HeaderRendererParams = {
    class: string;
    columns: TableV2HeaderProps['columns'];
    columnsStyles: Record<string, CSSProperties>;
    headerIndex: number;
    style: CSSProperties;
};

export type TableV2HeaderRowRendererParams = {
    rowData: any;
    rowIndex: number;
} & Omit<TableV2HeaderRendererParams, 'headerIndex'>;
