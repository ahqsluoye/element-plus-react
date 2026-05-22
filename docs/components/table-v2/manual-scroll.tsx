import { ElAutoResizer, ElButton, ElForm, ElInputNumber, ElTableV2 } from '@qsxy/element-plus-react';
import React, { useRef, useState } from 'react';

const App = () => {
    const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
        Array.from({ length }).map((_, columnIndex) => ({
            ...props,
            key: `${prefix}${columnIndex}`,
            dataKey: `${prefix}${columnIndex}`,
            title: `Column ${columnIndex}`,
            width: 150,
        }));

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
    const data = generateData(columns, 200);
    const tableRef = useRef<any>(null);
    const [scrollDelta, setScrollDelta] = useState(200);
    const [scrollRows, setScrollRows] = useState(10);

    function scrollByPixels() {
        tableRef.current?.scrollToTop(scrollDelta);
    }

    function scrollByRows() {
        tableRef.current?.scrollToRow(scrollRows);
    }
    return (
        <>
            <div className="mb-4 flex items-center">
                <ElForm.Item label="Scroll pixels" className="mr-4">
                    <>
                        <ElInputNumber value={scrollDelta} onChange={setScrollDelta} controls={false} />
                    </>
                </ElForm.Item>
                <ElForm.Item label="Scroll rows">
                    <>
                        <ElInputNumber value={scrollRows} onChange={setScrollRows} controls={false} />
                    </>
                </ElForm.Item>
            </div>
            <div className="mb-4 flex items-center">
                <ElButton onClick={scrollByPixels}> Scroll by pixels </ElButton>
                <ElButton onClick={scrollByRows}> Scroll by rows </ElButton>
            </div>

            <div style={{ height: 400 }}>
                <ElAutoResizer>
                    <ElTableV2 ref={tableRef} columns={columns} data={data} fixed />
                </ElAutoResizer>
            </div>
        </>
    );
};

export default App;
