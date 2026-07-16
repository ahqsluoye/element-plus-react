import React, { useMemo } from 'react';
import { HeaderCell, SortIcon, type TableV2HeaderRowCellRendererParams } from '../components';
// import ColumnResizer from '../table-column-resizer'
import { Alignment, SortOrder, oppositeOrderMap } from '../constants';
import { placeholderSign } from '../private';
import { componentToSlot, enforceUnit, tryCall } from '../utils';

import type { UseNamespaceReturn } from '@qsxy/element-plus-react/hooks/useClassNames';
import classNames from 'classnames';
import type { TableV2Props } from '../table';
import type { UseTableReturn } from '../use-table';

export type HeaderCellRendererProps = TableV2HeaderRowCellRendererParams &
    Pick<UseTableReturn, 'onColumnSorted'> &
    Pick<TableV2Props, 'sortBy' | 'sortState' | 'headerCellProps'> & {
        ns: UseNamespaceReturn;
    };

const HeaderCellRenderer: React.FC<HeaderCellRendererProps> = props => {
    const { column, ns, style, onColumnSorted } = props;

    const cellStyle = useMemo(() => enforceUnit(style), [style]);

    const { headerCellRenderer, headerClass, sortable } = column;

    /**
     * render Cell children
     */

    const cellProps = useMemo(
        () => ({
            ...props,
            className: ns.e('header-cell-text'),
        }),
        [props, ns],
    );

    const columnCellRenderer = componentToSlot<typeof cellProps>(headerCellRenderer);

    const Cell = columnCellRenderer ? columnCellRenderer(cellProps) : <HeaderCell {...cellProps} />;

    /**
     * Render cell container and sort indicator
     */
    const { sortBy, sortState, headerCellProps } = props;

    let sorting: boolean, sortOrder: SortOrder, ariaSort: string | undefined;
    if (sortState) {
        const order = sortState[column.key];
        sorting = Boolean(oppositeOrderMap[order]);
        sortOrder = sorting ? order : SortOrder.ASC;
    } else {
        sorting = column.key === sortBy?.key;
        sortOrder = sorting ? sortBy?.order : SortOrder.ASC;
    }
    if (sortOrder === SortOrder.ASC) {
        ariaSort = 'ascending';
    } else if (sortOrder === SortOrder.DESC) {
        ariaSort = 'descending';
    } else {
        ariaSort = undefined;
    }

    const cellKls = useMemo(
        () =>
            classNames(
                ns.e('header-cell'),
                tryCall(headerClass, props, ''),
                ns.is({ 'align-center': column.align === Alignment.CENTER, 'align-right': column.align === Alignment.RIGHT, sortable }),
            ),
        [ns, headerClass, props, column.align, sortable],
    );

    const cellWrapperProps = useMemo(
        () => ({
            ...tryCall(headerCellProps, props),
            onClick: column.sortable ? onColumnSorted : undefined,
            'aria-sort': sortable ? ariaSort : undefined,
            className: cellKls,
            style: cellStyle,
            ['data-key']: column.key,
        }),
        [headerCellProps, props, column.sortable, onColumnSorted, sortable, ariaSort, cellKls, cellStyle, column.key],
    );

    if (column.placeholderSign === placeholderSign) {
        return <div className={ns.em('header-row-cell', 'placeholder')} style={cellStyle} />;
    }

    // For now we don't deliver resizable column feature since it has some UX issue.
    return (
        <div {...cellWrapperProps} role="columnheader">
            {Cell}

            {sortable && (
                <SortIcon className={[ns.e('sort-icon'), sorting && ns.is('sorting')].filter(Boolean).join(' ')} sortOrder={sortOrder} ariaLabel={`排序: ${column.title || ''}`} />
            )}
        </div>
    );
};

export default HeaderCellRenderer;
export type HeaderCellSlotProps = HeaderCellRendererProps & { className: string };
