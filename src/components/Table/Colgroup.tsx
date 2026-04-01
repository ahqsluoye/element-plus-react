import { createElement, FC } from 'react';
import { TableColumnCtx } from './typings';

interface Props<T> {
    columns: TableColumnCtx<T>[];

    /** 设置表格单元、行和列的布局方式 */
    tableLayout?: 'fixed' | 'auto';
}

const Colgroup: FC<Props<any>> = props => {
    const isAuto = props.tableLayout === 'auto';
    let columns = props.columns || [];
    if (isAuto) {
        if (columns.every(column => column.width === undefined)) {
            columns = [];
        }
    }

    const getPropsData = (column: TableColumnCtx<any>) => {
        const propsData = {
            key: `${props.tableLayout}_${column.id}`,
            style: {},
            name: '',
            width: column.realWidth || column.width,
        };
        if (isAuto) {
            propsData.style = {
                width: `${column.width}px`,
            };
        } else {
            propsData.name = column.id || '';
        }
        return propsData;
    };

    return createElement(
        'colgroup',
        {},
        columns.map(column => createElement('col', getPropsData(column))),
    );
};

export default Colgroup;
