import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import classNames from 'classnames';
import some from 'lodash/some';
import React, { use, useMemo, useRef, useState } from 'react';
import { TableContext, TableHeaderContext } from './TableContext';
import TableHeaderCell from './TableHeaderCell';

interface Props {
    scheduleLayout: (needUpdateColumns?: boolean, immediate?: boolean) => void;
}

const TableHeader = ({ scheduleLayout }: Props) => {
    const { tableId, columns, fixedLeftColumns, fixedRightColumns, props } = use(TableContext);
    const { headerRowClassName, headerRowStyle, defaultSort } = props;
    const { is, bm } = useClassNames('table');

    const initSortRef = useRef<boolean | null>(false);
    const [sortProp, setSortProp] = useState(defaultSort?.prop);

    const middleColumns = useMemo(
        () =>
            columns.map((col, index) => {
                if (index === 0) {
                    return col.filter(item => !some([...fixedLeftColumns, ...fixedRightColumns], { id: item.id }));
                }
                return col;
            }),
        [fixedLeftColumns, fixedRightColumns, columns],
    );

    return (
        <TableHeaderContext value={{ sortProp, setSortProp, init: initSortRef }}>
            <thead className={is({ group: columns.length > 1 })}>
                {middleColumns.map((row, rowIndex) => {
                    let columnIndex = -1;
                    return (
                        <tr
                            key={`${tableId}_${rowIndex}`}
                            className={typeof headerRowClassName === 'function' ? headerRowClassName?.({ row, rowIndex }) : headerRowClassName}
                            style={typeof headerRowStyle === 'function' ? headerRowStyle?.({ row, rowIndex }) : headerRowStyle}
                        >
                            {rowIndex === 0 &&
                                fixedLeftColumns.map(column => {
                                    columnIndex++;
                                    return (
                                        <TableHeaderCell
                                            key={column.id}
                                            row={row}
                                            rowIndex={rowIndex}
                                            column={column}
                                            columnIndex={columnIndex}
                                            className={classNames(
                                                bm('fixed-column', 'left'),
                                                is({ leaf: column.isSubColumn, 'last-column': columnIndex === fixedLeftColumns.length - 1 }),
                                            )}
                                            style={{ left: column.offsetWidth }}
                                            scheduleLayout={scheduleLayout}
                                        />
                                    );
                                })}

                            {row.map(column => {
                                columnIndex++;
                                return <TableHeaderCell key={column.id} row={row} rowIndex={rowIndex} column={column} columnIndex={columnIndex} scheduleLayout={scheduleLayout} />;
                            })}

                            {rowIndex === 0 &&
                                fixedRightColumns.map((column, index) => {
                                    columnIndex++;
                                    return (
                                        <TableHeaderCell
                                            key={column.id}
                                            row={row}
                                            rowIndex={rowIndex}
                                            column={column}
                                            columnIndex={columnIndex}
                                            className={classNames(bm('fixed-column', 'right'), is({ leaf: column.isSubColumn, 'first-column': index === 0 }))}
                                            style={{ right: column.offsetWidth }}
                                            scheduleLayout={scheduleLayout}
                                        />
                                    );
                                })}
                        </tr>
                    );
                })}
            </thead>
        </TableHeaderContext>
    );
};

export default TableHeader;
