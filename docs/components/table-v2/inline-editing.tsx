import { ElAutoResizer, ElInput, ElTableV2 } from '@qsxy/element-plus-react';
import React, { useEffect, useRef, useState } from 'react';
import './inline-editing.scss';

const App = () => {
    const InputCell = ({ value, onChange, onBlur, onKeydownEnter }) => {
        const focusRef = useRef(null);
        useEffect(() => {
            if (focusRef.current) {
                focusRef.current.focus?.();
            }
        }, []);
        return <ElInput ref={focusRef} onChange={onChange} onBlur={onBlur} onKeyDown={onKeydownEnter} value={value} />;
    };

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
                    editing: false,
                    parentId: null,
                },
            );
        });

    const columns = generateColumns(10);
    const [data, setData] = useState(generateData(columns, 200));
    columns[0] = {
        ...columns[0],
        title: 'Editable Column',
        cellRenderer: ({ rowData, column, rowIndex }) => {
            const onChange = value => {
                setData(prev => prev.map((row, index) => (index === rowIndex ? { ...row, [column.dataKey]: value } : row)));
            };
            const onEnterEditMode = () => {
                setData(prev => prev.map((row, index) => (index === rowIndex ? { ...row, editing: true } : row)));
            };

            const onExitEditMode = e => {
                if (e.key === 'Enter') {
                    setData(prev => prev.map((row, index) => (index === rowIndex ? { ...row, editing: false } : row)));
                }
            };

            return rowData.editing ? (
                <InputCell value={rowData[column.dataKey]} onChange={onChange} onBlur={onExitEditMode} onKeydownEnter={onExitEditMode} />
            ) : (
                <div className="table-v2-inline-editing-trigger" onClick={onEnterEditMode}>
                    {rowData[column.dataKey]}
                </div>
            );
        },
    };

    return (
        <div style={{ height: 400 }}>
            <ElAutoResizer>
                <ElTableV2 columns={columns} data={data} fixed />
            </ElAutoResizer>
        </div>
    );
};

export default App;
