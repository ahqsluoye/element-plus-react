import React from 'react';
import ElIcon from '../../../Icon/Icon';
import { IconSize } from '../../../Icon/typings';
import { TableV2RowCellRenderParam } from './row';

const ExpandIcon = (
    props: TableV2RowCellRenderParam['expandIconProps'] & {
        className?: string;
        style: React.CSSProperties;
        ariaLabel?: string;
        size: IconSize;
        expanded: boolean;
        expandable: boolean;
    },
) => {
    const { expanded, expandable, onExpand, style, size = 'small', ariaLabel } = props;

    const expandIconProps = {
        onClick: expandable ? () => onExpand(!expanded) : undefined,
        ariaLabel,
        ariaExpanded: expanded,
        className: props.className,
    } as any;

    return (
        <button {...expandIconProps} type="button">
            <ElIcon name="angle-right" size={size} prefix="fal" style={style}></ElIcon>
        </button>
    );
};

export default ExpandIcon;
