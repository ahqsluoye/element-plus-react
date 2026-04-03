import { ElIcon } from '@qsxy/element-plus-react';
import { NativeProps } from '@qsxy/element-plus-react/types/common';
import React, { FC } from 'react';
import { SortOrder } from '../constants';

export type SortIconProps = {
    sortOrder: SortOrder;
    ariaLabel?: string;
} & NativeProps;

const SortIcon: FC<SortIconProps> = props => {
    const { sortOrder } = props;

    return (
        <button type="button" aria-label={props.ariaLabel} className={props.className}>
            <ElIcon size="2x" name={sortOrder === SortOrder.ASC ? 'sort-up' : 'sort-down'}></ElIcon>
        </button>
    );
};

export default SortIcon;
