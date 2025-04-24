import classNames from 'classnames';
import React, { FC, useContext } from 'react';
import Icon from '../Icon/Icon';
import { useClassNames } from '../hooks';
import { DrawerContext } from './DrawerContext';
import { DrawerHeaderProps } from './typings';

const DrawerHeader: FC<DrawerHeaderProps> = props => {
    const { showClose: closeButton = true, classPrefix = 'drawer', border } = props;
    const { b, is } = useClassNames(classPrefix);

    const { doClose } = useContext(DrawerContext);

    return (
        <div className={classNames(b`header`, props.className, is({ border }))} style={props.style}>
            <h4 className={b`title`} style={props.titleStyle}>
                {props.children}
            </h4>
            {closeButton && (
                <span className={b`header-close`} onClick={doClose}>
                    <Icon name={'xmark'} />
                </span>
            )}
        </div>
    );
};

DrawerHeader.displayName = 'DrawerHeader';

export default DrawerHeader;
