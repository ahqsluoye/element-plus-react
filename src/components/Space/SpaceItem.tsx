import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import React, { useMemo } from 'react';
import { SpaceItemProps } from './typings';

const SpaceItem = (props: SpaceItemProps) => {
    const ns = useClassNames('space');

    const classes = useMemo(() => `${props.prefixCls || ns.b()}__item`, [props.prefixCls, ns]);

    return (
        <div className={classes} style={props.style}>
            {props.children}
        </div>
    );
};

SpaceItem.displayName = 'ElSpaceItem';

export default SpaceItem;
