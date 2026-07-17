import ElIcon from '@qsxy/element-plus-react/Icon/Icon';
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
            <ElIcon name={sortOrder === SortOrder.ASC ? 'arrow-up-long' : 'arrow-down-long'}></ElIcon>
        </button>
    );
};

export default SortIcon;
