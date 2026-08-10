import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import { BaseProps, NativeProps } from '@qsxy/element-plus-react/types/common';
import castArray from 'lodash/castArray';
import React, { CSSProperties, use, useImperativeHandle, useMemo, useRef } from 'react';
import type { TableV2HeaderProps } from '../header';
import { TABLE_V2_GRID_INJECTION_KEY } from '../tokens';
import { enforceUnit } from '../utils';

const TableV2Header = ({ ref, ...props }: TableV2HeaderProps & { ref?: React.Ref<TableV2HeaderInstance | null> }) => {
    const { className, columns, fixedHeaderData, headerData, headerHeight, rowWidth, rowHeight, height, width, dynamic, fixed } = props;
    const ns = useClassNames('table-v2');
    const scrollLeftInfo = use(TABLE_V2_GRID_INJECTION_KEY);

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
        if (headerEl?.scroll) {
            headerEl.scroll({
                left,
            });
        }
        // nextTick(() => {});
    };

    const renderFixedRows = () => {
        const fixedRowClassName = ns.e('fixed-header-row');

        return fixedHeaderData?.map((fixedRowData, fixedRowIndex) => {
            const style: CSSProperties = enforceUnit({
                height: rowHeight,
                width: '100%',
            });

            return fixed?.({
                className: fixedRowClassName,
                columns,
                rowData: fixedRowData,
                rowIndex: -(fixedRowIndex + 1),
                style,
            });
        });
    };

    const renderDynamicRows = () => {
        const dynamicRowClassName = ns.e('dynamic-header-row');

        return headerHeights.map((_rowHeight, rowIndex) => {
            const style: CSSProperties = enforceUnit({
                width: '100%',
                height: _rowHeight,
            });

            return dynamic?.({
                className: dynamicRowClassName,
                columns,
                headerIndex: rowIndex,
                style,
            });
        });
    };

    // Equivalent to onUpdated - scroll when scrollLeftInfo changes
    // useEffect(() => {
    //     if (scrollLeftInfo.scrollLeft !== undefined) {
    //         scrollToLeft(scrollLeftInfo.scrollLeft);
    //     }
    // }, [scrollLeftInfo]);

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
};

TableV2Header.displayName = 'ElTableV2Header';

export default TableV2Header;

export type TableV2HeaderInstance = {
    /**
     * @description scroll to position based on the provided value
     */
    scrollToLeft: (left?: number) => void;
};

export type TableV2HeaderRendererParams = {
    columns: TableV2HeaderProps['columns'];
    columnsStyles: Record<string, CSSProperties>;
    headerIndex: number;
} & BaseProps &
    NativeProps;

export type TableV2HeaderRowRendererParams = {
    rowData: any;
    rowIndex: number;
} & Omit<TableV2HeaderRendererParams, 'headerIndex'>;
