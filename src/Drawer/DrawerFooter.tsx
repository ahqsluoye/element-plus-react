import classNames from 'classnames';
import React, { FC } from 'react';
import { useClassNames } from '../hooks';
import { DrawerFooterProps } from './typings';

const DrawerFooter: FC<DrawerFooterProps> = props => {
    const { classPrefix = 'drawer-footer' } = props;
    const { b } = useClassNames(classPrefix);

    return (
        <div className={classNames(b(), props.className)} style={{ ...props.style, maxHeight: 260 }}>
            {props.children}
        </div>
    );
};

DrawerFooter.displayName = 'DrawerFooter';

export default DrawerFooter;
