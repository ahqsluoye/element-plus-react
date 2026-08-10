import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import ElIcon from '@qsxy/element-plus-react/Icon/Icon';
import classNames from 'classnames';
import React, { FC, use } from 'react';
import { DrawerContext } from './DrawerContext';
import { DrawerHeaderProps } from './typings';

const DrawerHeader: FC<DrawerHeaderProps> = props => {
    const { showClose = true, classPrefix = 'drawer', border } = props;
    const { b, e, is } = useClassNames(classPrefix);

    const { doClose } = use(DrawerContext);

    return (
        <header className={classNames(e`header`, props.className, is({ border }))} style={props.style}>
            <span className={e`title`} style={props.titleStyle}>
                {props.children}
            </span>
            {showClose && (
                <button className={e`close-btn`} type="button" onClick={doClose}>
                    <ElIcon className={e`close`} name={'xmark'} />
                </button>
            )}
        </header>
    );
};

DrawerHeader.displayName = 'DrawerHeader';

export default DrawerHeader;
