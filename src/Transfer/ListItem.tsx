import classNames from 'classnames';
import React from 'react';
import { Checkbox } from '../Checkbox';
import { FieldNames, KeyWiseTransferItem } from './typings';

type ListItemProps<RecordType> = {
    renderedText?: string | number;
    renderedEl: React.ReactElement;
    disabled?: boolean;
    checked?: boolean;
    prefixCls: string;
    onClick: (item: RecordType) => void;
    onRemove?: (item: RecordType) => void;
    item: RecordType;
    /** 数据源的字段别名 */
    fieldNames: FieldNames;
};

const ListItem = <RecordType extends KeyWiseTransferItem>(props: ListItemProps<RecordType>) => {
    const { renderedText, renderedEl, item, checked, disabled, prefixCls, onClick, fieldNames } = props;

    const className = classNames({
        [`${prefixCls}-content-item`]: true,
        [`${prefixCls}-content-item-disabled`]: disabled || item[fieldNames.disabled],
        [`${prefixCls}-content-item-checked`]: checked,
    });

    let title: string | undefined;
    if (typeof renderedText === 'string' || typeof renderedText === 'number') {
        title = String(renderedText);
    }

    const liProps: React.AllHTMLAttributes<HTMLLIElement> = { className, title };
    const labelNode = <span className={`${prefixCls}-content-item-text`}>{renderedEl}</span>;

    // Default click to select
    liProps.onClick = disabled || item[fieldNames.disabled] ? undefined : () => onClick(item);
    return (
        <li {...liProps}>
            <Checkbox className={`${prefixCls}-checkbox`} checked={checked} disabled={disabled || item[fieldNames.disabled]} prevent />
            {labelNode}
        </li>
    );
};

export default ListItem;
