import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import classNames from 'classnames';
import React, { FC } from 'react';
import { DrawerFooterProps } from './typings';

const DrawerFooter: FC<DrawerFooterProps> = props => {
    const { classPrefix = 'drawer' } = props;
    const { e } = useClassNames(classPrefix);

    return (
        <div className={classNames(e`footer`, props.className)} style={{ ...props.style }}>
            {props.children}
        </div>
    );
};

DrawerFooter.displayName = 'ElDrawerFooter';

export default DrawerFooter;
