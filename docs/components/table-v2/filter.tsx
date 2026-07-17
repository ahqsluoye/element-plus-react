import { ElButton, ElCheckbox, ElIcon, ElPopover, ElTableV2, TableV2Column, TableV2FixedDir } from '@qsxy/element-plus-react';
import React, { useRef, useState } from 'react';
import './filter.scss';

const App = () => {
    const generateColumns = (length = 10, prefix = 'column-', props = {}) =>
        Array.from({ length }).map((_, columnIndex) => ({
            ...props,
            key: `${prefix}${columnIndex}`,
            dataKey: `${prefix}${columnIndex}`,
            title: `TableV2Column ${columnIndex}`,
            width: 150,
        })) as TableV2Column[];

    const generateData = (columns, length = 200, prefix = 'row-') =>
        Array.from({ length }).map((_, rowIndex) => {
            return columns.reduce(
                (rowData, column, columnIndex) => {
                    rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`;
                    return rowData;
                },
                {
                    id: `${prefix}${rowIndex}`,
                    parentId: null,
                },
            );
        });
    const columns = generateColumns(10);
    const [data, setData] = useState(generateData(columns, 200));

    const [shouldFilter, setShouldFilter] = useState(false);
    const popoverRef = useRef(null);

    const onFilter = () => {
        popoverRef.current.hide();
        if (shouldFilter) {
            setData(generateData(columns, 100, 'filtered-'));
        } else {
            setData(generateData(columns, 200));
        }
    };

    const onReset = () => {
        setShouldFilter(false);
        onFilter();
    };

    const handleShowPopover = () => {
        const button = document.querySelector('.el-table-v2__demo-filter button') as HTMLButtonElement;
        button?.focus();
    };

    columns[0].headerCellRenderer = props => {
        return (
            <div className="flex items-center justify-center">
                <span className="mr-2 text-xs">{props.column.title}</span>
                <ElPopover
                    ref={popoverRef}
                    trigger="click"
                    width={200}
                    content={
                        <div className="filter-wrapper">
                            <div className="filter-group">
                                <ElCheckbox checked={shouldFilter} onChange={setShouldFilter}>
                                    Filter Text
                                </ElCheckbox>
                            </div>
                            <div className="el-table-v2__demo-filter">
                                <ElButton text onClick={onFilter}>
                                    Confirm
                                </ElButton>
                                <ElButton text onClick={onReset}>
                                    Reset
                                </ElButton>
                            </div>
                        </div>
                    }
                    afterEnter={handleShowPopover}
                >
                    <button type="button" className="el-table-v2__demo-filter-btn">
                        <ElIcon name="filter"></ElIcon>
                    </button>
                </ElPopover>
            </div>
        );
    };

    const fixedColumns = columns.map((column, columnIndex) => {
        let fixed = undefined;
        if (columnIndex < 2) fixed = TableV2FixedDir.LEFT;
        if (columnIndex > 9) fixed = TableV2FixedDir.RIGHT;
        return { ...column, fixed, width: 100 };
    });
    return <ElTableV2 columns={fixedColumns} data={data} width={700} height={400} fixed />;
};

export default App;
